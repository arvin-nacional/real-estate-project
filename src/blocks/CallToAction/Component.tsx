import React from 'react'

import type { CallToActionBlock as CTABlockProps, Media } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { getMediaUrl } from '@/utilities/getMediaUrl'

export const CallToActionBlock: React.FC<CTABlockProps> = ({
  links,
  richText,
  backgroundVideo,
  overlayOpacity = 60,
}) => {
  const video = backgroundVideo as Media | undefined
  const videoUrl = video ? getMediaUrl(video) : null
  const hasVideo = Boolean(videoUrl)
  const opacity = (overlayOpacity ?? 60) / 100

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* Video Background */}
      {hasVideo && videoUrl && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      )}

      {/* Overlay / Gradient fallback */}
      <div
        className="absolute inset-0"
        style={hasVideo ? { backgroundColor: `rgba(0, 0, 0, ${opacity})` } : undefined}
      />
      {!hasVideo && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary" />
      )}

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {richText && (
          <RichText
            className="mb-8 prose-headings:text-white prose-headings:font-bold prose-headings:text-3xl prose-p:text-gray-300 prose-strong:text-accent"
            data={richText}
            enableGutter={false}
          />
        )}
        <div className="flex flex-wrap justify-center gap-4">
          {(links || []).map(({ link }, i) => {
            return (
              <CMSLink
                key={i}
                {...link}
                className="bg-white text-[#0a2e2a] hover:bg-primary hover:text-white font-medium px-8 transition-all duration-300"
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
