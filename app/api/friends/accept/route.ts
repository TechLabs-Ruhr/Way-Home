
import { fetchRedis } from "@/helpers/redis"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import {z} from "zod"
export async function POST(req: Request) {
    try {
        const body = await req.json()
        
        //check if request is valid
        const {id: idToAdd} = z.object({id: z.string()}).parse(body)

      
        //1. check if the user is logged in
        const session = await getServerSession(authOptions)

        if(!session) {
            return new Response('Unauthorized', { status: 401})
        }

        //2. verify both users are not already friends
        const isAlreadyFriends = await fetchRedis('sismember', `user${session.user.id}:friends`, idToAdd)

        if(isAlreadyFriends) {
            return new Response('Already friends', {status: 402})
        }
        
        //3. verify there is a friend request 
        const hasFriendRequest = await fetchRedis('sismember', `user${session.user.id}:incoming_friend_requests`, idToAdd)
        
        if(!hasFriendRequest) {
            return new Response('No friend request', {status: 400})
        }

        // add the user to the friend list of the user who accepted the invitation
        await db.sadd(`user:${session.user.id}:friends`, idToAdd) 

        // add the user to the requester friend list
        await db.sadd(`user:${idToAdd}:friends`, session.user.id) 

        // remove the friend request from the user who accepted the invitation
        await db.srem(`user${idToAdd}:incoming_friend_requests`, session.user.id)
 
        // remove the friend request from the user who sent the invitation
        await db.srem(`user${session.user.id}:incoming_friend_requests`, idToAdd)



        return new Response("ok") // it has to be returned to avoid error 500
    } catch (error) {
        console.log(error)

        if(error instanceof z.ZodError) {
            return new Response('Invalid request payload', {status: 422})
        }

        return new Response('Invalid request', {status: 400})
    }
    
}