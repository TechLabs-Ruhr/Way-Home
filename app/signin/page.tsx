'use client'
import Link from 'next/link'
import {signIn} from "next-auth/react"
import { FC, FormEvent, useState } from 'react'
import {toast} from 'react-hot-toast'


interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  const [isLoadingGoogle, setIsLoadingGoogle] = useState<boolean>(false)
  const [isLoadingGitHub, setIsLoadingGitHub] = useState<boolean>(false)

  async function loginWithGoogle() {
    setIsLoadingGoogle(true) 
    try{
      await signIn('google') 
    }catch(error) {
      toast.error(toast.error(`Sign in failed: ${error}`)) 
    } 
  }
  async function loginWithGithub() {
    setIsLoadingGitHub(true) 
    try{
      await signIn('github')  
    }catch(error) {
      toast.error(`Sign in failed: ${error}`) 
    } 
  }

  async function loginWithCredentials(e: FormEvent) {
    try {
      e.preventDefault();
      const form = new FormData(e.target as HTMLFormElement);
  
      const res = await signIn('credentials', {
        email: String(form.get('email')),
        password: String(form.get('password')),
        redirect: true
      })

    } catch (error) {
      toast.error(`${error}`)
    }

   
    
    
  }
  return (
    <div className='bg-[whitesmoke] text-black pb-72'>
       <div className="flex mx-auto px-80 pt-20 mr-20 items-center justify-between h-20">
       <nav className="hidden md:flex md:grow">
          <ul className="flex grow justify-end flex-wrap items-center">
            <li >
                 <Link  href="/" className="text-xl font-medium text-blue-600 hover:bg-gray-600  hover:text-white w-full px-8 py-3 flex items-center transition duration-150 ease-in-out">
                  Home
                </Link>  
              </li>
              <li >
                 <Link  href="/signup" className="btn text-xl text-white bg-blue-500 hover:bg-blue-700 w-full  sm:w-auto sm:mb-0t">
                  Sign up
                </Link>  
              </li>
            </ul>
        </nav>
      </div>
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20 ">

          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1">Welcome! We exist to make traveling safer!</h1>
          </div>

          {/* Form */}
          <div className="max-w-sm mx-auto">
          <div className="flex items-center mb-6">
              <div className="border-t border-gray-700 border-dotted grow mr-3" aria-hidden="true"></div>
              <div className="text-gray-600 text-center ">
                <p>Sign in with Google or Github </p>
                <p>without having to sign up </p>
              </div>
              <div className="border-t border-gray-700 border-dotted grow ml-3" aria-hidden="true"></div>
            </div>
            <form>
              <div className="flex flex-wrap -mx-3">
                <div className="w-full px-3">
                  <button onClick={loginWithGoogle} 
                  className="btn px-0 text-black bg-grey-300 hover:bg-white-700 w-full relative flex items-center border border-black rounded">
                 {isLoadingGoogle ?
                           <svg
                           version="1.1"
                           id="loader-1"
                           xmlns="http://www.w3.org/2000/svg"
                           className="w-6 h-6 aspect-square ml-6"
                           x="0px"
                           y="0px"
                           width="40px"
                           height="40px"
                           viewBox="0 0 50 50"
                         >
                           <path fill="#000" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
                             <animateTransform
                               attributeType="xml"
                               attributeName="transform"
                               type="rotate"
                               from="0 25 25"
                               to="360 25 25"
                               dur="0.6s"
                               repeatCount="indefinite"
                             />
                           </path>
                         </svg>
                  :
                  <svg //Google icon
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
                  }
                    <span className="h-6 flex items-center border-r border-white border-opacity-25 mr-4" aria-hidden="true"></span>
                    <span className="flex-auto pl-16 pr-8 -ml-16">Sign in with Google</span>
                  </button>
                  <button onClick={loginWithGithub}
                  className="btn mt-8 px-0 text-black bg-grey-300 hover:bg-white-700 w-full relative flex items-center border border-black rounded">
                     {isLoadingGitHub ?
                     <svg
                      version="1.1"
                      id="loader-1"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 aspect-square ml-6"
                      x="0px"
                      y="0px"
                      width="40px"
                      height="40px"
                      viewBox="0 0 50 50"
                    >
                      <path fill="#000" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
                        <animateTransform
                          attributeType="xml"
                          attributeName="transform"
                          type="rotate"
                          from="0 25 25"
                          to="360 25 25"
                          dur="0.6s"
                          repeatCount="indefinite"
                        />
                      </path>
                    </svg> : 
                     <svg // Github icon 
                     xmlns="http://www.w3.org/2000/svg" 
                     width="24"
                     height="24" 
                     viewBox="0 0 24 24"
                     className= "ml-5 h-5 w-5">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>}
                    <span className="h-6 flex items-center border-r border-white border-opacity-25 mr-4" aria-hidden="true"></span>
                    <span className="flex-auto pl-16 pr-8 -ml-16">Sign in with GitHub</span>
                  </button>
                </div>
              </div>
            </form>
            <div className="flex items-center my-6">
              <div className="border-t border-gray-700 border-dotted grow mr-3" aria-hidden="true"></div>
              <div className="text-gray-600">Or, sign in with your email</div>
              <div className="border-t border-gray-700 border-dotted grow ml-3" aria-hidden="true"></div>
            </div>
            <form onSubmit={loginWithCredentials}>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">Email</label>
                  <input id="email" type="email" name='email' className="form-input w-full text-gray-800 " placeholder="you@yourcompany.com" required />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="password">Password</label>
                  <input id="password" type="password" name='password' className="form-input w-full text-gray-800" placeholder="Password (at least 10 characters)" required />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <div className="flex justify-between">
                    <label className="flex items-center">
                      <input type="checkbox" className="form-checkbox" />
                      <span className="text-gray-600 ml-2">Keep me signed in</span>
                    </label>
                    <Link href="/reset-password" className="text-blue-600 hover:text-gray-200 transition duration-150 ease-in-out">Forgot Password?</Link>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                  <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">Sign in</button>
                </div>
              </div>
            </form>
            <div className="text-gray-600 text-center mt-6">
              Don’t you have an account?  <Link href="/signup" className="text-blue-600 hover:text-gray-200 transition duration-150 ease-in-out">Sign up</Link>
            </div>
          </div>

        </div>
      </div>
    </section>
    </div>
  )
}

export default Page
