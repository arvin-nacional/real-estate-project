'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page, Media as MediaType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { getMediaUrl } from '@/utilities/getMediaUrl'

export const HighImpactHero: React.FC<Page['hero']> = ({
  links,
  media,
  richText,
  backgroundVideo,
  overlayOpacity = 30,
}) => {
  const { setHeaderTheme } = useHeaderTheme()

  const video = backgroundVideo as MediaType | undefined
  const videoUrl = video ? getMediaUrl(video) : null
  const hasVideo = Boolean(videoUrl)
  const opacity = (overlayOpacity ?? 30) / 100

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div className="relative flex items-center justify-center text-white" data-theme="dark">
      <div className="h-screen mb-8 z-10 relative flex items-center justify-center">
        <div className="max-w-[1200px] md:text-center">
          {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex md:justify-center gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink
                      {...link}
                      className="bg-gray-950 text-white hover:bg-gray-900 font-semibold px-8 py-3 rounded-lg transition-all duration-300"
                    />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="min-h-[80vh] select-none">
        {/* Video Background (takes priority over image) */}
        {hasVideo && videoUrl ? (
          <div className="absolute inset-0 w-full h-full">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover -z-10"
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
            <div
              className="absolute inset-0 -z-5"
              style={{ backgroundColor: `rgba(0, 0, 0, ${opacity})` }}
            />
          </div>
        ) : (
          /* Fallback to image media */
          media &&
          typeof media === 'object' && (
            <div className="absolute inset-0 w-full h-full">
              <Media
                key={`hero-media-${media.id || media.filename || new Date().getTime()}`}
                fill
                imgClassName="-z-10 object-cover"
                videoClassName="-z-10 object-cover"
                priority
                resource={media}
              />
              <div
                className="absolute inset-0 -z-5"
                style={{ backgroundColor: `rgba(0, 0, 0, ${opacity})` }}
              />
            </div>
          )
        )}
      </div>
    </div>
  )
}
