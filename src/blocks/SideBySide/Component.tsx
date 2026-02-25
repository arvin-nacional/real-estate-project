'use client'

import React from 'react'
import type { SideBySideBlock as SideBySideBlockType, Media } from '@/payload-types'
import { Media as MediaComponent } from '@/components/Media'
import { CMSLink } from '@/components/Link'

type Props = SideBySideBlockType

export const SideBySideBlock: React.FC<Props> = ({
  tagline,
  title,
  description,
  primaryImage,
  secondaryImage,
  weekdays,
  weekends,
  button,
  backgroundColor = 'bg-gray-50',
}) => {
  return (
    <section className={`py-16 md:py-24 ${backgroundColor} relative overflow-hidden`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-20">
          {/* Content Section */}
          <div className="flex-1 text-center lg:text-left">
            {tagline && (
              <span className="text-sm md:text-base font-semibold text-primary uppercase tracking-wider mb-2 block">
                {tagline}
              </span>
            )}
            {title && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 max-w-2xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-base md:text-lg text-gray-600 mb-6 max-w-2xl leading-relaxed">
                {description}
              </p>
            )}

            {/* Hours */}
            <div className="mb-8">
              {weekdays && (
                <div className="text-sm md:text-base font-bold text-gray-700 uppercase tracking-wide mb-1">
                  {weekdays}
                </div>
              )}
              {weekends && (
                <div className="text-sm md:text-base font-bold text-gray-700 uppercase tracking-wide">
                  {weekends}
                </div>
              )}
            </div>

            {/* Button */}
            {button?.link && (
              <CMSLink
                url={button.link}
                className="bg-gray-950 text-white hover:bg-gray-900 font-medium px-8 py-3 rounded-lg transition-all duration-300"
              >
                {button.text || 'Learn More'}
              </CMSLink>
            )}
          </div>

          {/* Images Section */}
          <div className="flex-1 lg:max-w-xl relative max-h-[80vh]">
            <div className="relative w-full aspect-[4/5] lg:aspect-[3/4] max-h-[60vh]">
              {/* Primary Image */}
              {primaryImage && typeof primaryImage === 'object' && (
                <div className="absolute inset-0 rounded-2xl overflow-hidden border-4 md:border-8 border-white shadow-xl transform lg:-rotate-2">
                  <MediaComponent
                    resource={primaryImage as Media}
                    imgClassName="w-full h-full object-cover"
                    fill
                  />
                </div>
              )}

              {/* Secondary Image */}
              {secondaryImage && typeof secondaryImage === 'object' && (
                <div className="absolute -bottom-4 -right-4 lg:bottom-8 lg:right-8 w-1/2 h-3/4 max-h-[45vh] rounded-2xl overflow-hidden border-4 md:border-8 border-white shadow-xl transform lg:rotate-2">
                  <MediaComponent
                    resource={secondaryImage as Media}
                    imgClassName="w-full h-full object-cover"
                    fill
                  />
                </div>
              )}
            </div>

            {/* Decorative Element */}
            <div className="absolute -bottom-8 -right-8 lg:bottom-0 lg:right-0 w-32 h-32 md:w-48 md:h-48 opacity-20">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-primary to-secondary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
