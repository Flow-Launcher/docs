<script lang="ts">
import type {Theme} from "../types";

export let theme: Theme;
</script>

<div class="loader" class:light={theme === 'light'}/>

<style>
.loader {
    --color: #000;
    --color-transparent: #0000;
    position: relative;
    width: 100px;
    aspect-ratio: 1;
    background-image: conic-gradient(var(--color-transparent), var(--color));
    mask: radial-gradient(farthest-side, #0000 85%, #000 85%);
    border-radius: 50%;
    animation: spin-spinner 1s infinite linear;
}

.loader.light {
    --color: #444;
    --color-transparent: #4440;
}

@keyframes spin-spinner {
    to {
        transform: rotate(1turn);
    }
}
</style>
