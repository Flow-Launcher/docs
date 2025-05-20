## Overview

If you make a theme for the first time, refer to the existing theme. Copy the **sublime.xaml** (This is one of the basic theme files.) in the theme folder of Flow and make it a new file.  Or you can download it here.

[sublime.xaml]: https://github.com/Flow-Launcher/Flow.Launcher/blob/dev/Flow.Launcher/Themes/Sublime.xaml

## ⛔ Caution ⛔

Place the theme you created in the Theme folder inside the UserData directory, for roaming this is located at `%APPDATA%\FlowLauncher\Themes\` (AppData Roaming path) and for portable it is by default `%localappdata%\FlowLauncher\app-<VersionOfYourFlowLauncher>\UserData\Themes\` (AppData Local path). Flow will read from the UserData directory for custom themes and its own app directory for default themes. Make sure you do not place in the location outside UserData because it will be erased along with the default theme files after an update.

## Theme elements

The theme file allows you to set the following parts. Each style has a key, and there are items that can be modified. If theme has a key not described in this document, we recommend you not to modify it separately.

(*There is a possibility of changing/deleting this part depending on the version.*)

![Flow Launcher screenshot](https://cdn.jsdelivr.net/gh/Flow-Launcher/docs@main/assets/themelayout.png)

### WindowBorderStyle

In this item, you can set the color, border size, border color, and corner radius of the basic window.

```xml
<Style x:Key="WindowBorderStyle" BasedOn="{StaticResource BaseWindowBorderStyle}" TargetType="{x:Type Border}">
        <Setter Property="BorderThickness" Value="2" />
        <Setter Property="BorderBrush" Value="#6c7279" /> 
        <Setter Property="CornerRadius" Value="5" />
        <Setter Property="Background" Value="#303840" />
 </Style>
```

Window border thickness is recommended from 1 or 2. Recommended corner radius is 0, 5 or less.

<br>

### QueryBoxStyle

This is the style of the basic search window. You can set the font size, color of cursor, font color, input window height. If the font size is reduced, the height of the window is also reduced, so the height must be specified.

```xml
<Style x:Key="QueryBoxStyle" BasedOn="{StaticResource BaseQueryBoxStyle}" TargetType="{x:Type TextBox}">
        <Setter Property="FontSize" Value="24" />
        <Setter Property="Background" Value="#303840" />  <!-- Set it to the same color as the window. -->
        <Setter Property="Foreground" Value="#d2d8e5" /> <!-- Font Color -->
        <Setter Property="CaretBrush" Value="#FFAA47" /> <!-- Cursor Color -->
        <Setter Property="FontSize" Value="26" />
        <Setter Property="Height" Value="42" /> <!-- Default is 42. -->
</Style>
``` 

<br>

### QuerySuggestionBoxStyle

This is the style of the recommended search word that appears after the search word. The font size & Height should be the same as the QueryBoxStyle, and a more translucent color is recommended.

```xml
<Style x:Key="QuerySuggestionBoxStyle" BasedOn="{StaticResource BaseQuerySuggestionBoxStyle}" TargetType="{x:Type TextBox}">
        <Setter Property="Background" Value="#303840" />
        <Setter Property="Foreground" Value="#798189" /> <!-- Font Color -->
        <Setter Property="FontSize" Value="26" /> <!-- Same as QueryBox -->
        <Setter Property="Height" Value="42" /> <!-- Same as QueryBox -->
</Style>
```

<br>

### PendingLineStyle

It is possible to set the color of the loading bar that is sometimes displayed.

```xml
<Style x:Key="PendingLineStyle" BasedOn="{StaticResource BasePendingLineStyle}" TargetType="{x:Type Line}">
        <Setter Property="Stroke" Value="#FFAA47" /> <!-- Bar Color -->
</Style>
```

<br>

### SearchIconStyle

This is the style of the magnifying glass icon displayed on the right side of the search window. Color & Size can be changed or hidden. (The picture change will be updated later.)

```xml
<Style x:Key="SearchIconStyle" TargetType="{x:Type Path}" BasedOn="{StaticResource BaseSearchIconStyle}">
        <Setter Property="Fill" Value="#3c454e" /> <!-- Color -->
        <Setter Property="Width" Value="32" /> <!-- Size. Default is 32. -->
        <Setter Property="Height" Value="32" /> <!-- Size -->
