import {onMount} from 'svelte';
import type {Theme} from "./types";

export function useThemeChangeObserver(theme: Theme | undefined, updateTheme: (theme: Theme) => void) {
  // If the theme was set manually, don't do anything
  if (theme) return;

  // Do this once before onMount to prevent flickering
  const link: HTMLLinkElement = document.querySelector('head > link[rel="stylesheet"][title="light"]');
  updateTheme(link?.disabled ? 'dark' : 'light');

  onMount(() => {
    if (theme) return;
    const link: HTMLLinkElement = document.querySelector('head > link[rel="stylesheet"][title="light"]');

    updateTheme(link?.disabled ? 'dark' : 'light');

    if (!link) return;

    const observer = new MutationObserver(() => {
      updateTheme(link?.disabled ? 'dark' : 'light');
    });

    observer.observe(link, {
      attributes: true,
      childList: false,
    });

    return () => observer.disconnect();
  });
}
