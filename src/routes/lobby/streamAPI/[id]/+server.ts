import { testData } from "$lib/server/testData";
import { ObjectId } from 'mongodb';
import type { WithId } from "mongodb";
import { updateTicTacToeGameState } from "./Games/TicTacToe.js";
import TicTacToe from "../../clientLogic/TicTacToe.svelte";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

interface SimplePlayerObject {
    playerName: string;
    playerID: string;
}

function playersToPlayerNames(players: Array<SimplePlayerObject>): Array<string> {
    let arr = [];
    players.forEach((element) => {
        arr.push(element.playerName)
    })
    return arr;
}

interface LobbyStateObject {
    playerCount: Number;
    maxPlayers: Number;
    players: Array<string>;
    host: string;
    gameState: GameState;
}


async function grabLobby(lobbyID): Promise<{playerCount, maxPlayers, players, host}> {
    const data = (await testData.find({"_id": ObjectId.createFromHexString(lobbyID)}).toArray()).map(testData => ({
        ...testData
    }))
    let record = data[0];
    return {
        playerCount: record.playerCount,
        maxPlayers: record.maxPlayers,
        players: record.players,
        host: record.host
    }
}


export async function GET({params, cookies}): Promise<Response> {
    
    let playerID: string = cookies.get('playerID');
    let lobbyID: string = params.id;
    const data = (await testData.find({"_id": ObjectId.createFromHexString(lobbyID)}).toArray()).map(testData => ({
        ...testData
    }))
    let lobbyState = data[0];
    if(lobbyState == null){
        return new Response(JSON.stringify({error:"Error, lobby does not exist"}), {
            headers: {
                'content-type': 'application/json',
            }
        });
    }
    lobbyState.players = playersToPlayerNames(lobbyState.players)
    return new Response(JSON.stringify(lobbyState), {
        headers: {
            'content-type': 'application/json',
        }
    });
}


interface GameState {
    game: string;
    state: Object;
}

export async function POST({ request, cookies, params }) {
	const { isStartRequest: isStartRequest, game: game, turnInfo: turnInfo } = await request.json();
    let lobbyID = params.id;
    let gameState: GameState = {
        game: "",
        state: {}
    }
    const data = (await testData.find({"_id": ObjectId.createFromHexString(lobbyID)}).toArray()).map(testData => ({
        ...testData
    }))
    let lobbyState = data[0];
    if(game == "TicTacToe" && lobbyState.players.length == 2) {
        if(lobbyState.gameState.game == "InLobby" || cookies.get("playerID") == lobbyState.gameState.state.currentTurn) {
            await updateTicTacToeGameState(lobbyID, turnInfo, cookies.get("playerID"), isStartRequest, lobbyState)
        }
    }

	return new Response("Success");
}