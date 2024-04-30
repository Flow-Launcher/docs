<script lang="ts">
import {ComponentData, Theme} from "../types";
import CodeDisplay from "./CodeDisplay.svelte";

import {js, py, ts, generateSettingsTemplate} from '../settings-generators';
import SettingsButton from "./inputs/SettingsButton.svelte";

const STORAGE_KEY = '__settings-typings-language__';

export let theme: Theme;

let data: ComponentData[] = [];

let dialogElement: HTMLDialogElement | null = null;

let language = sessionStorage.getItem(STORAGE_KEY) ?? 'typescript';
$: sessionStorage.setItem(STORAGE_KEY, language);

let outputs: {
  js: string;
  py: string;
  ts: string;
  yaml: string;
} = {
  js: '',
  py: '',
  ts: '',
  yaml: '',
};

export function show(newData: ComponentData[]) {
  data = newData;
  outputs = {
    js: js(data),
    py: py(data),
    ts: ts(data),
    yaml: generateSettingsTemplate(data),
  };
  dialogElement?.showModal();
}

function cancel(): void {
  dialogElement?.close();
}

function onBodyKeyup(event: KeyboardEvent): void {
  if (event.key !== "Escape") return;
  cancel();
}
</script>

<svelte:window on:keyup={onBodyKeyup}/>

<dialog class:light={theme === 'light'} bind:this={dialogElement}>
  <div class="dialog-content">
    <CodeDisplay {theme} filename="SettingsTemplate.yaml" displayFilename language="yaml" code={outputs.yaml} />

    <div class="typings-choice-container">
      <div class="typings-label">Typings for your programming language:</div>
      <div class="languages">
        <label>
          <input type="radio" name="lang" bind:group={language} value="ts">
          TypeScript
        </label>
        <label>
          <input type="radio" name="lang" bind:group={language} value="js">
          JavaScript
        </label>
        <label>
          <input type="radio" name="lang" bind:group={language} value="py">
          Python
        </label>
      </div>
    </div>

    <div class:hidden={language !== 'ts'}>
      <CodeDisplay
        {theme}
        filename="Settings.ts"
        displayFilename
        language="ts"
        code={outputs.ts}
      />
    </div>

    <div class:hidden={language !== 'js'}>
      <CodeDisplay
        {theme}
        filename="Settings.js"
        displayFilename
        language="js"
        code={outputs.js}
      />
    </div>

    <div class:hidden={language !== 'py'}>
      <CodeDisplay
        {theme}
        filename="Settings.py"
        displayFilename
        language="py"
        code={outputs.py}
      />
    </div>

    <div class="action-buttons">
      <SettingsButton {theme} on:click={cancel}>Close</SettingsButton>
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

.dialog-content {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.typings-label {
    font-weight: bold;
}

.typings-choice-container {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.languages {
    display: flex;
    gap: 24px;
}

.hidden {
    display: none;
}

.action-buttons {
    display: flex;
    justify-content: flex-end;
}
</style>
