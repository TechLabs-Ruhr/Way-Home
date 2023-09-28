import PageIllustration from '@/components/landingPage/page-illustration'
import Footer from '@/components/ui/footer'

export const metadata = {
  title: 'Sign In',
  description: 'Page description',
}

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {  
  

  return (
    <>
      <main className="grow">

      
        <PageIllustration/>
        {children}

      </main>

      <Footer />
    </>
  )
}
