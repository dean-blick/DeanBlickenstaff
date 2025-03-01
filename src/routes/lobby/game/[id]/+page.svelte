<script lang="ts">
    import { navigating } from "$app/state";
    import { onMount } from "svelte";
    import type { PageData } from "./$types";
    import type { Duplex } from "stream";
    let { data }: { data: PageData} = $props();

    let stream: Duplex

    // $effect(() => {
    //     if(navigating) {
    //         sendPlayerLeave()
    //     }
    // })

    let result = "";

    async function getStream() {
    const response = await fetch(location.href);
    const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
    while (true) {
        const { value, done } = await reader.read();
        console.log("resp", done, value);
        if (done) break;
        result += `${value}<br>`;
    }
    }

    onMount(async () => {
        getStream();
    })
    
    
    // async function sendPlayerLeave() {
    //     const response = await fetch('/', {
    //         method: 'POST',
    //         body: JSON.stringify({ 'playerID': data.playerID})
    //     })
    // }
    
</script>


<div>
    You are in the lobby
</div>