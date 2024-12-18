<script>
    let currentString;
    export let outFunction;
</script>

<div class="flex flex-row">
    <input class="bg-dark-400 rounded-lg border-dark-100 border-1 mx-2 px-2 text-black" type="text" bind:value={currentString}>
    <button class="border-dark-100 border-1 rounded-lg px-2 py-1 text-white" on:click={outFunction(currentString)}>Submit</button>
</div>