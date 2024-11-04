<svelte:options customElement={{
  tag: 'settings-component-demo',
  props: {
    label: { reflect: true },
    description: { reflect: true },
    value: { reflect: true },
    type: { reflect: true },
    options: { reflect: true, type: 'Array' },
    readonly: { reflect: true, type: 'Boolean' },
  }
}}/>

<script lang="ts">
import type {ComponentType, Theme} from "../types";
import SettingsButton from "../components/inputs/SettingsButton.svelte";
import SettingsInput from "../components/inputs/SettingsInput.svelte";
import SettingsDropdown from "../components/inputs/SettingsDropdown.svelte";
import SettingsCheckbox from "../components/inputs/SettingsCheckbox.svelte";
import {useThemeChangeObserver} from "../theme-change-observer";

export let label: string = '';
export let description: string = '';
export let value: string | boolean = '';
export let type: ComponentType = 'textBlock';
export let options: string[] = [];
export let readonly = false;

export let theme: Theme | undefined;
useThemeChangeObserver(theme, newTheme => theme = newTheme);

let checkboxValue: boolean;
$: checkboxValue = value === 'true' || value === true;

let light: boolean;
$: light = theme === 'light';

let full: boolean;
$: full = type === 'textBlock';
</script>

<div class="grid" class:full class:light>
  <div class="left">
    {#if type !== 'textBlock'}
      <div class="label">{label}</div>
    {/if}
    <div class="description">{description}</div>
  </div>
  {#if type !== 'textBlock'}
    <div
      class="right"
      class:with-button={type === 'inputWithFileBtn' || type === 'inputWithFolderBtn'}
      class:checkbox={type === 'checkbox'}
    >
      {#if type === 'input'}
        <SettingsInput {theme} {readonly} bind:value={value}/>
      {:else if type === 'inputWithFileBtn' || type === 'inputWithFolderBtn'}
        <SettingsInput {theme} {readonly} bind:value={value}/>
        <SettingsButton {theme}>Browse</SettingsButton>
      {:else if type === 'passwordBox'}
        <SettingsInput {theme} {readonly} password bind:value={value}/>
      {:else if type === 'textarea'}
        <SettingsInput {theme} {readonly} multiline bind:value={value}/>
      {:else if type === 'dropdown'}
        <SettingsDropdown {theme} {readonly} {options} bind:value/>
      {:else if type === 'checkbox'}
        <SettingsCheckbox {theme} {readonly} bind:value={checkboxValue}/>
      {/if}
    </div>
  {/if}
</div>

<style>
.grid {
    --bg-color: #2b2b2b;
    --border-color: #2b2b2b;
    --label-color: #dcdcdc;
    --description-color: #cfcfcf;

    background-color: var(--bg-color);
    border: 1px solid var(--border-color);
    border-radius: 6px;
    padding: 8px 20px;
    display: grid;
    grid-template-columns: 1fr minmax(35%, auto);
    gap: 25px;
    align-items: center;
    font-family: "Segoe UI", "Microsoft YaHei UI", "Microsoft Sans Serif", sans-serif;
}

.grid.light {
    --bg-color: #fbfbfb;
    --border-color: #e5e5e5;
    --label-color: #1e1e1e;
    --description-color: #5f5f5f;
}

.grid.full {
    grid-template-columns: 1fr;
}

.left {
    display: flex;
    flex-direction: column;
    gap: 4px;
    line-height: 1.15;
}

.right {
    display: grid;
    align-items: center;
}

.right.with-button {
    grid-template-columns: 1fr auto;
    gap: 10px;
}

.right.checkbox {
    justify-content: end;
}

.label {
    font-size: 16px;
    color: var(--label-color);
}

.description {
    font-size: 14px;
    color: var(--description-color);
}
</style>
