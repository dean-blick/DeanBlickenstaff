import { testData } from "$lib/server/testData";
import { ObjectId } from "mongodb";
import test from "node:test";

interface TicTacToeGameState {
    markers: {};
    currentTurn: string;
    board: Array<string>;
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

export async function updateTicTacToeGameState(lobbyID, turnInfo, playerID, isStartRequest, lobbyState): Promise<void> {
    let tictactoeGameState: TicTacToeGameState
    
    let players = playersToPlayerIDs(lobbyState.players)
    if (isStartRequest) {
        tictactoeGameState = {
            markers: {[players[0]]: "x", [players[1]]: "o"},
            currentTurn: players[0],
            board: [" "," "," "," "," "," "," "," "," "]
        }
        let state: GameState = {game: "TicTacToe", state: tictactoeGameState}
        await testData.updateOne({"_id": ObjectId.createFromHexString(lobbyID)}, {$set:{"gameState": state}})
    } else {
        let nextTicTurnPlayerID = getNextPlayerID(players, lobbyState.gameState.state.currentTurn)
        tictactoeGameState = {
            markers: {[players[0]]: "x", [players[1]]: "o"},
            currentTurn: nextTicTurnPlayerID,
            board: turnInfo
        }
        let state: GameState = {game: "TicTacToe", state: tictactoeGameState}
        await testData.updateOne({"_id": ObjectId.createFromHexString(lobbyID)}, {$set:{"gameState": state}})
    }
}

