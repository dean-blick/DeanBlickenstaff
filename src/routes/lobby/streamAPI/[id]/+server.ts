import { testData } from "$lib/server/testData";
import { ObjectId } from 'mongodb';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let map = new Map();
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

// function CreateReadableStream(Subscription): {stream: ReadableStream, controller: ReadableStreamDefaultController} {
//     const ac = new AbortController();
//     let stream = new ReadableStream({
//         start: async (controller) => {
//             interval = setInterval(() => {
//                 controller.enqueue(Subscription)
//                  //currently, the stream cancels EVERY TIME i try to enqueue something.
//             }, 250);
//         },
//         cancel() {
//             //remove the playerIDs stream from the map using their lobby and playerID ----> TODO
//             console.log("cancel and abort");
//             ac.abort();
//         },
//     })
//     return stream
// }

async function grabLobby(lobbyID): Promise<Object> {
    const data = (await testData.find({"_id": ObjectId.createFromHexString(lobbyID)}).toArray()).map(testData => ({
        ...testData
    }))
    return data;
}


//make this function not horrible
export async function GET({params, cookies}): Promise<Response> {
    let stream: ReadableStream;
    let playerID = cookies.get('playerID');
    if(map.has(params.id)) {
        //loop through the objects in the map array, check if a stream under the playerID already exists, if it does, overwrite it, if not add a new one
        let arr: Array<StreamObject> = map.get(params.id)
        let existsInMap = false;
        for(let i = 0; i< arr.length; i++) {
            if(arr[i].playerID == playerID){
                const ac = new AbortController();
                stream = new ReadableStream({
                    start(controller) {
                        arr[i].mapController = controller;
                    },
                    cancel() {
                        //remove the playerIDs stream from the map using their lobby and playerID ----> TODO
                        console.log("cancel and abort");
                        ac.abort();
                    },
                })
                arr[i].mapStream = stream;
                existsInMap = true;
                map.set(params.id, arr)
                break;
            }
        }
        if(!existsInMap) {
            const ac = new AbortController();
            let newMapController;
            stream = new ReadableStream({
                start(controller) {
                    newMapController = controller;
                },
                cancel() {
                    //remove the playerIDs stream from the map using their lobby and playerID ----> TODO
                    console.log("cancel and abort");
                    ac.abort();
                },
            })
            let newStreamObj: StreamObject = {
                'playerID': playerID,
                'mapStream': stream,
                'mapController': newMapController
            }
            arr.push(newStreamObj)
            map.set(params.id, arr)
        }
        //send an updated lobby record to every stream under the given lobbyID
        //grab the record
        const data = (await testData.find({"_id": ObjectId.createFromHexString(params.id)}).toArray()).map(testData => ({
            ...testData,
            _id: testData._id.toString()
        }))

        //write the record to each stream
        arr = map.get(params.id)
        for(let i = 0; i< arr.length; i++) {
            arr[i].mapController.enqueue(JSON.stringify(data[0]))
        }
    } else {
        let controllerRef;
        //create new map with new controller and stream
        const ac = new AbortController();
        stream = new ReadableStream({
        start(controller) {
            controllerRef = controller;
        },
        cancel() {
            //remove the playerIDs stream from the map using their lobby and playerID ----> TODO
            console.log("cancel and abort");
            ac.abort();
        },
        })
        let newStreamObj: StreamObject = {
            'playerID': playerID,
            'mapStream': stream,
            'mapController': controllerRef
        }
        map.set(params.id, [newStreamObj])
    }
    //If the given lobby id exists in the map return the proper stream and controller, if not create new
    //params.id is the lobby id

    return new Response(stream, {
    headers: {
        'content-type': 'text/event-stream',
    }
    });
}