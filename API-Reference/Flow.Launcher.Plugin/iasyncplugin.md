# IAsyncPlugin

Namespace: Flow.Launcher.Plugin

Asynchronous Plugin Model for Flow Launcher

```csharp
public interface IAsyncPlugin
```

## Methods

### **QueryAsync(Query, CancellationToken)**

Asynchronous Querying

```csharp
Task<List<Result>> QueryAsync(Query query, CancellationToken token)
```

#### Parameters

`query` [Query](query.md)<br>
Query to search

`token` [CancellationToken](https://docs.microsoft.com/en-us/dotnet/api/system.threading.cancellationtoken)<br>
Cancel when querying job is obsolete

#### Returns

[Task&lt;List&lt;Result&gt;&gt;](https://docs.microsoft.com/en-us/dotnet/api/system.threading.tasks.task-1)<br>

### **InitAsync(PluginInitContext)**

Initialize plugin asynchrously (will still wait finish to continue)

```csharp
Task InitAsync(PluginInitContext context)
```

#### Parameters

`context` [PluginInitContext](plugininitcontext.md)<br>

#### Returns

[Task](https://docs.microsoft.com/en-us/dotnet/api/system.threading.tasks.task)<br>
