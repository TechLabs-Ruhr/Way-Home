"use client"

export const metadata = {
  title: 'Way Home Sign Up',
  description: 'Page description',
}

import { addFriendValidator } from '@/lib/validations/add-friend'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
//import axios from 'axios';


export default function SignUp() {
  const router = useRouter()

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })


  const registerUser = async (e: FormEvent) => {
    const form = new FormData(e.target as HTMLFormElement);
    e.preventDefault();
  // Assign values to the data object
  const formData = {
    firstName: String(form.get('firstName')),
    lastName: String(form.get('lastName')),
    email: String(form.get('email')),
    password: String(form.get('password')),
  };
  console.log("from Data:", formData)

     const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(formData)
      })
      if (res.ok) {
        // Handle success, e.g., redirect or display a success message
        console.log('Registration successful');
      } else {
        // Handle errors, e.g., display an error message
        console.error('Registration failed');
      }
  }

  return (
    <div style={{backgroundColor: 'whitesmoke', color: 'black'}}> 
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">

          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1">Welcome. We exist to make traveling safer!</h1>
          </div>
          {/* Form */}
          <div className="max-w-sm mx-auto">
            <form>
              <div className="flex flex-wrap -mx-3">
                <div className="w-full px-3">
                <button
                  className="btn px-0 text-black bg-grey-300 hover:bg-white-700 w-full relative flex items-center border border-black rounded">
                  <svg
                    className= 'ml-5 h-5 w-5'
                    aria-hidden='true'
                    focusable='false'
                    data-prefix='fab'
                    data-icon='github'
                    role='img'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'>
                    <path
                      d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                      fill='#4285F4'
                    />
                    <path
                      d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                      fill='#34A853'
                    />
                    <path
                      d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                      fill='#FBBC05'
                    />
                    <path
                      d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                      fill='#EA4335'
                    />
                    <path d='M1 1h22v22H1z' fill='none' />
                  </svg>
                    <span className="h-6 flex items-center border-r border-white border-opacity-25 mr-4" aria-hidden="true"></span>
                    <span className="flex-auto pl-16 pr-8 -ml-16">Sign in with Google</span>
                  </button>
                </div>
              </div>
            </form>
            <div className="flex items-center my-6">
              <div className="border-t border-gray-700 border-dotted grow mr-3" aria-hidden="true"></div>
              <div className="text-gray-400">Or, register with your email</div>
              <div className="border-t border-gray-700 border-dotted grow ml-3" aria-hidden="true"></div>
            </div>
            <form onSubmit={registerUser}>
            <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="first-name">First Name <span className="text-red-600">*</span></label>
                  <input id="first-name" type="text" name='firstName'
                    onChange={(e) => {setData({...data, firstName: e.target.value})}}
                    className="form-input w-full text-gray-300" placeholder="Your username" required />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="last-name">Last Name <span className="text-red-600">*</span></label>
                  <input id="last-name" type="text" name='lastName'
                    onChange={(e) => {setData({...data, lastName: e.target.value})}}
                    className="form-input w-full text-gray-300" placeholder="Your username" required />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="email">E-mail <span className="text-red-600">*</span></label>
                  <input id="email" type="email" name='email' 
                    onChange={(e) => {setData({...data, email: e.target.value})}}
                    className="form-input w-full text-gray-300" placeholder="Your e-mail" required />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="password">Password <span className="text-red-600">*</span></label>
                  <input id="password" type="password"name='password'
                    onChange={(e) => {setData({...data, firstName: e.target.value})}}
                    className="form-input w-full text-gray-300" placeholder="Password (at least 10 characters)" required />
                </div>
              </div>
              <div className="text-sm text-gray-500 text-center">
                I agree to Way's Home <Link href="#" className="underline text-gray-400 hover:text-gray-200 hover:no-underline transition duration-150 ease-in-out">Privacy Policy</Link>.
              </div>
              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                  <button 
                    type='submit'
                    className="btn text-white bg-blue-600 hover:bg-purple-700 w-full">Sign up</button>
                </div>
              </div>
            </form>
            <div className="text-gray-400 text-center mt-6">
              Already signed up?? <Link href="/signin" className="text-blue-600 hover:text-gray-200 transition duration-150 ease-in-out">Sign in</Link>
            </div>
          </div>

        </div>
      </div>
    </section>
    </div>
  )
}
