import { testData } from "$lib/server/testData";
import type { PageServerLoad } from "./$types";
import type { Actions } from '@sveltejs/kit'
import { json } from "@sveltejs/kit";
import { ObjectId } from 'mongodb';


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
                 "playerCount": 1,
                 "maxPlayers": Number(maxPlayers),
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
    
        if(!lobbyName || !maxPlayers) {
            return { "success": false }
        }
    
        createLobbyRecord(lobbyName, maxPlayers, isPublic)
        
        return { "success": true }
    },
    playerJoinRequest: async ({request}) => {
        const formData = await request.formData()
        const id = String(formData.get("lobbyId"))
        const lobby = (await testData.find({"_id": ObjectId.createFromHexString(id) }).toArray()).map(testData => ({
            ...testData
        }))
        const playerUsername = String(formData.get('playerUsername'))
        if (lobby[0].playerCount >= lobby[0].maxPlayers) {
            console.log("false")
            return { "success": false }
        }
        let playerList = lobby[0].players
        playerList.push(playerUsername)
        testData.updateOne(
            {"_id": ObjectId.createFromHexString(id)},
            { $set: { "playerCount": lobby[0].playerCount + 1, "players": playerList}}
        )
        return {"success": true}
        //either delete and reinsert the lobby document or find a method to update the existing document
    }
}
