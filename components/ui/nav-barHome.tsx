import Link from 'next/link'
import MobileMenu from './mobile-menu'
import { FC } from 'react'
import SignOutButton from './SignOutButton'
import { Session } from 'next-auth/core/types';


interface NavBarHomeProps {
  isSession: Session | null
}


const NavBarHome: FC<NavBarHomeProps> = ({
  isSession
}) => {
  return (
    <header className="absolute w-full z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
  
         {/*  <div className="shrink-0 mr-4">
           
            <Link href="/" className="block" aria-label="Cruip">
              place for  logo
            </Link>
          </div>
 */}
          <nav className="hidden md:flex md:grow">
            <ul className="flex grow justify-end flex-wrap items-center">
              <li>
                  <Link  href="/dashboard" className="font-medium text-blue-600 hover:bg-grey-600 px-4 py-3 flex items-center transition duration-150 ease-in-out">
                    Dashboard
                  </Link> 
              </li>
              <li >
             {isSession  ? 
                  <SignOutButton iconStyle={false}/>
                   : 
                <Link
                   href="/signin"
                   className='btn text-white bg-blue-500 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0'>
                   Sign in
                 </Link>}
               
              </li> 
             {/*  <li >
               {/*  <Link  href="/signup" className="button">
                  Sign up
                </Link> */}
              </ul>
          </nav>
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}

export default NavBarHome

