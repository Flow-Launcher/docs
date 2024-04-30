<script lang="ts">
import {Theme} from "../../types";

export let theme: Theme = 'dark';

export let value = false;
export let readonly = false;

let light: boolean;
$: light = theme === 'light';
</script>

<label class:light class:readonly>
  <input type="checkbox" bind:checked={value}/>
</label>

<style>
label {
    --bg: #373737;
    --bg-hover: #2f2f2f;
    --border: #aaaaaa;
    --checkmark: #3e373f;
    --checked: #db9ee5;

    position: relative;
    width: 20px;
    height: 20px;
}

label::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 6px;
    border: 1px solid var(--border);
    background-color: var(--bg);
    z-index: 1;
    transition: background-color 0.15s, border-color 0.15s;
}

label::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 6px;
    width: 6px;
    height: 12px;
    z-index: 2;
    border: solid var(--checkmark);
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    opacity: 0;
    transition: opacity 0.15s;
}

label:hover::before {
    background-color: var(--bg-hover);
}

input[type="checkbox"] {
    display: none;
}

label:has(:checked)::before {
    background-color: var(--checked);
    border-color: var(--checked);
}

label:has(:checked)::after {
    opacity: 1;
}

label.light {
    --bg: #fefefe;
    --bg-hover: #f6f6f6;
    --border: #aaaaaa;
    --checkmark: #f7eef9;
    --checked: #db9ee5;
}

label.readonly {
    pointer-events: none;
}
</style>
