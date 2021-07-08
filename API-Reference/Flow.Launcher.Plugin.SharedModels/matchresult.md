# MatchResult

Namespace: Flow.Launcher.Plugin.SharedModels



```csharp
public class MatchResult
```

Inheritance [Object](https://docs.microsoft.com/en-us/dotnet/api/system.object) → [MatchResult](matchresult.md)

## Properties

### **Success**



```csharp
public bool Success { get; set; }
```

#### Property Value

[Boolean](https://docs.microsoft.com/en-us/dotnet/api/system.boolean)<br>

### **Score**

The final score of the match result with search precision filters applied.

```csharp
public int Score { get; private set; }
```

#### Property Value

[Int32](https://docs.microsoft.com/en-us/dotnet/api/system.int32)<br>

### **RawScore**



```csharp
public int RawScore { get; set; }
```

#### Property Value

[Int32](https://docs.microsoft.com/en-us/dotnet/api/system.int32)<br>

### **MatchData**

Matched data to highlight.

```csharp
public List<int> MatchData { get; set; }
```

#### Property Value

[List&lt;Int32&gt;](https://docs.microsoft.com/en-us/dotnet/api/system.collections.generic.list-1)<br>

### **SearchPrecision**



```csharp
public SearchPrecisionScore SearchPrecision { get; set; }
```

#### Property Value

[SearchPrecisionScore](sharedmodels.searchprecisionscore.md)<br>

## Constructors

### **MatchResult(Boolean, SearchPrecisionScore)**



```csharp
public MatchResult(bool success, SearchPrecisionScore searchPrecision)
```

#### Parameters

`success` [Boolean](https://docs.microsoft.com/en-us/dotnet/api/system.boolean)<br>

`searchPrecision` [SearchPrecisionScore](sharedmodels.searchprecisionscore.md)<br>

### **MatchResult(Boolean, SearchPrecisionScore, List&lt;Int32&gt;, Int32)**



```csharp
public MatchResult(bool success, SearchPrecisionScore searchPrecision, List<int> matchData, int rawScore)
```

#### Parameters

`success` [Boolean](https://docs.microsoft.com/en-us/dotnet/api/system.boolean)<br>

`searchPrecision` [SearchPrecisionScore](sharedmodels.searchprecisionscore.md)<br>

`matchData` [List&lt;Int32&gt;](https://docs.microsoft.com/en-us/dotnet/api/system.collections.generic.list-1)<br>

`rawScore` [Int32](https://docs.microsoft.com/en-us/dotnet/api/system.int32)<br>

## Methods

### **IsSearchPrecisionScoreMet()**



```csharp
public bool IsSearchPrecisionScoreMet()
```

#### Returns

[Boolean](https://docs.microsoft.com/en-us/dotnet/api/system.boolean)<br>
