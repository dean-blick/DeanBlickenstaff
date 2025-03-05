import { testData } from "$lib/server/testData";
import { ObjectId } from 'mongodb';
import type { Player } from "tone";
import { Games } from "./Games"

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let masterMap = new Map<String, Map<String, PlayerData>>();

interface StreamObject {
    stream: ReadableStream;
    controller: ReadableStreamDefaultController;
}

interface PlayerData {
    playerID: String;
    streamObject: StreamObject;
}

interface LobbyStateObject {
    playerCount: Number;
    maxPlayers: Number;
    players: Map<String, PlayerData>;
    host: String;
    isGameRunning: Boolean;
    game: String;
    gameState: Object;
}

interface TicTacToeGameState {
    currentTurn: String;
    board: Array<String>;
}

function createReadableStream(): StreamObject {
    let controllerReference: ReadableStreamDefaultController;
    const ac = new AbortController();
    let stream = new ReadableStream({
        start (controller) {
            controllerReference = controller;
        },
        cancel() {
            //remove the playerIDs stream from the map using their lobby and playerID ----> TODO
            console.log("cancel and abort");
            ac.abort();
        },
    })
    let streamObject: StreamObject = {stream: stream, controller: controllerReference}
    return streamObject
}

function updatePlayerMap(lobbyID, playerID): ReadableStream {
    let streamObject: StreamObject = createReadableStream();
    let playerMap: Map<String, PlayerData>
    if(masterMap.has(lobbyID)) {
        playerMap = masterMap.get(lobbyID)
    } else {
        //Instantiate the playerMap
        playerMap = new Map();
    }
    //assign the new players info 
    let newPlayerData: PlayerData = {playerID: playerID, streamObject: streamObject}

    //place the new players info in the player map
    playerMap.set(playerID, newPlayerData)

    //Place the playerMap in the master map
    masterMap.set(lobbyID, playerMap)

    return streamObject.stream
}

async function grabLobby(lobbyID): Promise<Object> {
    const data = (await testData.find({"_id": ObjectId.createFromHexString(lobbyID)}).toArray()).map(testData => ({
        ...testData
    }))
    return data;
}


export async function GET({params, cookies}): Promise<Response> {
    let playerID = cookies.get('playerID');
    let lobbyID = params.id;

    let stream: ReadableStream = updatePlayerMap(lobbyID, playerID)

    const data = (await testData.find({"_id": ObjectId.createFromHexString(params.id)}).toArray()).map(testData => ({
        ...testData,
        _id: testData._id.toString()
    }))

    //send the updated lobby
    masterMap.get(lobbyID).forEach(element => {
        element.streamObject.controller.enqueue(JSON.stringify(data[0]))
    });

    return new Response(stream, {
    headers: {
        'content-type': 'text/event-stream',
    }
    });
}