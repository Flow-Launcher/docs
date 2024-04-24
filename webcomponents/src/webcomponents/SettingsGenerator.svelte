<svelte:options
  customElement={{
    tag: 'settings-generator',
    shadow: 'none',
  }}
/>

<script lang="ts">
import SettingsComponentDemo from './SettingsComponentDemo.svelte';
import SettingsButton from "../components/inputs/SettingsButton.svelte";
import {flip, type FlipParams} from 'svelte/animate';
import {quintOut} from 'svelte/easing';
import type {ComponentData, ComponentDataWithId, Theme} from "../types";
import {useThemeChangeObserver} from "../theme-change-observer";
import SettingsEditDialog from "../components/SettingsEditDialog.svelte";
import {tick} from "svelte";
import SettingsCodeOutputDialog from "../components/SettingsCodeOutputDialog.svelte";
import PasteHandler from "../components/PasteHandler.svelte";

let flipParams: FlipParams = {
  duration: 300,
  easing: quintOut,
};

const STORAGE_KEY = '__settings-data__';

export let upButtonText = '⬆️';
export let downButtonText = '⬇️';
export let editButtonText = '✏️';
export let removeButtonText = '❌';

export let theme: Theme | undefined;
useThemeChangeObserver(theme, newTheme => theme = newTheme);

let editDialog: SettingsEditDialog | null = null;

let itemBeingEdited: ComponentData | null = {
  type: "input",
  attributes: {
    name: "textInput",
    label: "Label",
    description: "Description",
    defaultValue: "Default value",
    options: [],
  },
};

let codeOutputDialog: SettingsCodeOutputDialog | null = null;

let isEditingExistingItem = false;

let data: ComponentDataWithId[] = [];
try {
  data = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '[]');
} catch {
  sessionStorage.removeItem(STORAGE_KEY);
}

$: sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));

function up(index: number): void {
  if (index === 0) return;
  [data[index], data[index - 1]] = [data[index - 1], data[index]];
}

function down(index: number): void {
  if (index === data.length - 1) return;
  [data[index], data[index + 1]] = [data[index + 1], data[index]];
}

function removeAllFields(): void {
  if (!confirm('Are you sure you want to remove all fields?')) return;
  data = [];
}

function generateTemplate(): void {
  if (data.some(isNameIncorrect)) {
    alert('Some fields have the same name. Fix that before continuing.');
    return;
  }
  codeOutputDialog?.show(data);
}

function addNewItem(): void {
  edit(-1);
}

async function edit(index: number): Promise<void> {
  const item = index !== -1 ? data[index] : null;
  isEditingExistingItem = index !== -1;
  itemBeingEdited = item ? {...item} : {
    type: "input",
    attributes: {
      name: "textInput",
      label: "",
      description: "",
      defaultValue: "",
      options: [],
    }
  };
  if (itemBeingEdited?.attributes?.options) {
    itemBeingEdited.attributes.options = [...itemBeingEdited.attributes.options];
  } else {
    if (!itemBeingEdited)
      itemBeingEdited.attributes.options = [];
  }

  // Wait for the dialog to update its DOM before displaying it
  await tick();
  editDialog?.show();
}

function remove(index: number): void {
  data.splice(index, 1);
  data = data;
}

function saveChanges(e: { detail: ComponentDataWithId }): void {
  const item = e.detail;
  if (!item.id) {
    item.id = crypto.randomUUID();
    data.push(item);
    data = data;
  } else {
    const index = data.findIndex(i => i.id === item.id);
    data[index] = item;
    data = data;
  }
}

function onPaste(e: CustomEvent<ComponentDataWithId[]>): void {
  data = e.detail;
}

function isNameIncorrect(item: ComponentDataWithId): boolean {
  return data.some(v => {
    if (item.type === "textBlock") return false;
    return v.attributes.name === item.attributes.name && v.id !== item.id;
  })
}
</script>

<PasteHandler on:setData={onPaste} />

<div class="settings-generator" class:light={theme === 'light'}>
  {#if data.length > 0}
    <div class="top-buttons">
      <SettingsButton {theme} disabled={data.length === 0} on:click={removeAllFields}>
        ❌ Remove all fields
      </SettingsButton>

      <SettingsButton {theme} on:click={generateTemplate}>
        ⚙️ Generate SettingsTemplate.yaml
      </SettingsButton>

      <SettingsButton {theme} on:click={addNewItem}>
        ➕ Add new field
      </SettingsButton>
    </div>
  {/if}

  {#if data.length === 0}
    <div class="no-fields">
      No fields added yet

      <SettingsButton {theme} on:click={addNewItem}>
        ➕ Add new field
      </SettingsButton>
    </div>
  {:else}
    <div class="components">
      {#each data as item, index (item.id)}
        <div animate:flip={flipParams} class="component" class:error={isNameIncorrect(item)}>
          <div class="action-buttons">
            <SettingsButton {theme} isIconButton on:click={() => up(index)}>
              {upButtonText}
            </SettingsButton>

            <SettingsButton {theme} isIconButton on:click={() => down(index)}>
              {downButtonText}
            </SettingsButton>
          </div>

          <SettingsComponentDemo
            {theme}
            readonly
            type={item.type}
            label={item.attributes.label}
            description={item.attributes.description}
            value={item.attributes.defaultValue}
            options={item.attributes.options}
          />

          <div class="action-buttons">
            <SettingsButton {theme} isIconButton on:click={() => edit(index)}>
              {editButtonText}
            </SettingsButton>

            <SettingsButton {theme} isIconButton on:click={() => remove(index)}>
              {removeButtonText}
            </SettingsButton>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<SettingsEditDialog
  {theme}
  bind:data={itemBeingEdited}
  bind:this={editDialog}
  editingMode={isEditingExistingItem}
  on:save={saveChanges}
/>

<SettingsCodeOutputDialog {theme} bind:this={codeOutputDialog} />

<style>
.settings-generator {
    --component-bg: #1f282d;
    --error: #910000;
}

.settings-generator.light {
    --component-bg: #eeeeee;
    --error: #ff7e7e;
}

.top-buttons {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 12px;
    gap: 12px;
}

.no-fields {
    margin-top: 36px;
    gap: 8px;
    font-weight: bold;
    font-size: 20px;
    text-align: center;
    font-family: sans-serif;
}

.components {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.component {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 8px;
    align-items: center;
    padding: 8px;
    background-color: var(--component-bg);
    border: 2px solid var(--component-bg);
    border-radius: 8px;
    transition: background-color 0.15s;
}

.component.error {
    border-color: var(--error);
}

.action-buttons {
    --size: 40px;
    display: grid;
    align-self: stretch;
    grid-template-rows: repeat(2, 1fr);
    gap: 4px;
    min-width: var(--size);
    min-height: calc(var(--size) * 2);
}

.action-buttons :global(button) {
    font-size: 20px;
}
</style>
