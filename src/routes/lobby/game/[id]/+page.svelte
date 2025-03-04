<script lang="ts">
    import { navigating } from "$app/state";
    import { onMount } from "svelte";
    import type { PageData } from "./$types";
    import type { Duplex } from "stream";
    let { data }: { data: PageData} = $props();

    let stream: Duplex

    let isGameRunning = $state(false);
    let isHost = $state(false);
    let lobbyID;
    let lobbyInfo = data.testData[0];
    //console.log(lobbyInfo);
    let playerID;
    let hostID;



    // $effect(() => {
    //     if(navigating) {
    //         sendPlayerLeave()
    //     }
    // })

    //recieve updated lobby state

    let result = "";

    async function getStream() {
        const response = await fetch(`../streamAPI/${location.href.split('/')[5]}`, {
            method: "GET",
            headers: {
                "Content-Type": "text/event-stream",
            },
        });
        const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
        while (true) {
            const { value, done } = await reader.read();
            console.log("resp", done, value);
            if (done) break;
            result += `${value}<br>`;
        }
    }

    //get new players in an updated lobbyInfo object from the stream

    onMount(async () => {
        getStream();

        playerID = data.playerID
        hostID = lobbyInfo.host
        isGameRunning = lobbyInfo.isGameRunning
        if (String(playerID) == String(hostID)) isHost = true;
    })
    
    
    // async function sendPlayerLeave() {
    //     const response = await fetch('/', {
    //         method: 'POST',
    //         body: JSON.stringify({ 'playerID': data.playerID})
    //     })
    // }
    
</script>


<div>
    {#if !isGameRunning}
        <div class="flex flex-col">
            {#each lobbyInfo.players as player}
                <div>
                    {player.playerName}
                </div>
            {/each}
        </div>
        {#if isHost}
            <div>
                Start Game
            </div>
        {/if}
    {:else}
        Display Live Game info
    {/if}
    
</div>