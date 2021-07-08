# ISavable

Namespace: Flow.Launcher.Plugin

Save addtional plugin data. Inherit this interface if additional data e.g. cache needs to be saved,
 Otherwise if LoadSettingJsonStorage or SaveSettingJsonStorage has been callded,
 plugin settings will be automatically saved (see Flow.Launcher/PublicAPIInstance.SavePluginSettings) by Flow

```csharp
public interface ISavable
```

## Methods

### **Save()**



```csharp
void Save()
```
