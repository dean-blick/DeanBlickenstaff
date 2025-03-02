import { testData } from "$lib/server/testData";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let map = new Map();

// map.set('lobbyId', {
//     'mapStream': 'maballs',
//     'mapController': 'maballs'
// })


// sleep(10000).then(() => {
    
// })



export function GET({request, params}): Response {
    let stream;
    if(map.has(params.id)) {
        let mapObj = map.get(params.id)
        stream = mapObj.mapStream
    } else {
        let controllerRef;
        //create new map with new controller and stream
        const ac = new AbortController();
        stream = new ReadableStream({
        start(controller) {
            controllerRef = controller;
        },
        cancel() {
            console.log("cancel and abort");
            ac.abort();
        },
        })
        map.set(params.id, {
            'mapStream': stream,
            'mapController': controllerRef
        })
    }
    //If the given lobby id exists in the map return the proper stream and controller, if not create new
    //params.id is the lobby id

    
    return new Response(stream, {
    headers: {
        'content-type': 'text/event-stream',
    }
    });
}

// export async function POST({request, cookies}): Promise<void> {
//     //remove the player with the given cookie from the list of players

//     //future: if a player leaves a game during the game close the game and lobby
// }

