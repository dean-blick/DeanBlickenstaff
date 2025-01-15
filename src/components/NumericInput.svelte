<script>
    let { value, min, max, updateFunc, disableCondition, label} = $props()

    $effect(() => {
        updateFunc(value)
    })

    
</script>

<div class="flex flex-row items-center justify-between">
    <div class="text-white mx-2 my-2">
        {label}
    </div>
	<input class="text-white my-2 h-8 mx-2 bg-transparent border border-slate-100 rounded-md pl-1 disabled:opacity-50" disabled={disableCondition} type="number" bind:value={value} min={min} max={max} />
	<input class="appearance-none bg-transparent border border-red rounded-lg my-2 h-2 mx-2 accent-blue-400 disabled:opacity-50" disabled={disableCondition} type="range" bind:value={value} min={min} max={max} />
</div>