Python is a common language allowing for rapid prototyping without the need for compilation.

## About Flow's Python plugins

Python plugins use the [JSON-RPC](https://flow-launcher.github.io/docs/#/json-rpc) protocol to communicate with Flow via JSON structured calls.

When building a Python plugins, there are several things to be mindful of:

* The most important thing is we do not expect users to have to manually install the dependencies in requirements.txt because we aim to provide a seamless experience for them. This can be achieved by adding the following three things to your project:
    1. Add a GitHub workflow — use a GitHub workflow that will install all your plugin's dependencies including the Python flowlauncher module to a folder called Lib inside your plugin.
    2. Publish all as a zip — zip up your project including a lib directory that contains the modules and publish it to GitHub Releases page.
    3. Point your module imports to the lib directory — reference all the modules to that directory where they are first imported.

* Users can use their own system-installed Python with Flow Launcher, but in most circumstances they will most likely be using Flow Launcher's download of [Embedded Python](https://docs.python.org/3/using/windows.html#the-embeddable-package). This download is isolated from the users system and does not prepend the scripts run directory to the system `PATH`.<sup>[ref](https://bugs.python.org/issue28245)</sup> If you need to import external files please follow the example below.

* It should also be noted that external libraries that include compiled code can pose compatibility issues with different versions of Python. This is because the compiled code is platform-specific and tied to a specific version of Python. If you *must* use an external library with compiled code, you may look at alternative packaging methods such as [nuitka](http://nuitka.net/), or [pyinstaller](https://pyinstaller.org/en/stable/).

### Simple Example
Have a look at this simple example plugin [here](https://github.com/Flow-Launcher/Flow.Launcher.Plugin.HelloWorldPython), notice it has a folder called `.github/workflows` and a file called 'Publish Release.yml'. This is the workflow file that GitHub Workflow uses to run the CI/CD for the project. 

Moving out of that folder, you can go into the [main.py](https://github.com/Flow-Launcher/Flow.Launcher.Plugin.HelloWorldPython/blob/main/main.py) file; this is the entry file for your plugin. Notice it has this code block:
```python
import sys
from pathlib import Path

plugindir = Path.absolute(Path(__file__).parent)
paths = (".", "lib", "plugin")
sys.path = [str(plugindir / p) for p in paths] + sys.path
```

Now that we've added our `lib` folder to `sys.path`, we can now import our external libraries like so:
```python
from flowlauncher import FlowLauncher #external library
import webbrowser #Not external
```

We inherit from the FlowLauncher class provided by the FlowLauncher library we imported. This will allow our plugin to communicate with FlowLauncher.

```python
class HelloWorld(FlowLauncher):
```

When a user activates our plugin, we can retrieve their query by providing a `query` method. Flow Launcher provides the argument `query` with the users text.

To send a response back, we need to return a list of dictionaries as shown below. The `JsonRPCAction` dict allows you to provide a method that will be called by Flow Launcher with the parameters you provided. This method *must* be part of your plugin class.

```python
    def query(self, query):
        return [
            {
                "Title": "Hello World, this is where title goes. {}".format(('Your query is: ' + query , query)[query == '']),
                "SubTitle": "This is where your subtitle goes, press enter to open Flow's url",
                "IcoPath": "Images/app.png",
                "ContextData": ["foo", "bar"]
                "JsonRPCAction": {
                    "method": "open_url",
                    "parameters": ["https://github.com/Flow-Launcher/Flow.Launcher"]
                }
            }
        ]
```

This method will be called when a user selects our result:

```python
    def open_url(self, url):
        webbrowser.open(url)
```

The context menu is activated when the user uses <kbd>Shift</kbd>+<kbd>Enter</kbd> or right-clicks on a result. The context menu is similar to the `query` method except it does not receive a `query` argument but a `data` argument with a list of values from the result selected.

```python
    def context_menu(self, data):
        return [
            {
                "Title": "Hello World Python's Context menu",
                "SubTitle": "Press enter to open Flow the plugin's repo in GitHub",
                "IcoPath": "Images/app.png",
                "JsonRPCAction": {
                    "method": "open_url",
                    "parameters": ["https://github.com/Flow-Launcher/Flow.Launcher.Plugin.HelloWorldPython"]
                }
            }
        ]
```


## Project setup

### 1. Add GitHub workflow
The workflow [file](https://github.com/Flow-Launcher/Flow.Launcher.Plugin.HelloWorldPython/blob/main/.github/workflows/Publish%20Release.yml) will help build and deploy your project, it does the following things:
1. `workflow_dispatch:` gives you the option to manually run your workflow from the Actions section of your project

2. On pushes to main, it will kick off the workflow but ignore the push if it's only changes made to the workflow file.

```yml
push:
    branches: [ main ]
    paths-ignore: 
      - .github/workflows/*
```

3. It specifies the python version that will be used for building your project:

```yml
    env:
      python_ver: 3.11
```

4. The project's release version is obtained from your plugin.json automatically by the CI, so when built, it will be appended to the zip file later:

```yml
- name: get version
  id: version
  uses: notiz-dev/github-action-json-property@release
  with: 
    path: 'plugin.json'
    prop_path: 'Version'
```

5. The **Install dependencies** section is where you will do most of your CI work. Notice it installs the requirements.txt and outputs it with the `-t` parameter to the `./lib` folder. This tells pip to dump all the installed modules to the local lib folder which you will zip up along with your project using the `zip -r Flow.Launcher.Plugin.HelloWorldPython.zip . -x '*.git*'`, where you replace this `Flow.Launcher.Plugin.HelloWorldPython` with the name of your plugin.
    
    You can also add additional steps here to unpack/install any additional dependencies your plugin requires, for example, compiling additional translation files like [this](https://github.com/deefrawley/Flow.Launcher.Plugin.Currency/blob/23770ee929af059b1b1b7f9b5f3327b692ac9587/.github/workflows/Publish%20Release.yml#L34)

```yml
- name: Install dependencies
  run: |
    python -m pip install --upgrade pip
    pip install -r ./requirements.txt -t ./lib
    zip -r Flow.Launcher.Plugin.HelloWorldPython.zip . -x '*.git*'
```

### 2. Publish as zip
The final step to the workflow file is this **Publish** section, which will publish the zip file you generated, upload to GitHub Releases page and tag with the version generated from the previous step from your plugin.json file. Remember again to replace `Flow.Launcher.Plugin.HelloWorldPython` with the name of your plugin.
```yml
- name: Publish
  if: success()
  uses: softprops/action-gh-release@v1
  with:
    files: 'Flow.Launcher.Plugin.HelloWorldPython.zip'
    tag_name: "v${{steps.version.outputs.prop}}"
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Feel free to also have a read of this [blog post](https://blog.ipswitch.com/how-to-build-your-first-github-actions-workflow) which does a simple explanation of how to use GitHub Actions Workflow.

### 3. Use lib directory
Once the lib folder is included in your zip release, it can then be used without needing the user to manually pip install. You just have to tell during runtime to find those modules in your local lib folder. Do this by using this exact copy of the following code block:
```python
import sys
from pathlib import Path

plugindir = Path.absolute(Path(__file__).parent)
paths = (".", "lib", "plugin")
sys.path = [str(plugindir / p) for p in paths] + sys.path

```
Add the above code into your init file at the top, usually this is the [main.py](https://github.com/Flow-Launcher/Flow.Launcher.Plugin.HelloWorldPython/blob/main/main.py) file. This block of code appends the path of your lib and plugin directories on the user's machine to `sys.path`. `sys.path` is a built-in variable within the sys module, which contains a list of directories that the Python interpreter will search in for the required module. Effectively, we are telling the interpreter if the required modules in your plugin are not found among its built-in modules then look through the list of directories defined by `sys.path`, which should have all the modules installed by your GitHub workflow in the 'lib' folder.

## Write the code

### 1. Start with a branch
Since we have created a CI for your plugin in the [previous step](/py-setup-project.md), which includes creating a release when you push/merge to the 'main' branch, it is then necessary to create another git branch separate to your `main` branch, so you can continue to work on your plugin with git commits and pushes without creating a new release each time.

It is a good practice that you create a branch for each of the new feature/fixes you are releasing for your plugin, if you are not sure how to do so, then follow this [video tutorial](https://www.gitkraken.com/learn/git/problems/create-git-branch). Once you have fully finished developing your plugin with your new branch, then you can merge it into the 'main' branch, which will consequently create a new release for your plugin with a version from your `plugin.json`.

### 2. main.py
your `main.py` should look something like below:

```python
import sys,os
parent_folder_path = os.path.abspath(os.path.dirname(__file__))
sys.path.append(parent_folder_path)
sys.path.append(os.path.join(parent_folder_path, 'lib'))
sys.path.append(os.path.join(parent_folder_path, 'plugin'))

from flowlauncher import FlowLauncher
import webbrowser


class HelloWorld(FlowLauncher):

    def query(self, query):
        return [
            {
                "title": "Hello World, this is where title goes. {}".format(('Your query is: ' + query , query)[query == '']),
                "subTitle": "This is where your subtitle goes, press enter to open Flow's url",
                "icoPath": "Images/app.png",
                "jsonRPCAction": {
                    "method": "open_url",
                    "parameters": ["https://github.com/Flow-Launcher/Flow.Launcher"]
                },
                "score": 0
            }
        ]

    def context_menu(self, data):
        return [
            {
                "title": "Hello World Python's Context menu",
                "subTitle": "Press enter to open Flow the plugin's repo in GitHub",
                "icoPath": "Images/app.png", # related path to the image
                "jsonRPCAction": {
                    "method": "open_url",
                    "parameters": ["https://github.com/Flow-Launcher/Flow.Launcher.Plugin.HelloWorldPython"]
                },
                "score" : 0
            }
        ]

    def open_url(self, url):
        webbrowser.open(url)

if __name__ == "__main__":
    HelloWorld()

```

<br>

### 3. Query entry point 
**def query(self, query):**

This is the main entry to your plugin, and the return block will be a list of the results that your plugin returns, which could be a single or many results.  

### 4. Assigning an action to your results  
**JsonRPCAction**

This is where you specify the method that will be executed when the user selects on the result.
In this example, if the user selects the result, the `open_url` method will be called with the url parameter that opens the Flow Launcher GitHub repo.

### 5. Create an additional context menu
**def context_menu(self, data):**

This method creates a context menu for your results, where the user can carry out additional tasks when they go to the context menu via pressing `Shift + Enter`. A context menu could be helpful if you want some tasks specific to your returned results. For example, the Explorer plugin would return a list of file results, and when going to the context menu of one of the result users can select to copy the file.

To attach a method to your context menu result, do the same as for normal results where you define a JsonRPCAction item with the method and parameters you want to call and pass through. In this case, the context menu will simply open the HelloWorldPython plugin's GitHub repo.

### 6 Result score
The `score` field provides the ability to assign a weight to your score; the higher the score is, the higher the result from the plugin would show in flow's result list. The range in which you assign the score is usually between 0–100. You can keep it as 0 if your plugin generally uses an action keyword to trigger, but if you are using a global action keyword (`*`) then the average weight for a plugin would be 50. Additionally, users can tweak the score via Flow's plugin setting as well.

### 7. Your plugin.json

You will also need to, if not yet already, create a plugin.json file that will instruct Flow on how to load your plugin.

This file should be placed in the top level folder.

To revisit what to include in your plugin.json, visit [here](/plugin.json.md)

## Release your plugin to Flow's Plugin Store 

When you are ready to release your plugin for people to enjoy, head over to Flow's [plugin repo](https://github.com/Flow-Launcher/Flow.Launcher.PluginsManifest) and follow the instructions there in the readme.

## Good references to follow

Here are some plugins that could help you build out your own or serve as a reference point:
- IsPrime https://github.com/lvonkacsoh/Flow.Launcher.Plugin.IsPrime
- RollDice https://github.com/lvonkacsoh/Flow.Launcher.RollDice
- FancyEmoji https://github.com/Ma-ve/Flow.Launcher.Plugin.FancyEmoji
- Steam Search https://github.com/Garulf/Steam-Search
- Currency Converter https://github.com/deefrawley/Flow.Launcher.Plugin.Currency
