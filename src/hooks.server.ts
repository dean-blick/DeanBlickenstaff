import { start_mongo } from "$lib/server/mongo";

start_mongo().then((): void => {
    console.log("Mongo Started")
})

//export const handle() <---- this function runs every request