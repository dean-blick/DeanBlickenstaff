import { testData } from "$lib/server/testData";
import type { PageServerLoad } from "./$types";
import type { Actions } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';


export const load: PageServerLoad = async function({cookies}) : Promise<{ playerID, testData }> {
    if (cookies.get('playerID') == undefined) {
        cookies.set('playerID', Math.random().toString(16), {path: '/'})
    }
    const data = (await testData.find({"public": "on" }).toArray()).map(testData => ({
        ...testData,
        _id: testData._id.toString()
    }))
    return {
        playerID: cookies.get('playerID'),
        testData: data
    }
}

type Data = {
    success: boolean
    errors: Record<string, string>
}

//get zod library for form validation

function createLobbyRecord(lobbyName, maxPlayers, isPublic) {
    try {
        testData.insertOne(
            {
                "public": isPublic,
                 "name": lobbyName,
                 "playerCount": 0,
                 "maxPlayers": Number(maxPlayers),
                 "players": []
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
    
        if(!lobbyName || !maxPlayers) {
            return { "success": false }
        }
    
        createLobbyRecord(lobbyName, maxPlayers, isPublic)
        
        return { "success": true }
    },
    playerJoinRequest: async ({request}) => {
        const formData = await request.formData()
        const id = String(formData.get("lobbyId"))
        const playerID = String(formData.get('playerID'))
        console.log(playerID)
        const lobby = (await testData.find({"_id": ObjectId.createFromHexString(id) }).toArray()).map(testData => ({
            ...testData
        }))
        const playerName = String(formData.get('playerName'))

        //Check to make sure there is a slot open for the player
        if (lobby[0].playerCount >= lobby[0].maxPlayers) {
            console.log("false")
            return { "success": false }
        }

        //Update the lobby to add the player
        let playerList = lobby[0].players
        playerList.push({"playerName": playerName, "playerID": playerID})
        testData.updateOne(
            {"_id": ObjectId.createFromHexString(id)},
            { $set: { "playerCount": lobby[0].playerCount + 1, "players": playerList}}
        )
        return {"success": true}
        //either delete and reinsert the lobby document or find a method to update the existing document
    }
}
