<script lang="ts">
import type {Theme} from "../../types";

export let theme: Theme = 'dark';
export let password = false;
export let multiline = false;
export let value: string | boolean = '';
export let readonly = false;

export let placeholder = '';

let light: boolean;
$: light = theme === 'light';
</script>

{#if !multiline}
  <!-- type can't be dynamic with two-way binding -->
  {#if password}
    <input class:light type="password" {readonly} {placeholder} bind:value>
  {:else}
    <input class:light {readonly} {placeholder} bind:value>
  {/if}
{:else}
  <textarea class:light rows="4" {readonly} {placeholder} bind:value></textarea>
{/if}

<style>
input, textarea {
    --bg: #373737;
    --border: #3f3f3f;
    --border-bottom: #3f3f3f;
    --text: #ffffff;
    --focus: #a94dc1;

    background-color: var(--bg);
    border-radius: 6px;
    border: 1px solid var(--border);
    border-bottom: 1px solid var(--border-bottom);
    padding: 10px 10px 11px;
    color: var(--text);
    transition: background-color 0.15s, border-color 0.15s;
    resize: none;
    outline: none;
}

input:hover, textarea:hover {
    background-color: var(--text-hover-bg-color);
}

input:focus, textarea:focus {
    background-color: var(--text-focus-bg-color);
    padding-bottom: 10px;
    border-bottom: 2px solid var(--focus);
    outline: none;
}

input.light, textarea.light {
    --bg: #fefefe;
    --border: #e5e5e5;
    --border-bottom: #868686;
    --text: #000000;
    --focus: #a94dc1;
}
</style>
