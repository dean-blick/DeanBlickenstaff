<script lang="ts">
	import TicTacToeButton from "./TicTacToeButton.svelte"

    interface GameState {
        game: string;
        state: Object;
    }

    interface TicTacToeGameState {
        markers: {};
        currentTurn: string;
        board: Array<string>;
    }

    let { gameState = $bindable(), playerID, exportFunction } = $props<{gameState: GameState, playerID: string, exportFunction: Function}>()

    let tictactoe: TicTacToeGameState = $derived(gameState.state)

    let turn: boolean = $state();

    let board: Array<string> = $derived(tictactoe.board)

    let marker: string = $derived(tictactoe.markers[playerID]);

    $effect(() => {
        turn = (tictactoe.currentTurn == playerID)
        if(turn) {
            //quickly display some kind of turn notification
        }
    })

    function processInput(identifier) {
        board[identifier] = marker;
        turn = false;
        tictactoe.currentTurn = "";
        exportFunction("TicTacToe", board)
    }
    
</script>

<div class="flex flex-col h-full items-center">
    <div class="flex flex-col h-full w-[calc(var(--height))] items-center">
        <div class="grid grid-rows-3 grid-cols-3 w-1/3 mt-10">
        {#each Array.from({length: 9}) as _, i}
        <TicTacToeButton value={board[i]} exportFunction={processInput} identifier={i} enabled={turn}/>
        {/each}
        {#if turn}
            <div>it is your turn</div>
        {/if}
        </div>
    </div>
</div>