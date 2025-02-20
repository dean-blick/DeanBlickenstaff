import { testData } from "$lib/server/testData";
import type { PageServerLoad } from "./$types";
import type { Actions } from '@sveltejs/kit'


export const load: PageServerLoad = async function() : Promise<{ testData }> {
    const data = (await testData.find({"public": "true" }).toArray()).map(testData => ({
        ...testData,
        _id: testData._id.toString()
    }))
    console.log('data', data)
    return {
        testData: data
    }
}


export const actions: Actions = {
    addLobbyDocument: async ({request}) => {

    }
}
