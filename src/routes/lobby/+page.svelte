<script lang="ts">
	import { goto } from "$app/navigation"
    import type {PageData} from "./$types";
    import { enhance } from "$app/forms";
    import type { ActionData } from "./$types";
    import { isLoading } from "../../stores/LoadingState.svelte.js";

    //This form object is like magical stuff that grabs the response from the post request.. very cool
    let { data, form }: { data: PageData, form: ActionData } = $props();

    let testData = $derived(data.testData)

    let createLobbyName = $state("")

    let userName = $state("")

    let maxPlayers: number = $state(2)

    let isPublic = $state(true)

    //Thank you kirlich on stack overflow

    function sleep(ms) {
        isLoading.value = true;
		return new Promise((resolve) => setTimeout(resolve, ms))
	}

    async function JoinLobby(id, attempts) {
        await sleep(250).then(async () => {
            isLoading.value = false
            console.log(form)
            if (form.success == true) {
                goto(`/lobby/game/${id}`)
            } else {
                if (attempts < 25) {
                    await sleep(250).then(() => {
                        JoinLobby(id, attempts + 1)
                    })
                }
            }
        })
    }
</script>



<div class="flex flex-col max-w-[1400px] self-center">
    <div>
        <input class="my-4 bg-dark-400 rounded-lg border-dark-100 border-1 mx-2 px-2 text-black" type="text" placeholder={"Username"} bind:value={userName}>
    </div>
    <div class="flex flex-row">
        <form method="POST" action="?/addLobbyDocument" use:enhance>
            <input class="bg-dark-400 rounded-lg border-dark-100 border-1 mx-2 px-2 text-black" type="text" name = "lobbyName" placeholder={"lobbyName"} bind:value={createLobbyName}>
            <input class="bg-dark-400 rounded-lg border-dark-100 border-1 mx-2 px-2 text-black" type="number" name = "maxPlayers" placeholder={"Max Players"} bind:value={maxPlayers}>
            Make lobby public?
            <input class="bg-dark-400 rounded-lg border-dark-100 border-1 mx-2 px-2 text-black" type="checkbox" name = "isPublic" placeholder={"Public?"} bind:checked={isPublic}>
            <input type="hidden" name="playerName" value={userName}/>
            <input type="hidden" name="playerID" value={data.playerID}/>
            <button disabled={!createLobbyName || !userName} class="ml-8 customShadow relative overflow-hidden px-5 py-2 group rounded-full bg-white text-slate-950 transition hover:bg-blue-500 disabled:bg-gray-600 disabled:hover:bg-gray-600 self-center"
                onclick={() => {sleep(500).then(() => {JoinLobby(form.id, 0)})}}>
                Create Lobby
            </button>
        </form>
    </div>
    {#each testData as d}
        <div class="flex flex-row mt-2 rounded-lg bg-gray-900 p-4 justify-between">
            <article>
                <h2>{d.name}</h2>
                <h3 class="pl-8">Players:
                    {#each d.players as player}
                        <p class="pl-4">- {player.playerName}</p>
                    {/each}
                </h3>
            </article>
            <form method="POST" action="?/playerJoinRequest" use:enhance>
                <input type="hidden" name="lobbyId" value={d._id}/>
                <input type="hidden" name="playerName" value={userName}/>
                <input type="hidden" name="playerID" value={data.playerID}/>
                <button disabled={!userName} class="ml-8 customShadow relative overflow-hidden px-5 py-2 mt-6 group rounded-full bg-white text-slate-950 transition hover:bg-blue-500 disabled:bg-gray-600 disabled:hover:bg-gray-600 self-center"
                onclick={() => {JoinLobby(d._id, 0)}}>
                Join Lobby
            </button>
            </form>
            
        </div>
    {/each}
    
</div>