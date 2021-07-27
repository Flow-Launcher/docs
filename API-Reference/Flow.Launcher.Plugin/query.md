# Query

Namespace: Flow.Launcher.Plugin



```csharp
public class Query
```

Inheritance [Object](https://docs.microsoft.com/en-us/dotnet/api/system.object) → [Query](query.md)

## Fields

### **TermSeperater**

Query can be splited into multiple terms by whitespace

```csharp
public static string TermSeperater;
```

### **ActionKeywordSeperater**

User can set multiple action keywords seperated by ';'

```csharp
public static string ActionKeywordSeperater;
```

### **GlobalPluginWildcardSign**

'*' is used for System Plugin

```csharp
public static string GlobalPluginWildcardSign;
```

## Properties

### **RawQuery**

Raw query, this includes action keyword if it has
 We didn't recommend use this property directly. You should always use Search property.

```csharp
public string RawQuery { get; internal set; }
```

#### Property Value

[String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>

### **Search**

Search part of a query.
 This will not include action keyword if exclusive plugin gets it, otherwise it should be same as RawQuery.
 Since we allow user to switch a exclusive plugin to generic plugin, 
 so this property will always give you the "real" query part of the query

```csharp
public string Search { get; internal set; }
```

#### Property Value

[String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>

### **Terms**

The raw query splited into a string array.

```csharp
public String[] Terms { get; set; }
```

#### Property Value

[String[]](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>

### **ActionKeyword**



```csharp
public string ActionKeyword { get; set; }
```

#### Property Value

[String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>

### **FirstSearch**

Return first search split by space if it has

```csharp
public string FirstSearch { get; }
```

#### Property Value

[String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>

### **SecondToEndSearch**

strings from second search (including) to last search

```csharp
public string SecondToEndSearch { get; }
```

#### Property Value

[String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>

### **SecondSearch**

Return second search split by space if it has

```csharp
public string SecondSearch { get; }
```

#### Property Value

[String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>

### **ThirdSearch**

Return third search split by space if it has

```csharp
public string ThirdSearch { get; }
```

#### Property Value

[String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>

## Constructors

### **Query()**



```csharp
public Query()
```

### **Query(String, String, String[], String)**

to allow unit tests for plug ins

```csharp
public Query(string rawQuery, string search, String[] terms, string actionKeyword)
```

#### Parameters

`rawQuery` [String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>

`search` [String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>

`terms` [String[]](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>

`actionKeyword` [String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>

## Methods

### **ToString()**



```csharp
public string ToString()
```

#### Returns

[String](https://docs.microsoft.com/en-us/dotnet/api/system.string)<br>
