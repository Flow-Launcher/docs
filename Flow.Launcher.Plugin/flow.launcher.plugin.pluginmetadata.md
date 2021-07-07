# PluginMetadata

Namespace: Flow.Launcher.Plugin



```csharp
public class PluginMetadata : BaseModel, System.ComponentModel.INotifyPropertyChanged
```

Inheritance [Object](https://docs.microsoft.com/en-us/dotnet/api/system.object) → [BaseModel](./flow.launcher.plugin.basemodel.md) → [PluginMetadata](./flow.launcher.plugin.pluginmetadata.md)<br>
Implements INotifyPropertyChanged

## Properties

### **ID**



```csharp
public string ID { get; set; }
```

#### Property Value

[String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>

### **Name**



```csharp
public string Name { get; set; }
```

#### Property Value

[String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>

### **Author**



```csharp
public string Author { get; set; }
```

#### Property Value

[String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>

### **Version**



```csharp
public string Version { get; set; }
```

#### Property Value

[String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>

### **Language**



```csharp
public string Language { get; set; }
```

#### Property Value

[String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>

### **Description**



```csharp
public string Description { get; set; }
```

#### Property Value

[String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>

### **Website**



```csharp
public string Website { get; set; }
```

#### Property Value

[String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>

### **Disabled**



```csharp
public bool Disabled { get; set; }
```

#### Property Value

[Boolean](https://docs.microsoft.com/en-us/dotnet/api/system.boolean)<br>

### **ExecuteFilePath**



```csharp
public string ExecuteFilePath { get; private set; }
```

#### Property Value

[String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>

### **ExecuteFileName**



```csharp
public string ExecuteFileName { get; set; }
```

#### Property Value

[String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>

### **PluginDirectory**



```csharp
public string PluginDirectory { get; internal set; }
```

#### Property Value

[String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>

### **ActionKeyword**



```csharp
public string ActionKeyword { get; set; }
```

#### Property Value

[String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>

### **ActionKeywords**



```csharp
public List<string> ActionKeywords { get; set; }
```

#### Property Value

[List&lt;String&gt;](https://docs.microsoft.com/en-us/dotnet/api/system.collections.generic.list-1)<br>

### **IcoPath**



```csharp
public string IcoPath { get; set; }
```

#### Property Value

[String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>

### **Priority**



```csharp
public int Priority { get; set; }
```

#### Property Value

[Int32](https://docs.microsoft.com/en-us/dotnet/api/system.int32)<br>

### **InitTime**

Init time include both plugin load time and init time

```csharp
public long InitTime { get; set; }
```

#### Property Value

[Int64](https://docs.microsoft.com/en-us/dotnet/api/system.int64)<br>

### **AvgQueryTime**



```csharp
public long AvgQueryTime { get; set; }
```

#### Property Value

[Int64](https://docs.microsoft.com/en-us/dotnet/api/system.int64)<br>

### **QueryCount**



```csharp
public int QueryCount { get; set; }
```

#### Property Value

[Int32](https://docs.microsoft.com/en-us/dotnet/api/system.int32)<br>

## Constructors

### **PluginMetadata()**



```csharp
public PluginMetadata()
```

## Methods

### **ToString()**



```csharp
public string ToString()
```

#### Returns

[String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>

## Events

### **PropertyChanged**



```csharp
public event PropertyChangedEventHandler PropertyChanged;
```
