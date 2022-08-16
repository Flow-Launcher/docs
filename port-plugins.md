## Wox/PowerToys Run C# Plugins

### Notes

- When porting, please keep the author's commit history
- Flow Launcher targets .Net 5, so plugins should also be upgraded to keep the continuity of future developments
- All dll libraries used by the plugin should be outputted and included in the final build, to do this, set the attribute CopyLocalLockFileAssemblies in your project file to true

### Steps

1. To start off, you can fork/create a new repo, either way the project's commit history must be kept. If it's forked, you can just start updating it. If it's a new repo, do this by first cloning the repo, then add your new repo as a new repo remote, remove the original remote and then push to it
2. Use try convert tool from https://github.com/dotnet/try-convert
3. Try-convert -w path-to-folder-or-solution-or-project
4. May need to fix on the project file, a good template to follow is the [Explorer plugin](https://github.com/Flow-Launcher/Flow.Launcher/blob/dev/Plugins/Flow.Launcher.Plugin.Explorer/Flow.Launcher.Plugin.Explorer.csproj) project:
	- fix <TargetFramework> to net5.0-windows
	- set the output location as 'Output\Release\<name of the project>'
	- add `<CopyLocalLockFileAssemblies>true</CopyLocalLockFileAssemblies>` and `<AppendTargetFrameworkToOutputPath>false</AppendTargetFrameworkToOutputPath>` to the csproj file
	- bump version to 2.0.0 and fix up any missing attributes if neccessary
5. Update code and fix plugin's setting layout if neccessary
6. Update readme to indicate where this port is from and the original author of the project

## Wox Python Plugins

### Notes

- When porting, please keep the author's commit history

### Steps

1. Change the import from Wox to import from flowlauncher
2. The class should inherit from FlowLauncher instead of Wox
3. Install the flowlauncher python package
