<script lang="ts">
import {FlowPlugin} from "../types";

export let plugin: FlowPlugin;
</script>

<tr>
  <td>
    <div class="icon-with-name">
      <img src={plugin.IcoPath} alt="" class="icon">
      <a href={plugin.UrlSourceCode} target="_blank" rel="noopener noreferrer">
        {plugin.Name}
      </a>
    </div>
  </td>
  <td>{plugin.Description ?? ""}</td>
  <td>{plugin.Author ?? ""}</td>
  <td>{plugin.Version ?? ""}</td>
</tr>

<style>
.icon {
    width: 32px;
    aspect-ratio: 1;
}

.icon-with-name {
    display: flex;
    align-items: center;
    gap: 8px;
}
</style>
