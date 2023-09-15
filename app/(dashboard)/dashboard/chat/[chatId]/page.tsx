// this page was declared under a dynamic router structure [chatId]


import { Message, User } from '@/app/types/db'
import { fetchRedis } from '@/helpers/redis'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { messageArrayValidator } from '@/lib/validations/message'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import { FC } from 'react'
import Image from 'next/image'

interface pageProps {
  params: {
    chatId: string
  }
}

async function getChatMessages(chatId: string) {
    try {
        const result: string[] = await fetchRedis(
            'zrange',
            `chat:${chatId}:messages`,
            0,
            -1 // fetch all messages
        )

        const dbMessages = result.map((message) => JSON.parse(message) as Message)

        const reversedDbMesssages = dbMessages.reverse()
        
        const messages = messageArrayValidator.parse(reversedDbMesssages)

        return messages
    } catch (error) {
        notFound()
    }
}

const page = async ({params}: pageProps) => {
  
  const { chatId } = params  
  const session = await getServerSession(authOptions)  
  
  if(!session) {
    notFound()
  }
  
  const { user } = session
  const [userId1, userId2] = chatId.split('--')

  // the user should be only able to view the chat if one of the ids is theirs 
  if(user.id !== userId1 && user.id !== userId2) {
    notFound()
  }

  const chatPartnerId = user.id === userId1 ? userId2 : userId1
  const chatPartner = (await db.get(`user:${chatPartnerId}`)) as User
  const initialMessages = await getChatMessages(chatId)

  // chat/userid1--userid2 this is how we gonna construct the url for one certain chat 

  return (
    <div className="flex-1 justify-between flex flex-col h-full max-h-[calc(100vh-6rem)]">
      <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="relative w-8 sm:w-12 h-8 sm:h-12">
              <Image
                fill
                referrerPolicy="no-referrer"
                src={chatPartner.image}
                alt={`${chatPartner.name} profile picture`}
                className="rounded-full"
              />
            </div>
          </div>
          <div className="flex flex-col leading-tight">
            <div className="text-xl">
              <span className="text-gray-700 mr-3 font-semibold">
                {chatPartner.name}
              </span>
            </div>
            <div className="text-sm text-gray-600">{chatPartner.email}</div>
          </div>
        </div>
      </div>
    </div>
  );  
}

export default page