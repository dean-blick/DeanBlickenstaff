import { testData } from "$lib/server/testData";
import { ObjectId } from 'mongodb';
import type { Player } from "tone";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let masterMap = new Map<string, Map<string, PlayerData>>();

interface StreamObject {
    mapStream: ReadableStream;
    mapController: ReadableStreamDefaultController;
}

interface PlayerData {
    playerID: string;
    streamObject: StreamObject;
}

interface LobbyStateObject {
    players: Map<string, PlayerData>;
    IsGameRunning: Boolean;
    GameState: Object;
}

function CreateReadableStream(): StreamObject {
    let controllerObj: ReadableStreamDefaultController;
    const ac = new AbortController();
    let stream = new ReadableStream({
        start (controller) {
            controllerObj = controller;
        },
        cancel() {
            //remove the playerIDs stream from the map using their lobby and playerID ----> TODO
            console.log("cancel and abort");
            ac.abort();
        },
    })
    let streamObject: StreamObject = {mapStream: stream, mapController: controllerObj}
    return streamObject
}

function UpdatePlayerMap(lobbyID, playerID): ReadableStream {
    let streamObject: StreamObject = CreateReadableStream();
    let playerMap: Map<string, PlayerData>
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

    return streamObject.mapStream
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

    let stream: ReadableStream = UpdatePlayerMap(lobbyID, playerID)

    const data = (await testData.find({"_id": ObjectId.createFromHexString(params.id)}).toArray()).map(testData => ({
        ...testData,
        _id: testData._id.toString()
    }))

    //console.log(arr)
    masterMap.get(lobbyID).forEach(element => {
        element.streamObject.mapController.enqueue(JSON.stringify(data[0]))
    });

    return new Response(stream, {
    headers: {
        'content-type': 'text/event-stream',
    }
    });
}