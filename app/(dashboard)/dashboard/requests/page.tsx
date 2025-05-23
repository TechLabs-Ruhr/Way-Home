import { User } from '@/app/types/db'
import AddFriendButton from '@/components/ui/AddFriendButton'
import FriendRequests from '@/components/ui/FriendRequests'
import { fetchRedis } from '@/helpers/redis'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import { FC } from 'react'

//continue 3:51:21

const page = async () => {
    const session = await getServerSession(authOptions)
    if(!session) notFound()

    //ids of people who sent current logged in user a friend requests
    const incomingSenderIds = (await fetchRedis(
     'smembers',
     `user${session.user.id}:incoming_friend_requests`
     )) as string []
     
    const incomingFriendRequests = await Promise.all(
        incomingSenderIds.map(async (senderId) => {
            const sender = await fetchRedis('get', `user:${senderId}`) as string
            const senderParsed = JSON.parse(sender) as User
            return {
                senderId,
                senderEmail: senderParsed.email,
            }
        })
     )

  return ( 
    <main className="pt-8 ml-10">
        <h1 className="font-bold  text-gray-600 text-5xl mb-8">Your friend requests</h1>
            <div className=' flex flex-col gap-4'>
                <FriendRequests incomingFriendRequests={incomingFriendRequests} sessionId={session.user.id} />
            </div>
    </main>
  )
}

export default page