'use client'

import { cn } from '@/utilities/ui'
import React, { useEffect, useRef } from 'react'

import type { Props as MediaProps } from '../types'

import { getClientSideURL } from '@/utilities/getURL'

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
    // Get the URL from the resource or construct it properly for S3
    let videoUrl = resource.url
      ? `${getClientSideURL()}${resource.url}`
      : resource.filename
        ? `https://${process.env.NEXT_PUBLIC_S3_BUCKET || process.env.S3_BUCKET}.s3.${process.env.NEXT_PUBLIC_S3_REGION || process.env.S3_REGION}.amazonaws.com/${resource.filename}`
        : ''

    // Add cache-busting parameter with timestamp
    if (videoUrl) {
      const cacheBuster = new Date().getTime()
      videoUrl = videoUrl.includes('?')
        ? `${videoUrl}&_cb=${cacheBuster}`
        : `${videoUrl}?_cb=${cacheBuster}`
    }

    console.log('Video URL:', videoUrl) // For debugging

    return (
      <video
        autoPlay
        className={cn(
          videoClassName,
          imgClassName,
          fill && 'absolute inset-0 w-full h-full object-cover',
        )}
        controls={false}
        loop
        muted
        onClick={onClick}
        playsInline
        ref={videoRef}
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
    )
  }

  return null
}
