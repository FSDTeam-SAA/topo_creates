'use client'
import AccountInfo from '@/components/account/account_info'
import Dispute from '@/components/account/dispute_components'
import MuseClub from '@/components/account/muse_club'
import OrderHistory from '@/components/account/order_history'
import YourWishlist from '@/components/account/your_wishlist'
import { Session } from 'next-auth'
import { useEffect, useState } from 'react'
import DocumentVerification from './document-verification'
import Headers from './headers'
import ChatPage from './chatpage'
import { useSession } from 'next-auth/react'
import { useSocketStore } from '@/zustand/socketStore'

interface Props {
  session: Session
}

const AllAccountInfo = ({ session }: Props) => {
  const [tab, setTab] = useState('Account Info')
  const { connectSocket, disconnectSocket, socket } = useSocketStore()
  const { data } = useSession()
  const userId = data?.user?.id

  useEffect(() => {
    if (userId && !socket) {
      connectSocket(userId)
    }

    // Cleanup on unmount
    return () => {
      disconnectSocket()
    }
  }, [userId, connectSocket, disconnectSocket, socket])

  return (
    <div className="">
      <div>
        <Headers setTab={setTab} tab={tab} session={session} />
        <div className="mb-10">
          <DocumentVerification session={session} />
        </div>
        {tab === 'Account Info' && (
          <div className="flex flex-col gap-[100px]">
            <AccountInfo />
            <MuseClub />
            <OrderHistory />
            <YourWishlist />
          </div>
        )}
        {tab === 'Dispute' && (
          <div>
            <Dispute />
          </div>
        )}
        {tab === 'Chats' && <ChatPage />}
      </div>
    </div>
  )
}

export default AllAccountInfo
