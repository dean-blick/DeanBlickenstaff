<script lang="ts">
	import { goto } from "$app/navigation"
	import TextInput from "../../components/TextInput.svelte"
    import type {PageData} from "./$types";

    const { data } = $props<{ data: PageData }>()

    let testData = $derived(data)

    let createLobbyName = $state("Lobby Name")

    let userName = $state("")

    let isUsernameFilled = $derived(userName ? true : false)

    let maxPlayers = $state(2)

    let isPublic = $state(true)

    async function CreateLobby(lobbyName, isPublic, userName, maxPlayers) {
        //let createResult = await response.json() // of type ObjectId String
    }

    async function JoinLobby(id) {
        //send request to the server to join the lobby (server should ensure no race condition), if server returns true, navigate to lobby\id\[id]

        // await <some server function>
        //if true <navigate to lobby page>
        //if false <display error>
        const response = await fetch(`http://[::1]:5173/lobby/id/${id}`)
        let joinResult = await response.json()
        if (joinResult == true) {
            goto(`/lobby/game/${id}`)
        } else {
            
        }
        console.log(joinResult)
    }
</script>

<div class="flex flex-col">
    <div>
        <input class="my-4 bg-dark-400 rounded-lg border-dark-100 border-1 mx-2 px-2 text-black" type="text" placeholder={"Username"} bind:value={userName}>
    </div>
    <div class="flex flex-row">
        <form method="POST" action="/lobby">
            <input class="bg-dark-400 rounded-lg border-dark-100 border-1 mx-2 px-2 text-black" type="text" name = "lobbyName" placeholder={"lobbyName"} bind:value={createLobbyName}>
            <input class="bg-dark-400 rounded-lg border-dark-100 border-1 mx-2 px-2 text-black" type="number" name = "maxPlayers" placeholder={"Max Players"} bind:value={maxPlayers}>
            <input class="bg-dark-400 rounded-lg border-dark-100 border-1 mx-2 px-2 text-black" type="checkbox" name = "isPublic" placeholder={"Public?"} bind:checked={isPublic}>
            <button class="ml-8 customShadow relative overflow-hidden px-5 py-2 group rounded-full bg-white text-slate-950 transition hover:bg-blue-500 self-center"
                onclick={() => {}}>
                Create Lobby
            </button>
        </form>
        
    </div>
    {#each testData as d}
        <div class="flex flex-row mt-2">
            <article>
                <h2>{d.name}</h2>
                <h3 class="pl-8">Players:
                    {#each d.players as player}
                        <p class="pl-4">- {player}</p>
                    {/each}
                </h3>
            </article>
            <button class="ml-8 customShadow relative overflow-hidden px-5 py-2 mt-6 group rounded-full bg-white text-slate-950 transition hover:bg-blue-500 self-center"
                onclick={() => JoinLobby(d._id)}>
                Join Lobby
            </button>
        </div>
    {/each}
    
</div>