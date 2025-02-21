import { testData } from "$lib/server/testData";
import type { PageServerLoad } from "./$types";
import type { Actions } from '@sveltejs/kit'
import { json } from "@sveltejs/kit";
import { ObjectId } from 'mongodb';
import type { RequestHandler } from './id/createLobby/$types'


export const load: PageServerLoad = async function() : Promise<{ testData }> {
    const data = (await testData.find({"public": "on" }).toArray()).map(testData => ({
        ...testData,
        _id: testData._id.toString()
    }))
    return {
        testData: data
    }
}

type Data = {
    success: boolean
    errors: Record<string, string>
}

function createLobbyRecord(lobbyName, maxPlayers, isPublic) {
    try {
        testData.insertOne(
            {
                "public": isPublic,
                 "name": lobbyName,
                 "playercount": 1,
                 "maxPlayers": maxPlayers,
                 "players": ["testPlayer1", "testPlayer2"]
            }
        )
    } catch {
        console.log("whoops")
    }
    
}

export const actions: Actions = {
    addLobbyDocument: async ({request}) => {
        const formData = await request.formData()
        const lobbyName = String(formData.get('lobbyName'))
        const maxPlayers = String(formData.get('maxPlayers'))
        const isPublic = String(formData.get('isPublic'))
        console.log(lobbyName)
        console.log("uh oh")
    
        const data: Data = {
            success: false,
            errors: {}
        }
    
        if(!lobbyName || !maxPlayers) {
            data.errors.lobbyName = 'required'
            data.errors.maxPlayers = 'required'
            return json(data, { status: 400 })
        }
    
        createLobbyRecord(lobbyName, maxPlayers, isPublic)
        data.success = true
        
        return { "success": true }
    }
}
