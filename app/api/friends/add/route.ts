import { fetchRedis } from '@/helpers/redis'
import { authOptions } from "@/lib/auth"
import { db } from '@/lib/db'
import { addFriendValidator } from "@/lib/validations/add-friend"
import { getServerSession } from "next-auth"
import {z} from "zod"
import fetchUserByEmail from '@/app/helpers/fetchUsersByEmail';


export async function POST(req: Request) {
    try {
        const body = await req.json()

        //email validation
        const {email: emailToAdd} = addFriendValidator.parse(body.email) 
    
        const idToAdd = (await fetchRedis('get', `user:email:${emailToAdd}`)) as string

        if(!idToAdd) {
            return new Response('This person does not exist', {status: 400} )
        }

        //check if the user is logged in
        const session = await getServerSession(authOptions)

        if(!session) {
            return new Response('Unauthorized', {status: 401})
        }

        if(idToAdd === session.user.id) {
            return new Response('You cannot add yourself as a friend', {
                status:400,
            })
        }
        
         //check if user is already added
         const isAlreadyAddded = await (fetchRedis('sismember', `user:${idToAdd}:incoming_friend_requests`,   session.user.id)) as 0 | 1
      
         if (isAlreadyAddded) {
             return new Response('Already added this user', {status: 400})
         }

          //check if user is already in the friends list 
          const isAlreadyFriends = (await fetchRedis(
            'sismember', `user:${session.user.id}:friends`, 
            idToAdd
        )) as 0 | 1

        if (isAlreadyFriends) {
            return new Response('Already Friends with this user')
        }
        
        db.sadd(`user${idToAdd}:incoming_friend_requests`, session.user.id)

          return new Response("OK")

    } catch (error) {
        if(error instanceof z.ZodError) {
            return new Response('Invalid request payload')
        }
        console.log(error);
        return new Response('Invalid request payload', {status: 422})
    }
}