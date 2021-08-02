## How to develop Python plugins

Python plugins use the [JSON-RPC](https://flow-launcher.github.io/docs/#/json-rpc) protocol to communicate with Flow via JSON structured calls.

When building a Python plugins there are several things to be mindful of. The most important thing is we do not expect users to have to manually install the dependencies in requirements.txt because we aim to provide a seamless experience for them. This can be achieved by adding the below three things to your project:

1. Add a GitHub workflow- use a GitHub workflow that will install all your plugin's depedencies including the Python flowlauncher module to a folder called Lib inside your plugin.
2. Point your module imports to a Lib directory- reference all the modules to that Lib directory where they are first imported.
3. Publish all as a zip- zip up your project including the aforementioned Lib directory that contains the modules and publish it to GitHub Releases page

### Simple Example Plugin
Have a look at this simple example plugin [here](https://github.com/Flow-Launcher/plugin-samples/tree/master/HelloWorldPython), notice it has a folder called '.github/workflows' and a file called 'Publish Release.yml'. This is the workflow file that GitHub Workflow uses to run the CICD for the project. Moving out of that folder you can go into the [main.py](https://github.com/Flow-Launcher/plugin-samples/blob/master/HelloWorldPython/plugin.json) file, this is the entry file for your plugin. Notice it has this code block:
```
import sys,os
parent_folder_path = os.path.abspath(os.path.dirname(__file__))
sys.path.append(parent_folder_path)
sys.path.append(os.path.join(parent_folder_path, 'lib'))
sys.path.append(os.path.join(parent_folder_path, 'plugin'))
```

### Add a GitHub workflow
The workflow [file](https://github.com/Flow-Launcher/plugin-samples/blob/master/HelloWorldPython/.github/workflows/Publish%20Release.yml) will help build and deploy your project, it does the following things:
1. `workflow_dispatch:` gives you the option to manually run your workflow from the Actions section of your project
2. On pushes to main, it will kick off the workflow but ignore the push if it's only changes made to the workflow file.
```
push:
    branches: [ main ]
    paths-ignore: 
      - .github/workflows/*
```
3. It specifies the python version that will be used for building your project:
```
 strategy:
      matrix:
        python-version: [3.8]
```
4. The project's release version is obtained from your plugin.json automatically by the ci, so when built it will be appended to the zip file later:
```
- name: get version
  id: version
  uses: notiz-dev/github-action-json-property@release
  with: 
    path: 'plugin.json'
    prop_path: 'Version'
```
 

### Point your module imports to a Lib directory

### Publish all as a zip


For now you can use the [Python template](https://github.com/Flow-Launcher/Flow.Launcher.Plugin.PythonTemplate) to set up your plugin 

Follow this Python plugin as an [example](https://github.com/deefrawley/Flow.Launcher.Plugin.Currency) 

