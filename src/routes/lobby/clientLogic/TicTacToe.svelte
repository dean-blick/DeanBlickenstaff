<script lang="ts">
	import TicTacToeButton from "./TicTacToeButton.svelte"

    interface GameState {
        game: string;
        state: Object;
    }

    interface TicTacToeGameState {
        yourMarker: string;
        currentTurn: string;
        board: Array<string>;
    }

    let { gameState = $bindable(), playerID, exportFunction } = $props<{gameState: GameState, playerID: string, exportFunction: Function}>()

    let tictactoe: TicTacToeGameState = $state()

    let turn: boolean = $state();

    let board: Array<string> = $state()

    $effect(() => {
        tictactoe = gameState.state
        turn = (tictactoe.currentTurn == playerID)
        board = tictactoe.board
        if(turn) {
            //quickly display some kind of turn notification
        }
    })

    function processInput(identifier) {
        board[identifier] = tictactoe.yourMarker;
        turn = false;
        tictactoe.currentTurn = "";
        exportFunction("TicTacToe", board)
    }
    
</script>

<div class="flex flex-col h-full">
    {#if turn}
        <div class="flex flex-col h-1/2">
            <div class="flex flex-row h-100">
                <TicTacToeButton bind:value={board[0]} exportFunction={processInput} identifier={0} bind:enabled={turn}/>
                <TicTacToeButton bind:value={board[1]} exportFunction={processInput} identifier={1} bind:enabled={turn}/>
                <TicTacToeButton bind:value={board[2]} exportFunction={processInput} identifier={2} bind:enabled={turn}/>
            </div>
            <div class="flex flex-row">
                <TicTacToeButton bind:value={board[3]} exportFunction={processInput} identifier={3} bind:enabled={turn}/>
                <TicTacToeButton bind:value={board[4]} exportFunction={processInput} identifier={4} bind:enabled={turn}/>
                <TicTacToeButton bind:value={board[5]} exportFunction={processInput} identifier={5} bind:enabled={turn}/>
            </div>
            <div class="flex flex-row">
                <TicTacToeButton bind:value={board[6]} exportFunction={processInput} identifier={6} bind:enabled={turn}/>
                <TicTacToeButton bind:value={board[7]} exportFunction={processInput} identifier={7} bind:enabled={turn}/>
                <TicTacToeButton bind:value={board[8]} exportFunction={processInput} identifier={8} bind:enabled={turn}/>
            </div>
        </div>
    {:else}
        <div class="flex flex-col">
            <div class="flex flex-row">
                <div class="py-4 px-7 text-black text-6xl bg-white border-2 border-black">{board[0]}</div>
                <div class="py-4 px-7 text-black text-6xl bg-white border-2 border-black">{board[1]}</div>
                <div class="py-4 px-7 text-black text-6xl bg-white border-2 border-black">{board[2]}</div>
            </div>
            <div class="flex flex-row">
                <div class="py-4 px-7 text-black text-6xl bg-white border-2 border-black">{board[3]}</div>
                <div class="py-4 px-7 text-black text-6xl bg-white border-2 border-black">{board[4]}</div>
                <div class="py-4 px-7 text-black text-6xl bg-white border-2 border-black">{board[5]}</div>
            </div>
            <div class="flex flex-row">
                <div class="py-4 px-7 text-black text-6xl bg-white border-2 border-black">{board[6]}</div>
                <div class="py-4 px-7 text-black text-6xl bg-white border-2 border-black">{board[7]}</div>
                <div class="py-4 px-7 text-black text-6xl bg-white border-2 border-black">{board[8]}</div>
            </div>
        </div>
    {/if}
</div>