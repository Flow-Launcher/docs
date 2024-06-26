### About Flow's Python plugins

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
