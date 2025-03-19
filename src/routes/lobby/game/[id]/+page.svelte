<script lang="ts">
    import { onMount } from "svelte";
    import type { PageData } from "./$types";
	import Selector from "../../../../components/Selector.svelte"
	import TicTacToe from "../../clientLogic/TicTacToe.svelte"
    let { data }: { data: PageData} = $props();

    let isHost = $state(false);
    let playerID = $state('');
    let error = $state(false);

    interface LobbyStateObject {
        playerCount: Number;
        maxPlayers: Number;
        players: Array<string>;
        host: string;
        gameState: GameState;
    }

    interface GameState {
        game: string;
        state: Object;
    }
    

    let activeLobbyState: LobbyStateObject = $state({
        playerCount: 0,
        maxPlayers: 99,
        players: [],
        host: "",
        gameState: {game: "", state: {}}
    })

    interface SimplePlayerObject {
        playerName: string;
        playerID: string;
    }

    function playersToPlayerNames(players: Array<SimplePlayerObject>): Array<string> {
        let arr = [];
        players.forEach((element) => {
            arr.push(element.playerName)
        })
        return arr;
    }

    async function sendGameRequest(game: string) {
        const response = await fetch(`../streamAPI/${location.href.split('/')[5]}`, {
			method: 'POST',
			body: JSON.stringify({ isStartRequest: true, game: game, turnInfo: {} }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
    }

    async function sendGameTurn(game, turnInfo) {
        console.log("game: " + game)
        const response = await fetch(`../streamAPI/${location.href.split('/')[5]}`, {
			method: 'POST',
			body: JSON.stringify({ isStartRequest: false, game: game, turnInfo: turnInfo }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
    }

    async function getLobbyData() {
        let response = await fetch(`../streamAPI/${location.href.split('/')[5]}`)
        activeLobbyState = await response.json()
        console.log(activeLobbyState)
        setTimeout(getLobbyData, 2000)
    }

    onMount(async () => {
        let lobbyInfo = data.testData[0];
        if(lobbyInfo == undefined){
            console.log("lobby does not exist")
            return;
        }
        playerID = data.playerID;
        if (String(playerID) == String(lobbyInfo.host)) isHost = true;
        activeLobbyState.gameState.game = "InLobby";
        activeLobbyState.gameState.state = {};
        activeLobbyState.host = lobbyInfo.host;
        activeLobbyState.maxPlayers = lobbyInfo.maxPlayers;
        activeLobbyState.playerCount = lobbyInfo.playerCount;
        activeLobbyState.players = playersToPlayerNames(lobbyInfo.players);

        getLobbyData()
        //create get loop to update the state
    })
    
</script>


<div class="flex flex-col h-full">
    
    {#if activeLobbyState.gameState.game == "InLobby" && !error}
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
                <button onclick={async (e) => {
                    sendGameRequest("TicTacToe")
                }}>Start Game</button>
            </div>
            
            {/if}
        </div>
    {:else if !error}
    <div class="flex flex-col h-full">
        {#if activeLobbyState.gameState.game == "TicTacToe"}
        <TicTacToe gameState = {activeLobbyState.gameState} playerID={playerID} exportFunction={sendGameTurn}/>
        {/if}
    </div>
    {:else}
        <div>
            The lobby no longer exists. Please create a new lobby
        </div>
    {/if}
</div>