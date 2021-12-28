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
