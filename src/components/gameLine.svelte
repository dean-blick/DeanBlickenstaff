<script lang="ts">
    import Tile from "./gameTile.svelte"

    let { rowData = [''], keyPosition = -1, lineStatus = [0] } = $props();
</script>
<div class="flex flex-row font-bold text-3xl">
    {#each rowData as tile,i}
        <Tile character = {tile} activeTile={keyPosition==i} tileStatus = {lineStatus[i]}/>
    {/each}

</div>