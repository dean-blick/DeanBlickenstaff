import { testData } from "$lib/server/testData";
import { ObjectId } from 'mongodb';
import { Games } from "./Games"



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let globalStreamMap = new Map<string, Map<string, PlayerData>>();
let globalStateMap = new Map<string, LobbyStateObject>();
let simplePlayerIDs = new Map<string, Array<string>>();

interface StreamObject {
    stream: ReadableStream;
    controller: ReadableStreamDefaultController;
}

interface PlayerData {
    playerID: string;
    streamObject: StreamObject;
}

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

interface LobbyStateObject {
    playerCount: Number;
    maxPlayers: Number;
    players: Array<string>;
    host: string;
    gameState: GameState;
}


function createReadableStream(lobbyID): StreamObject {
    let controllerReference: ReadableStreamDefaultController;
    const ac = new AbortController();
    let stream = new ReadableStream({
        start (controller) {
            controllerReference = controller;
        },
        cancel() {
            //remove the playerIDs stream from the map using their lobby and playerID ----> TODO: Potentially just remove the one player and kick other players back to the lobby
            if(testData.findOne({"_id": ObjectId.createFromHexString(lobbyID)}) != null){
                testData.deleteOne({"_id": ObjectId.createFromHexString(lobbyID)})
            }
            console.log("cancel and abort");
            ac.abort();
        },
    })
    let streamObject: StreamObject = {stream: stream, controller: controllerReference}
    return streamObject
}

function updatePlayerMap(lobbyID, playerID): ReadableStream {
    let streamObject: StreamObject = createReadableStream(lobbyID);
    let playerMap: Map<string, PlayerData>
    if(globalStreamMap.has(lobbyID)) {
        playerMap = globalStreamMap.get(lobbyID)
        
    } else {
        //Instantiate the playerMap
        playerMap = new Map();
        simplePlayerIDs.set(lobbyID, [])
    }
    //assign the new players info 
    let newPlayerData: PlayerData = {playerID: playerID, streamObject: streamObject}

    //place the new players info in the player map
    playerMap.set(playerID, newPlayerData)

    //Place the playerMap in the master map
    globalStreamMap.set(lobbyID, playerMap)

    //Add them to corresponding simplePlayerID map
    let IDMap = simplePlayerIDs.get(lobbyID)
    IDMap.push(playerID)
    simplePlayerIDs.set(lobbyID, IDMap)

    return streamObject.stream
}

async function getLobbyState(lobbyID): Promise<LobbyStateObject> {
    if(globalStateMap.has(lobbyID)){
        return globalStateMap.get(lobbyID);
    }else{
        //If the state doesn't exist yet that means the lobby was just created and we can instantiate the record with info from the DB

        let record = await grabLobby(lobbyID)
        let newLobbyState: LobbyStateObject = {
            playerCount: record.playerCount,
            maxPlayers: record.maxPlayers,
            players: playersToPlayerNames(record.players),
            host: record.host,
            gameState: {game: "InLobby", state: {}}
        }
        globalStateMap.set(lobbyID, newLobbyState)
        return newLobbyState
    }
}
async function refreshLobbyStateDBInfo(lobbyID) {
    if(!globalStateMap.has(lobbyID)){
        //For debugging purposes only. Nothing should happen here.
    } else {
        let record = await grabLobby(lobbyID)
        let lobbyState = globalStateMap.get(lobbyID)
        lobbyState.playerCount = record.playerCount
        lobbyState.players = playersToPlayerNames(record.players)
        globalStateMap.set(lobbyID, lobbyState)
    }
}

async function grabLobby(lobbyID): Promise<{playerCount, maxPlayers, players, host}> {
    const data = (await testData.find({"_id": ObjectId.createFromHexString(lobbyID)}).toArray()).map(testData => ({
        ...testData
    }))
    let record = data[0];
    return {
        playerCount: record.playerCount,
        maxPlayers: record.maxPlayers,
        players: record.players,
        host: record.host
    }
}


export async function GET({params, cookies}): Promise<Response> {
    //Store the playerID and lobbyID
    let playerID: string = cookies.get('playerID');
    let lobbyID: string = params.id;

    if(await testData.findOne({"_id": ObjectId.createFromHexString(lobbyID)}) == null){
        return new Response(JSON.stringify({error:"Error, lobby does not exist"}), {
            headers: {
                'content-type': 'application/json',
            }
        });
    }

    //Get the players stream and the state of the lobby they are joining
    await refreshLobbyStateDBInfo(lobbyID)
    let stream: ReadableStream = updatePlayerMap(lobbyID, playerID)
    let lobbyState: LobbyStateObject = await getLobbyState(lobbyID)

    //Send the updated state to each player in the lobby
    //Before this GET is called, the previous route adds the player calling this GET to the lobbies DB record. This function does not call if they aren't in the record.
    //This means we need to send the updated lobby state
    globalStreamMap.get(lobbyID).forEach(element => {
        //console.log(lobbyState)
        element.streamObject.controller.enqueue(JSON.stringify(lobbyState))
    });

    return new Response(stream, {
    headers: {
        'content-type': 'text/event-stream',
    }
    });
}

interface TicTacToeGameState {
    yourMarker: string;
    currentTurn: string;
    board: Array<string>;
}

interface GameState {
    game: string;
    state: Object;
}


let simpleTurnIndex: Map<string, number>

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

export async function POST({ request, cookies, params }) {
	const { isStartRequest: isStartRequest, game: game, turnInfo: turnInfo } = await request.json();
	const userid = cookies.get('userid');
    let lobbyID = params.id;
    if(isStartRequest){
        let gameState: GameState;
        
        if(game == "TicTacToe") {
            simpleTurnIndex.set(lobbyID, 0)
            gameState.game = "TicTacToe"

            
            let tictactoeGameState: TicTacToeGameState = {
                yourMarker: "",
                currentTurn: simplePlayerIDs.get(lobbyID)[0],
                board: ["","","","","","","","",""]
            }
            gameState.state = tictactoeGameState;
            let lobbyState: LobbyStateObject = await getLobbyState(lobbyID)
            lobbyState.gameState = gameState;
    
            let markerIncrementer = 0;
            globalStreamMap.get(lobbyID).forEach(element => {
                if(markerIncrementer == 0) lobbyState.gameState.state['yourMarker'] = "x";
                if(markerIncrementer == 1) lobbyState.gameState.state['yourMarker'] = "o";
                element.streamObject.controller.enqueue(JSON.stringify(lobbyState))
            });
        }
    }else {
        let nextTicTurnPlayerID = getTicTacToeNextTurn(lobbyID)
        //process new turn of the game
    }

	return new Response("Success");
}