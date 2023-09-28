"use client"

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'


export default function SignUp() {
  const router = useRouter()


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

     const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(formData),
      })
        // Handle success, e.g., redirect or display a success message
        if (res.ok) {
          // Registration was successful, so navigate to the sign-in page
          router.push('/signin'); 
        } else {
          console.error('Registration failed');
        }
    
  }

  return (
    <div className='bg-[whitesmoke] text-black pb-72'> 
      <Head>
        <title>Sign Up</title>
      </Head>
    <div className="flex mx-auto px-80 pt-20 mr-20 items-center justify-between h-20">
       <nav className="hidden md:flex md:grow">
          <ul className="flex grow justify-end flex-wrap items-center">
            <li >
                 <Link  href="/" className="text-xl font-medium text-blue-600 hover:bg-gray-600  hover:text-white w-full px-8 py-3 flex items-center transition duration-150 ease-in-out">
                  Home
                </Link>  
              </li>
              <li >
                 <Link  href="/signin" className="btn text-xl text-white bg-blue-500 hover:bg-blue-700 w-full  sm:w-auto sm:mb-0t">
                  Sign in
                </Link>  
              </li>
            </ul>
        </nav>
      </div>
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">

          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-6 md:pb-20">
            <h1 className="h1">Welcome. We exist to make traveling safer!</h1>
          </div>
          {/* Form */}
          <div className="max-w-sm mx-auto">
            <div className="flex items-center my-6">
              <div className="border-t border-gray-700 border-dotted grow mr-3" aria-hidden="true"></div>
              <div className="text-gray-600">Register with your email</div>
              <div className="border-t border-gray-700 border-dotted grow ml-3" aria-hidden="true"></div>
            </div>
            <form onSubmit={registerUser}>
            <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="first-name">First Name <span className="text-red-600">*</span></label>
                  <input id="first-name" type="text" name='firstName'
                    className="form-input w-full text-gray-800" placeholder="Your username" required />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="last-name">Last Name <span className="text-red-600">*</span></label>
                  <input id="last-name" type="text" name='lastName'
                    className="form-input w-full text-gray-800" placeholder="Your username" required />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">E-mail <span className="text-red-600">*</span></label>
                  <input id="email" type="email" name='email' 
                    className="form-input w-full text-gray-800" placeholder="Your e-mail" required />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="password">Password <span className="text-red-600">*</span></label>
                  <input id="password" type="password"name='password'
                    className="form-input w-full text-gray-800" placeholder="Password (at least 10 characters)" required />
                </div>
              </div>
              <div className="text-sm text-gray-600 text-center">
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
            <div className="text-gray-600 text-center mt-6">
              Already signed up?? <Link href="/signin" className="text-blue-600 hover:text-gray-600 transition duration-150 ease-in-out">Sign in</Link>
            </div>
            <div className="pt-5 border-b border-gray-700 border-dotted grow" aria-hidden="true"></div>
            <div className="flex text-center items-center my-6">
              <div className="text-gray-600"><p className='text-[0.92em] pb-3'>You can sign in faster without providing your credentials</p> 
              <Link href="/signin" className='text-blue-600 font-semibold text-lg hover:text-gray-600 transition duration-150 ease-in-out'> Sign in with Google or Github</Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
    </div>
  )
}
