<script lang="ts">
    let currentString = $state();
    let { outFunction, placeholderText } = $props();
</script>

<div class="flex flex-row mt-4">
    <input class="bg-dark-400 rounded-lg border-dark-100 border-1 mx-2 px-2 text-black" type="text" placeholder={placeholderText} bind:value={currentString}>
    <button class="border-dark-100 border-1 rounded-lg px-2 py-1 text-white" onclick={() => {outFunction(currentString); currentString = ""}}>Submit</button>
</div>