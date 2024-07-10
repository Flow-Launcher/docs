<svelte:options
  customElement={{
    tag: 'plugin-directory',
    shadow: 'none',
  }}
/>

<script lang="ts">
import type {FlowPlugin, Theme} from "../types";
import {useThemeChangeObserver} from "../theme-change-observer";
import PluginDisplay from "../components/PluginDisplay.svelte";
import SettingsDropdown from "../components/inputs/SettingsDropdown.svelte";
import PluginSpinner from "../components/PluginSpinner.svelte";
import SettingsButton from "../components/inputs/SettingsButton.svelte";
import SettingsInput from "../components/inputs/SettingsInput.svelte";

export let theme: Theme | undefined;
useThemeChangeObserver(theme, newTheme => theme = newTheme);

let plugins: FlowPlugin[] = [];

const sortingOptions = {
  default: 'Sorting: Default',
  nameAsc: 'Sorting: Name (A-Z)',
  nameDesc: 'Sorting: Name (Z-A)',
  authorAsc: 'Sorting: Author (A-Z)',
  authorDesc: 'Sorting: Author (Z-A)',
  dateAsc: 'Sorting: Date (Oldest first)',
  dateDesc: 'Sorting: Date (Newest first)',
  updatedAsc: 'Sorting: Last update date (Oldest first)',
  updatedDesc: 'Sorting: Last update date (Newest first)',
};

let sorting: keyof typeof sortingOptions = 'default';

let search = '';

let searched: FlowPlugin[] = [];

let pluginPromise: Promise<FlowPlugin[]>;

function downloadPlugins() {
  pluginPromise = fetch('https://cdn.jsdelivr.net/gh/Flow-Launcher/Flow.Launcher.PluginsManifest@plugin_api_v2/plugins.json')
    .then(response => response.json() as unknown as FlowPlugin[])
    .then(data => plugins = data.map((v, i) => {
      v.defaultIndex = i;
      return v;
    }));
}
downloadPlugins();

let trimmedSearch = '';
$: {
  trimmedSearch = search.trim().toLowerCase();
  searched = plugins
    .filter(v => {
      if (trimmedSearch.length === 0) {
        return true;
      }
      return v.Name.toLowerCase().includes(trimmedSearch) || v.Description?.toLowerCase().includes(trimmedSearch) || v.Author?.toLowerCase().includes(trimmedSearch);
    })
    .sort((a, b) => {
      switch (sorting) {
        case 'nameAsc':
          return a.Name.localeCompare(b.Name);
        case 'nameDesc':
          return b.Name.localeCompare(a.Name);
        case 'authorAsc':
          return a.Author?.localeCompare(b?.Author) ?? -1;
        case 'authorDesc':
          return b.Author?.localeCompare(a?.Author) ?? 1;
        case 'dateAsc':
          return a.DateAdded.localeCompare(b.DateAdded);
        case 'dateDesc':
          return b.DateAdded.localeCompare(a.DateAdded);
        case 'updatedAsc':
          return a.LatestReleaseDate && b.LatestReleaseDate ? a.LatestReleaseDate?.localeCompare(b.LatestReleaseDate) : 1_000_000_000;
        case 'updatedDesc':
          return b.LatestReleaseDate && a.LatestReleaseDate ? b.LatestReleaseDate?.localeCompare(a.LatestReleaseDate) : 1_000_000_000;
        case 'default':
          return a.defaultIndex - b.defaultIndex;
        default:
          return 0;
      }
    });
}
</script>

{#await pluginPromise}
  <PluginSpinner {theme} />
{:then _}
  {#if plugins.length === 0}
    <p>No plugins found</p>
  {:else}
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
      <SettingsInput {theme} bind:value={search} placeholder="Search plugins" />
      <SettingsDropdown {theme} bind:value={sorting} options={sortingOptions}  />
    </div>

    <table class="plugins">
      <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Author</th>
        <th>Version</th>
      </tr>
      </thead>
      <tbody>
      {#each searched as plugin (plugin.ID)}
        <PluginDisplay {plugin} />
      {/each}
      </tbody>
    </table>
  {/if}
{:catch error}
  <p>
    An error occurred while downloading the list of plugins.
    <SettingsButton {theme} on:click={downloadPlugins}>Try again</SettingsButton>
  </p>
{/await}

<style>
</style>
