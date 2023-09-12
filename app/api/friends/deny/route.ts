import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import {z} from "zod"

export async function POST(req: Request) {
    try {
        const body = await req.json()

        const session = await getServerSession(authOptions)

        if(!session) {
            return new Response('Unauthorized', { status: 401})
        }

        const {id: idToDeny} = z.object({id: z.string()}).parse(body)

    } catch (error) {
        
    }
}