import { testData } from "$lib/server/testData";
import { ObjectId } from "mongodb";
import test from "node:test";

interface TicTacToeGameState {
    yourMarker: string;
    currentTurn: string;
    board: Array<string>;
}

interface SimplePlayerObject {
    playerName: string;
    playerID: string;
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

export async function updateTicTacToeGameState(lobbyID, turnInfo, playerID, isStartRequest, lobbyState): Promise<TicTacToeGameState> {
    let tictactoeGameState: TicTacToeGameState
    
    let players = playersToPlayerIDs(lobbyState.players)
    if(lobbyState == null){
        return {
            yourMarker: "",
            currentTurn: "",
            board: [" "," "," "," "," "," "," "," "," "]
        }
    }
    if (isStartRequest) {
        tictactoeGameState = {
            yourMarker: "",
            currentTurn: lobbyState.players[0].playerID,
            board: [" "," "," "," "," "," "," "," "," "]
        }
        await testData.updateOne({"_id": ObjectId.createFromHexString(lobbyID)}, {$set:{"gameState": tictactoeGameState}})
    } else {
        let nextTicTurnPlayerID = getNextPlayerID(players, lobbyState.gameState.currentTurn)
        tictactoeGameState = {
            yourMarker: "",
            currentTurn: nextTicTurnPlayerID,
            board: turnInfo
        }
        await testData.updateOne({"_id": ObjectId.createFromHexString(lobbyID)}, {$set:{"gameState": tictactoeGameState}})
    }
    return tictactoeGameState
}

