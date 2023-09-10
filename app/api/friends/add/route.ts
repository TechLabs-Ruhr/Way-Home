import { fetchRedis } from '@/helpers/redis'
import { authOptions } from "@/lib/auth"
import { db } from '@/lib/db'
import { addFriendValidator } from "@/lib/validations/add-friend"
import { getServerSession } from "next-auth"
import {z} from "zod"

export async function POST(req: Request) {
    try {
        const body = await req.json()

        const {email: emailToAdd} = addFriendValidator.parse(body.email) // if this parse fails a z error is going to be thrown

        console.log("The email being passed is: " + emailToAdd)

        const idToAdd = (await fetchRedis('get', `user:email:${emailToAdd}`)) as string

        console.log(`The id that is passed is: ${idToAdd}`)

        if(!idToAdd) {
            return new Response('This person does not exist', {status: 400} )
        }

        

        const session = await getServerSession(authOptions)

        if(!session) {
            return new Response('Unauthorized', {status: 401})
        }


        //const data = await RESTResponse.json() as {result: string}
        

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
        //const idToAdd = data.result

          //check if user is already in the friends list 
          const isAlreadyFriends = (await fetchRedis(
            'sismember', `user:${session.user.id}:friends`, // we are checking in the friends list of the user who is already logged in whtether the id to add already exists 
            idToAdd
        )) as 0 | 1

        if (isAlreadyFriends) {
            return new Response('Already Friends with this user')
        }
        
          //valid request, send friend request

          db.sadd(`user${idToAdd}:incoming_friend_requests`, session.user.id)

          return new Response("OK")

    } catch (error) {
        if(error instanceof z.ZodError) {
            return new Response('Invalid request payload')
        }
        return new Response('Invalid request payload', {status: 422})
    }
}