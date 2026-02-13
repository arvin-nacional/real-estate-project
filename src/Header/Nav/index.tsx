'use client'

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Menu, X } from 'lucide-react'

// Home page sections for smooth scrolling
// const homeSections = [
//   { label: 'Our Story', href: '#love-story' },
//   { label: 'Details', href: '#wedding-details' },
//   { label: 'Dress Code', href: '#dress-code' },
//   { label: 'FAQ', href: '#faq' },
//   { label: 'RSVP Now', href: '#rsvp' },
// ]

const smoothScrollToSection = (href: string) => {
  const targetId = href.replace('#', '')
  const element = document.getElementById(targetId)

  if (element) {
    const headerHeight = 80 // Approximate header height
    const elementPosition = element.offsetTop - headerHeight

    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth',
    })
  }
}

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    smoothScrollToSection(href)
    setIsMobileMenuOpen(false) // Close mobile menu after navigation
  }

  const handleCMSLinkClick = () => {
    setIsMobileMenuOpen(false) // Close mobile menu after navigation
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-6 items-center">
        {/* Show section navigation only on home page */}
        {/* {isHomePage && (
          <>
            {homeSections.map((section, i) => (
              <a
                key={i}
                href={section.href}
                onClick={(e) => handleSectionClick(e, section.href)}
                className="text-white hover:text-white/80 transition-colors font-medium cursor-pointer"
              >
                {section.label}
              </a>
            ))}
          </>
        )} */}

        {/* Always show CMS navigation items */}
        {navItems.map(({ link }, i) => {
          return (
            <CMSLink
              key={i}
              {...link}
              appearance="inline"
              className="text-white hover:text-white/80 transition-colors font-medium"
            />
          )
        })}

        {/* Search icon (commented out) */}
        {/* <Link href="/search" className="text-white hover:text-white/80 transition-colors">
          <span className="sr-only">Search</span>
          <SearchIcon className="w-5 h-5" />
        </Link> */}
      </nav>

      {/* Mobile Hamburger Button */}
      <button
        className="md:hidden text-white hover:text-white/80 transition-colors p-2"
        onClick={toggleMobileMenu}
        aria-label="Toggle mobile menu"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/95 backdrop-blur-sm">
          <div className="flex flex-col items-center justify-center min-h-screen p-8 space-y-8">
            {/* Close button */}
            <button
              className="absolute top-6 right-6 text-white hover:text-white/80 transition-colors p-2"
              onClick={toggleMobileMenu}
              aria-label="Close mobile menu"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Mobile Navigation Links */}
            <nav className="flex flex-col items-center space-y-6">
              {/* Show section navigation only on home page */}
              {/* {isHomePage && (
                <>
                  {homeSections.map((section, i) => (
                    <a
                      key={i}
                      href={section.href}
                      onClick={(e) => handleSectionClick(e, section.href)}
                      className="text-white hover:text-white/80 transition-colors font-medium text-xl cursor-pointer"
                    >
                      {section.label}
                    </a>
                  ))}
                </>
              )} */}

              {/* Always show CMS navigation items */}
              {navItems.map(({ link }, i) => {
                return (
                  <div key={i} onClick={handleCMSLinkClick}>
                    <CMSLink
                      {...link}
                      appearance="inline"
                      className="text-white hover:text-white/80 transition-colors font-medium text-xl"
                    />
                  </div>
                )
              })}

              {/* Search icon (commented out) */}
              {/* <Link 
                href="/search" 
                className="text-white hover:text-white/80 transition-colors text-xl"
                onClick={handleCMSLinkClick}
              >
                <span className="flex items-center gap-2">
                  <SearchIcon className="w-6 h-6" />
                  Search
                </span>
              </Link> */}
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
