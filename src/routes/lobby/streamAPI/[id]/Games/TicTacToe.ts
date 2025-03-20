import { testData } from "$lib/server/testData";
import { ObjectId } from "mongodb";
import test from "node:test";

interface TicTacToeGameState {
    markers: {};
    currentTurn: string;
    board: Array<string>;
    winner: string;
}

interface SimplePlayerObject {
    playerName: string;
    playerID: string;
}

interface GameState {
    game: string;
    state: Object;
}

function playersToPlayerIDs(players: Array<SimplePlayerObject>): Array<string> {
    let arr = [];
    players.forEach((element) => {
        arr.push(element.playerID)
    })
    return arr;
}

function getNextPlayerID(players: Array<string>, currentID) {
    let index = players.indexOf(currentID) + 1
    if(index >= players.length) {
        index = 0;
    }
    return players[index]
}

function checkForWinner(board): string {
    let result = ""
    result = checkHorizonalLines(board)
    if (result == "") {
        result = checkVerticalLines(board)
        if (result == "") {
            result = checkDiagonals(board)
        }
    }
    return result
}

function checkHorizonalLines(board): string {
    for (let i = 0; i < 3; i++) {
        if(board[i*3] == " ") continue
        if(board[i*3] == board[(i*3)+1] && board[i*3] == board[(i*3)+2]) {
            return board[i*3]
        }
    }
    return ""
}

function checkVerticalLines(board): string {
    for (let i = 0; i < 3; i++) {
        if(board[i] == " ") continue
        if(board[i] == board[i+3] && board[i] == board[i+6]) {
            return board[i]
        }
    }
    return ""
}

function checkDiagonals(board): string {
    if(board[0] != " ") {
        if(board[0] == board[4] && board[0] == board[8]) return board[0]
    }
    if(board[2] != " ") {
        if(board[2] == board[4] && board[2] == board[6]) return board[2]
    }
    return ""
}

export async function updateTicTacToeGameState(lobbyID, turnInfo, playerID, isStartRequest, lobbyState): Promise<void> {
    let tictactoeGameState: TicTacToeGameState
    
    let players = playersToPlayerIDs(lobbyState.players)
    if (isStartRequest) {
        tictactoeGameState = {
            markers: {[players[0]]: "x", [players[1]]: "o"},
            currentTurn: players[0],
            board: [" "," "," "," "," "," "," "," "," "],
            winner: ""
        }
        let state: GameState = {game: "TicTacToe", state: tictactoeGameState}
        await testData.updateOne({"_id": ObjectId.createFromHexString(lobbyID)}, {$set:{"gameState": state}})
    } else {
        let nextTicTurnPlayerID = getNextPlayerID(players, lobbyState.gameState.state.currentTurn)
        tictactoeGameState = {
            markers: {[players[0]]: "x", [players[1]]: "o"},
            currentTurn: nextTicTurnPlayerID,
            board: turnInfo,
            winner: checkForWinner(turnInfo)
        }
        let state: GameState = {game: "TicTacToe", state: tictactoeGameState}
        await testData.updateOne({"_id": ObjectId.createFromHexString(lobbyID)}, {$set:{"gameState": state}})
    }
}

