import { testData } from "$lib/server/testData";
import { json } from "@sveltejs/kit";
import { ObjectId } from 'mongodb';
import type { RequestHandler } from './id/createLobby/$types'

type Data = {
    success: boolean
    errors: Record<string, string>
}

function createLobbyRecord(lobbyName, maxPlayers, isPublic) {

}

export const POST: RequestHandler = async ({ request }) => {
    const formData = await request.formData()
    const lobbyName = String(formData.get('lobbyName'))
    const maxPlayers = String(formData.get('maxPlayers'))
    const isPublic = String(formData.get('isPublic'))

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
    
    return json(data)
}


