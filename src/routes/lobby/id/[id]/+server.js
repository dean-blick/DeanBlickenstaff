import { testData } from "$lib/server/testData";
import { json } from "@sveltejs/kit";
import { ObjectId } from 'mongodb';


export async function GET({ request }) {
    let urlStr = request.url.split('/')
    let gameID = urlStr[urlStr.length - 1];
    const data = (await testData.find({"_id": ObjectId.createFromHexString(gameID) }).toArray()).map(testData => ({
        ...testData,
        _id: testData._id.toString()
    }))
    console.log('data', data)
    if (data[0].playerCount < data[0].maxPlayers) {
        return json(true)
    }
    else {
        return json(false)
    }
}


