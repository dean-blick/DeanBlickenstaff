<script>
    import Tile from "./gameTile.svelte"

    export let rowData = ['']
    export let keyPosition = -1
    export let lineStatus = [0]
</script>
<div class="flex flex-row font-bold text-3xl">
    {#each rowData as tile,i}
        <Tile character = {tile} activeTile={keyPosition==i} tileStatus = {lineStatus[i]}/>
    {/each}

</div>