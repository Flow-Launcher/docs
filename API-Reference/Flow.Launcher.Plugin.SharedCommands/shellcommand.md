# ShellCommand

Namespace: Flow.Launcher.Plugin.SharedCommands



```csharp
public static class ShellCommand
```

Inheritance [Object](https://docs.microsoft.com/en-us/dotnet/api/system.object) → [ShellCommand](shellcommand.md)

## Methods

### **RunAsDifferentUser(ProcessStartInfo)**



```csharp
public static Process RunAsDifferentUser(ProcessStartInfo processStartInfo)
```

#### Parameters

`processStartInfo` ProcessStartInfo<br>

#### Returns

Process<br>

### **SetProcessStartInfo(String, String, String, String)**



```csharp
public static ProcessStartInfo SetProcessStartInfo(string fileName, string workingDirectory, string arguments, string verb)
```

#### Parameters

`fileName` [String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>

`workingDirectory` [String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>

`arguments` [String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>

`verb` [String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>

#### Returns

ProcessStartInfo<br>
