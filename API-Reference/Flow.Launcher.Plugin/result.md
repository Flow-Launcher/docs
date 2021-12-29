# Result

Namespace: Flow.Launcher.Plugin



```csharp
public class Result
```

Inheritance [Object](https://docs.microsoft.com/en-us/dotnet/api/system.object) → [Result](result.md)

## Fields

### **Icon**

Delegate version of IcoPath. You can use either Icon or IcoPath to display image for the result.

```csharp
public IconDelegate Icon;
```

## Properties

### **Title**

Provides the title of the result. This is always required.

```csharp
public string Title { get; set; }
```

#### Property Value

[String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>

### **SubTitle**

Provides additional details for the result. This is optional

```csharp
public string SubTitle { get; set; }
```

#### Property Value

[String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>

### **ActionKeywordAssigned**

This holds the action keyword that triggered the result. 
 If result is triggered by global keyword: *, this should be empty.

```csharp
public string ActionKeywordAssigned { get; set; }
```

#### Property Value

[String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>

### **IcoPath**

Relative Path (plugin directory) to the Image displayed for the current Result.

```csharp
public string IcoPath { get; set; }
```

#### Property Value

[String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>

### **Action**

return true to hide flowlauncher after select result

```csharp
public Func<ActionContext, bool> Action { get; set; }
```

#### Property Value

[Func&lt;ActionContext, Boolean&gt;](https://docs.microsoft.com/en-us/dotnet/api/system.func-2)<br>

### **Score**

An int value showing the priority of the current result. It can be used to sort multiple results.

```csharp
public int Score { get; set; }
```

#### Property Value

[Int32](https://docs.microsoft.com/en-us/dotnet/api/system.int32)<br>

### **TitleHighlightData**

A list of indexes for the characters to be highlighted in Title

```csharp
public IList<int> TitleHighlightData { get; set; }
```

#### Property Value

[IList&lt;Int32&gt;](https://docs.microsoft.com/en-us/dotnet/api/system.collections.generic.ilist-1)<br>

### **AutoCompleteText**
Full text display in the query window when autocomplete is triggered

```csharp
public string AutoCompleteText { get; set; }
```

#### Property Value

[String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>

### **PluginDirectory**

Plugin directory

```csharp
public string PluginDirectory { get; set; }
```

#### Property Value

[String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>

### **ContextData**

Additional data associate with this result

```csharp
public object ContextData { get; set; }
```

#### Property Value

[Object](https://docs.microsoft.com/en-us/dotnet/api/system.object)<br>

### **PluginID**

Plugin ID that generated this result

```csharp
public string PluginID { get; internal set; }
```

#### Property Value

[String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>

### **TitleToolTip**

Show message as ToolTip on result Title hover over

```csharp
public string TitleToolTip { get; set; }
```

#### Property Value

[String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>

### **SubTitleToolTip**

Show message as ToolTip on result SubTitle hover over

```csharp
public string SubTitleToolTip { get; set; }
```

#### Property Value

[String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>

## Constructors

### **Result()**



```csharp
public Result()
```

## Methods

### **Equals(Object)**



```csharp
public bool Equals(object obj)
```

#### Parameters

`obj` [Object](https://docs.microsoft.com/en-us/dotnet/api/system.object)<br>

#### Returns

[Boolean](https://docs.microsoft.com/en-us/dotnet/api/system.boolean)<br>

### **GetHashCode()**



```csharp
public int GetHashCode()
```

#### Returns

[Int32](https://docs.microsoft.com/en-us/dotnet/api/system.int32)<br>

### **ToString()**



```csharp
public string ToString()
```

#### Returns

[String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>
