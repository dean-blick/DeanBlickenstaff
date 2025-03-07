
interface TicTacToeGameState {
    yourMarker: string;
    currentTurn: string;
    board: Array<string>;
}

let simplePlayerIDs = new Map<string, Array<string>>();

let simpleTurnIndex: Map<string, number> = new Map()

export function clearTicTacToeLobbyData(lobbyID) {
    simplePlayerIDs.delete(lobbyID)
    simpleTurnIndex.delete(lobbyID)
}

function getTicTacToeNextTurn(lobbyID): string {
    let index = simpleTurnIndex.get(lobbyID)
    let lobbyPlayerTurnOrderArray = simplePlayerIDs.get(lobbyID)
    let playerCount = lobbyPlayerTurnOrderArray.length;
    let returnIndex;
    if(index == playerCount - 1) {
        returnIndex = 0;
    } else {
        returnIndex = index + 1;
    }
    let returnPlayerID = lobbyPlayerTurnOrderArray[returnIndex]
    simpleTurnIndex.set(lobbyID, returnIndex)
    return returnPlayerID
}

export function returnNewTicTacToeState(isStartRequest, lobbyID, turnInfo, playerIDArray ): TicTacToeGameState {
    let tictactoeGameState: TicTacToeGameState
    if (isStartRequest) {
        simplePlayerIDs.set(lobbyID, playerIDArray)
        simpleTurnIndex.set(lobbyID, 0)
        tictactoeGameState = {
            yourMarker: "",
            currentTurn: simplePlayerIDs.get(lobbyID)[0],
            board: [" "," "," "," "," "," "," "," "," "]
        }
    } else {
        let nextTicTurnPlayerID = getTicTacToeNextTurn(lobbyID)
        tictactoeGameState = {
            yourMarker: "",
            currentTurn: nextTicTurnPlayerID,
            board: turnInfo
        }
    }
    return tictactoeGameState
}

export function sendTicTacToeState(lobbyState, lobbyStreamMap) {
    let markerIncrementer = 0;
    lobbyStreamMap.forEach(element => {
        if(markerIncrementer == 0) lobbyState.gameState.state['yourMarker'] = "x";
        if(markerIncrementer == 1) lobbyState.gameState.state['yourMarker'] = "o";
        element.streamObject.controller.enqueue(JSON.stringify(lobbyState))
        markerIncrementer = 1;
    });
}