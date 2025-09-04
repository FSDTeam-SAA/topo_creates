import { auth } from '@/auth'
import Footer from '@/components/Footer/Footer'
import Navbar from '@/components/section/navbar'

export default async function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  return (
    <div className="">
      <Navbar isLoggedin={!!session} session={session!} />
      <div className="">{children}</div>
      <Footer />
    </div>
  )
}
