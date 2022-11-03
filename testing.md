### Testing your plugin

After successfully building a plugin, it can be tested locally by moving the output files into Flow Launcher's `FlowLauncher\Plugins` directory accessible via the `userdata` command in Flow Launcher. Alternatively, if you are building .Net (C# or F#) plugins you can have your IDE build the artefact directly to that location (remember not to check this build output path into Git though). 


### Detail Steps

1. Execute `userdata` in Flow Launcher.
2. Navigate into the `Plugins` folder.
3. Move exisiting plugin with the same `Plugin ID` as specify in `plugin.json` away from the folder (_**if more than one plugin have the same `Plugin ID`, none of them will be loaded**_).
4. Copy and paste the newly built plugin folder into this folder.
5. Execute `Restart Flow Launcher` to reload the new plugin.
