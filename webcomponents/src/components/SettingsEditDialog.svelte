<script lang="ts">
import type {ComponentDataWithId, ComponentType, Theme} from "../types";
import SettingsDropdown from "./inputs/SettingsDropdown.svelte";
import SettingsInput from "./inputs/SettingsInput.svelte";
import SettingsButton from "./inputs/SettingsButton.svelte";
import {createEventDispatcher} from "svelte";
import SettingsCheckbox from "./inputs/SettingsCheckbox.svelte";

export let theme: Theme;

const emit = createEventDispatcher<{
  save: ComponentDataWithId;
}>();

let dialog: HTMLDialogElement | null = null;

const NAME_REGEXP = /^[a-z_$][0-9a-z_$]*$/i;

let checkbox = false;
let optionsString = "";

export let data: ComponentDataWithId = {
  id: "",
  type: "textBlock",
  attributes: {
    name: "",
    label: "",
    description: "",
    defaultValue: "",
    options: [],
  },
};

export let editingMode = false;

let isNameIncorrect: boolean;
$: {
  let name = data.attributes.name.trim();
  isNameIncorrect = !name.match(NAME_REGEXP) && data.type !== 'textBlock'
}

let areOptionsIncorrect: boolean;
$: {
  areOptionsIncorrect = data.type === 'dropdown' && data.attributes.options.filter(v => v.trim()).length === 0;
}

const inputTypes: Record<ComponentType, string> = {
  textBlock: "Block of text",
  input: "Text input",
  inputWithFileBtn: "Text input with 'Browse' button",
  textarea: "Textarea",
  passwordBox: "Password input",
  dropdown: "Dropdown",
  checkbox: "Checkbox",
};

function cancel(): void {
  dialog?.close();
}

function save(): void {
  data.attributes.name = data.attributes.name.trim();
  data.attributes.label = data.attributes.label.trim();
  data.attributes.description = data.attributes.description.trim();
  if (data.type === 'checkbox') {
    data.attributes.defaultValue = checkbox;
  } else {
    data.attributes.defaultValue = data.attributes.defaultValue.toString().trim();
  }
  emit('save', data);
  dialog.close();
}

export function show(): void {
  if (!dialog) return;
  checkbox = !!data.attributes.defaultValue;
  optionsString = data.attributes.options?.join("\n") ?? "";
  dialog.inert = true;
  dialog.showModal();
  dialog.inert = false;
}

function onBodyKeyup(event: KeyboardEvent): void {
  if (event.key !== "Escape") return;
  cancel();
}

$: {
  if (data.type !== 'dropdown') break $;
  data.attributes.options = optionsString.split("\n").map(s => s.trim()).filter(Boolean);
  if (data.attributes.options.length && !data.attributes.options.includes(data.attributes.defaultValue.toString())) {
    data.attributes.defaultValue = data.attributes.options[0];
  }
}
</script>

<svelte:window on:keyup={onBodyKeyup}/>

<dialog class:light={theme === 'light'} bind:this={dialog}>
  <div class="contents">
    <div class="label-with-input">
      <div>Input type:</div>
      <SettingsDropdown {theme} options={inputTypes} bind:value={data.type}/>
    </div>

    {#if data.type !== 'textBlock'}
      <div class="label-with-input">
        <div class:error={isNameIncorrect}>
          Input name to reference it in the code, it should follow the general JavaScript/Python naming conventions,
          i.e. be named like <code>thisIsMyVariable</code> for JavaScript or <code>this_is_my_variable</code> for
          Python:
        </div>
        <SettingsInput {theme} bind:value={data.attributes.name}/>
      </div>

      <div class="label-with-input">
        <div>Input label (displayed to the left of the input):</div>
        <SettingsInput {theme} bind:value={data.attributes.label}/>
      </div>
    {/if}

    <div class="label-with-input">
      <div>
        {#if data.type !== 'textBlock'}
          Input description (displayed in smaller font right below the label):
        {:else}
          Text block content:
        {/if}
      </div>
      <SettingsInput {theme} bind:value={data.attributes.description}/>
    </div>

    {#if data.type === 'dropdown'}
      <div class="label-with-input">
        <div class:error={areOptionsIncorrect}>Dropdown options, one per line:</div>
        <SettingsInput {theme} multiline bind:value={optionsString}/>
      </div>
    {/if}

    {#if data.type !== 'textBlock'}
      <div class="label-with-input">
        <div class="label-with-checkbox">
          Input default value:
          {#if data.type === 'checkbox'}
            <SettingsCheckbox {theme} bind:value={checkbox}/>
          {/if}
        </div>
        {#if data.type === 'input' || data.type === 'inputWithFileBtn' || data.type === 'passwordBox'}
          <SettingsInput {theme} bind:value={data.attributes.defaultValue}/>
        {:else if data.type === 'textarea'}
          <SettingsInput {theme} multiline bind:value={data.attributes.defaultValue}/>
        {:else if data.type === 'dropdown'}
          <SettingsDropdown {theme} bind:value={data.attributes.defaultValue} options={data.attributes.options}/>
        {/if}
      </div>
    {/if}

    <div class="action-buttons">
      <SettingsButton {theme} on:click={cancel}>
        Cancel
      </SettingsButton>

      <SettingsButton {theme} disabled={isNameIncorrect || areOptionsIncorrect} on:click={save}>
        {editingMode ? "Save" : "Add"}
      </SettingsButton>
    </div>
  </div>
</dialog>

<style>
dialog {
    --bg: #2b2b2b;
    --color: #eeeeee;
    --overlay: #00000088;

    color: var(--color);
    background-color: var(--bg);
    border: none;
    font-family: sans-serif;
    width: 500px;
    padding: 24px;
    border-radius: 12px;
}

dialog.light {
    --bg: #eeeeee;
    --color: #111111;
    --overlay: #00000088;
}

dialog::backdrop {
    background-color: var(--overlay);
    opacity: 1;
    backdrop-filter: blur(4px);
}

.contents {
    display: flex;
    flex-direction: column;
    gap: 36px;
}

.label-with-input {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.label-with-checkbox {
    display: flex;
    align-items: center;
    gap: 8px;
}

.error {
    color: #ff0000;
}

.action-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
}
</style>
