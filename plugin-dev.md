# Plugin Development — Overview

> This page is your starting point for building Flow Launcher plugins. It explains how plugins work, helps you choose a language, and points you to the right guide.

---

## What is a plugin?

A Flow Launcher plugin is a program that receives a search query and returns a list of results. Each result has a title, subtitle, icon, and an action to run when the user presses Enter.

That's it at its core — but plugins can also:
- Provide context menu actions (secondary actions on a result)
- Store and load settings that appear in Flow's Settings UI
- Call back into Flow's API (copy to clipboard, open URLs, show notifications, etc.)
- Run initialisation and cleanup logic on startup/shutdown

---

## How Flow calls your plugin

Every time the user types in the search bar, Flow calls your plugin's `query` method with the current search string. Your plugin returns results. Flow renders them.

```
User types query
      │
      ▼
Flow Launcher
      │  calls query("search text")
      ▼
Your Plugin
      │  returns list of Results
      ▼
Flow Launcher renders results
      │
      ▼
User selects a result → Flow calls your action
```

For .NET plugins this is a direct in-process method call. For all other languages, this communication happens over **JSON-RPC** — a lightweight protocol where Flow sends JSON to your process's stdin, and your process writes JSON to stdout.

---

## Choosing a language

| Language | Integration | Performance | API access | Best for |
|---|---|---|---|---|
| **C# / F# (.NET)** | In-process | Fastest | Full | Anything. The most capable option. |
| **Python** | JSON-RPC (subprocess) | Good | Core API | Scripting, data tasks, rapid prototyping |
| **JavaScript / TypeScript** | JSON-RPC (Node.js) | Good | Core API | Web API calls, JS-native tooling |
| **Executable** (any language) | JSON-RPC (subprocess) | Fastest for scripts | Core API | Go, Rust, compiled TypeScript, or any binary |

**Not sure?** Use this decision guide:

- You know C# or F# → **C# / F#** (most powerful, full API access)
- You want the fastest path to a working plugin → **Python** (simplest JSON-RPC setup, good library ecosystem)
- Your plugin makes a lot of web API calls → **JavaScript / TypeScript** (async-native, fetch built-in)
- You want minimal startup time and no runtime dependency → **Executable** (ship a single binary)

---

## The plugin.json file

Every plugin, regardless of language, requires a `plugin.json` file in its root directory. This is how Flow discovers and identifies your plugin.

```json
{
  "ID": "a unique GUID, e.g. 2f4e384e-76ce-45c3-aea2-b16f5e5c328f",
  "ActionKeyword": "kw",
  "Name": "My Plugin",
  "Description": "What it does, briefly",
  "Author": "Your Name",
  "Version": "1.0.0",
  "Language": "python",
  "Website": "https://github.com/you/your-plugin",
  "IcoPath": "Images/icon.png",
  "ExecuteFileName": "main.py"
}
```

See the [plugin.json reference](plugin.json.md) for all available fields.

---

## What a result looks like

Whether you're writing C#, Python, or JavaScript, you return the same conceptual structure:

```json
{
  "Title": "Main text shown in the result",
  "SubTitle": "Secondary line below the title",
  "IcoPath": "Images/icon.png",
  "Score": 50,
  "JsonRPCAction": {
    "method": "openUrl",
    "parameters": ["https://example.com"]
  }
}
```

- **Title / SubTitle** — what the user sees
- **IcoPath** — path to an icon (relative to your plugin folder)
- **Score** — influences result ordering (higher = ranked higher)
- **JsonRPCAction** — what happens when the user selects this result

---

## Plugin folder structure

All plugins share this general layout:

```
MyPlugin/
├── plugin.json          ← required: plugin metadata
├── main.py              ← your entry point (language-dependent name)
├── SettingsTemplate.yaml  ← optional: defines settings shown in Flow's UI
├── Images/
│   └── icon.png         ← plugin icon
└── lib/                 ← optional: bundled dependencies
```

---

## Development guides by language

Pick your language and follow the step-by-step guide:

### .NET (C# or F#)
- [Develop a .NET plugin](develop-dotnet-plugins.md)

### Python
- [1. Set up your project](py-setup-project.md)
- [2. Write your plugin code](py-write-code.md)
- [3. Release your plugin](py-release-project.md)
- [Reference](py-plugin-references.md)

### JavaScript / TypeScript (Node.js)
- [1. Set up your project](nodejs-setup-project.md)
- [2. Write your plugin code](nodejs-write-code.md)
- [3. Release your plugin](nodejs-release-project.md)
- [Reference](nodejs-plugin-references.md)

### Executable (Go, Rust, or any compiled language)
- [Develop an executable plugin](executable-develop-plugins.md) ← new

---

## Shared references

- [plugin.json field reference](plugin.json.md)
- [JSON-RPC protocol reference](json-rpc.md)
- [Plugin settings (SettingsTemplate)](json-rpc-settings.md)
- [.NET API Reference](API-Reference/Flow.Launcher.Plugin.md)
- [Testing your plugin](testing.md)
- [Publishing to the Plugin Store](port-plugins.md)
