import { testData } from "$lib/server/testData";
import type { PageServerLoad } from "./$types";
import type { Actions } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';


export const load: PageServerLoad = async function({cookies, params}) : Promise<{ playerID, testData }> {
    if (cookies.get('playerID') == undefined) {
        cookies.set('playerID', Math.random().toString(16), {path: '/'})
    }
    const data = (await testData.find({"_id": ObjectId.createFromHexString(params.id)}).toArray()).map(testData => ({
        ...testData,
        _id: testData._id.toString()
    }))
    return {
        playerID: cookies.get('playerID'),
        testData: data,
    }
}

