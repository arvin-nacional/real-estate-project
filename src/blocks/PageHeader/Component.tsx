import React from 'react'

import type { PageHeaderBlock as PageHeaderBlockProps, Media } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

export const PageHeaderBlock: React.FC<PageHeaderBlockProps> = ({
  heading,
  description,
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
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        {heading && <h1 className="text-4xl md:text-5xl font-bold text-white">{heading}</h1>}
        {description && <p className="text-lg text-white max-w-2xl mx-auto">{description}</p>}
      </div>
    </section>
  )
}
