## Custom File Manager
If you want to use a file manager other than the default Windows File Explorer, you need to set it under Settings > General > Custom File Manager. The default values for each file manager are listed below.

%d represents the directory path, and %f is the argument used when opening a file. -select is an option supported by some file managers that allows the selected file to be highlighted or scrolled into view when opening its location.

### Files
docs: https://files.community/docs/contributing/updates
```
Path : Files or Files-stable
Arg For Folder : "%d"
Arg For File : -select "%f"
```

### Directory Opus
docs: https://www.gpsoft.com.au/help/opus11/index.html#!Documents/Go1.htm
```
Path : (installed path)dopusrt.exe
Arg For Folder : /cmd Go "%d" NEW
Arg For File : /cmd Go "%f" NEW
```

### Total Commander
docs: https://www.ghisler.ch/wiki/index.php/Command_line_parameters
```
Path : (installed path)TOTALCMD64.exe
Arg For Folder : /O /A /S /T "%d"
Arg For File : /O /A /S /T "%f"
```