</Style>
```

If you want to hide it, you can add the following code.

```xml
<Setter Property="Visibility" Value="Collapsed" />
```

<br>

### ItemTitleStyle

This is the title part of the search result. The font size and color can be adjusted.

```xml
<Style x:Key="ItemTitleStyle"  BasedOn="{StaticResource BaseItemTitleStyle}" TargetType="{x:Type TextBlock}">
	<Setter Property="Foreground" Value="#5989b2" /> 
	<Setter Property="FontSize" Value="13" /> <!-- Default is 16 -->
</Style>
```

<br>

### ItemTitleSelectedStyle

You can specify a color that changes when the item is focused. The font size should be the same as ItemTitleStyle.

```xml
<Style x:Key="ItemTitleSelectedStyle" BasedOn="{StaticResource BaseItemTitleSelectedStyle}"  TargetType="{x:Type TextBlock}" >
        <Setter Property="Foreground" Value="#5bafb0" />
</Style>
```

<br>

### ItemSubTitleStyle

This is the filepath part of the search result. The font size and color can be adjusted.

```xml
<Style x:Key="ItemSubTitleStyle" BasedOn="{StaticResource BaseItemSubTitleStyle}" TargetType="{x:Type TextBlock}" >
        <Setter Property="Foreground" Value="#7b858f" />
        <Setter Property="FontSize" Value="13" /> <!-- Default is 13 -->
</Style>
```

<br>

### ItemSubTitleSelectedStyle

You can specify a color that changes when the item is focused. The font size should be the same as ItemSubTitleStyle.

```xml
<Style x:Key="ItemSubTitleSelectedStyle" BasedOn="{StaticResource BaseItemSubTitleSelectedStyle}" TargetType="{x:Type TextBlock}" >
        <Setter Property="Cursor" Value="Arrow" />
        <Setter Property="Foreground" Value="#cc8ec8" />
</Style>
```    

<br>

### ItemHotkeyStyle

Specifies the color and size of the Hotkey font.

```xml
<Style x:Key="ItemHotkeyStyle" TargetType="{x:Type TextBlock}">
        <Setter Property="FontSize" Value="13" />
        <Setter Property="Foreground" Value="#5bafb0" />
</Style>
```

<br>

### ItemHotkeySelectedStyle

You can specify a color that changes when the item is focused. The font size should be the same as `ItemHotkeyStyle`.

```xml
<Style x:Key="ItemHotkeySelectedStyle" TargetType="{x:Type TextBlock}">
        <Setter Property="FontSize" Value="13" />
        <Setter Property="Foreground" Value="#ea7354" />
</Style>
```    

<br>

### ItemSelectedBackgroundColor

This is the background color emphasized when the item is selected.

```xml
<SolidColorBrush x:Key="ItemSelectedBackgroundColor">#3c454e</SolidColorBrush>
```

<br>

### HighlightStyle

It emphasizes the part where the search word matches the result. Color and Font Weight can be set.

```xml
<Style x:Key="HighlightStyle">
        <Setter Property="Inline.Foreground" Value="#ea7354" />
        <Setter Property="Inline.FontWeight" Value="Bold" />
</Style>
```    

<br>

### ThumbStyle

Specifies the color and size of the scroll bar.

```xml
<Style x:Key="ThumbStyle" BasedOn="{StaticResource BaseThumbStyle}" TargetType="{x:Type Thumb}">
        <Setter Property="SnapsToDevicePixels" Value="True"/>
        <Setter Property="OverridesDefaultStyle" Value="true"/>
        <Setter Property="IsTabStop" Value="false"/>
        <Setter Property="Width" Value="2"/> <!-- Size of Thumb -->
        <Setter Property="Focusable" Value="false"/>
        <Setter Property="Template">
            <Setter.Value>
                <ControlTemplate TargetType="{x:Type Thumb}">
                    <Border CornerRadius="2" DockPanel.Dock="Right" Background="#6c7279" BorderBrush="Transparent" BorderThickness="0" /> <!-- Background is Color of Thumb -->
                </ControlTemplate>
            </Setter.Value>
        </Setter>
    </Style>
