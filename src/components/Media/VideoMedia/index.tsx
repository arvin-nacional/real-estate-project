'use client'

import { cn } from '@/utilities/ui'
import React, { useEffect, useRef } from 'react'

import type { Props as MediaProps } from '../types'

import { getMediaUrl } from '@/utilities/getMediaUrl'

export const VideoMedia: React.FC<MediaProps> = (props) => {
  const { fill, imgClassName, onClick, resource, videoClassName } = props

  const videoRef = useRef<HTMLVideoElement>(null)
  // const [showFallback] = useState<boolean>()

  useEffect(() => {
    const { current: video } = videoRef
    if (video) {
      video.addEventListener('suspend', () => {
        // setShowFallback(true);
        // console.warn('Video was suspended, rendering fallback image.')
      })
    }
  }, [])

  if (resource && typeof resource === 'object') {
    // Pass the entire resource object to getMediaUrl
    // This will try all available URL strategies (url, filename with S3 construction)
    const videoUrl = getMediaUrl(resource)

    if (!videoUrl) return null

    console.log('Using video URL:', videoUrl)

    return (
      <video
        autoPlay
        className={cn(
          videoClassName,
          imgClassName,
          fill && 'absolute inset-0 w-full h-full object-cover',
        )}
        controls={false}
        crossOrigin="anonymous"
        loop
        muted
        onClick={onClick}
        playsInline
        preload="auto"
        ref={videoRef}
      >
        <source src={videoUrl} type="video/mp4" />
        {/* Fallback text for browsers that don't support video */}
        Your browser does not support the video tag.
      </video>
    )
  }

  return null
}
