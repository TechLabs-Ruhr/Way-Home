import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import Link from 'next/link';
import { FC, ReactNode } from 'react'
import Image from 'next/image';
import SignOutButton from '@/components/ui/SignOutButton';


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
    return <div className='w-full flex h-screen'>
        <div className='flex h-full w-full max-w-xs grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 '>
        <Link href='/dashboard' className='flex h-16 shirnk-0 items-center'></Link> 
        
        <div className='text-xs font-semibold leading-6 text-gray-400'>
            Your chats
        </div>
        <nav className='flex flex-1 flex-col'>
            <ul role='list' className='flex flex-1 flex-col gap-y-7'>
                <li>
                    //chats that the user has
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
                                        logo
                                    </span>
                                    <span className='truncate'>{option.name}</span>
                                </Link>
                            </li>
                            )
                        })}
                    </ul>
                </li>
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
                     <SignOutButton /*className='h-full aspect-square'/*//>
                </li>
            </ul>
        </nav>
        </div>
        {children}
    </div>
}

export default Layout

