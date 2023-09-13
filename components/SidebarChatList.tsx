"use client"

import { Message, User } from '@/app/types/db'
import { chatHrefConstructor } from '@/lib/validations/utils'
import { usePathname, useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'

interface SidebarChatListProps {
  friends: User[]
  sessionId: string
}

const SidebarChatList: FC<SidebarChatListProps> = ({friends, sessionId}) => {
        const router = useRouter()
        const pathname = usePathname()
    const [unseenMessages, setunseenMessages] = useState<Message[]>([])
    	
    useEffect(() => {
        if(pathname?.includes('chat')) {
            setunseenMessages((prev) => {
                return prev.filter((msg) => !pathname.includes(msg.senderId)) // we find out if the user has seen the messages or not 
            })
        }
    }, [pathname]) // every time the pathname changes the useEffect is going to be run 

  return <ul role='list' className='max-h-[25rem] overflow-y-auto -mx-2 space-y-1'>
        {friends.sort().map((friend) => {
            const unseenMessagesCount = unseenMessages.filter((unseenMsg) => {
                return unseenMsg.senderId === friend.id
            }).length
            return <li key={friend.id}>
                <a href={`/dashboard/chat/${chatHrefConstructor(sessionId, friend.id)}`}> </a> {/* // an anchor tag is forcing a hard refresh of the page */}
            </li>
        })}    
     </ul>
}

export default SidebarChatList