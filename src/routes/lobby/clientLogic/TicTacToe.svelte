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
        winner: string;
    }

    let { gameState = $bindable(), playerID, exportFunction } = $props<{gameState: GameState, playerID: string, exportFunction: Function}>()

    let tictactoe: TicTacToeGameState = $derived(gameState.state)

    let turn: boolean = $state();

    let gameOver: boolean = $state(false);

    let board: Array<string> = $derived(tictactoe.board)

    let marker: string = $derived(tictactoe.markers[playerID]);

    let winner: string = $derived(tictactoe.winner)

    $effect(() => {
        turn = (tictactoe.currentTurn == playerID)
        if(turn) {
            //quickly display some kind of turn notification
        }
    })

    $effect(() => {
        if(winner != "") {
            gameOver = true
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
            <TicTacToeButton value={board[i]} exportFunction={processInput} identifier={i} enabled={turn && !gameOver}/>
            {/each}
        </div>
        {#if turn && !gameOver}
        <div class="text-3xl mt-4">It is your turn</div>
        {/if}
        {#if gameOver}
            <div class="text-3xl mt-4">{winner} wins!</div>
        {/if}
        
    </div>
</div>