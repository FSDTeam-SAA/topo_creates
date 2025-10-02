'use client'

import { Session } from 'next-auth'

interface HeadersProps {
  setTab: (tab: string) => void
  tab: string
  session: Session
}

const Headers = ({ setTab, tab, session }: HeadersProps) => {
  return (
    <div className="pt-[70px] lg:pt-[90px] ">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 pb-2 gap-4 lg:pt-12">
        <h1 className="md:text-3xl text-2xl font-light tracking-[.5rem] uppercase">
          WELCOME BACK, {session?.user?.firstName || 'Guest'}
        </h1>
        <nav className="flex flex-wrap items-center justify-start md:justify-center gap-4 sm:gap-6 md:gap-12 text-xs">
          {['Account Info', 'Chats', 'Dispute'].map((label) => (
            <a
              key={label}
              onClick={() => setTab(label)}
              className={`uppercase font-light text-[12px] cursor-pointer pb-2 ${
                tab === label ? 'border-b border-black' : ''
              }`}
            >
              {label}
            </a>
          ))}
        </nav>
      </header>
    </div>
  )
}

export default Headers
