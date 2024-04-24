<script lang="ts">
import type {Theme} from "../../types";

export let theme: Theme = 'dark';
export let isIconButton = false;
export let disabled = false;

let light: boolean;
$: light = theme === 'light';
</script>

<button class:light class:isIconButton class:disabled {disabled} on:click>
  <slot />
</button>

<style>
button {
    --bg: #373737;
    --border: #3f3f3f;
    --border-bottom: #3f3f3f;
    --bg-hover: #2f2f2f;
    --text: #ffffff;

    background-color: var(--bg);
    border: 1px solid var(--border);
    border-bottom-color: var(--border-bottom);
    transition: background-color 0.15s;
    padding: 10px 8px;
    border-radius: 6px;
    color: var(--text);
}

button:hover {
    background-color: var(--bg-hover);
}

button:active {
    border-bottom-color: var(--border);
}

button.light {
    --bg: #fefefe;
    --border: #e5e5e5;
    --border-bottom: #868686;
    --bg-hover: #f6f6f6;
    --text: #000000;
}

button.isIconButton {
    padding: 0;
    line-height: 1;
    display: grid;
    place-items: center;
}

button.disabled {
    opacity: 0.5;
    pointer-events: none;
}
</style>
