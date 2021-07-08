# IPublicAPI

Namespace: Flow.Launcher.Plugin

Public APIs that plugin can use

```csharp
public interface IPublicAPI
```

## Methods

### **ChangeQuery(String, Boolean)**

Change Flow.Launcher query

```csharp
void ChangeQuery(string query, bool requery)
```

#### Parameters

`query` [String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>
query text

`requery` [Boolean](https://docs.microsoft.com/en-us/dotnet/api/system.boolean)<br>

            force requery By default, Flow Launcher will not fire query if your query is same with existing one. 
            Set this to true to force Flow Launcher requerying

### **RestartApp()**

Restart Flow Launcher

```csharp
void RestartApp()
```

### **SaveAppAllSettings()**

Save everything, all of Flow Launcher and plugins' data and settings

```csharp
void SaveAppAllSettings()
```

### **SavePluginSettings()**

Save all Flow's plugins settings

```csharp
void SavePluginSettings()
```

### **ReloadAllPluginData()**

Reloads any Plugins that have the 
 IReloadable implemented. It refeshes
 Plugin's in memory data with new content
 added by user.

```csharp
Task ReloadAllPluginData()
```

#### Returns

[Task](https://docs.microsoft.com/en-us/dotnet/api/system.threading.tasks.task)<br>

### **CheckForNewUpdate()**

Check for new Flow Launcher update

```csharp
void CheckForNewUpdate()
```

### **ShowMsgError(String, String)**

Show the error message using Flow's standard error icon.

```csharp
void ShowMsgError(string title, string subTitle)
```

#### Parameters

`title` [String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>
Message title

`subTitle` [String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>
Optional message subtitle

### **ShowMsg(String, String, String)**

Show message box

```csharp
void ShowMsg(string title, string subTitle, string iconPath)
```

#### Parameters

`title` [String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>
Message title

`subTitle` [String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>
Message subtitle

`iconPath` [String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>
Message icon path (relative path to your plugin folder)

### **ShowMsg(String, String, String, Boolean)**

Show message box

```csharp
void ShowMsg(string title, string subTitle, string iconPath, bool useMainWindowAsOwner)
```

#### Parameters

`title` [String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>
Message title

`subTitle` [String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>
Message subtitle

`iconPath` [String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>
Message icon path (relative path to your plugin folder)

`useMainWindowAsOwner` [Boolean](https://docs.microsoft.com/en-us/dotnet/api/system.boolean)<br>
when true will use main windows as the owner

### **OpenSettingDialog()**

Open setting dialog

```csharp
void OpenSettingDialog()
```

### **GetTranslation(String)**

Get translation of current language
 You need to implement IPluginI18n if you want to support multiple languages for your plugin

```csharp
string GetTranslation(string key)
```

#### Parameters

`key` [String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>

#### Returns

[String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>

### **GetAllPlugins()**

Get all loaded plugins

```csharp
List<PluginPair> GetAllPlugins()
```

#### Returns

[List&lt;PluginPair&gt;](https://docs.microsoft.com/en-us/dotnet/api/system.collections.generic.list-1)<br>

### **FuzzySearch(String, String)**

Fuzzy Search the string with the given query. This is the core search mechanism Flow uses

```csharp
MatchResult FuzzySearch(string query, string stringToCompare)
```

#### Parameters

`query` [String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>
Query string

`stringToCompare` [String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>
The string that will be compared against the query

#### Returns

[MatchResult](sharedmodels.matchresult.md)<br>
Match results

### **HttpGetStringAsync(String, CancellationToken)**

Http download the spefic url and return as string

```csharp
Task<string> HttpGetStringAsync(string url, CancellationToken token)
```

#### Parameters

`url` [String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>
URL to call Http Get

`token` [CancellationToken](https://docs.microsoft.com/en-us/dotnet/api/system.threading.cancellationtoken)<br>
Cancellation Token

#### Returns

[Task&lt;String&gt;](https://docs.microsoft.com/en-us/dotnet/api/system.threading.tasks.task-1)<br>
Task to get string result

### **HttpGetStreamAsync(String, CancellationToken)**

Http download the spefic url and return as stream

```csharp
Task<Stream> HttpGetStreamAsync(string url, CancellationToken token)
```

#### Parameters

`url` [String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>
URL to call Http Get

`token` [CancellationToken](https://docs.microsoft.com/en-us/dotnet/api/system.threading.cancellationtoken)<br>
Cancellation Token

#### Returns

[Task&lt;Stream&gt;](https://docs.microsoft.com/en-us/dotnet/api/system.threading.tasks.task-1)<br>
Task to get stream result

### **HttpDownloadAsync(String, String, CancellationToken)**

Download the specific url to a cretain file path

```csharp
Task HttpDownloadAsync(string url, string filePath, CancellationToken token)
```

#### Parameters

`url` [String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>
URL to download file

`filePath` [String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>

`token` [CancellationToken](https://docs.microsoft.com/en-us/dotnet/api/system.threading.cancellationtoken)<br>
place to store file

#### Returns

[Task](https://docs.microsoft.com/en-us/dotnet/api/system.threading.tasks.task)<br>
Task showing the progress

### **AddActionKeyword(String, String)**

Add ActionKeyword for specific plugin

```csharp
void AddActionKeyword(string pluginId, string newActionKeyword)
```

#### Parameters

`pluginId` [String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>
ID for plugin that needs to add action keyword

`newActionKeyword` [String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>
The actionkeyword that is supposed to be added

### **RemoveActionKeyword(String, String)**

Remove ActionKeyword for specific plugin

```csharp
void RemoveActionKeyword(string pluginId, string oldActionKeyword)
```

#### Parameters

`pluginId` [String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>
ID for plugin that needs to remove action keyword

`oldActionKeyword` [String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>

### **LogDebug(String, String, String)**

Log debug message
 Message will only be logged in Debug mode

```csharp
void LogDebug(string className, string message, string methodName)
```

#### Parameters

`className` [String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>

`message` [String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>

`methodName` [String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>

### **LogInfo(String, String, String)**

Log info message

```csharp
void LogInfo(string className, string message, string methodName)
```

#### Parameters

`className` [String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>

`message` [String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>

`methodName` [String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>

### **LogWarn(String, String, String)**

Log warning message

```csharp
void LogWarn(string className, string message, string methodName)
```

#### Parameters

`className` [String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>

`message` [String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>

`methodName` [String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>

### **LogException(String, String, Exception, String)**

Log an Exception. Will throw if in debug mode so developer will be aware, 
 otherwise logs the eror message. This is the primary logging method used for Flow

```csharp
void LogException(string className, string message, Exception e, string methodName)
```

#### Parameters

`className` [String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>

`message` [String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>

`e` [Exception](https://docs.microsoft.com/en-us/dotnet/api/system.exception)<br>

`methodName` [String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>

### **LoadSettingJsonStorage&lt;T&gt;()**

Load JsonStorage for current plugin's setting. This is the method used to load settings from json in Flow.
 When the file is not exist, it will create a new instance for the specific type.

```csharp
T LoadSettingJsonStorage<T>()
```

#### Type Parameters

`T`<br>
Type for deserialization

#### Returns

T<br>

### **SaveSettingJsonStorage&lt;T&gt;()**

Save JsonStorage for current plugin's setting. This is the method used to save settings to json in Flow.Launcher
 This method will save the original instance loaded with LoadJsonStorage.
 This API call is for manually Save. Flow will automatically save all setting type that has called LoadSettingJsonStorage or SaveSettingJsonStorage previously.

```csharp
void SaveSettingJsonStorage<T>()
```

#### Type Parameters

`T`<br>
Type for Serialization

## Events

### **GlobalKeyboardEvent**

Fired after global keyboard events
 if you want to hook something like Ctrl+R, you should use this event

```csharp
public abstract event FlowLauncherGlobalKeyboardEventHandler GlobalKeyboardEvent;
```
