# IPublicAPI interface

Public APIs that plugin can use

```csharp
public interface IPublicAPI
```

## Members

| name | description |
| --- | --- |
| event [ActualApplicationThemeChanged](IPublicAPI/ActualApplicationThemeChanged.md) | Invoked when the actual theme of the application has changed. Currently, the plugin will continue to be subscribed even if it is turned off. |
| event [VisibilityChanged](IPublicAPI/VisibilityChanged.md) | Invoked when the visibility of the main window has changed. Currently, the plugin will continue to be subscribed even if it is turned off. |
| [ActionKeywordAssigned](IPublicAPI/ActionKeywordAssigned.md)(…) | Check whether specific ActionKeyword is assigned to any of the plugin |
| [AddActionKeyword](IPublicAPI/AddActionKeyword.md)(…) | Add ActionKeyword and update action keyword metadata for specific plugin. Before adding, please check if action keyword is already assigned by [`ActionKeywordAssigned`](./IPublicAPI/ActionKeywordAssigned.md) |
| [BackToQueryResults](IPublicAPI/BackToQueryResults.md)() | Back to the query results. This method should run when selected item is from context menu or history. |
| [ChangeQuery](IPublicAPI/ChangeQuery.md)(…) | Change Flow.Launcher query. When current results are from context menu or history, it will go back to query results before changing query. |
| [CheckForNewUpdate](IPublicAPI/CheckForNewUpdate.md)() | Check for new Flow Launcher update |
| [CopyToClipboard](IPublicAPI/CopyToClipboard.md)(…) | Copies the passed in text and shows a message indicating whether the operation was completed successfully. When directCopy is set to true and passed in text is the path to a file or directory, the actual file/directory will be copied to clipboard. Otherwise the text itself will still be copied to clipboard. |
| [FocusQueryTextBox](IPublicAPI/FocusQueryTextBox.md)() | Focus the query text box in the main window |
| [FuzzySearch](IPublicAPI/FuzzySearch.md)(…) | Fuzzy Search the string with the given query. This is the core search mechanism Flow uses |
| [GetAllInitializedPlugins](IPublicAPI/GetAllInitializedPlugins.md)(…) | Get all initialized plugins |
| [GetAllPlugins](IPublicAPI/GetAllPlugins.md)() | Get all loaded plugins |
| [GetAvailableThemes](IPublicAPI/GetAvailableThemes.md)() | Get all available themes |
| [GetCurrentTheme](IPublicAPI/GetCurrentTheme.md)() | Get the current theme |
| [GetDataDirectory](IPublicAPI/GetDataDirectory.md)() | Get the user data directory of Flow Launcher. |
| [GetLogDirectory](IPublicAPI/GetLogDirectory.md)() | Get the log directory of Flow Launcher. |
| [GetPluginManifest](IPublicAPI/GetPluginManifest.md)() | Get the current plugin manifest entries known to Flow Launcher. |
| [GetTranslation](IPublicAPI/GetTranslation.md)(…) | Get translation of current language You need to implement IPluginI18n if you want to support multiple languages for your plugin |
| [HideMainWindow](IPublicAPI/HideMainWindow.md)() | Hide MainWindow |
| [HttpDownloadAsync](IPublicAPI/HttpDownloadAsync.md)(…) | Download the specific url to a cretain file path |
| [HttpGetStreamAsync](IPublicAPI/HttpGetStreamAsync.md)(…) | Http download the specific url and return as stream |
| [HttpGetStringAsync](IPublicAPI/HttpGetStringAsync.md)(…) | Http download the specific url and return as string |
| [InstallPlugin](IPublicAPI/InstallPlugin.md)(…) | Install a plugin. By default will remove the zip file if installation is from url, unless it's a local path installation |
| [IsApplicationDarkTheme](IPublicAPI/IsApplicationDarkTheme.md)() | Representing whether the application is using a dark theme |
| [IsGameModeOn](IPublicAPI/IsGameModeOn.md)() | Representing Game Mode status |
| [IsMainWindowVisible](IPublicAPI/IsMainWindowVisible.md)() | Representing whether the main window is visible |
| [LoadCacheBinaryStorageAsync&lt;T&gt;](IPublicAPI/LoadCacheBinaryStorageAsync.md)(…) | Load BinaryStorage for current plugin's cache. This is the method used to load cache from binary in Flow. When the file is not exist, it will create a new instance for the specific type. |
| [LoadImageAsync](IPublicAPI/LoadImageAsync.md)(…) | Load image from path. Support local, remote and data:image url. Support png, jpg, jpeg, gif, bmp, tiff, ico, svg image files. If image path is missing, it will return a missing icon. |
| [LoadSettingJsonStorage&lt;T&gt;](IPublicAPI/LoadSettingJsonStorage.md)() | Load JsonStorage for current plugin's setting. This is the method used to load settings from json in Flow. When the file is not exist, it will create a new instance for the specific type. |
| [LogDebug](IPublicAPI/LogDebug.md)(…) | Log debug message Message will only be logged in Debug mode |
| [LogError](IPublicAPI/LogError.md)(…) | Log error message. Preferred error logging method for plugins. |
| [LogException](IPublicAPI/LogException.md)(…) | Log an Exception. Will throw if in debug mode so developer will be aware, otherwise logs the eror message. This is the primary logging method used for Flow |
| [LogInfo](IPublicAPI/LogInfo.md)(…) | Log info message |
| [LogWarn](IPublicAPI/LogWarn.md)(…) | Log warning message |
| [OpenAppUri](IPublicAPI/OpenAppUri.md)(…) | Opens the application URI with the given Uri object, e.g. obsidian://search-query-example (2 methods) |
| [OpenDirectory](IPublicAPI/OpenDirectory.md)(…) | Open directory in an explorer configured by user via Flow's Settings. The default is Windows Explorer |
| [OpenSettingDialog](IPublicAPI/OpenSettingDialog.md)() | Open setting dialog |
| [OpenUrl](IPublicAPI/OpenUrl.md)(…) | Opens the URL with the given Uri object in browser if scheme is Http or Https. If the URL is a local file, it will instead be opened with the default application for that file type. The browser and mode used is based on what's configured in Flow's default browser settings. (2 methods) |
| [OpenWebUrl](IPublicAPI/OpenWebUrl.md)(…) | Opens the URL using the browser with the given Uri object, even if the URL is a local file. The browser and mode used is based on what's configured in Flow's default browser settings. (2 methods) |
| [PluginModified](IPublicAPI/PluginModified.md)(…) | Check if the plugin has been modified. If this plugin is updated, installed or uninstalled and users do not restart the app, it will be marked as modified |
| [RegisterGlobalKeyboardCallback](IPublicAPI/RegisterGlobalKeyboardCallback.md)(…) | Registers a callback function for global keyboard events. |
| [ReloadAllPluginData](IPublicAPI/ReloadAllPluginData.md)() | Reloads any Plugins that have the IReloadable implemented. It refeshes Plugin's in memory data with new content added by user. |
| [RemoveActionKeyword](IPublicAPI/RemoveActionKeyword.md)(…) | Remove ActionKeyword and update action keyword metadata for specific plugin |
| [RemoveGlobalKeyboardCallback](IPublicAPI/RemoveGlobalKeyboardCallback.md)(…) | Remove a callback for Global Keyboard Event |
| [ReQuery](IPublicAPI/ReQuery.md)(…) | Reloads the query. When current results are from context menu or history, it will go back to query results before re-querying. |
| [RestartApp](IPublicAPI/RestartApp.md)() | Restart Flow Launcher |
| [SaveAppAllSettings](IPublicAPI/SaveAppAllSettings.md)() | Save everything, all of Flow Launcher and plugins' data and settings |
| [SaveCacheBinaryStorageAsync&lt;T&gt;](IPublicAPI/SaveCacheBinaryStorageAsync.md)(…) | Save BinaryStorage for current plugin's cache. This is the method used to save cache to binary in Flow. This method will save the original instance loaded with LoadCacheBinaryStorageAsync. This API call is for manually Save. Flow will automatically save all cache type that has called [`LoadCacheBinaryStorageAsync`](./IPublicAPI/LoadCacheBinaryStorageAsync.md) or [`SaveCacheBinaryStorageAsync`](./IPublicAPI/SaveCacheBinaryStorageAsync.md) previously. |
| [SavePluginCaches](IPublicAPI/SavePluginCaches.md)() | Save all Flow's plugins caches |
| [SavePluginSettings](IPublicAPI/SavePluginSettings.md)() | Save all Flow's plugins settings |
| [SaveSettingJsonStorage&lt;T&gt;](IPublicAPI/SaveSettingJsonStorage.md)() | Save JsonStorage for current plugin's setting. This is the method used to save settings to json in Flow. This method will save the original instance loaded with LoadJsonStorage. This API call is for manually Save. Flow will automatically save all setting type that has called [`LoadSettingJsonStorage`](./IPublicAPI/LoadSettingJsonStorage.md) or [`SaveSettingJsonStorage`](./IPublicAPI/SaveSettingJsonStorage.md) previously. |
| [SetCurrentTheme](IPublicAPI/SetCurrentTheme.md)(…) | Set the current theme |
| [SetGameMode](IPublicAPI/SetGameMode.md)(…) | Switches Game Mode to given value |
| [ShellRun](IPublicAPI/ShellRun.md)(…) | Run a shell command |
| [ShowMainWindow](IPublicAPI/ShowMainWindow.md)() | Show the MainWindow when hiding |
| [ShowMsg](IPublicAPI/ShowMsg.md)(…) | Show message box (2 methods) |
| [ShowMsgBox](IPublicAPI/ShowMsgBox.md)(…) | Displays a standardised Flow message box. |
| [ShowMsgError](IPublicAPI/ShowMsgError.md)(…) | Show the error message using Flow's standard error icon. |
| [ShowMsgErrorWithButton](IPublicAPI/ShowMsgErrorWithButton.md)(…) | Show the error message using Flow's standard error icon. |
| [ShowMsgWithButton](IPublicAPI/ShowMsgWithButton.md)(…) | Show message box with button (2 methods) |
| [ShowProgressBoxAsync](IPublicAPI/ShowProgressBoxAsync.md)(…) | Displays a standardised Flow progress box. |
| [StartLoadingBar](IPublicAPI/StartLoadingBar.md)() | Start the loading bar in main window |
| [StopLoadingBar](IPublicAPI/StopLoadingBar.md)() | Stop the loading bar in main window |
| [StopwatchLogDebug](IPublicAPI/StopwatchLogDebug.md)(…) | Log debug message of the time taken to execute a method Message will only be logged in Debug mode |
| [StopwatchLogDebugAsync](IPublicAPI/StopwatchLogDebugAsync.md)(…) | Log debug message of the time taken to execute a method asynchronously Message will only be logged in Debug mode |
| [StopwatchLogInfo](IPublicAPI/StopwatchLogInfo.md)(…) | Log info message of the time taken to execute a method |
| [StopwatchLogInfoAsync](IPublicAPI/StopwatchLogInfoAsync.md)(…) | Log info message of the time taken to execute a method asynchronously |
| [ToggleGameMode](IPublicAPI/ToggleGameMode.md)() | Toggles Game Mode. off -&gt; on and backwards |
| [UninstallPluginAsync](IPublicAPI/UninstallPluginAsync.md)(…) | Uninstall a plugin |
| [UpdatePluginAsync](IPublicAPI/UpdatePluginAsync.md)(…) | Update a plugin to new version, from a zip file. By default will remove the zip file if update is via url, unless it's a local path installation |
| [UpdatePluginManifestAsync](IPublicAPI/UpdatePluginManifestAsync.md)(…) | Update the plugin manifest |

## See Also

* namespace [Flow.Launcher.Plugin](../Flow.Launcher.Plugin.md)

<!-- DO NOT EDIT: generated by xmldocmd for Flow.Launcher.Plugin.dll -->
