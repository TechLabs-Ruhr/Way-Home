export const metadata = {
  title: 'Home - Open PRO',
  description: 'Page description',
}

import Hero from '@/components/hero'
import Features from '@/components/features'
import Newsletter from '@/components/newsletter'
import Zigzag from '@/components/zigzag'
import Testimonials from '@/components/testimonials'

export default function Home() {
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