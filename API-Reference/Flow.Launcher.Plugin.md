# Flow.Launcher.Plugin assembly

## Flow.Launcher.Plugin namespace

| public type | description |
| --- | --- |
| class [ActionContext](./Flow.Launcher.Plugin/ActionContext.md) | Context provided as a parameter when invoking a [`Action`](./Flow.Launcher.Plugin/Result/Action.md) or [`AsyncAction`](./Flow.Launcher.Plugin/Result/AsyncAction.md) |
| class [ActualApplicationThemeChangedEventArgs](./Flow.Launcher.Plugin/ActualApplicationThemeChangedEventArgs.md) | The event args for [`ActualApplicationThemeChangedEventHandler`](./Flow.Launcher.Plugin/ActualApplicationThemeChangedEventHandler.md) |
| delegate [ActualApplicationThemeChangedEventHandler](./Flow.Launcher.Plugin/ActualApplicationThemeChangedEventHandler.md) | A delegate for when the actual application theme is changed |
| delegate [AfterFlowLauncherQueryEventHandler](./Flow.Launcher.Plugin/AfterFlowLauncherQueryEventHandler.md) | Delegate for query event |
| static class [AllowedLanguage](./Flow.Launcher.Plugin/AllowedLanguage.md) | Allowed plugin languages |
| class [BaseModel](./Flow.Launcher.Plugin/BaseModel.md) | Base model for plugin classes |
| class [DialogJumpResult](./Flow.Launcher.Plugin/DialogJumpResult.md) | Describes a result of a [`Query`](./Flow.Launcher.Plugin/Query.md) executed by a plugin in Dialog Jump window |
| delegate [FlowLauncherGlobalKeyboardEventHandler](./Flow.Launcher.Plugin/FlowLauncherGlobalKeyboardEventHandler.md) | Global keyboard events |
| class [FlowLauncherKeyDownEventArgs](./Flow.Launcher.Plugin/FlowLauncherKeyDownEventArgs.md) | Arguments container for the Key Down event |
| delegate [FlowLauncherKeyDownEventHandler](./Flow.Launcher.Plugin/FlowLauncherKeyDownEventHandler.md) | Delegate for key down event |
| class [FlowLauncherQueryEventArgs](./Flow.Launcher.Plugin/FlowLauncherQueryEventArgs.md) | Arguments container for the Query event |
| record [GlyphInfo](./Flow.Launcher.Plugin/GlyphInfo.md) | Text with FontFamily specified |
| interface [IAsyncDialogJump](./Flow.Launcher.Plugin/IAsyncDialogJump.md) | Asynchronous Dialog Jump Model |
| interface [IAsyncExternalPreview](./Flow.Launcher.Plugin/IAsyncExternalPreview.md) | This interface is for plugins that wish to provide file preview (external preview) via a third party app instead of the default preview. |
| interface [IAsyncHomeQuery](./Flow.Launcher.Plugin/IAsyncHomeQuery.md) | Asynchronous Query Model for Flow Launcher When Query Text is Empty |
| interface [IAsyncPlugin](./Flow.Launcher.Plugin/IAsyncPlugin.md) | Asynchronous Plugin Model for Flow Launcher |
| interface [IAsyncReloadable](./Flow.Launcher.Plugin/IAsyncReloadable.md) | This interface is to indicate and allow plugins to asyncronously reload their in memory data cache or other mediums when user makes a new change that is not immediately captured. For example, for BrowserBookmark and Program plugin does not automatically detect when a user added a new bookmark or program, so this interface's function is exposed to allow user manually do the reloading after those new additions. The command that allows user to manual reload is exposed via Plugin.Sys, and it will call the plugins that have implemented this interface. |
| interface [IContextMenu](./Flow.Launcher.Plugin/IContextMenu.md) | Adds support for presenting additional options for a given [`Result`](./Flow.Launcher.Plugin/Result.md) from a context menu. |
| interface [IDialogJump](./Flow.Launcher.Plugin/IDialogJump.md) | Synchronous Dialog Jump Model |
| interface [IDialogJumpDialog](./Flow.Launcher.Plugin/IDialogJumpDialog.md) | Interface for handling file dialog instances in DialogJump. |
| interface [IDialogJumpDialogWindow](./Flow.Launcher.Plugin/IDialogJumpDialogWindow.md) | Interface for handling a specific file dialog window in DialogJump. |
| interface [IDialogJumpDialogWindowTab](./Flow.Launcher.Plugin/IDialogJumpDialogWindowTab.md) | Interface for handling a specific tab in a file dialog window in DialogJump. |
| interface [IDialogJumpExplorer](./Flow.Launcher.Plugin/IDialogJumpExplorer.md) | Interface for handling file explorer instances in DialogJump. |
| interface [IDialogJumpExplorerWindow](./Flow.Launcher.Plugin/IDialogJumpExplorerWindow.md) | Interface for handling a specific file explorer window in DialogJump. |
| interface [IFeatures](./Flow.Launcher.Plugin/IFeatures.md) | Base Interface for Flow's special plugin feature interface |
| interface [IHomeQuery](./Flow.Launcher.Plugin/IHomeQuery.md) | Synchronous Query Model for Flow Launcher When Query Text is Empty |
| interface [IPlugin](./Flow.Launcher.Plugin/IPlugin.md) | Synchronous Plugin Model for Flow Launcher |
| interface [IPluginI18n](./Flow.Launcher.Plugin/IPluginI18n.md) | Represent plugins that support internationalization |
| interface [IPublicAPI](./Flow.Launcher.Plugin/IPublicAPI.md) | Public APIs that plugin can use |
| interface [IReloadable](./Flow.Launcher.Plugin/IReloadable.md) | This interface is to indicate and allow plugins to synchronously reload their in memory data cache or other mediums when user makes a new change that is not immediately captured. For example, for BrowserBookmark and Program plugin does not automatically detect when a user added a new bookmark or program, so this interface's function is exposed to allow user manually do the reloading after those new additions. The command that allows user to manual reload is exposed via Plugin.Sys, and it will call the plugins that have implemented this interface. |
| interface [IResultUpdated](./Flow.Launcher.Plugin/IResultUpdated.md) | Interface for plugins that want to manually update their results |
| interface [ISavable](./Flow.Launcher.Plugin/ISavable.md) | Inherit this interface if you need to save additional data which is not a setting or cache, please implement this interface. |
| interface [ISettingProvider](./Flow.Launcher.Plugin/ISettingProvider.md) | This interface is used to create settings panel for .Net plugins |
| enum [KeyEvent](./Flow.Launcher.Plugin/KeyEvent.md) | Enumeration of key events for [`RegisterGlobalKeyboardCallback`](./Flow.Launcher.Plugin/IPublicAPI/RegisterGlobalKeyboardCallback.md) and [`RemoveGlobalKeyboardCallback`](./Flow.Launcher.Plugin/IPublicAPI/RemoveGlobalKeyboardCallback.md) |
| class [PluginInitContext](./Flow.Launcher.Plugin/PluginInitContext.md) | Carries data passed to a plugin when it gets initialized. |
| class [PluginMetadata](./Flow.Launcher.Plugin/PluginMetadata.md) | Plugin metadata |
| class [PluginPair](./Flow.Launcher.Plugin/PluginPair.md) | Plugin instance and plugin metadata |
| class [Query](./Flow.Launcher.Plugin/Query.md) | Represents a query that is sent to a plugin. |
| class [Result](./Flow.Launcher.Plugin/Result.md) | Describes a result of a [`Query`](./Flow.Launcher.Plugin/Query.md) executed by a plugin |
| delegate [ResultItemDropEventHandler](./Flow.Launcher.Plugin/ResultItemDropEventHandler.md) | Delegate for drop events [unused?] |
| class [ResultUpdatedEventArgs](./Flow.Launcher.Plugin/ResultUpdatedEventArgs.md) | Event arguments for the ResultsUpdated event |
| delegate [ResultUpdatedEventHandler](./Flow.Launcher.Plugin/ResultUpdatedEventHandler.md) | Delegate for the ResultsUpdated event |
| class [SpecialKeyState](./Flow.Launcher.Plugin/SpecialKeyState.md) | Contains the press state of certain special keys. |
| record [UserPlugin](./Flow.Launcher.Plugin/UserPlugin.md) | User Plugin Model for Flow Launcher |
| class [VisibilityChangedEventArgs](./Flow.Launcher.Plugin/VisibilityChangedEventArgs.md) | The event args for [`VisibilityChangedEventHandler`](./Flow.Launcher.Plugin/VisibilityChangedEventHandler.md) |
| delegate [VisibilityChangedEventHandler](./Flow.Launcher.Plugin/VisibilityChangedEventHandler.md) | A delegate for when the visibility is changed |

