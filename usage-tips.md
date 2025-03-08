### Usage Tips

#### Installation
- Flow is published as a self-contained app, this means on Windows machines (7 and up) Flow can run straight away without needing to install .NET runtime and framework. Coupled with portable mode, it can be stored on Dropbox or cloud storage provider and run on any Windows machines. The slight drawback is that the installed package size is slightly bigger at around 250 MB because it needs to bundle the required .NET components together.
#### Searching
- Search for  items using:
  - Acronyms e.g. `gk` or `gp` for GitKraken Preview.
  - Fuzzy e.g. `acr` or `rea` for Acrobat Reader DC.
  - Single word e.g. `code` or `visual` for Visual Studio Code.
- Right-click with the mouse, or press right-arrow on the keyboard, on a result to access the context menu for additional actions. The context menu is specific to the plugin providing the result

#### Plugins
- Typing `?` in the search bar will show you the keywords currently active. This can be refined by typing the first letter or two of the keywords you are after.
- The plugin results order can be prioritised. This can be done by going to the plugin's settings page. Under the plugin's title and the description, click the number next to 'Priority'; this is where you can assign weight to the plugin's result. The higher the weight is, the higher the selected plugin's results will be in Flow's result list.
- Press `F5` while in the query window or type `reload plugin data` to reload all plugin data.
- Both Program and Bookmarks plugin will automatically detect new changes, so your newly installed apps or bookmarks will be available soon after they are added.
- If your plugin is not triggering, open Flow's settings, navigate to the Plugins tab, and check if the plugin is set to a specific action keyword. Note that sometimes a dedicated keyword is used to limit the number of results and avoid cluttering the list..
- For Explorer plugin results, you can press `Ctrl + Enter` to open the folder directly instead of navigating into the folder.
- You can save your frequently used or favourite files/folder locations via Explorer plugin. Navigate to the file/location you want to save, then go to the context menu and select `Add to Quick Access`. It will be particularly handy if you have set a custom action keyword instead of the default '*', which when used will display your list of saved Quick Access files and folders. You can change the default action keyword via the plugin's settings page.
- Press ctrl + enter/click on a Shell plugin command will run it directly as admin.
- In the plugins download list, you can press ctrl + enter/click to open the plugin's url.
- Explorer's Search action keyword combines both Path and Index search, so you can use it without worrying about which action keyword to use for what, put in what you need to search for. Path (searches a specific path) and Index (search a file or folder name) search allows users to do just their specific searches and are disabled by default.
- Whilst in the query window and searching inside a directory, pressing `Ctrl + Backspace`  will go back up one level in the directory tree.

#### Settings
- Flow's settings including installed plugins are located at:
  - If using roaming: `%APPDATA%\FlowLauncher`
  - If using portable, by default: `%localappdata%\FlowLauncher\app-<VersionOfYourFlowLauncher>\UserData`
- To back up your Flow's settings including installed plugins, back up your UserData folder. You can locate it quickly via querying `flow launcher userdata` in the search bar.
- To restore your saved settings, ensure Flow is exited, delete the current UserData folder and copy yours in. Start Flow and all your settings will be set up. One exception, however, is your saved Quick Access files and folder paths in the Explorer plugin you may need to update if the locations have changed.
- When migrating from a system with a high screen resolution to one with a lower resolution, it may be necessary to adjust "SettingWindowWidth", "SettingWindowHeight" "SettingWindowTop" and "SettingWindowLeft" as the settings may otherwise appear outside the visible area. Default values for 1920x1080: 1000, 700, 0, 0.
- Resetting Flow back to default settings is also easy, move/delete the UserData folder after closing the app, and the defaults will be recreated.








