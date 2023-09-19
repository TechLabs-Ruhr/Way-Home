import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import Link from 'next/link';
import { FC, ReactNode } from 'react'
import Image from 'next/image';
import SignOutButton from '@/components/ui/SignOutButton';
import FriendRequestSidebarOptions from '@/components/userDashboard/FriendRequestSidebarOptions';
import { fetchRedis } from '@/helpers/redis';
import { User } from '@/app/types/db';
import { getFriendsByUserId } from '@/helpers/get-friends-by-user-id';
import SidebarChatList from '@/components/userDashboard/SidebarChatList';



interface LayoutProps {
    children: ReactNode
}

interface SidebarOption {
    id: number
    name: string
    href: string
    //Icon: Icon
}
const sidebarOptions: SidebarOption[] = [
    {
        id: 1,
        name: 'Add friend',
        href: '/dashboard/add',
    }
]

const Layout = async ({children}: LayoutProps) => {
    const session = await getServerSession(authOptions)
    if(!session) notFound() 

    const friends = await getFriendsByUserId(session.user.id)

    console.log("friends: ", friends)

    const unseenRequestCount = (
        await fetchRedis('smembers', 
        `user:${session.user.id}:incoming_friend_requests`
        ) as User []
        ).length

    return <div className='w-full flex h-screen'>
        <div className='flex h-full w-full max-w-xs grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 '>
        <Link href='/dashboard' className='flex h-16 shirnk-0 items-center'></Link> 
        {friends.length > 0 ? ( 
        <div className='text-xs font-semibold leading-6 text-gray-400'>
            Your chats
        </div>
        ) : null}
       
        <nav className='flex flex-1 flex-col'>
            <ul role='list' className='flex flex-1 flex-col gap-y-7'>
                <li>
                    <SidebarChatList sessionId={session.user.id} friends={friends}/>
                </li>
                <li>
                    <div className='text-xs font-semibold leading-6 text-gray-400'>
                        Overview
                    </div>
                    <ul role='list' className='-mx-2 mt-2 space-y-1'>
                        {sidebarOptions.map((option) => {
                            return (
                            <li key={option.id}>
                                <Link href={option.href} className='text-gray-700 hover:text-blue-50 group flex gap-3 rounded-md p-2 text-sm leading-semibold'>
                                    <span className='text-gray-400 border-gray-200 group-hover:border-blue-600 group-hover:text-blue-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border-text-[0.625rem] font-medium bg-white'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className='w-6 h-6 mb-1' height="1em" viewBox="0 0 640 512">
                                        <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/>
                                    </svg>
                                    </span>
                                    <span className='truncate'>{option.name}</span>
                                </Link>
                            </li>
                            )
                        })}
                        <li>
                            <FriendRequestSidebarOptions sessionId={session.user.id} initialUnseenRequestCount={unseenRequestCount}/>
                        </li>
                    </ul>
                </li>
                </ul>
                <li className='-mx-6 mt-auto flex items-center'>
                    <div className='flex flex-1 items-center gap-x-4 px-6 py-3 tex-sm font-semibold leading-6 text-gray-900'>
                        <div className='relative h-8 w-8 bg-gray-50'>
                            <Image fill 
                            referrerPolicy='no-referrer'
                            className='rounded-full'
                            src={session.user.image || ''}
                            alt='Your profile picture'
                            />
                        </div>
                        <span className='sr-only'>Your profile</span>
                        <div className='flex flex-col'>
                            <span aria-hidden='true' className=''>{session.user.name}</span>
                            <span className='text-xs text-zinc-400' aria-hidden='true'>{ session.user.email}</span>    
                        </div>
                     </div>
                     <SignOutButton />
                </li>
            </nav>
        </div>
        {children}
    </div>
}

export default Layout

