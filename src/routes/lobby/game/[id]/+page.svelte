<script lang="ts">
    import { navigating } from "$app/state";
    import type { PageData } from "./$types";
    let { data }: { data: PageData} = $props();

    $effect(() => {
        if(navigating) {
            sendPlayerLeave()
        }
    })
    
    async function sendPlayerLeave() {
        const response = await fetch('/', {
            method: 'POST',
            body: JSON.stringify({ 'playerID': data.playerID})
        })
    }
    
</script>


<div>
    You are in the lobby
</div>