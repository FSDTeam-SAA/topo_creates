'use client'

import AccountInfo from '@/components/account/account_info'
import Dispute from '@/components/account/dispute_components'
import MuseClub from '@/components/account/muse_club'
import OrderHistory from '@/components/account/order_history'
import YourWishlist from '@/components/account/your_wishlist'
import { Session } from 'next-auth'
import { useState } from 'react'
import DocumentVerification from './document-verification'
import Headers from './headers'
import ChatPage from './chatpage'

interface Props {
  session: Session
}

const AllAccountInfo = ({ session }: Props) => {
  const [tab, setTab] = useState('Account Info')

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
