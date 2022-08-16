### 1. Add GitHub workflow
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

4. The project's release version is obtained from your plugin.json automatically by the ci, so when built it will be appended to the zip file later:

```yml
- name: get version
  id: version
  uses: notiz-dev/github-action-json-property@release
  with: 
    path: 'plugin.json'
    prop_path: 'Version'
```

5. The 'Install dependencies' section is where you will do most of your CI work. It will run `npm install`, which will output all the dependencies specified in package.json into the 'node_modules' directory. The workflow will then zip them up along with your project using `zip -r Flow.Launcher.Plugin.HelloWorldNodeJS.zip . -x '*.git*'`, where you replace this `Flow.Launcher.Plugin.HelloWorldNodeJS` with the name of your plugin.

```yml
- name: Install dependencies
  run: |
    npm install
    zip -r Flow.Launcher.Plugin.HelloWorldNodeJS.zip . -x '*.git*'
```

### 2. Publish as zip
The final step to the workflow file is this publish section, which will publish the zip file you generated, upload to GitHub Releases page and tag with the version generated from the previous step from your plugin.json file. Remember again to replace `Flow.Launcher.Plugin.HelloWorldNodeJS` with the name of your plugin.

```yml
- name: Publish
  uses: softprops/action-gh-release@v1
  with:
    files: 'Flow.Launcher.Plugin.HelloWorldNodeJS.zip'
    tag_name: "v${{steps.version.outputs.prop}}"
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Feel free to also have a read of this [blog post](https://blog.ipswitch.com/how-to-build-your-first-github-actions-workflow) which does a simple explaination of how to use GitHub Actions Workflow.

### 3. Use node_modules directory
Once the 'node_modules' folder is included in your zip release, it can then be used without needing the user to manually npm install the plugin's dependencies. You just have to tell the plugin during runtime to find those modules in your local node_modules directory. Do this by using this exact copy of the following block of code in your [main.js](https://github.com/Flow-Launcher/Flow.Launcher.Plugin.HelloWorldNodeJS/blob/main/main.js):
```javascript
const open = require('./node_modules/open')
```
