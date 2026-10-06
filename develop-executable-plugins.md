# Executable Plugins

Executable plugins let you build a Flow Launcher plugin in **any language that can produce a binary** — Go, Rust, C, compiled TypeScript, Zig, or anything else. Flow treats the executable as a subprocess and communicates with it over JSON-RPC.

This is a good choice when you want:
- Minimal startup latency (no interpreter to boot)
- A single binary with no runtime dependency
- A language not otherwise supported

---

## How it works

When a user triggers your plugin, Flow:

1. Launches your executable as a subprocess
2. Passes a JSON-RPC request as the process's first **command-line argument**
3. Reads the JSON-RPC response from the process's **stdout**
4. Renders the returned results

Your process runs when called and then exits. It must write its response to stdout.

> **Important:** Only write JSON-RPC responses to stdout. Any debug output must go to a log file. Flow treats any output on **stderr** as an error and will not parse the response.

---

## plugin.json for an executable plugin

Set `"Language": "executable"` and point `"ExecuteFileName"` at your binary:

```json
{
  "ID": "your-unique-guid-here",
  "ActionKeyword": "ex",
  "Name": "My Executable Plugin",
  "Description": "Does something fast",
  "Author": "Your Name",
  "Version": "1.0.0",
  "Language": "executable",
  "Website": "https://github.com/you/your-plugin",
  "IcoPath": "Images/icon.png",
  "ExecuteFileName": "my-plugin.exe"
}
```

---

## JSON-RPC protocol

Flow passes the request as JSON in the first command-line argument. It has a `method` and a `parameters` array.

### Methods Flow will call

#### `query`

Called each time the user types in the search bar (after the action keyword, if any).

**Request:**
```json
{"method": "query", "parameters": ["search text"]}
```

**Response:** A list of result objects.
```json
{
  "result": [
    {
      "Title": "First result",
      "SubTitle": "Subtitle text",
      "IcoPath": "Images/icon.png",
      "Score": 100,
      "JsonRPCAction": {
        "method": "openUrl",
        "parameters": ["https://example.com"],
        "dontHideAfterAction": false
      }
    }
  ]
}
```

---

#### `context_menu`

Called when the user opens the context menu on a result (right-arrow or right-click). The only parameter is the result's `ContextData`. Return a list of additional actions.

**Request:**
```json
{"method": "context_menu", "parameters": [["any", "data"]]}
```

**Response:** Same format as `query`.

---

### Result fields

| Field | Type | Description |
|---|---|---|
| `Title` | string | Main result text (required) |
| `SubTitle` | string | Secondary line below the title |
| `IcoPath` | string | Relative path to icon file, or a data URI |
| `Score` | int | Sort weight — higher is ranked higher |
| `JsonRPCAction` | object | Action to perform when the user selects this result |
| `ContextData` | any | Arbitrary data passed back to your plugin in `context_menu` |
| `TitleHighlightData` | int[] | Character positions to bold in the title |

---

### Built-in actions (JsonRPCAction.method)

These are handled by Flow directly — you don't need to implement them yourself. Pass every parameter, including optional ones, or Flow ignores the call:

| method | parameters | Effect |
|---|---|---|
| `Flow.Launcher.OpenUrl` | `[url, false]` | Opens a URL in the default browser |
| `Flow.Launcher.OpenDirectory` | `[path, fileToSelect]` | Opens a folder in Explorer |
| `Flow.Launcher.CopyToClipboard` | `[text, false, true]` | Copies text to the clipboard |
| `Flow.Launcher.ShellRun` | `[command, "cmd.exe"]` | Runs a shell command |

For custom actions (ones you implement yourself), use any method name not prefixed with `Flow.Launcher.`. Flow will send it back to your process as a new method call.

---

## Minimal example in Go

Here's a complete working plugin in Go that returns a single result for any query:

