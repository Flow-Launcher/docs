<script lang="ts">
import {Theme} from "../types";
import {tick} from "svelte";

export let filename: string;
export let displayFilename = false;
export let language: 'js' | 'ts' | 'py' | 'yaml';
export let code: string;
export let limitHeight = true;
export let theme: Theme;

let codeElement: HTMLElement | null = null;

$: if (code && codeElement && window.Prism) {
  tick().then(() => {
    window.Prism.highlightElement(codeElement);
  });
}
</script>

<div class="code-display" class:light={theme === 'light'}>
  {#if displayFilename}
    <div class="filename">{filename}</div>
  {/if}
  <div class:limitHeight>
    <pre data-lang={language}><code bind:this={codeElement} class="lang-{language}">{code}</code></pre>
  </div>
</div>

<style>
.code-display {
    --button: #34434b;
    --button-text: #ffffff;

    border: 1px solid var(--button);
    border-radius: 4px 4px 0 0;
    position: relative;
}

.code-display.light {
    --button: #808080;
    --button-text: #ffffff;
}

.filename {
    padding: 8px;
    background-color: var(--button);
    color: var(--button-text);
    border: none;
    display: flex;
    align-items: center;
    border-bottom-right-radius: 4px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
}

.limitHeight {
    max-height: 250px;
    overflow: auto;
}

pre {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    padding-top: 24px !important;
}

pre::after {
    display: none;
}
</style>
