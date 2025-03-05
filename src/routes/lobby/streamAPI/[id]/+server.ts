import { testData } from "$lib/server/testData";
import { ObjectId } from 'mongodb';
import type { Player } from "tone";
import { Games } from "./Games"



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let globalStreamMap = new Map<string, Map<string, PlayerData>>();
let globalStateMap = new Map<string, LobbyStateObject>();

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
    game: string;
    gameState: Object;
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
    }
    //assign the new players info 
    let newPlayerData: PlayerData = {playerID: playerID, streamObject: streamObject}

    //place the new players info in the player map
    playerMap.set(playerID, newPlayerData)

    //Place the playerMap in the master map
    globalStreamMap.set(lobbyID, playerMap)

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
            game: "InLobby",
            gameState: {}
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

export async function POST({ request, cookies }) {
	const { isStartRequest: isStartRequest, game: game, turnInfo: turnInfo } = await request.json();
	const userid = cookies.get('userid');

    if(isStartRequest){
        //do start game function
    }else {
        //process new turn of the game
    }

	return new Response("Success");
}