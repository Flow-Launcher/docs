# Pass: code samples

Check every fenced code block against the Flow Launcher source at `../Flow.Launcher`. Read from `origin/master`; see facts.md.

Check:

- **Syntax.** The sample must parse in its language: missing commas, unbalanced braces, bad indentation, invalid JSON.
- **JSON-RPC shape.** Compare it with `Flow.Launcher.Core/Plugin/JsonPRCModel.cs` (v1) and `JsonRPCV2Models/` plus `*PluginV2.cs` (v2):
  - The request Flow sends: `method`, `parameters`, `settings`. What `parameters[0]` is for `query` and for `context_menu`.
  - The response: `result` list items with `Title`, `SubTitle`, `IcoPath`, `JsonRPCAction`, `ContextData`, `Score`, …
  - Note: deserialization uses `PropertyNameCaseInsensitive = true`, so key casing is not a bug. Prefer the casing used elsewhere in the same page.
  - Actions: `JsonRPCAction.method`/`parameters`; `Flow.Launcher.*` public API calls; `dontHideAfterAction`.
- **Result fields.** Compare them with `Flow.Launcher.Plugin/Result.cs`.
- **plugin.json.** Compare it with `Flow.Launcher.Plugin/PluginMetadata.cs` and plugin.json.md. Check `Language` values against `AllowedLanguage.cs`.
- **Library usage.** For example, the Python `flowlauncher` package (`FlowLauncher` base class, `run()`).
- **Language tag** on every fence (`text` for trees and diagrams).

Fix definite bugs. Report style choices and anything you can't confirm as findings (e.g. pathlib vs os.path, outdated runtime versions).
