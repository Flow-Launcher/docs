# plugin.json

`plugin.json` is the manifest files of your plugin. It is required for Flow to understand how to communicate with your plugin. 
It must be in the plugin root directory.

```js
{
  "ID":"",             //Plugin ID，32 bit UUID
  "ActionKeyword":"",  //Plugin default action keyword (* means no specific action keyword)
  "Name":"",           //Plugin name
  "Description":"",    //Plugin description
  "Author":"",         //Plugin Author
  "Version":"",        //Plugin version (e.g. 1.0.0). It is important for plugin update checking.
  "Language":"",       //Plugin language，available fields are csharp, fsharp, python, javascript, typescript and executable. Make sure you put the correct field for your plugin language, this is important so that the required runtime environment can be setup automatically.
  "Website":"",        //Plugin website or author website
  "IcoPath": "",       //Plugin icon, relative path to the plugin folder
  "ExecuteFileName":"" //Execution entry. dll extension for C#/F# plugin, .py for python plugin, .js/.ts for JS/TS plugins and .exe or other executable for executable plugin. Path examples include "main.py" or "./dist/main.js"
}
```

## JSON Schema 
Additionally, you can add a property called `$schema` to enable validation and auto-completion in your IDE. This works in JetBrains IDEs (i.e., WebStorm, PhpStorm, Rider, etc.), Visual Studio, and Visual Studio Code. Add this property to the top of the JSON file:

```js
{
  "$schema": "https://www.flowlauncher.com/schemas/plugin.schema.json",
  // the rest of the plugin.json file
  // ...
}
```

Now you should have auto-completion and file validation available for you in your IDE.
