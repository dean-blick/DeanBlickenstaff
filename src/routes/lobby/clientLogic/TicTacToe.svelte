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

    let tictactoe: TicTacToeGameState = $state(gameState.state)

    let turn: boolean = $state();

    const yourMarker = tictactoe.yourMarker;

    $effect(() => {
        turn = (tictactoe.currentTurn == playerID)
        //quickly display some kind of turn notification
    })

    function processInput(identifier) {
        tictactoe.board[identifier] = yourMarker;
        exportFunction(identifier)
        turn = false;
        tictactoe.currentTurn = "";
    }
    
</script>

<div>
    {#if turn}
        <div class="flex flex-col">
            <div class="flex flex-row">
                <TicTacToeButton bind:value={tictactoe.board[0]} exportFunction={processInput} identifier={0} bind:enabled={turn}/>
                <TicTacToeButton bind:value={tictactoe.board[1]} exportFunction={processInput} identifier={1} bind:enabled={turn}/>
                <TicTacToeButton bind:value={tictactoe.board[2]} exportFunction={processInput} identifier={2} bind:enabled={turn}/>
            </div>
            <div class="flex flex-row">
                <TicTacToeButton bind:value={tictactoe.board[3]} exportFunction={processInput} identifier={3} bind:enabled={turn}/>
                <TicTacToeButton bind:value={tictactoe.board[4]} exportFunction={processInput} identifier={4} bind:enabled={turn}/>
                <TicTacToeButton bind:value={tictactoe.board[5]} exportFunction={processInput} identifier={5} bind:enabled={turn}/>
            </div>
            <div class="flex flex-row">
                <TicTacToeButton bind:value={tictactoe.board[6]} exportFunction={processInput} identifier={6} bind:enabled={turn}/>
                <TicTacToeButton bind:value={tictactoe.board[7]} exportFunction={processInput} identifier={7} bind:enabled={turn}/>
                <TicTacToeButton bind:value={tictactoe.board[8]} exportFunction={processInput} identifier={8} bind:enabled={turn}/>
            </div>
        </div>
    {:else}
        <div>
            <div class="flex flex-col">
                <div class="flex flex-row">
                    <div class="w-100 h-100 bg-white border-black">{tictactoe.board[0]}</div>
                    <div class="w-100 h-100 bg-white border-black">{tictactoe.board[1]}</div>
                    <div class="w-100 h-100 bg-white border-black">{tictactoe.board[2]}</div>
                </div>
                <div class="flex flex-row">
                    <div class="w-100 h-100 bg-white border-black">{tictactoe.board[3]}</div>
                    <div class="w-100 h-100 bg-white border-black">{tictactoe.board[4]}</div>
                    <div class="w-100 h-100 bg-white border-black">{tictactoe.board[5]}</div>
                </div>
                <div class="flex flex-row">
                    <div class="w-100 h-100 bg-white border-black">{tictactoe.board[6]}</div>
                    <div class="w-100 h-100 bg-white border-black">{tictactoe.board[7]}</div>
                    <div class="w-100 h-100 bg-white border-black">{tictactoe.board[8]}</div>
                </div>
            </div>
        </div>
    {/if}
</div>