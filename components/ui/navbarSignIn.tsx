import Link from 'next/link'
import { FC } from 'react'
import MobileMenu from './mobile-menu'

interface navbarSignInProps {
  
}

const navbarSignIn: FC<navbarSignInProps> = ({}) => {
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
            <li >
                 <Link  href="/" className="font-medium text-blue-600 hover:bg-grey-600 px-4 py-3 flex items-center transition duration-150 ease-in-out">
                  Home
                </Link> 
              </li>
          
              </ul>
          </nav>
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}


export default navbarSignIn