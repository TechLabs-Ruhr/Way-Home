'use client'
import { pusherClient } from '@/lib/pusher'
import { toPusherKey } from '@/lib/validations/utils'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'

interface FrriendRequestSidebarOptionsProps {
  sessionId: string
  initialUnseenRequestCount: number
}

/* useEffect(() => {
  pusherClient.subscribe(toPusherKey(`user:${sessionId}:incoming_friend_requests`)) // we use the helper function to bypass the colon  that is invalid inside the subscribe method

  console.log("subscriberd to ", `user:${sessionId}:incoming_friend_requests`)

  const friendRequestHandler = ({senderId, senderEmail}: IncomingFriendRequest) => {
      console.log("new friend request ")
      setFriendRequests((prev) => [...prev, {senderId, senderEmail}]) // get access to the friend request in real time 
  }
  pusherClient.bind('incoming_friend_requests', friendRequestHandler)

  return () => {
      pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:incoming_friend_requests`)) // we use the helper function to bypass the colon  that is invalid inside the subscribe method
      pusherClient.unbind('incoming_friend_requests', friendRequestHandler)

  }
}, []) */

const FrriendRequestSidebarOptions: FC<FrriendRequestSidebarOptionsProps> = ({
  sessionId,
  initialUnseenRequestCount}) => {
  const [unseenRequestCount, setUnseenRequestCount] = useState<number>(initialUnseenRequestCount)
  return <Link href="/dashboard/requests" className='text-gray-700 hover:text-blue-600 hover:bg-gray-50 group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'> 
    <div className='text-gray-400 border-gray-200 group-hover:border-blue-609 group-hover:text-blue-600 flex h-6 w-6 shirnk-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white'>
    <svg xmlns="http://www.w3.org/2000/svg" className='h-4 w-4' height="1em"  viewBox="0 0 448 512">
      <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
    </svg>
    </div>
    <p className='truncate'>Friend requests</p>
    {unseenRequestCount > 0 ? (
      <div className='rounded-full w-5 h-5 text-xs justify-center items-center text-white bg-blue-600'>
        {unseenRequestCount}
      </div>
    ) : null }
  </Link>
}

export default FrriendRequestSidebarOptions