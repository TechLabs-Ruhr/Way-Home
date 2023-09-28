

export const metadata = {
  title: 'Sign Up',
  description: 'Page description',
}


import PageIllustration from '@/components/landingPage/page-illustration'
import Footer from '@/components/ui/footer'
import Head from 'next/head'

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {  

  return (
    <>
       <Head>
        <title>Sign Up</title>
      </Head>
      <main className="grow pb-72 h-[150vh]" >
        <PageIllustration/>
        {children}

      </main>
      <div > 
        <Footer />
      </div>
    </>
  )
}
