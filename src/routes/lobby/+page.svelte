<script lang="ts">
    import type {PageData} from "./$types";

    export let data: PageData

    $: ({testData} = data)

    function JoinLobby(id) {
        //send request to the server to join the lobby (server should ensure no race condition), if server returns true, navigate to lobby\id\[id]

        // await <some server function>
        //if true <navigate to lobby page>
        //if false <display error>
    }
</script>

<div>
    {#each testData as d}
        <div class="flex flex-row">
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