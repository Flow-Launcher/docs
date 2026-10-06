# Pass: facts

Source of truth: the Flow Launcher source, checked out at `../Flow.Launcher` (a sibling of this repo). The docs describe the released version, so read files from `origin/master`, e.g. `git -C ../Flow.Launcher show origin/master:<path>`. If the checkout is missing, stop and ask the user where it is.

1. List every factual claim on the page: default action keywords, hotkeys, setting names, menu and button labels, file paths, version numbers, default behaviors, and which plugins ship by default.
2. Check each claim. Where to look:

   | Claim | Where |
   |---|---|
   | Default action keywords, plugin names | `Plugins/*/plugin.json` (`ActionKeywords`, `Name`) |
   | Web Search defaults | `Plugins/Flow.Launcher.Plugin.WebSearch/setting.json` |
   | Settings and their defaults | `Flow.Launcher.Infrastructure/UserSettings/Settings.cs` |
   | Hotkeys | `Settings.cs` (`*Hotkey` properties), `Flow.Launcher/MainWindow.xaml` (`KeyBinding`), `Flow.Launcher/ViewModel/MainViewModel.cs` |
   | UI labels | `Flow.Launcher/Languages/en.xaml`, `Plugins/*/Languages/en.xaml` |
   | Plugin API | `Flow.Launcher.Plugin/` |
   | JSON-RPC | `Flow.Launcher.Core/Plugin/` (`JsonRPC*`, `*PluginV2.cs`) |
   | Release versions | `gh release list -R Flow-Launcher/Flow.Launcher` |

3. Fix a claim only when the source clearly contradicts it. Make the smallest edit.
4. Report claims you couldn't verify (behavior that isn't evident from the source, claims about third-party tools) as findings, with the source location you checked.
