<script lang="ts">

    let {value = $bindable(), enabled = $bindable(), exportFunction, identifier} = $props<{value: string, enabled: boolean, exportFunction: Function, identifier: number}>()

    function stepFunction(identifier) {
        exportFunction(identifier)
    }
</script>

<button class="py-16 text-black text-4xl bg-gray-300 opacity-80 border-2 border-black box-border" disabled={!enabled} class:cursor-not-allowed={!enabled} onclick={() => stepFunction(identifier)}>{value}</button>