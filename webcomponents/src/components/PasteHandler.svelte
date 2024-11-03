<script lang="ts">
import {createEventDispatcher} from "svelte";
import {ComponentData, type ComponentType, type FileData} from "../types";
import {load} from 'js-yaml';

const emit = createEventDispatcher<{
  setData: ComponentData[];
}>();

const types: ComponentType[] = ['textBlock', 'input', 'inputWithFileBtn', 'inputWithFolderBtn', 'passwordBox', 'textarea', 'dropdown', 'checkbox'];
function verifyData(parsed: { body?: ComponentData[] }): boolean {
  return parsed?.body && Array.isArray(parsed.body) && parsed.body.every(v => types.includes(v.type) && v.attributes);
}

async function onPaste(e: ClipboardEvent): Promise<void> {
  const target = e.target as HTMLElement;
  const tagName = target.tagName;
  if (tagName === 'INPUT' || tagName === 'TEXTAREA' || target.isContentEditable) return;

  let localData: FileData | undefined = undefined
  if (e.clipboardData?.files?.length) {
    for (const file of Array.from(e.clipboardData?.files ?? [])) {
      if (file.name !== 'SettingsTemplate.yaml') continue;
      try {
        const parsedData = load(await file.text()) as FileData;
        if (verifyData(parsedData)) {
          localData = parsedData;
          break;
        }
      } catch {
        // Ignore errors
      }
    }
  } else {
    try {
      const parsedData = load(e.clipboardData?.getData('text') ?? '{}') as FileData;
      if (verifyData(parsedData)) {
        localData = parsedData;
      }
    } catch {
      // Ignore errors
    }
  }
  if (!localData) return;
  for (const item of localData.body) {
    item.id = crypto.randomUUID();
  }
  emit('setData', localData.body);
}

</script>

<svelte:window on:paste={onPaste} />