```go
package main

import (
	"encoding/json"
	"fmt"
	"os"
)

type Request struct {
	Method     string            `json:"method"`
	Parameters []json.RawMessage `json:"parameters"`
}

type Action struct {
	Method              string `json:"method"`
	Parameters          []any  `json:"parameters"`
	DontHideAfterAction bool   `json:"dontHideAfterAction"`
}

type Result struct {
	Title         string `json:"Title"`
	SubTitle      string `json:"SubTitle"`
	IcoPath       string `json:"IcoPath"`
	Score         int    `json:"Score"`
	JsonRPCAction Action `json:"JsonRPCAction"`
}

type Response struct {
	Result []Result `json:"result"`
}

func handleQuery(query string) Response {
	return Response{
		Result: []Result{
			{
				Title:    fmt.Sprintf("You searched: %s", query),
				SubTitle: "Press Enter to open example.com",
				IcoPath:  "Images/icon.png",
				Score:    100,
				JsonRPCAction: Action{
					Method:     "Flow.Launcher.OpenUrl",
					Parameters: []any{"https://example.com", false},
				},
			},
		},
	}
}

func main() {
	if len(os.Args) < 2 {
		return
	}

	var req Request
	if err := json.Unmarshal([]byte(os.Args[1]), &req); err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}

	resp := Response{Result: []Result{}}

	switch req.Method {
	case "query":
		var query string
		if len(req.Parameters) > 0 {
			json.Unmarshal(req.Parameters[0], &query)
		}
		resp = handleQuery(query)
	}

	out, _ := json.Marshal(resp)
	fmt.Println(string(out))
}
```

Build with `go build -o my-plugin.exe .` and place the binary in your plugin folder.

---

## Minimal example in Rust

```rust
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};

#[derive(Deserialize)]
struct Request {
    method: String,
    #[serde(default)]
    parameters: Vec<Value>,
}

#[derive(Serialize)]
struct Action {
    method: String,
    parameters: Vec<Value>,
    #[serde(rename = "dontHideAfterAction")]
    dont_hide: bool,
}

#[derive(Serialize)]
struct Result {
    #[serde(rename = "Title")]
    title: String,
    #[serde(rename = "SubTitle")]
    subtitle: String,
    #[serde(rename = "IcoPath")]
    ico_path: String,
    #[serde(rename = "Score")]
    score: i32,
    #[serde(rename = "JsonRPCAction")]
    action: Action,
}

#[derive(Serialize)]
struct Response {
    result: Vec<Result>,
}

fn main() {
    let Some(arg) = std::env::args().nth(1) else { return };

    let req: Request = match serde_json::from_str(&arg) {
        Ok(r) => r,
        Err(e) => {
            eprintln!("{e}");
            std::process::exit(1);
        }
    };

    let resp = match req.method.as_str() {
        "query" => {
            let query = req.parameters.first().and_then(Value::as_str).unwrap_or("");
            Response {
                result: vec![Result {
                    title: format!("You searched: {}", query),
                    subtitle: "Press Enter to open example.com".into(),
                    ico_path: "Images/icon.png".into(),
                    score: 100,
                    action: Action {
                        method: "Flow.Launcher.OpenUrl".into(),
                        parameters: vec![json!("https://example.com"), json!(false)],
                        dont_hide: false,
                    },
                }],
            }
        }
        _ => Response { result: vec![] },
    };

    println!("{}", serde_json::to_string(&resp).unwrap());
}
```

---

## Folder structure

```text
MyPlugin/
├── plugin.json
├── my-plugin.exe     ← your compiled binary
└── Images/
    └── icon.png
```

---

## Installing for development

Copy your plugin folder to:
```powershell
%APPDATA%\FlowLauncher\Plugins\MyPlugin\
```

Then restart Flow or press `F5` / type `reload plugin data` to load it.

---

## Debugging

Since you can't attach a debugger easily, logging to a file is the most practical approach:

```go
// Go example
logFile, _ := os.OpenFile("plugin.log", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
log.SetOutput(logFile)
log.Printf("Query received: %s", query)
```

You can also view Flow's own logs by typing `open log location` in Flow.

---

## Publishing

See the [plugin manifest repo](https://github.com/Flow-Launcher/Flow.Launcher.PluginsManifest) for instructions on releasing to the Plugin Store, including the required GitHub Actions workflow for automated builds.

**SECURITY NOTE**
New binary plugin submissions will only be accepted to the Plugin Store after the source code and GitHub CI action have been reviewed and verified. Users will be warned in other parts of Flow documentation that binary plugins represent the greatest security risk as they are one step removed from direct source code.