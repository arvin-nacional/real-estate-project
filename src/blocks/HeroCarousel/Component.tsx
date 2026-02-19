'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react'

import type { HeroCarouselBlock as HeroCarouselBlockProps } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'
import { ParallaxWrapper } from '@/components/ui/ParallaxWrapper'
import { getMediaUrl } from '@/utilities/getMediaUrl'

export const HeroCarouselBlock: React.FC<HeroCarouselBlockProps> = ({
  title,
  subtitle,
  description,
  images,
  primaryButton,
  autoAdvance = true,
  autoAdvanceInterval = 5000,
}) => {
  const [currentImage, setCurrentImage] = useState(0)

  // Auto-advance carousel
  useEffect(() => {
    if (!autoAdvance || !images || images.length <= 1) return

    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, autoAdvanceInterval || 5000)

    return () => clearInterval(timer)
  }, [autoAdvance, autoAdvanceInterval, images])

  const nextImage = () => {
    if (!images || images.length <= 1) return
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    if (!images || images.length <= 1) return
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  if (!images || images.length === 0) {
    return (
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50">
        <div className="text-center text-gray-600">
          <p>No images configured for hero carousel</p>
        </div>
      </section>
    )
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Carousel */}
      <div className="absolute inset-0">
        {images.map((imageItem, index) => {
          // Handle both direct media objects and nested image objects
          const image =
            typeof imageItem === 'object' && imageItem !== null
              ? 'image' in imageItem
                ? imageItem.image
                : imageItem
              : null

          const rawUrl = typeof image === 'object' && image !== null && image.url ? image.url : null
          const imageUrl = rawUrl ? getMediaUrl(rawUrl) : null
          const imageAlt =
            typeof image === 'object' && image !== null ? image.alt : `Hero image ${index + 1}`

          // Skip images with no valid URL
          if (!imageUrl) return null

          return (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImage ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={imageUrl || '/placeholder.svg'}
                alt={imageAlt || `Hero image ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>
          )
        })}
      </div>

      {/* Carousel Controls - Only show if more than one image */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-colors hidden md:block"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            type="button"
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-colors hidden md:block"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Carousel Indicators */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentImage(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentImage ? 'bg-white' : 'bg-white/50'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}

      {/* Hero Content */}
      <div className="relative z-20 text-center text-white px-4">
        {/* <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-20 h-px bg-white/50" />
          <Heart className="w-8 h-8 text-white fill-white" />
          <div className="w-20 h-px bg-white/50" />
        </div> */}

        {title && <h1 className="text-6xl lg:text-8xl font-serif mb-4 drop-shadow-lg">{title}</h1>}

        {subtitle && (
          <p className="text-xl lg:text-2xl font-light mb-8 drop-shadow-md">{subtitle}</p>
        )}

        {description && (
          <div className="mb-8 max-w-2xl mx-auto">
            <RichText
              data={description}
              enableGutter={false}
              className="text-white/90 drop-shadow-md"
            />
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {primaryButton?.link && (
            <CMSLink
              {...primaryButton.link}
              appearance="default"
              size="lg"
              className="bg-white text-primary hover:bg-primary/90 px-8 py-3 text-lg font-medium rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl"
            />
          )}

          {/* Fallback primary button if no CMS data */}
          {!primaryButton?.link && (
            <button className="bg-white text-primary hover:bg-primary/90 px-8 py-3 text-lg font-medium rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl">
              RSVP Now
            </button>
          )}
        </div>
      </div>

      {/* Scroll Indicator - Only show if there's only one image or no carousel indicators */}
      {images.length <= 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
          </div>
        </div>
      )}
    </section>
  )
}
