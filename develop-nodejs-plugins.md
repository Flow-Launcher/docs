As the language of the internet, Javascript can be used to write Flow plugins.

## About Flow's TypeScript/JavaScript plugins

Plugins written in TypeScript/JavaScript use the [JSON-RPC](https://flow-launcher.github.io/docs/#/json-rpc) protocol to communicate with Flow via JSON structured calls.

Although not a hard requirement, this guide will use Node.js to run the TypeScript/JavaScript. We will refer to TypeScript/JavaScript plugin as Node.js plugin from here on.

When building a Node.js plugin, there are several things to be mindful of:

* The most important thing is we do not expect users to have to manually install the dependencies via npm because we aim to provide a seamless experience for them. This can be achieved by adding the following three things to your project:
    1. Add a GitHub workflow — use a GitHub workflow that will install all your plugin's dependencies including the modules inside a folder called `node_modules`.
    2. Publish all as a zip — zip up your project including a lib directory that contains the modules and publish it to GitHub Releases page.
    3. Point your module path to the node_modules directory — reference all the modules to that directory.

* Users can use their system-installed Node.js with Flow Launcher, but in most circumstances, they will most likely be using Flow Launcher's download of [Node.js](https://nodejs.org/dist/v16.18.0/node-v16.18.0-win-x64.zip). This download of portable Node.js version is isolated from the user's system and can be simply removed.

### Simple Example
Have a look at this simple example plugin [here](https://github.com/Flow-Launcher/Flow.Launcher.Plugin.HelloWorldNodeJS), notice it has a folder called `.github/workflows` and a file called `Publish Release.yml`. This is the workflow file that GitHub Workflow uses to run the CI/CD for the project. Moving out of that folder, you can go into the [main.js](https://github.com/Flow-Launcher/Flow.Launcher.Plugin.HelloWorldNodeJS/blob/main/main.js) file; this is the entry file for your plugin.

## Add GitHub workflow
The workflow [file](https://github.com/Flow-Launcher/Flow.Launcher.Plugin.HelloWorldNodeJS/blob/main/.github/workflows/Publish%20Release.yml) will help build and deploy your project, it does the following things:
1. `workflow_dispatch:` gives you the option to manually run your workflow from the Actions section of your project

2. On pushes to main, it will kick off the workflow but ignore the push if it's only changes made to the workflow file.

```yml
push:
    branches: [ main ]
    paths-ignore: 
      - .github/workflows/*
```

3. It specifies the Node.js version that will be used for building your project:

```yml
- name: Set up Node.Js
  uses: actions/setup-node@v2
  with:
    node-version: '17.3.0'
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

5. The **Install dependencies** section is where you will do most of your CI work. It will run `npm install`, which will output all the dependencies specified in package.json into the 'node_modules' directory. The workflow will then zip them up along with your project using `zip -r Flow.Launcher.Plugin.HelloWorldNodeJS.zip . -x '*.git*'`, where you replace this `Flow.Launcher.Plugin.HelloWorldNodeJS` with the name of your plugin.

```yml
- name: Install dependencies
  run: |
    npm install
    zip -r Flow.Launcher.Plugin.HelloWorldNodeJS.zip . -x '*.git*'
```

### Publish as zip
The final step to the workflow file is this **Publish** section, which will publish the zip file you generated, upload to GitHub Releases page and tag with the version generated from the previous step from your plugin.json file. Remember again to replace `Flow.Launcher.Plugin.HelloWorldNodeJS` with the name of your plugin.

```yml
- name: Publish
  uses: softprops/action-gh-release@v1
  with:
    files: 'Flow.Launcher.Plugin.HelloWorldNodeJS.zip'
    tag_name: "v${{steps.version.outputs.prop}}"
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Feel free to also have a read of this [blog post](https://blog.ipswitch.com/how-to-build-your-first-github-actions-workflow) which does a simple explanation of how to use GitHub Actions Workflow.

### Use node_modules directory
Once the `node_modules` folder is included in your zip release, it can then be used without needing the user to manually npm install the plugin's dependencies. You just have to tell the plugin during runtime to find those modules in your local node_modules directory. Do this by using this exact copy of the following code block in your [main.js](https://github.com/Flow-Launcher/Flow.Launcher.Plugin.HelloWorldNodeJS/blob/main/main.js):
```javascript
const open = require('./node_modules/open');
```

## Start with a branch
Since we have created a CI for your plugin in the [previous step](https://flow-launcher.github.io/docs/#/nodejs-setup-project), which includes creating a release when you push/merge to the 'main' branch, it is then necessary to create another git branch separate to your 'main' branch so you can continue to work on your plugin with git commits and pushes without creating a new release each time.

It is a good practice that you create a branch for each of the new feature/fixes you are releasing for your plugin, if you are not sure how to do so then follow this [video tutorial](https://www.gitkraken.com/learn/git/problems/create-git-branch). Once you have fully finished developing your plugin with your new branch, then you can merge it into the 'main' branch, which will consequently create a new release for your plugin with a version from your `plugin.json`.

### main.js
your main.js should look something like below:
```js
const open = require('./node_modules/open');

const { method, parameters, settings } = JSON.parse(process.argv[2]);

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
				"IcoPath": "Images\\app.png",
                "score" : 0
			}]
		}
	));
}

if (method === "do_something_for_query") {
	url = parameters[0];
	do_something_for_query(url);
}

function do_something_for_query(url) {
	open(url);
}
```

<br/>

### Query entry point 
**if (method === "query")**

This if statement captures the args passed via JSON-RPC defined as `const { method, parameters } = JSON.parse(process.argv[2])`, so if `method` is `'query'` then the console.log's code block will be run. As the `result` property is an array, you can also specify a single or multiple results.  

### Assigning an action to your results  
**JsonRPCAction**

This is where you specify the method that will be executed when the user selects on the result.
In this example, if the user selects the result, the `do_something_for_query` method will be called with the url parameter which opens the Flow Launcher GitHub repo.

### node.bat
The [node.bat](https://github.com/Flow-Launcher/Flow.Launcher.Plugin.HelloWorldNodeJS/blob/main/node.bat) file is the entry Flow uses to call main.js, it will set the working directory to the plugin's own location before calling main.js with node.
```
@echo off
SET plugin_dir=%~dp0%
node "%plugin_dir%/main.js" %*
```

### Result score
The `score` field provides the ability to assign a weight to your score; the higher the score is, the higher the result from the plugin would show in flow's result list. The range in which you assign the score is usually between 0–100. You can keep it as 0 if your plugin generally uses an action keyword to trigger, but if you are using a global action keyword - `*` then the average weight for a plugin would be 50. Additionally, users can tweak the score via Flow's plugin setting as well.

### Your plugin.json
You will also need to, if not yet already, create a plugin.json file that will instruct Flow on how to load your plugin.

This file should be placed in the top level folder.

To revisit what to include in your plugin.json, visit [here](/plugin.json.md)

## Release your plugin to Flow's Plugin Store 

When you are ready to release your plugin for people to enjoy, head over to Flow's [plugin repo](https://github.com/Flow-Launcher/Flow.Launcher.PluginsManifest) and follow the instructions there in the readme.

## Good references to follow

Here are some plugins that could help you build out your own or serve as a reference point:
- Plugin Template https://github.com/Joehoel/flow-launcher-plugin-template-node
- Discord Timestamps https://github.com/Jessuhh/discord-timestamps-flowlauncher-plugin
- NPM Search https://github.com/gabrielcarloto/flow-search-npm