# IPlugin

Namespace: Flow.Launcher.Plugin

Synchronous Plugin Model for Flow Launcher
 
            If the Querying or Init method requires high IO transmission
            or performaing CPU intense jobs (performing better with cancellation), please try the IAsyncPlugin interface

```csharp
public interface IPlugin : IAsyncPlugin
```

Implements [IAsyncPlugin](./flow.launcher.plugin.iasyncplugin.md)

## Methods

### **Query(Query)**

Querying when user's search changes
 
            This method will be called within a Task.Run,
            so please avoid synchrously wait for long.

```csharp
List<Result> Query(Query query)
```

#### Parameters

`query` [Query](./flow.launcher.plugin.query.md)<br>
Query to search

#### Returns

[List&lt;Result&gt;](https://docs.microsoft.com/en-us/dotnet/api/system.collections.generic.list-1)<br>

### **Init(PluginInitContext)**

Initialize plugin

```csharp
void Init(PluginInitContext context)
```

#### Parameters

`context` [PluginInitContext](./flow.launcher.plugin.plugininitcontext.md)<br>
