## Introduction

> [JSON-RPC](https://en.wikipedia.org/wiki/JSON-RPC) is a remote procedure call protocol encoded in JSON.

In Flow Launcher, we use JSON-RPC as a **local** procedure call protocol to bind Flow and other program languages ([**Python plugin**](/py-develop-plugins.md) and [**JavaScript/TypeScript plugin**](/nodejs-develop-plugins.md)).

So we need to build a **common API** between Flow and Plugin.

![JSON-RPC](/assets/jsonrpc.png)

### Example

- `-->` denotes data sent to FLow.
- `<--` denotes data coming from Flow.

```js
--> {"method": "query", "parameters": [""]}
<-- {"Title": "title", "SubTitle": "sub title", "IconPath": "favicon.ico"}
```

## Flow Launcher API

API is located [here](/API-Reference/Flow.Launcher.Plugin/IPublicAPI.md)

### API List

- `Flow.Launcher.ChangeQuery`: change flow launcher query
- `Flow.Launcher.RestartApp`: restart Flow Launcher
- `Flow.Launcher.SaveAppAllSettings`: save all Flow Launcher settings
- `Flow.Launcher.CheckForNewUpdate`: check for new Flow Launcher update
- `Flow.Launcher.ShellRun`: run shell commands
- `Flow.Launcher.CloseApp`: close flow launcher
- `Flow.Launcher.HideApp`: hide flow launcher
- `Flow.Launcher.ShowApp`: show flow launcher
- `Flow.Launcher.ShowMsg`: show messagebox
- `Flow.Launcher.GetTranslation`: get translation of current language
- `Flow.Launcher.OpenSettingDialog`: open setting dialog
- `Flow.Launcher.GetAllPlugins`: get all loaded plugins
- `Flow.Launcher.StartLoadingBar`: start loading animation in flow launcher
- `Flow.Launcher.StopLoadingBar`: stop loading animation in flow launcher
- `Flow.Launcher.ReloadAllPluginData`: reload all flow launcher plugins

### JSON RPC Formatting

```js
{
  "method": "Flow Launcher API Name",
  "parameters": []
}
```

#### `Flow.Launcher.ChangeQuery`

- `query`, string
- `requery`, bool

```js
{
    "method": "Flow.Launcher.ChangeQuery",
    "parameters": [query, requery]
}
```

#### `Flow.Launcher.ShellRun`

- `cmd`, string

```js
{
    "method": "Flow.Launcher.ShellRun",
    "parameters": [cmd]
}
```

#### `Flow.Launcher.ShowMsg`

- `title`, string
- `sub_title`, string
- `ico_path`, string(path)

```js
{
    "method": "Flow.Launcher.ShowMsg",
    "parameters": [title, sub_title, ico_path]
}
```
