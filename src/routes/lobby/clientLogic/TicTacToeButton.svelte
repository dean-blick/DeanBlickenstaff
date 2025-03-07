<script lang="ts">

    let {value = $bindable(), enabled = $bindable(), exportFunction, identifier} = $props<{value: string, enabled: boolean, exportFunction: Function, identifier: number}>()

    function stepFunction(identifier) {
        exportFunction(identifier)
    }
</script>

<button class="py-4 px-7 text-black text-6xl bg-white border-2 border-black" disabled={!enabled} class:cursor-not-allowed={!enabled} onclick={() => stepFunction(identifier)}>{value}</button>