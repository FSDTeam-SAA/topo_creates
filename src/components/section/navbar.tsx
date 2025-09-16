'use client'

import type React from 'react'

// Packages
import { Menu, Search, ShoppingBag, User, X } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
// Components
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Session } from 'next-auth'
// import { Input } from "@/components/ui/input";

interface Props {
  isLoggedin?: boolean
  session?: Session
}

const Navbar = ({ isLoggedin, session }: Props) => {
  const [scrolling, setScrolling] = useState(false)
  const pathname = usePathname()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchRef = useRef<HTMLDivElement>(null)
  const searchModalRef = useRef<HTMLDivElement>(null)
  const [isAccountOpen, setIsAccountOpen] = useState(false)
  const accountRef = useRef<HTMLDivElement>(null)

  const menus = [
    { id: 1, href: '/', linkText: 'HOME' },
    { id: 2, href: '/shop', linkText: 'SHOP' },
    // { id: 3, href: "/about", linkText: "ABOUT" },
    { id: 4, href: '/how-it-works', linkText: 'HOW IT WORKS' },
    { id: 5, href: '/become-lender', linkText: 'BECOME A LENDER' },
    { id: 6, href: '/find-near-you', linkText: 'FIND NEAR YOU' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Handle search modal click outside
      if (
        isSearchOpen &&
        searchRef.current &&
        !searchRef.current.contains(event.target as Node) &&
        searchModalRef.current &&
        !searchModalRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false)
      }

      // Handle account dropdown click outside
      if (
        isAccountOpen &&
        accountRef.current &&
        !accountRef.current.contains(event.target as Node)
      ) {
        setIsAccountOpen(false)
      }
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSearchOpen(false)
        setIsAccountOpen(false)
      }
    }

    if (isSearchOpen || isAccountOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscapeKey)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isSearchOpen, isAccountOpen])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Handle search logic here
      console.log('Searching for:', searchQuery)
      // You can redirect to search results page or handle search
      // router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const isHomePage = pathname === '/'

  const getTextColor = () => {
    return scrolling ||
      pathname === '/become-lender' ||
      pathname.startsWith('/product/') ||
      pathname.startsWith('/shop/') || // ✅ add this
      pathname === '/checkout' ||
      pathname === '/shop' ||
      pathname === '/account' ||
      pathname === '/about' ||
      pathname === '/how-it-works' ||
      pathname === '/find-near-you' ||
      pathname === '/login'
      ? 'text-black'
      : 'text-white'
  }

  const getBorderColor = () => {
    return scrolling ||
      pathname === '/become-lender' ||
      pathname.startsWith('/product/') ||
      pathname.startsWith('/shop/') || // ✅ add this
      pathname === '/checkout' ||
      pathname === '/shop' ||
      pathname === '/account' ||
      pathname === '/about' ||
      pathname === '/how-it-works' ||
      pathname === '/find-near-you' ||
      pathname === '/login'
      ? 'border-black'
      : 'border-white'
  }

  return (
    <>
      <div
        className={`fixed top-0 z-50 min-w-full py-3 transition duration-300 ${
          scrolling ? 'bg-white' : isHomePage ? '' : 'bg-transparent mt-0'
        }`}
      >
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center md:gap-x-2 lg:gap-x-0">
              {menus.map((menu) => (
                <Button
                  key={menu.id}
                  variant="link"
                  effect="hoverUnderline"
                  asChild
                  className={`text-[12px] font-inter font-light ${getTextColor()}`}
                >
                  <Link
                    href={menu.href}
                    className={`${
                      pathname === menu.href ? 'font-normal' : 'font-light'
                    } leading-[20px] tracking-[0.1em]`}
                  >
                    {menu.linkText}
                  </Link>
                </Button>
              ))}

              <div className="flex-shrink-0">
                {scrolling ||
                pathname === '/account' ||
                pathname.startsWith('/product/') ||
                pathname.startsWith('/shop/') || // ✅ add this
                pathname === '/login' ||
                pathname === '/checkout' ||
                pathname === '/become-lender' ||
                pathname === '/shop' ||
                pathname === '/about' ||
                pathname === '/how-it-works' ||
                pathname === '/find-near-you' ? (
                  <Image
                    src="/logo-black.svg"
                    height={60}
                    width={60}
                    alt="Logo"
                  />
                ) : (
                  <Image src="/logo.svg" height={60} width={60} alt="Logo" />
                )}
              </div>
            </div>

            {/* Logo */}
            {/* <div className="flex-shrink-0">
              {scrolling ||
              pathname === "/account" ||
              pathname.startsWith("/product/") ||
              pathname === "/login" ||
              pathname === "/checkout" ||
              pathname === "/become-lender" ||
              pathname === "/shop" ||
              pathname === "/about" ||
              pathname === "/how-it-works" ||
              pathname === "/find-near-you" ? (
                <Image src="/logos/Logo_black.png" height={60} width={60} alt="Logo" />
              ) : (
                <Image src="/logos/logo.png" height={60} width={60} alt="Logo" />
              )}
            </div> */}

            {/* Desktop Actions */}
            <div className={`${getTextColor()} flex gap-[30px] items-center`}>
              <div className="relative" ref={searchRef}>
                <Search
                  className="cursor-pointer hover:opacity-70 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsSearchOpen(!isSearchOpen)
                  }}
                  size={20}
                />
              </div>

              {/* User Menu */}
              <div className="relative cursor-pointer" ref={accountRef}>
                {!isLoggedin ? (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setIsAccountOpen(!isAccountOpen)}
                      className="flex items-center"
                    >
                      <User
                        size={20}
                        className="hover:opacity-70 transition-opacity"
                      />
                    </Link>
                    {/* {isAccountOpen && (
                      <div className="absolute top-8 right-0 mt-1 z-50 bg-white p-6 shadow-md min-w-[180px]">
                        <div className="flex flex-col items-center">
                          <Link href="/login" className="block text-center">
                            <span className="text-black text-sm tracking-[0.2em] uppercase">
                              LOGIN
                            </span>
                            <div className="h-[1px] bg-black w-full mt-1"></div>
                          </Link>
                        </div>
                      </div>
                    )} */}
                  </>
                ) : (
                  <>
                    <div
                      onClick={() => setIsAccountOpen(!isAccountOpen)}
                      className={`border rounded-full w-7 h-7 flex items-center justify-center text-sm font-medium ${getBorderColor()} hover:opacity-70 transition-opacity`}
                    >
                      {session?.user?.firstName?.slice(0, 1) || 'U'}
                    </div>
                    {isAccountOpen && (
                      <div className="absolute top-8 right-0 mt-1 z-50 bg-white p-6 shadow-md min-w-[180px]">
                        <div className="flex flex-col items-center space-y-6">
                          <Link
                            href="/account"
                            className="block text-center w-full"
                            onClick={() => setIsAccountOpen(!isAccountOpen)}
                          >
                            <span className="text-black text-sm tracking-[0.2em] uppercase">
                              MY ACCOUNT
                            </span>
                            <div className="h-[1px] bg-black w-full mt-1"></div>
                          </Link>
                          <button
                            onClick={() => {
                              signOut()
                              setIsAccountOpen((prev) => !prev)
                            }}
                            className="block text-center w-full"
                          >
                            <span className="text-black text-sm tracking-[0.2em] uppercase">
                              SIGN OUT
                            </span>
                            <div className="h-[1px] bg-black w-full mt-1"></div>
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              <Link
                href="/checkout"
                className="hover:opacity-70 transition-opacity"
              >
                <ShoppingBag size={20} />
              </Link>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden flex items-center justify-between gap-x-4 w-full">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" className="p-1" size="icon">
                    <Menu className={getTextColor()} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="top" className="bg-white text-black">
                  <div className="flex flex-col items-center gap-y-8 mt-6">
                    <div className="flex flex-col items-center gap-y-5">
                      {menus.map((menu) => (
                        <Link
                          key={menu.id}
                          href={menu.href}
                          className={`${
                            pathname === menu.href
                              ? 'font-semibold'
                              : 'font-light'
                          } text-lg hover:text-gray-600 transition-colors`}
                        >
                          <SheetClose>{menu.linkText}</SheetClose>
                        </Link>
                      ))}
                      {!session?.user && (
                        <Link
                          href="/login"
                          className="text-lg font-medium hover:text-gray-600 transition-colors"
                        >
                          <SheetClose>Login</SheetClose>
                        </Link>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <div className="flex items-center gap-4">
                <Search
                  className={`${getTextColor()} cursor-pointer`}
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsSearchOpen(!isSearchOpen)
                  }}
                  size={20}
                />
                {!session?.user && (
                  <Button
                    variant="link"
                    effect="hoverUnderline"
                    asChild
                    className={getTextColor()}
                  >
                    <Link href="/login">Login</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width Search Dropdown */}
      {isSearchOpen && (
        <div
          ref={searchModalRef}
          className="fixed top-[70px] left-[14%] w-full bg-white border-b border-gray-200 shadow-lg z-[60] animate-in slide-in-from-top-2 duration-200 container"
          onClick={(e) => e.stopPropagation()} // Prevent clicks inside from bubbling up
        >
          <div className="container mx-auto py-8 px-4">
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center gap-4"
            >
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border-0 border-b border-gray-500 focus:border-gray-500 focus:outline-none px-0 py-2 placeholder:text-gray-400"
                  autoFocus
                />
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsSearchOpen(false)
                }}
                className="text-gray-400 hover:text-black transition-colors p-2"
              >
                <X size={24} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Overlay to close search when clicking outside */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 z-[59]"
          onClick={(e) => {
            // This will be handled by the click outside detection
            // We don't want to close here directly as it would interfere with our logic
            e.stopPropagation()
          }}
        />
      )}
    </>
  )
}

export default Navbar
