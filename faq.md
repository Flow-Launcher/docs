# FAQ & Troubleshooting

Answers to common questions for both **Flow users** and **plugin developers**.

---

## For users

### Flow won't open when I press the hotkey

- Check that Flow is running — look for its icon in the system tray
- Another application may have claimed the same hotkey. Try changing it in **Settings → General → Hotkey**
- If you're in a game, Flow's hotkey detection may be suppressed. Press `Ctrl + F12` in the search window to toggle game mode on/off

### A plugin isn't showing results

1. Open Settings → Plugins and find the plugin
2. Check its **Action Keyword** — if it has a dedicated keyword (not `*`), you must type that keyword first
3. Make sure the plugin is **enabled** (toggle is on)
4. Try pressing `F5` or typing `reload plugin data` to reload all plugins
5. Check if the plugin requires setup (an API key, a file path, etc.) in its settings tab

### Flow is slow to open or results are slow to appear

- Some plugins do network calls or heavy file I/O on every query. Identify which ones by temporarily disabling plugins one at a time
- Check if **Everything** search is running — Flow's file search can slow down if Everything isn't active. Look for a warning result in Flow when you search
- Reduce the number of global (`*`) keyword plugins — they all run on every query

### My newly installed app doesn't appear in results

Flow's app index refreshes automatically, but you can force it by:
- Pressing `F5` in the query window, or
- Typing `reload plugin data`

### How do I back up my settings?

Type `flow user data` in Flow to open your UserData folder. Copy the entire folder to back up your settings, themes, installed plugins, and history.

To restore: exit Flow, replace the UserData folder with your backup, then restart Flow.

### Flow shows up in the wrong place on screen / is too small or large

If you've moved between monitors with different resolutions, the window position may be saved offscreen. Open `%APPDATA%\FlowLauncher\Settings\Settings.json` and reset `SettingWindowTop`, `SettingWindowLeft`, `SettingWindowWidth`, and `SettingWindowHeight`.

Sensible defaults for 1080p: `top: 0, left: 0, width: 1000, height: 700`.

### Windows says Flow is unsafe to run

This is a SmartScreen warning, not an indication that Flow is harmful. It appears because Flow hasn't accumulated enough download volume for Microsoft to automatically trust it. As long as you downloaded from [flowlauncher.com](https://flowlauncher.com) or the [official GitHub repo](https://github.com/Flow-Launcher/Flow.Launcher), it is safe. Click "More info" → "Run anyway".

Similarly, antivirus false positives can occur. If you've confirmed you downloaded from an official source, submit a false-positive report to your AV vendor.

---

## For plugin developers

### My plugin doesn't appear in Flow after installing it

- Confirm the plugin folder is in `%APPDATA%\FlowLauncher\Plugins\`
- Check that `plugin.json` exists in the root of the plugin folder and is valid JSON
- Check that the `Language` field in `plugin.json` exactly matches one of: `csharp`, `fsharp`, `python`, `nodejs`, `executable`
- Restart Flow or type `reload plugin data`
- Check Flow's logs: type `open log location` in Flow and look for errors related to your plugin name

### Flow shows my plugin in the list but returns no results

For JSON-RPC plugins (Python, Node, Executable):
- Check that your process is actually writing to **stdout** (not stderr)
- Make sure each response is a single line of JSON followed by a newline — Flow reads line by line
- Test your process manually: run it, type a JSON-RPC request into stdin, and verify the stdout output looks correct
- Confirm you're not accidentally mixing debug output into stdout

For .NET plugins:
- Confirm your class implements `IAsyncPlugin` (or `IPlugin`)
- Check the Flow logs for assembly load errors

### My plugin crashes on startup

Check Flow's logs (`open log location`). Common causes:
- Missing runtime (Python not installed, Node not installed)
- A dependency import failing — check that all libraries in `lib/` are correctly bundled
- A syntax error in your entry point file

### Query is called but results don't appear in Flow

- Check that your `result` array is non-empty and correctly structured
- Confirm `Title` (capital T) is present on each result — it's required
- Verify `IcoPath` points to a file that actually exists relative to your plugin folder, or use a valid data URI

### How do I access settings in my plugin?

It depends on your plugin type:

- **JSON-RPC plugins** (Python, Node.js, and similar): see the [plugin settings guide](json-rpc-settings.md). Define settings in `SettingsTemplate.yaml` and they'll appear in Flow's Settings UI. Read them at runtime from the settings object or settings JSON.
- **C# (.NET) plugins**: implement [ISettingProvider](/API-Reference/Flow.Launcher.Plugin/ISettingProvider.md) to return a custom settings panel from `CreateSettingPanel()`. Your plugin can store its options in a serializable settings model that Flow persists and loads at runtime.

### How do I test my plugin without reinstalling it each time?

Develop directly inside `%APPDATA%\FlowLauncher\Plugins\YourPlugin\` and use `reload plugin data` (or `F5`) to reload without restarting Flow. For .NET plugins you'll need to restart Flow to pick up recompiled DLLs.

### How do I view logs from my plugin?

Type `open log location` in Flow to open the logs folder. Each plugin gets its own log entries. You can also write your own log file from within your plugin code.

### My plugin works locally but fails after publishing

Common causes:
- Bundled dependencies are missing in the release archive — confirm your build/release workflow includes everything in `lib/`
- The release ZIP doesn't have the plugin folder at the root level — the structure should be `PluginName/plugin.json`, not `plugin.json` at the archive root
- `ExecuteFileName` in `plugin.json` doesn't match the actual filename in the release

### What's the difference between IPlugin and IAsyncPlugin?

`IAsyncPlugin` is preferred. It allows your `Query` method to be `async`, which is important if you make network requests or do any I/O — doing blocking work in `IPlugin.Query` will freeze Flow's UI while your query runs.
