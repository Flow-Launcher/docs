### About Flow's TypeScript/JavaScript plugins

Plugins written in TypeScript/JavaScript use the [JSON-RPC](https://flow-launcher.github.io/docs/#/json-rpc) protocol to communicate with Flow via JSON structured calls.

Although not a hard requirement, this guide will use Node.js to run the TypeScript/JavaScript. We will refere to TypeScript/JavaScript plugin as Node.js plugin from here on.

When building a Node.js plugins there are several things to be mindful of:

* The most important thing is we do not expect users to have to manually install the dependencies via npm because we aim to provide a seamless experience for them. This can be achieved by adding the following three things to your project:
    1. Add a GitHub workflow- use a GitHub workflow that will install all your plugin's depedencies including the modules inside a folder called 'node_modules'.
    2. Publish all as a zip- zip up your project including a lib directory that contains the modules and publish it to GitHub Releases page.
    3. Point your module path to the node_modules directory- reference all the modules to that directory.

* Currently we will require users to install Node.js on the computer in order to use the plugin, so you will need to explain how to do so in your plugin readme.

### Simple Example
Have a look at this simple example plugin [here](https://github.com/Flow-Launcher/Flow.Launcher.Plugin.HelloWorldNodeJS), notice it has a folder called '.github/workflows' and a file called 'Publish Release.yml'. This is the workflow file that GitHub Workflow uses to run the CICD for the project. Moving out of that folder you can go into the [main.js](https://github.com/Flow-Launcher/Flow.Launcher.Plugin.HelloWorldNodeJS/blob/main/main.js) file, this is the entry file for your plugin.
