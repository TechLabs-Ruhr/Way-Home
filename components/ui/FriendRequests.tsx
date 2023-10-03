"use client"
import { pusherClient } from '@/lib/pusher'
import { toPusherKey } from '@/lib/validations/utils'
import axios from 'axios'
import { log } from 'console'
import { useRouter } from 'next/navigation'

import { FC, useEffect, useState } from 'react'

interface FriendRequestsProps {
  incomingFriendRequests: IncomingFriendRequest[]
  sessionId: string
}

const FriendRequests: FC<FriendRequestsProps> = ({
    incomingFriendRequests,
    sessionId
}) => {
    const router = useRouter()
    const[friendRequests, setFriendRequests] = useState<IncomingFriendRequest[]>(
        incomingFriendRequests
    )

    useEffect(() => {
        pusherClient.subscribe(toPusherKey(`user:${sessionId}:incoming_friend_requests`)) // we use the helper function to bypass the colon  that is invalid inside the subscribe method


        const friendRequestHandler = ({senderId, senderEmail}: IncomingFriendRequest) => {
            console.log("new friend request ")
            setFriendRequests((prev) => [...prev, {senderId, senderEmail}]) // get access to the friend request in real time 
        }
        pusherClient.bind('incoming_friend_requests', friendRequestHandler)

        return () => {
            pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:incoming_friend_requests`)) // we use the helper function to bypass the colon  that is invalid inside the subscribe method
            pusherClient.unbind('incoming_friend_requests', friendRequestHandler)

        }
    }, []) // this doesn't work right now have to debug it later 6:24:40 
    
    const acceptFriend = async (senderId: string) => { 
        await axios.post('/api/friends/accept', {id: senderId}) 

        setFriendRequests((prev) => prev.filter((request) => request.senderId !== senderId)) // we take out the friend requests that were already accepted

        router.refresh()
    }    
    const denyFriend = async (senderId: string) => { 
        await axios.post('/api/friends/deny', {id: senderId}) 

        setFriendRequests((prev) => prev.filter((request) => request.senderId !== senderId)) // we take out the friend requests that were already accepted

        router.refresh()
    }
  return <>
    {friendRequests.length === 0 ? (
        <p className='text-sm text-zinc-500'>Nothing to show here...</p>
    ) : (
        friendRequests.map((request) => (
            <div key={request.senderId} className='flex gap-4 items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" className='w-6 h-6 mb-1 ml-2' height="1em" viewBox="0 0 640 512">
                    <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/>
                </svg>
                <p className='font-medium text-lg'>{request.senderEmail} </p>
                <button 
                onClick={() => acceptFriend(request.senderId)}
                aria-label='accept friend' className='w-8 h-8 bg-blue-600 hover:bg-blue-700 grid place-items-center rounded-full transition hover:shadow-medium'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" className='font-semibold text-white w-3/4 h-3/4' viewBox="0 0 448 512">
                        <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
                    </svg>
                </button>
                <button
                onClick={() => denyFriend(request.senderId)}
                aria-label='deny friend' className='w-8 h-8 bg-red-600 hover:bg-red-700 grid place-items-center rounded-full transition hover:shadow-medium'>
                <svg xmlns="http://www.w3.org/2000/svg"  className='font-semibold text-white w-3/4 h-3/4' height="1em" viewBox="0 0 384 512">
                    <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/>
                </svg>
                </button>
             </div>
        ))
    )}
  </>
}

export default FriendRequests