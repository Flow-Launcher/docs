# Result class

Describes a result of a [`Query`](./Query.md) executed by a plugin

```csharp
public class Result
```

## Public Members

| name | description |
| --- | --- |
| [Result](Result/Result.md)() | The default constructor. |
| [Action](Result/Action.md) { get; set; } | An action to take in the form of a function call when the result has been selected. |
| [ActionKeywordAssigned](Result/ActionKeywordAssigned.md) { get; set; } | This holds the action keyword that triggered the result. If result is triggered by global keyword: *, this should be empty. |
| [AddSelectedCount](Result/AddSelectedCount.md) { get; set; } | Determines if the user selection count should be added to the score. This can be useful when set to false to allow the result sequence order to be the same everytime instead of changing based on selection. |
| [AsyncAction](Result/AsyncAction.md) { get; set; } | An async action to take in the form of a function call when the result has been selected. |
| [AutoCompleteText](Result/AutoCompleteText.md) { get; set; } | This holds the text which can be provided by plugin to help Flow autocomplete text for user on the plugin result. If autocomplete action for example is tab, pressing tab will have the default constructed autocomplete text (result's Title), or the text provided here if not empty. |
| [BadgeIcoPath](Result/BadgeIcoPath.md) { get; set; } | The image to be displayed for the badge of the result. |
| [ContextData](Result/ContextData.md) { get; set; } | Additional data associated with this result |
| [CopyText](Result/CopyText.md) { get; set; } | This holds the text which can be provided by plugin to be copied to the user's clipboard when Ctrl + C is pressed on a result. If the text is a file/directory path flow will copy the actual file/folder instead of just the path text. |
| [Glyph](Result/Glyph.md) { get; set; } | Information for Glyph Icon (Prioritized than IcoPath/Icon if user enable Glyph Icons) |
| [IcoPath](Result/IcoPath.md) { get; set; } | The image to be displayed for the result. |
| [PluginDirectory](Result/PluginDirectory.md) { get; set; } | Plugin directory |
| [PluginID](Result/PluginID.md) { get; } | Plugin ID that generated this result |
| [Preview](Result/Preview.md) { get; set; } | Contains data used to populate the preview section of this result. |
| [PreviewPanel](Result/PreviewPanel.md) { get; set; } | Customized Preview Panel |
| [ProgressBar](Result/ProgressBar.md) { get; set; } | Progress bar display. Providing an int value between 0-100 will trigger the progress bar to be displayed on the result |
| [ProgressBarColor](Result/ProgressBarColor.md) { get; set; } | Optionally set the color of the progress bar |
| [QuerySuggestionText](Result/QuerySuggestionText.md) { get; set; } | This holds the text which can be shown as a query suggestion. |
| [RecordKey](Result/RecordKey.md) { get; set; } | The key to identify the record. This is used when FL checks whether the result is the topmost record. Or FL calculates the hashcode of the result for user selected records. This can be useful when your plugin will change the Title or SubTitle of the result dynamically. If the plugin does not specific this, FL just uses Title and SubTitle to identify this result. Note: Because old data does not have this key, we should use null as the default value for consistency. |
| [RoundedIcon](Result/RoundedIcon.md) { get; set; } | Determines if Icon has a border radius |
| [Score](Result/Score.md) { get; set; } | Priority of the current result |
| [ShowBadge](Result/ShowBadge.md) { get; set; } | Determines if the badge icon should be shown. If users want to show the result badges and here you set this to true, the results will show the badge icon. |
| [SubTitle](Result/SubTitle.md) { get; set; } | Provides additional details for the result. This is optional |
| [SubTitleToolTip](Result/SubTitleToolTip.md) { get; set; } | Show message as ToolTip on result SubTitle hover over |
| [Title](Result/Title.md) { get; set; } | The title of the result. This is always required. |
| [TitleHighlightData](Result/TitleHighlightData.md) { get; set; } | A list of indexes for the characters to be highlighted in Title |
| [TitleToolTip](Result/TitleToolTip.md) { get; set; } | Show message as ToolTip on result Title hover over |
| [BadgeIcon](Result/BadgeIcon.md) | Delegate to load an icon for the badge of this result. |
| [Icon](Result/Icon.md) | Delegate to load an icon for this result. |
| [Clone](Result/Clone.md)() | Clones the current result |
| [ExecuteAsync](Result/ExecuteAsync.md)(…) | Run this result, asynchronously |
| override [ToString](Result/ToString.md)() |  |
| const [MaxScore](Result/MaxScore.md) | Maximum score. This can be useful when set one result to the top by default. This is the score for the results set to the topmost by users. |
| delegate [IconDelegate](Result.IconDelegate.md) | Delegate function that produces an ImageSource |
| record [PreviewInfo](Result.PreviewInfo.md) | Info of the preview section of a [`Result`](./Result.md) |

## See Also

* namespace [Flow.Launcher.Plugin](../Flow.Launcher.Plugin.md)

<!-- DO NOT EDIT: generated by xmldocmd for Flow.Launcher.Plugin.dll -->