```    

<br>

### SeparatorStyle

Set the size, height, color, and margin of the horizontal line. If you don't think you need it, you can get rid of it.

```xml
<Style x:Key="SeparatorStyle" BasedOn="{StaticResource BaseSeparatorStyle}" TargetType="{x:Type Rectangle}">
        <Setter Property="Fill" Value="#3c454e"/>
        <Setter Property="Height" Value="1"/> 
        <Setter Property="Margin" Value="0 0 0 8"/> <!--  It is left, up, right, and down in order. -->
</Style>
```    

If you want to hide it, you can add the following code.

```xml
<Setter Property="Visibility" Value="Collapsed" />
```

<br>

### ItemGlyph

Specifies the color of the glyph icon.

```xml
<Style x:Key="ItemGlyph"  BasedOn="{StaticResource BaseGlyphStyle}" TargetType="{x:Type TextBlock}">
        <Setter Property="Foreground" Value="#5bafb0" />
</Style>
```   

----
### Theme Info
You can add the following theme information at the top of the file: the theme name, whether blur is supported, and whether dark mode is supported. This value is displayed as an icon in Flow's theme list.
```
<!--
    Name: Windows 11
    IsDark: True
    HasBlur: True
-->
```

## How to Make Blur theme
The following values must be added within the theme file.

```
    <system:Boolean x:Key="ThemeBlurEnabled">True</system:Boolean>
    <system:String x:Key="SystemBG">Auto</system:String>
    <Color x:Key="LightBG">#BFFAFAFA</Color>
    <Color x:Key="DarkBG">#DD202020</Color>
```
Set `ThemeBlurEnabled` to `True` for themes that support blur, and False otherwise.
`SystemBG` selects the default window background color drawn by the system when blur is enabled. It can be set to `Light`, `Dark`, or `Auto`.
`Auto` automatically switches between `Light` and `Dark` based on Flow's ColorScheme setting.
`LightBG` is the window color used in `Light` mode, and `DarkBG` is the window color used in `Dark` mode.

When the blur effect is enabled, users cannot disable window shadows, and the window corner radius is determined by the system. In other words, any values specified by the theme designer for these properties will be ignored.

### Blur Effects

Windows 11 users can choose from four types of blur effects, each with the following characteristics:


#### **None**

No blur effect is applied. The window background color is determined in the following order of priority:

1. The `LightBG` or `DarkBG` color with the alpha (transparency) value removed.  
2. If `LightBG`/`DarkBG` is not set, the background color from `WindowBorderStyle` is used.


#### **Acrylic**

1. The system-defined Light/Dark background is applied first.  
2. Then, the colors defined in `LightBG` and `DarkBG` are drawn on top. (Like Tint)
3. The `LightBG` and `DarkBG` values should include some level of alpha (transparency), and the colors should not differ too drastically from the system-applied base color.

In other words, you should avoid specifying background colors that differ too much in tone from the default window colors drawn by Windows.

#### **Mica / Mica Alt**

- The user-defined `LightBG` and `DarkBG` are completely ignored.  
- The background color is automatically determined based on the user's desktop wallpaper.  
- It uses either a Light or Dark variant, selected according to the `SystemBG` setting.

#### 💡 Design Recommendation

Since the window background can change significantly depending on the user's blur settings,  it is **recommended to design Blur themes by adjusting text and element opacity based on black or white colors** to ensure good contrast and readability.
<br>

----

## How to Make Auto Dark Mode theme
- By default, if the SystemBG property is set to Auto and both LightBG and DarkBG color values are specified, the theme will function automatically as intended.
- The colors of control elements for Light and Dark modes should be based on Flow's resource definitions to ensure they switch automatically with the theme. (Currently, these cannot be defined separately within the theme itself.)
Refer to the built-in Windows11 theme as a reference, and check the provided link

- https://github.com/Flow-Launcher/Flow.Launcher/blob/dev/Flow.Launcher/Themes/Win11Light.xaml
- https://github.com/Flow-Launcher/Flow.Launcher/blob/dev/Flow.Launcher/Resources/Light.xaml
- https://github.com/Flow-Launcher/Flow.Launcher/blob/dev/Flow.Launcher/Resources/Dark.xaml
----

## Let's share it!
Once you have crafted your perfect theme, why not share it with the community:

[Theme Gallery](https://github.com/Flow-Launcher/Flow.Launcher/discussions/1438)
