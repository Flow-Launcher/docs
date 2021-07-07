# SearchWeb

Namespace: Flow.Launcher.Plugin.SharedCommands



```csharp
public static class SearchWeb
```

Inheritance [Object](https://docs.microsoft.com/en-us/dotnet/api/system.object) → [SearchWeb](./flow.launcher.plugin.sharedcommands.searchweb.md)

## Methods

### **NewBrowserWindow(String, String)**

Opens search in a new browser. If no browser path is passed in then Chrome is used. 
 Leave browser path blank to use Chrome.

```csharp
public static void NewBrowserWindow(string url, string browserPath)
```

#### Parameters

`url` [String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>

`browserPath` [String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>

### **NewTabInBrowser(String, String)**

Opens search as a tab in the default browser chosen in Windows settings.

```csharp
public static void NewTabInBrowser(string url, string browserPath)
```

#### Parameters

`url` [String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>

`browserPath` [String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>
