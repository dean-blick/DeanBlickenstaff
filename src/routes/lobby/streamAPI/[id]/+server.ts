import { testData } from "$lib/server/testData";
import { ObjectId } from 'mongodb';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let streamsMap = new Map();
let statesDict = {}


interface StreamObject {
    playerID: string;
    mapStream: ReadableStream;
    mapController: ReadableStreamDefaultController;
}

interface LobbyStateObject {
    players: Array<string>;
    IsGameRunning: Boolean;
    GameState: Object;
}

async function CreateReadableStream(Subscription): Promise<ReadableStream> {
    const ac = new AbortController();
    let interval;
    let stream = new ReadableStream({
        start: async (controller) => {
            interval = setInterval(() => {
                controller.enqueue(Subscription)
                 //currently, the stream cancels EVERY TIME i try to enqueue something.
            }, 250);
        },
        cancel() {
            //remove the playerIDs stream from the map using their lobby and playerID ----> TODO
            console.log("cancel and abort");
            ac.abort();
        },
    })
    return stream
}

async function grabLobby(lobbyID): Promise<Object> {
    const data = (await testData.find({"_id": ObjectId.createFromHexString(lobbyID)}).toArray()).map(testData => ({
        ...testData
    }))
    return data;
}


// export async function GET({params, cookies}): Promise<Response> {
    
//     console.log("getting lobby")
//     let playerID = cookies.get('playerID');
//     let lobbyID = params.id;

//     //grab the existing record for the lobby
//     let data = await grabLobby(params.id)
//     console.log(data[0])
    
//     //If there is a state record for the lobby, update it, if not create one
//     if(!statesMap.has(lobbyID)) {
//         console.log("initializing lobby state")
//         let state: LobbyStateObject = {
//             players: data[0].players,
//             IsGameRunning: false,
//             GameState: {}
//         }
//         statesMap.set(lobbyID, state)
//     } else {
//         console.log("adding new player to lobby state")
//         let state: LobbyStateObject = statesMap.get(lobbyID);
//         state.players = data[0].players;
//         statesMap.set(lobbyID, state)
//     }
    
//     let stream = await CreateReadableStream(statesMap.get(lobbyID))
//     console.log(stream)
//     console.log("sending GET response")
    
//     return new Response(stream, {
//         headers: {
//             'content-type': 'text/event-stream',
//         }
//     });
// }

export function GET({ params, cookies }) {
    let lobbyID = params.id
    const ac = new AbortController();
    let interval;
    const stream = new ReadableStream({
      start(controller) {
        interval = setInterval(() => {
            if(!statesDict[params.id] != undefined){
                let state: LobbyStateObject = {
                    players: [],
                    IsGameRunning: false,
                    GameState: {}
                }
                statesDict[params.id] = state
            }
            controller.enqueue(JSON.stringify(statesDict[params.id]))
            
        }, 250);
      },
      cancel() {
        console.log("cancel and abort");
        ac.abort();
      },
    })

    //make call to update the statesMap from here. --------->>> TO DO
  
    return new Response(stream, {
      headers: {
        'content-type': 'text/event-stream',
      }
    });
  }