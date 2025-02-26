import { testData } from "$lib/server/testData";
import type { PageServerLoad } from "./$types";
import type { Actions } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';


export const load: PageServerLoad = async function({cookies}) : Promise<{ playerID }> {
    if (cookies.get('playerID') == undefined) {
        cookies.set('playerID', Math.random().toString(16), {path: '/'})
    }
    return {
        playerID: cookies.get('playerID'),
    }
}

