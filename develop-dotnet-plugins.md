# DotNet plugins Development Guide

Flow is written in C#, so plugins written in dotnet platform can directly communicate with Flow without extra protocols.

## Initialization

For C# Plugins, We recommand you use the [dotnet template](https://github.com/Flow-Launcher/dotnet-template) to generate a plugin template.

In order to be recongized as a Flow DotNet plugin, the directory needs to have at least two files
1. [`plugin.json`](plugin.json.md)
2. A Dotnet Assembly that implements **[IPlugin](API-Reference/Flow.Launcher.Plugin/iplugin.md)** or **[IAsyncPlugin](API-Reference/Flow.Launcher.Plugin/iasyncplugin.md)** (remember to refrence [Flow.Launcher.Plugin](https://www.nuget.org/packages/Flow.Launcher.Plugin/) by Nuget). The plugin template will add the reference and create  a `Main.cs` that implements `IPlugin`.

Find our API Reference [here](API-Reference/)


A sample CSharp Plugin [here](https://github.com/Flow-Launcher/plugin-samples) 

## IPlugin/IAsyncPlugin

The `Main`class that implements **[IPlugin](API-Reference/Flow.Launcher.Plugin/iplugin.md)** or **[IAsyncPlugin](API-Reference/Flow.Launcher.Plugin/iasyncplugin.md)** will handle the query search with Flow.

**[IPlugin](API-Reference/Flow.Launcher.Plugin/iplugin.md)** interface contains two required methods:
1. `void Init(PluginInitContext context)`
    - [PluginInitContext](https://github.com/Flow-Launcher/Flow.Launcher/blob/master/API-Reference/Flow.Launcher.Plugin/PluginInitContext.cs) exposes some API from Flow and an metadata object for your plugin. 
    - It will be invoked before the invocation of `Query`, so you can do some preparation here. 
    - We recommand you do expensive operations in this method instead of Object Constructor because this method will be executed in parallel with other plugins.
2. `List<Result> Query(Query query)`
    - `Query` will be invoked when user activate this plugin with specific ActionKeyword.
    - A `List` of [Result](/API-Reference/Flow.Launcher.Plugin/result.md) object should be returned.
 
 **[IAsyncPlugin](API-Reference/Flow.Launcher.Plugin/iasyncplugin.md)** is the async version of **[IPlugin](API-Reference/Flow.Launcher.Plugin/iplugin.md)**
 - Instead of implmenting `Init` and `Query`, you will need to implement `InitAsync`and `QueryAsync`, which use `Task`,`Task<List<Result>` as return value to allow  using `async/await` strategy
 - `QueryAsync` provides a `CancellationToken token` to allow you to check whether user has typed a new query.


## Additional Interface

Besides the basic implementation of **IPlugin/IAsyncPlugin**, plugins can also implement a series of interfaces that belongs to **IFeatures** to control more communication with Flow. 

**Remarks**: You should implement these interfaces in the same class that implements **IPlugin/IAsyncPlugin**.

### [IContextMenu](API-Reference/Flow.Launcher.Plugin/icontextmenu.md)

`LoadContextMenus` will be invoked when users expand the context menu of a specific Result. 
The return value of `LoadContextMenus` is similar to Results from `Query/QueryAsync`.

### [IReloadable](API-Reference/Flow.Launcher.Plugin/ireloadable.md)/[IAsyncReloadable](API-Reference/Flow.Launcher.Plugin/iasyncreloadable.md)

`ReloadData/ReloadDataAsync` will be invoked when users click the `Reload Plugin Data` command from _sys_ plugin. Generally, it is used to reload some cache (such as the programs information cached in _Program_ plugin).

### [IPluginI18n](/API-Reference/Flow.Launcher.Plugin/iplugini18n.md)

**IPluginI18n** means the plugin has been internationalized. Therefore, Flow will load the additional lauguage resources from `/Languages` when loading the plugin.
By implementing this interface with additional language files, Flow will be able to load plugin-sepcified localized language resources. You will be able to get the translated text with `IPublicAPI.GetTranslation(string key)`.

#### Language Resource

A Language Resource file will have name of the specific Language Code with suffix `.xaml`. The information of the Language Code can be found here [AvailableLanguages.cs](https://github.com/Flow-Launcher/Flow.Launcher/blob/dev/Flow.Launcher.Core/Resource/AvailableLanguages.cs).
The Language Resource file will need to be a list of **key/value** pair. Follow the examples found [here](https://github.com/Flow-Launcher/Flow.Launcher/blob/dev/Flow.Launcher/Languages/en.xaml).

#### Remark

Plugins are required to implement **IPublicI18n** to let Flow load Language resources.
 
### [IResultUpdated](API-Reference/Flow.Launcher.Plugin/iresultupdated.md)


Implementing **IResultUpdated** provides a way to return part of the query results early. This is generally useful for plugins with long running queries.

To early return a result to Flow, you will need to invoke `ResultUpdated` event with an `ResultUpdatedEventArgs`, which includes the current `Query` object and the List of `Result` objects similar to the return value in `Query(Async)`.

### [IDisposable](https://docs.microsoft.com/en-us/dotnet/api/system.idisposable) *Flow 1.8.0 or higher*

Implementing **IDisposable** to dispose unmanaged resource in the plugin. `Dispose()` will be called when Flow exit.