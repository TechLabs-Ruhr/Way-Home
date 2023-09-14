import { Message, User } from "@/app/types/db"
import { fetchRedis } from "@/helpers/redis"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { messageValidator } from "@/lib/validations/message"
import { nanoid } from "nanoid"
import { getServerSession } from "next-auth"

export async function POST(req: Request) {
    try {
        const {text, chatId}: {text: string, chatId: string} = await req.json()
        const session = await getServerSession(authOptions)

        if(!session) return new Response('Unauthorized', {status: 401})

        // verify if the user who is trying to send the message is one of these ids 

        const [userId1, userId2] = chatId.split('--')

        if(session.user.id !== userId1 && session.user.id !== userId2)

        if(session.user.id !== userId1 && session.user.id !== userId2) {
            return new Response('Unauthorized', { status: 401 })
        }

        const friendId = session.user.id === userId1 ? userId2 : userId1

        const friendList = await fetchRedis('smembers', `user:${session.user.id}:friends`) as string[]

        const isFriend = friendList.includes(friendId)

        if(!isFriend) {
            return new Response('Unauthorized', { status: 401 })
        }

        const rawSender = await fetchRedis('get', `user:${session.user.id}`) as string
        const sender = JSON.parse(rawSender) as User
        
        const timestamp = Date.now()

        console.log("sender", sender) 
        // all valid, send the message

        /* const messageData: Message = {
            id: nanoid(),
            senderId: session.user.id,
            text,
            timestamp,
        }

        const message = messageValidator.parse(messageData)

        //notify all connected chat room clients
        //pusherServer.trigger(toPusherKey(`chat:${chatId}`), 'incoming-message', message)

        await db.zadd(`chat:${chatId}:messages`, {
            score: timestamp,
            member: JSON.stringify(message)
        }) */

        return new Response('OK') 
    } catch (error) {
        if(error instanceof Error) {
            return new Response(error.message, { status: 500})
        }
    }

    //testing takes place in the section: summary: messages functionality is working 
}