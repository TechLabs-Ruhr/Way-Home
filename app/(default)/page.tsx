//landing page

export const metadata = {
  title: 'Way Home',
  description: 'Best navigation app',
}

import Hero from '@/components/landingPage/hero'
import Features from '@/components/landingPage/features'
import Newsletter from '@/components/landingPage/newsletter'
import Zigzag from '@/components/landingPage/zigzag'
import Testimonials from '@/components/landingPage/testimonials'
import NavBarHome from '@/components/ui/nav-barHome'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export default async function Home() {
  const session =  await getServerSession(authOptions)


  return (
    <>
    <div style={main}> 
      <NavBarHome isSession={session}/>
      <Hero />
      <Features />
      <Zigzag />
      <Testimonials />  
      <Newsletter />
      </div>
    </>
  )
}

const main = {
  backgroundColor: "#FCFDFD",
  color: "black",
} 