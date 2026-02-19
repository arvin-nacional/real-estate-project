'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div className="relative flex items-center justify-center text-white " data-theme="dark">
      <div className="h-screen mb-8 z-10 relative flex items-center justify-center">
        <div className="max-w-[1200px] md:text-center">
          {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex md:justify-center gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="min-h-[80vh] select-none">
        {/* Background media (image or video) */}
        {media && typeof media === 'object' && (
          <div className="absolute inset-0 w-full h-full">
            <Media
              key={`hero-media-${media.id || media.filename || new Date().getTime()}`}
              fill
              imgClassName="-z-10 object-cover"
              videoClassName="-z-10 object-cover"
              priority
              resource={media}
            />
            {/* Light overlay to make text more readable */}
            <div className="absolute inset-0 bg-black bg-opacity-30 -z-5"></div>
          </div>
        )}
      </div>
    </div>
  )
}
