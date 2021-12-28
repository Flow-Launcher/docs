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
      python_ver: 3.8
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
5. The 'Install dependencies' section is where you will do most of your CI work. Notice it installs the requirements.txt and outputs it with the `-t` parameter to the `./lib` folder. This tells pip to dump all the installed modules to the local lib folder which you will zip up along with your project using the `zip -r Flow.Launcher.Plugin.HelloWorldPython.zip . -x '*.git*'`, where you replace this `Flow.Launcher.Plugin.HelloWorldPython` with the name of your plugin.
    
    You can also add additional steps here to unpack/install any additional depedencies your plugin requires, for example compiling additional translation files like [this](https://github.com/deefrawley/Flow.Launcher.Plugin.Currency/blob/23770ee929af059b1b1b7f9b5f3327b692ac9587/.github/workflows/Publish%20Release.yml#L34)
```yml
- name: Install dependencies
  run: |
    python -m pip install --upgrade pip
    pip install -r ./requirements.txt -t ./lib
    zip -r Flow.Launcher.Plugin.HelloWorldPython.zip . -x '*.git*'
```

### 2. Publish as zip
The final step to the workflow file is this publish section, which will publish the zip file you generated, upload to GitHub Releases page and tag with the version generated from the previous step from your plugin.json file. Remember again to replace `Flow.Launcher.Plugin.HelloWorldPython` with the name of your plugin.
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

Feel free to also have a read of this [blog post](https://blog.ipswitch.com/how-to-build-your-first-github-actions-workflow) which does a simple explaination of how to use GitHub Actions Workflow.

### 3. Use lib directory
Once the lib folder is included in your zip release, it can then be used without needing the user to manually pip install. You just have to tell during runtime to find those modules in your local lib folder. Do this by using this exact copy of the following block of code:
```python
import sys,os
parent_folder_path = os.path.abspath(os.path.dirname(__file__))
sys.path.append(parent_folder_path)
sys.path.append(os.path.join(parent_folder_path, 'lib'))
sys.path.append(os.path.join(parent_folder_path, 'plugin'))

```
Add the above code into your init file at the top, usually this is the [main.py](https://github.com/Flow-Launcher/Flow.Launcher.Plugin.HelloWorldPython/blob/main/main.py) file. This block of code appends the path of your lib and plugin directories on the user's machine to `sys.path`. `sys.path` is a built-in variable within the sys module, which contains a list of directories that the Python interpreter will search in for the required module. Effectively we are telling the interpreter if the required modules in your plugin are not found among its built-in modules then look through the list of directories defined by sys.path, which should have all the modules installed by your GitHub workflow in the 'lib' folder.
