<script lang="ts">
	import { stringify } from "querystring"

    let {value = $bindable(), enabled = $bindable(), exportFunction, identifier} = $props<{value: string, enabled: boolean, exportFunction: Function, identifier: number}>()

    function stepFunction(identifier) {
        exportFunction(identifier)
    }
</script>

<button class="w-100 h-100 bg-white border-black" disabled={!enabled} onclick={() => stepFunction(identifier)}>{value}</button>