import { testData } from "$lib/server/testData";


export async function POST({request, cookies}) {
    //remove the player with the given cookie from the list of players

    //future: if a player leaves a game during the game close the game and lobby
}


// great resource on http/2 and streams:
// https://stackoverflow.com/questions/46753263/what-is-the-websockets-alternative-in-the-http-2-world
// https://datatracker.ietf.org/doc/html/draft-mcmanus-httpbis-h2-websockets-00.html