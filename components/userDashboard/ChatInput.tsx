"use client"
import { User } from '@/app/types/db'
import axios from 'axios'
import { set } from 'date-fns'
import { FC, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import TextareaAutosize from "react-textarea-autosize"

interface ChatInputProps {
  chatPartner: User
  chatId: string
}

const ChatInput: FC<ChatInputProps> = ({chatPartner, chatId}) => {
    const textareaRef = useRef <HTMLTextAreaElement | null>(null)
    const [input, setInput] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    const sendMessage = async () => {
      setIsLoading(true)
      
      try {
        await axios.post('/api/message/send', {text: input, chatId})
        setInput('') //clear the input after the message is sent 
        textareaRef.current?.focus() // keep the focus on the textarea after sending one message
      } catch (error) {
        toast.error('something went wrong please try again later')
      } finally {
        setIsLoading(false)
      }
    }
  return <div className='border-t border-gray-200  px-4 mb-2 sm:mb-0'>
    <div className='relative flex-1 overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within focus-within:ring-blue-600  '>
        <TextareaAutosize ref={textareaRef} onKeyDown={(e) => {
            if (e.key === 'enter' && !e.shiftKey ) {
                e.preventDefault()
                sendMessage()
            }
        }}
        rows={1}
        value={input}
        onChange={(e) => setInput(e.target.value)} // whatever is in the text area will be the exact same in the state 
        placeholder={`Message ${chatPartner.name}`}
        className='block w-full resize-none border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:py-1.5 sm:leading-6'
        />
        <div onClick={() => {textareaRef.current?.focus()}} className='py-2' aria-hidden="true">
          <div className='py-px '>
            <div className='h-9'></div>
          </div>
        </div>
        <div className='absolute right-0 bottom-0 flex justify-between py-2 pl-3 pr-2'>
          <div className='flex-shrin-0'>
            <button onClick={sendMessage} type='submit'>Post</button>
          </div>
        </div>
    </div>
  </div>
}

export default ChatInput