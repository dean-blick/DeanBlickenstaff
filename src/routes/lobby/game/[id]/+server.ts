import { testData } from "$lib/server/testData";
const stream = new ReadableStream()


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//map lobby id to a readable stream and a controller for that readable stream

let map = new Map();

map.set('lobbyId', {
    'readableStream': 'maballs',
    'streamController': 'maballs'
})

let globalController;

sleep(10000).then(() => {
    globalController.enqueue('my balls, 10 seconds later')
})



export function GET({request, params}): Response {
    //If the given lobby id exists in the map return the proper stream and controller, if not create new
    //params.id is the lobby id

    const ac = new AbortController();
    const stream = new ReadableStream({
    start(controller) {
        globalController = controller;
        controller.enqueue("ball ball balls");
    },
    cancel() {
        console.log("cancel and abort");
        ac.abort();
    },
    })

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