## Flow.Launcher.Plugin.SharedCommands namespace

| public type | description |
| --- | --- |
| static class [FilesFolders](./Flow.Launcher.Plugin.SharedCommands/FilesFolders.md) | Commands that are useful to run on files... and folders! |
| static class [SearchWeb](./Flow.Launcher.Plugin.SharedCommands/SearchWeb.md) | Contains methods to open a search in a new browser window or tab. |
| static class [ShellCommand](./Flow.Launcher.Plugin.SharedCommands/ShellCommand.md) | Contains methods for running shell commands |

## Flow.Launcher.Plugin.SharedModels namespace

| public type | description |
| --- | --- |
| class [MatchResult](./Flow.Launcher.Plugin.SharedModels/MatchResult.md) | Represents the result of a match operation. |
| class [MonitorInfo](./Flow.Launcher.Plugin.SharedModels/MonitorInfo.md) | Contains full information about a display monitor. Inspired from: https://github.com/Jack251970/DesktopWidgets3. |
| enum [SearchPrecisionScore](./Flow.Launcher.Plugin.SharedModels/SearchPrecisionScore.md) | Represents the search precision score used to filter search results. |
| class [ThemeData](./Flow.Launcher.Plugin.SharedModels/ThemeData.md) | Theme data model |

<!-- DO NOT EDIT: generated by xmldocmd for Flow.Launcher.Plugin.dll -->
