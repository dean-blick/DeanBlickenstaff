
import { json } from "@sveltejs/kit";




export function GET() {
    return new Response("Success", {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
