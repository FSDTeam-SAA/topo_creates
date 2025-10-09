interface User {
  id: string
  firstName?: string
  lastName?: string
  role?: string
  email?: string
  profileImage?: string
  accessToken?: string
}

interface HeadersProps {
  setTab: (tab: string) => void
  tab: string
  user: User | null
}

const Headers = ({ setTab, tab, user }: HeadersProps) => {
  return (
    <div>
      <header className="flex container mx-auto flex-col md:flex-row justify-between items-start md:items-center mb-16 pb-2 gap-4 lg:pt-12">
        <h1 className="md:text-3xl text-2xl font-light tracking-[.5rem] uppercase">
          WELCOME BACK, {user?.firstName || 'Guest'}
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
