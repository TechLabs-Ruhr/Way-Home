import { db } from '@/lib/db'

export const metadata = {
  title: 'Home - Open PRO',
  description: 'Page description',
}

import Hero from '@/components/landingPage/hero'
import Features from '@/components/features'
import Newsletter from '@/components/landingPage/newsletter'
import Zigzag from '@/components/landingPage/zigzag'
import Testimonials from '@/components/landingPage/testimonials'

export default async function Home() {
  await db.set('hello', 'hello');

  return (
    <>
    <div style={main}> 
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