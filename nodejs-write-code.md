### 1. Start with a branch
Since we have created a CI for your plugin in the [previous step](https://flow-launcher.github.io/docs/#/py-setup-project), which includes creating a release when you push/merge to the 'main' branch, it is then neccessary to create another git branch separate to your 'main' branch so you can continue to work on your plugin with git commits and pushes without creating a new release each time.

It is a good practice that you create a branch for each of the new feature/fixes you are releasing for your plugin, if you are not sure how to do so then follow this [video tutorial](https://www.gitkraken.com/learn/git/problems/create-git-branch). Once you have fully finished developing your plugin with your new branch, then you can merge it into the 'main' branch, which will consequently create a new release for your plugin with a version from your `plugin.json`.

### 2. main.py
your main.js should look something like below:
```
const open = require('./node_modules/open')

const { method, parameters } = JSON.parse(process.argv[2])

if (method === "query") {
	console.log(JSON.stringify(
		{
			"result": [{
				"Title": "Hello World Typescript",
				"Subtitle": "Showing your query parameters: " + parameters + ". Click to open Flow's website",
				"JsonRPCAction": {
                    "method": "do_something_for_query",
                    "parameters": ["https://github.com/Flow-Launcher/Flow.Launcher"]
                },
				"IcoPath": "Images\\app.png"
			}]
		}
	));
}

if (method === "do_something_for_query") {
	url = parameters[0]
	do_something_for_query(url)
}

function do_something_for_query(url) {
	open(url);
}
```

<br/>

### 3. Query entry point 
**if (method === "query")**

This if statement captures the args passed viar JsonRPC defined as `const { method, parameters } = JSON.parse(process.argv[2])`, so if 'method' is 'query' then the console.log's code block will be run. As result is an array, you can also specify a single or multiple results.  

### 4. Assigning an action to your results  
**JsonRPCAction**

This is where you specify the method that will be executed when the user selects on the result.
In this example, if the user selects the result, the `do_something_for_query` method will be called with the url parameter which opens the Flow Launcher GitHub repo.

### 5. Your plugin.json

You will also need to if not yet already, create a plugin.json file that will instruct Flow on how to load your plugin.

This file should be placed in the top level folder.

To revisit what to include in your plugin.json, visit [here](https://flow-launcher.github.io/docs/#/plugin.json)
