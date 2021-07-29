## How to develop Python plugins

Python plugins use the [JSON-RPC](https://flow-launcher.github.io/docs/#/json-rpc) protocol to communicate with Flow via JSON structured calls.

When building a Python plugins there are several things to be mindful of. The most important thing is we do not expect users to have to manually install the dependencies in requirements.txt because we aim to provide a seamless experience for them. This can be achieved by adding the below three things to your project:

1. Add a GitHub workflow- use a GitHub workflow that will install all your plugin's depedencies including the Python flowlauncher module to a folder called Lib inside your plugin.
2. Point your module imports to a Lib directory- reference all the modules to that Lib directory where they are first imported.
3. Publish all as a zip- zip up your project including the aforementioned Lib directory that contains the modules and publish it to GitHub Releases page

### Add a GitHub workflow

### Point your module imports to a Lib directory

### Publish all as a zip


For now you can use the [Python template](https://github.com/Flow-Launcher/Flow.Launcher.Plugin.PythonTemplate) to set up your plugin 

Follow this Python plugin as an [example](https://github.com/deefrawley/Flow.Launcher.Plugin.Currency) 

