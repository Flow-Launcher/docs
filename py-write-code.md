### 1. Start with a branch
Since we have created a CI for your plugin in the [previous step](https://flow-launcher.github.io/docs/#/py-setup-project), which includes creating a release when you push/merge to the 'main' branch, it is then neccessary to create another git branch separate to your 'main' branch so you can continue to work on your plugin with git commits and pushes without creating a new release each time.

It is a good practice that you create a branch for each of the new feature/fixes you are releasing for your plugin, if you are not sure how to do so then follow this [video tutorial](https://www.gitkraken.com/learn/git/problems/create-git-branch). Once you have fully finished developing your plugin with your new branch, then you can merge it into the 'main' branch, which will consequently create a new release for your plugin with a version from your `plugin.json`.

### 2. main.py
your main.py should look something like below:
```
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
                "Title": "Hello World, this is where title goes. {}".format(('Your query is: ' + query , query)[query == '']),
                "SubTitle": "This is where your subtitle goes, press enter to open Flow's url",
                "IcoPath": "Images/app.png",
                "JsonRPCAction": {
                    "method": "open_url",
                    "parameters": ["https://github.com/Flow-Launcher/Flow.Launcher"]
                }
            }
        ]

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

    def open_url(self, url):
        webbrowser.open(url)

if __name__ == "__main__":
    HelloWorld()

```

<br/>

### 3. Query entry point 
**def query(self, query):**

This is the main entry to your plugin and the return block will be a list of the results that your plugin returns, which could be a single or many results.  

### 4. Assigning an action to your results  
**JsonRPCAction**

This is where you specify the method that will be executed when the user selects on the result.
In this example, if the user selects the result, the `open_url` method will be called with the url parameter that opens the Flow Launcher GitHub repo.

### 5. Create an additional context menu
**def context_menu(self, data):**

This method creates a context menu for your results, where the user can carry out additional tasks when they go to the context menue via pressing `Shift + Enter`. A context menu could be helpful if you want some tasks specific to your returned results, for example the Explorer plugin would return a list of file results, and when going to the context menu of one of the result users can select to copy the file.

To attach a method to your context menu result, do the same as for normal results where you define a JsonRPCAction item with the method and parameters you want to call and pass through. In this case the context menu will simply open the HelloWorldPython plugin's GitHub repo.

### 6. Your plugin.json

You will also need to if not yet already, create a plugin.json file that will instruct Flow on how to load your plugin.

This file should be placed in the top level folder.

To revisit what to include in your plugin.json, visit [here](https://flow-launcher.github.io/docs/#/plugin.json)
