## How to develop C#/F# plugins

Flow is written in C#, so plugins written in C#/F# can be directly communicated with Flow without extra protocal.

### Initialization

We recommand you to use the [dotnet template](https://github.com/Flow-Launcher/dotnet-template) to generate a plugin template first.

In order to be recongized as a Flow DotNet plugin, the directory need to have at least two files
1. `plugin.json`
2. A C#/F# class that implement `IPlugin`or `IAsyncPlugin`(Add refrence [Flow.Launcher.Plugin](https://www.nuget.org/packages/Flow.Launcher.Plugin/) by Nuget). The plugin template will add the reference and create  a`Main.cs` that implement `IPlugin`.

### IPlugin/IAsyncPlugin

The `Main`class that implement `IPlugin`or `IAsyncPlugin`will handle the query search with Flow.

**IPlugin** interface contains two required method
1. `void Init(PluginInitContext context)`
    - [PluginInitContext](https://github.com/Flow-Launcher/Flow.Launcher/blob/master/Flow.Launcher.Plugin/PluginInitContext.cs) exposes some API from Flow and an metadata object for your plugin. 
    - `Init`method will be invoked before the invocation of `Query`, so you can do some preparation here. 
    - We recommand you to do expensive paration in `Init`instead of Object Constructor because `Init`method will be executed in parallel with other plugin.
2. `List<Result> Query(Query query)`
    - `Query`will be invoked when user activate this plugin with specific ActionKeyword.
    - A `List`of `Result`object should be returned.
 
 **IAsyncPlugin** is the async version of **IPlugin**
 - Instead of implmenting `Init` and `Query`, you will need to implement `InitAsync`and `QueryAsync`, which use `Task`,`Task<List<Result>` as return value to allow  using `async/await`strategy
 - `QueryAsync` provides a `CancellationToken token` to allow you to check whether user has typed a new query.
 
### Additional Interface

Besides the basic implementation of **IPlugin/IAsyncPlugin**, plugins can also implement a series of interface that belongs to **IFeatures** to control more communication with Flow. 

**Remarks**: We requires you to implement these interfaces in the same class that implement **IPlugin/IAsyncPlugin**.

#### IContextMenu

```csharp
public interface IContextMenu : IFeatures
{
    List<Result> LoadContextMenus(Result selectedResult);
}
```

`LoadContextMenus` will be invoked when users expand the context menu of a specific Result. 
The return value of `LoadContextMenus` is similar to Results from`Query/QueryAsync`.

#### IReloadable/IAsyncReloadable

```csharp
public interface IReloadable : IFeatures
{
    void ReloadData();
}

public interface IAsyncReloadable : IFeatures
{
    Task ReloadDataAsync();
}
```

`ReloadData/ReloadDataAsync` will be invoked when users click the `Reload Plugin Data` command from _sys_ plugin. Generally, it is used to reload some cache (such as the programs information cached in _Program_ plugin).

#### IPluginI18n

```csharp
public interface IPluginI18n : IFeatures
{
    string GetTranslatedPluginTitle();

    string GetTranslatedPluginDescription();
}
```

**IPluginI18n** means the plugins has been internationalized. Therefore, Flow will load the additional lauguage resources from `/Language` when loading the plugin.
By implementing this interface with additional language files, Flow will be able to load localized language resources. You will able to get the translated text with `IPublicAPI.GetTranslation(string key)`.

##### Language Resource

A Language Resource file will have name of the specific Language Code with suffix `.xaml`. The information of the Language Code can be found here [AvailableLanguages.cs](https://github.com/Flow-Launcher/Flow.Launcher/blob/dev/Flow.Launcher.Core/Resource/AvailableLanguages.cs).
The Language Resource file will need to be a list of **key/value** set. Follow the examples found [here](https://github.com/Flow-Launcher/Flow.Launcher/blob/dev/Flow.Launcher/Languages/en.xaml).

##### Remark

Plugins are required to implement **IPublicI18n** to let Flow loads Language resources.

#### IResultUpdated

```csharp
public interface IResultUpdated : IFeatures
{
    event ResultUpdatedEventHandler ResultsUpdated;
}
```

Implementing **IResultUpdated** provides a way to early update part of the results when you have long running query. This is generally used when plugins want to return some local results earlier than remote results.

To early invoke a result to Flow, you will need to invoke `ResultUpdated` event with an `ResultUpdatedEventArgs`, which includes the current `Query` object and the List of `Result` objects similar to the return value in `Query(Async)`.

Follow the examples found [here](https://github.com/Flow-Launcher/plugin-samples/tree/master/HelloWorldCSharp) 

