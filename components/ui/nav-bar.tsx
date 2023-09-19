"use client"
import Link from 'next/link'
import MobileMenu from './mobile-menu'
import { useRouter } from 'next/router';



export default function navBar() {
/*   const router = useRouter(); // Get the router instance
 */
  return (
    <header className="absolute w-full z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Site branding */}
          <div className="shrink-0 mr-4">
            {/* Logo */}
            <Link href="/" className="block" aria-label="Cruip">
              
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            {/* Desktop sign in links */}
            <ul className="flex grow justify-end flex-wrap items-center">
            <li >
                 <Link  href="/" className="font-medium text-blue-600 hover:bg-grey-600 px-4 py-3 flex items-center transition duration-150 ease-in-out">
                  Home
                </Link> 
              </li>
              <li >
                {/*   {router.pathname === '/' ? 
                    <Link  href="/dashboard" className="font-medium text-blue-600 hover:bg-grey-600 px-4 py-3 flex items-center transition duration-150 ease-in-out">
                    Dashboard
                  </Link> 
                   : null} */}
              </li>
              <li >
             {/*  {router.pathname === '/' ? 
                     <Link
                     href="/signin"
                    className='btn text-white bg-blue-500 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0'>
                     Sign in
                   </Link>
                   : null}
               
              </li> */}
             {/*  <li >
               {/*  <Link  href="/signup" className="button">
                  Sign up
                </Link> */}
              </li> 
              </ul>
          </nav>

          <MobileMenu />
        </div>
      </div>
    </header>
  )
}

