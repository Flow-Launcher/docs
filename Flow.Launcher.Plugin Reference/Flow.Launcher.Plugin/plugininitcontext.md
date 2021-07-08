# PluginInitContext

Namespace: Flow.Launcher.Plugin



```csharp
public class PluginInitContext
```

Inheritance [Object](https://docs.microsoft.com/en-us/dotnet/api/system.object) → [PluginInitContext](plugininitcontext.md)

## Properties

### **CurrentPluginMetadata**



```csharp
public PluginMetadata CurrentPluginMetadata { get; internal set; }
```

#### Property Value

[PluginMetadata](pluginmetadata.md)<br>

### **API**

Public APIs for plugin invocation

```csharp
public IPublicAPI API { get; set; }
```

#### Property Value

[IPublicAPI](ipublicapi.md)<br>

## Constructors

### **PluginInitContext()**



```csharp
public PluginInitContext()
```

### **PluginInitContext(PluginMetadata, IPublicAPI)**



```csharp
public PluginInitContext(PluginMetadata currentPluginMetadata, IPublicAPI api)
```

#### Parameters

`currentPluginMetadata` [PluginMetadata](pluginmetadata.md)<br>

`api` [IPublicAPI](ipublicapi.md)<br>
