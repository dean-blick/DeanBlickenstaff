<script lang="ts">
    import { navigating } from "$app/state";
    import { onMount } from "svelte";
    import type { PageData } from "./$types";
	import Selector from "../../../../components/Selector.svelte"
	import { enhance } from "$app/forms"
    let { data }: { data: PageData} = $props();

    let isGameRunning = $state(false);
    let isHost = $state(false);
    let playerID;
    let hostID;
    let game = "InLobby";
    let error = $state(false);

    interface LobbyStateObject {
        playerCount: Number;
        maxPlayers: Number;
        players: Array<String>;
        host: String;
        game: String;
        gameState: Object;
    }
    

    let activeLobbyState: LobbyStateObject = $state({
        playerCount: 0,
        maxPlayers: 99,
        players: [],
        host: "",
        game: "",
        gameState: {}
    })

    interface SimplePlayerObject {
        playerName: String;
        playerID: String;
    }

    function playersToPlayerNames(players: Array<SimplePlayerObject>): Array<String> {
        let arr = [];
        players.forEach((element) => {
            arr.push(element.playerName)
        })
        return arr;
    }


    



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
            console.log(value)
            if(value.includes("error")) {
                error = true;
                break;
            }
            if(value != undefined) parseLobbyUpdate(JSON.parse(value))
            console.log("resp", done, value);
            if (done) break;
            result += `${value}<br>`;
        }
    }

    let formInput = {
        game: "TicTacToe"
    }

    async function sendGameRequest(game: String) {
        const response = await fetch(`../streamAPI/${location.href.split('/')[5]}`, {
			method: 'POST',
			body: JSON.stringify({ isStartRequest: true, game: game, turnInfo: {} }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
    }

    async function sendGameTurn(game, turnInfo) {
        const response = await fetch(`../streamAPI/${location.href.split('/')[5]}`, {
			method: 'POST',
			body: JSON.stringify({ isStartRequest: false, game: game, turnInfo: turnInfo }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
    }

    function parseLobbyUpdate(newLobbyState: LobbyStateObject) {
        console.log('parsing lobby')
        activeLobbyState = newLobbyState
    }

    //get new players in an updated lobbyInfo object from the stream

    onMount(async () => {
        let lobbyInfo = data.testData[0];
        if(lobbyInfo == undefined){
            console.log("lobby does not exist")
            return;
        }
        playerID = data.playerID;
        hostID = lobbyInfo.host;
        if (String(playerID) == String(hostID)) isHost = true;
        getStream();
        activeLobbyState.game = "InLobby";
        activeLobbyState.host = hostID;
        activeLobbyState.maxPlayers = lobbyInfo.maxPlayers;
        activeLobbyState.playerCount = lobbyInfo.playerCount;
        activeLobbyState.players = playersToPlayerNames(lobbyInfo.players);
    })
    
    
    
</script>


<div>
    {#if !isGameRunning && !error}
        <div class="flex flex-row">
            <div class="flex flex-col w-1/2">
                <h>Players:</h>
                {#each activeLobbyState.players as player}
                    <div>
                        {player}
                    </div>
                {/each}
            </div>
            {#if isHost}
            <div class="flex flex-col">
                <Selector
                    options={["TicTacToe"]}
                    switchCondition={true}
                    exportFunction={() => {}}
                />
                <input name="game" type="hidden" value={formInput.game}/>
                <button onclick={async (e) => {
                    sendGameRequest("TicTacToe")
                }}>Start Game</button>
            </div>
            
            {/if}
        </div>
    {:else if !error}
        Display Live Game info
    {:else}
        <div>
            The lobby no longer exists. Please create a new lobby
        </div>
    {/if}
    
</div>