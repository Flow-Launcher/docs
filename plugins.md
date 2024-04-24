Here are some plugins to add to the functionality of Flow-Launcher.

<plugin-directory></plugin-directory>

You can port existing Wox or PowerToys Run plugins that you use frequently by following the instructions from [Porting Plugins](https://flow-launcher.github.io/docs/#/port-plugins).

<script>
const element = document.querySelector('#__settings-script__');
if (!element) {
    const script = document.createElement('script');
    script.id = '__settings-script__';
    script.src = 'assets/flow-launcher-settings-components.js';
    script.type = 'module';
    document.body.appendChild(script);
}
</script>
