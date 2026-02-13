'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { HeaderNav } from './Nav'
import { Logo } from '@/components/Logo/Logo'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [adminBarHeight, setAdminBarHeight] = useState(0)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Detect admin bar height
  useEffect(() => {
    const checkAdminBar = () => {
      const adminBar = document.querySelector('.admin-bar')
      if (adminBar && adminBar.classList.contains('block')) {
        setAdminBarHeight(adminBar.getBoundingClientRect().height)
      } else {
        setAdminBarHeight(0)
      }
    }

    // Check initially
    checkAdminBar()

    // Set up observer to watch for admin bar changes
    const observer = new MutationObserver(checkAdminBar)
    const adminBar = document.querySelector('.admin-bar')

    if (adminBar) {
      observer.observe(adminBar, {
        attributes: true,
        attributeFilter: ['class'],
      })
    }

    // Also check periodically in case admin bar loads later
    const interval = setInterval(checkAdminBar, 1000)

    return () => {
      observer.disconnect()
      clearInterval(interval)
    }
  }, [])

  // Determine background based on page and scroll state
  const getHeaderBackground = () => {
    if (isHomePage) {
      // On home page: transparent until scrolled
      return isScrolled ? 'bg-black' : 'bg-transparent'
    } else {
      // On other pages: always black
      return 'bg-black'
    }
  }

  return (
    <header
      className={`fixed left-0 right-0 z-40 transition-all duration-300 ${getHeaderBackground()}`}
      style={{ top: `${adminBarHeight}px` }}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="container mx-auto px-4">
        <div className="py-4 flex justify-between items-center">
          <Link href="/">
            <Logo size={isScrolled ? 'small' : 'default'} />
          </Link>
          <HeaderNav data={data} />
        </div>
      </div>
    </header>
  )
}
