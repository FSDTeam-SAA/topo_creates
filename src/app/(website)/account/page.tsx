import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import AllAccountInfo from './_components/all_account_info'

const page = async () => {
  const session = await auth()

  if (!session) redirect('/login')

  return (
    <div className="container mx-auto">
      <AllAccountInfo session={session} />
    </div>
  )
}

export default page
