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

## Before starting work on a Plugin

Before you start, check the Plugin Store for similar plugins. If one exists, consider reaching out to its author about extending it together—this gets features to users faster and maintains plugin quality. Only create a new plugin if the author doesn't respond, declines, or if your idea requires vastly different features, performance, or architecture.

---

## Plugin Store policy

Plugins that facilitate or contain any of the following will not be allowed:

- Malicious code
- Piracy
- Deceptive use
- Inappropriate content
- Illegal activities
- Impersonation
- Abuse
- Fraud
- Spam

---

## How Flow calls your plugin

Every time the user types in the search bar, Flow calls your plugin's `query` method with the current search string. Your plugin returns results. Flow renders them.

```text
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
| **Executable** (any language) | JSON-RPC (subprocess) | Faster than scripted languages | Core API | Go, Rust, compiled TypeScript, or any binary |

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

All plugins return a list of Result objects after a query.  

Each Result represents one row in Flow Launcher and controls:  
- How that row looks  
- How the user can interact with it  

It has many properties, but these are the core ones:  

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

Plugin structure varies by language, so the best way to get started is to use a template or sample:

- **.NET**: Use `dotnet new flow-plugin` to scaffold from a template
- **Other languages**: Check the [plugin samples](plugins.md) for real examples

Every plugin needs a **plugin.json** file. This file tells Flow how to load your plugin and must specify, details can be found above.

Beyond these essentials, you have flexibility in how you organize your code. See the language-specific development guides for examples.

---

## Development guides by language

Pick your language and follow the step-by-step guide:

### .NET (C# or F#)
- [Develop a .NET plugin](develop-dotnet-plugins.md)

### Python
- [Develop a Python plugin](develop-python-plugins.md)


### JavaScript / TypeScript (Node.js)
- [Develop a Nodejs plugin](develop-nodejs-plugins.md)

### Executable (Go, Rust, or any compiled language)
- [Develop an executable plugin](develop-executable-plugins.md) ← new

---

## Releasing your Plugin to the Plugin Store

When you are ready to release your plugin for people to enjoy, head over to Flow's [plugin repo](https://github.com/Flow-Launcher/Flow.Launcher.PluginsManifest) and follow the instructions there in the readme. Note that each new submission needs to be reviewed and approved before it is available to all Flow users in the Plugin Store. This is done on a volunteer basis by the Flow Launcher Team so may take some time after initial submission. If it has taken a week or two, you can jump into the Flow Discord (https://discord.gg/n3vANeaxty) and let the team know the submission has been there for a while and we are sure a friendly team member will escalate the review. We appreciate the effort Plugin authors put in to extending the functionality of Flow Launcher and we will do our best to ensure Plugin submissions are reviewed in a timely manner.

---

## Shared references

- [plugin.json field reference](plugin.json.md)
- [JSON-RPC protocol reference](json-rpc.md)
- [Plugin settings (SettingsTemplate)](json-rpc-settings.md)
- [.NET API Reference](API-Reference/Flow.Launcher.Plugin.md)
- [Testing your plugin](testing.md)
- [Publishing to the Plugin Store](port-plugins.md)
