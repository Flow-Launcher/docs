<script lang="ts">
import {Theme} from "../../types";

export let theme: Theme = 'dark';

export let options: string[] | Record<string, string> = [];
export let value: string | boolean = '';
export let readonly = false;

let light: boolean;
$: light = theme === 'light';
</script>

<div class:light>
  <select bind:value>
    {#if Array.isArray(options)}
      {#each options as option}
        <option disabled={readonly} value={option}>
          {option}
        </option>
      {/each}
    {:else}
      {#each Object.entries(options) as [key, option]}
        <option disabled={readonly} value={key}>
          {option}
        </option>
      {/each}
    {/if}
  </select>
</div>

<style>
div {
    --bg: #373737;
    --bg-hover: #2f2f2f;
    --bg-active: #222222;
    --text: #ffffff;
    --arrow: #a2a2a2;
    --border: #3f3f3f;
    --border-active: #222222;
    --border-bottom: #3f3f3f;

    position: relative;
    display: grid;
}

div::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 10px;
    width: 8px;
    height: 8px;
    border-right: 1px solid var(--arrow);
    border-bottom: 1px solid var(--arrow);
    transform: translateY(calc(-50% - 2px)) rotate(45deg);
    pointer-events: none;
}

select {
    background-color: var(--bg);
    border: 1px solid var(--border);
    border-radius: 6px;
    border-bottom-color: var(--border-bottom);
    color: var(--text);
    padding: 10px 30px 10px 10px;
    appearance: none;
    position: relative;
    outline: none;
}

select:hover {
    background-color: var(--bg-hover);
}

select:active {
    background-color: var(--bg-active);
    border-color: var(--border-active);
}

select::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 10px;
    width: 12px;
    height: 12px;
    transform: translateY(-50%);
    border: solid var(--arrow);
    border-width: 0 1px 1px 0;
    transition: border-color 0.15s;
    z-index: 100;
}

select:hover::after {
    border-color: var(--dropdown-hover-arrow-color);
}

div.light {
    --bg: #fefefe;
    --bg-hover: #ffffff;
    --bg-active: #d9d9d9;
    --text: #000000;
    --arrow: #727272;
    --border: #e5e5e5;
    --border-active: #e5e5e5;
    --border-bottom: #868686;
}
</style>
