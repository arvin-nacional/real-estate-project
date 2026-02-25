'use client'

import React, { useState } from 'react'
import type { FAQBlock as FAQBlockType, Media } from '@/payload-types'
import { Media as MediaComponent } from '@/components/Media'

type Props = FAQBlockType

export const FAQBlock: React.FC<Props> = ({
  tagline,
  title,
  primaryImage,
  secondaryImage,
  tertiaryImage,
  faqItems,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(() => {
    // Find first item with defaultOpen
    const defaultOpenIndex = faqItems?.findIndex((item) => item.defaultOpen)
    return defaultOpenIndex !== undefined && defaultOpenIndex >= 0 ? defaultOpenIndex : 0
  })

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 lg:gap-14">
          {/* Images Section */}
          <div className="relative w-full max-w-md mx-auto lg:mx-0 lg:flex-shrink-0 lg:order-2 aspect-square">
            {/* Decorative circle */}
            <div className="absolute w-20 h-20 md:w-28 md:h-28 rounded-full bg-primary/80 bottom-16 left-0 z-10 animate-float" />

            {/* Primary Image - Large */}
            {primaryImage && typeof primaryImage === 'object' && (
              <div className="absolute inset-0 rounded-full overflow-hidden border-4 md:border-8 border-white shadow-xl">
                <MediaComponent
                  resource={primaryImage as Media}
                  imgClassName="w-full h-full object-cover"
                  fill
                />
              </div>
            )}

            {/* Secondary Image - Medium (top-left) */}
            {secondaryImage && typeof secondaryImage === 'object' && (
              <div className="absolute -top-4 -left-4 w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg z-20 animate-float-slow">
                <MediaComponent
                  resource={secondaryImage as Media}
                  imgClassName="w-full h-full object-cover"
                  fill
                />
              </div>
            )}

            {/* Tertiary Image - Small (bottom-right) */}
            {tertiaryImage && typeof tertiaryImage === 'object' && (
              <div className="absolute -bottom-4 -right-4 w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-white shadow-lg z-20 animate-float-delayed">
                <MediaComponent
                  resource={tertiaryImage as Media}
                  imgClassName="w-full h-full object-cover"
                  fill
                />
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="flex-1 lg:order-1 max-w-xl">
            {tagline && (
              <span className="text-sm md:text-base font-semibold text-primary uppercase tracking-wider mb-2 block">
                {tagline}
              </span>
            )}
            {title && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
                {title}
              </h2>
            )}

            {/* FAQ Accordion */}
            <ul className="space-y-0">
              {faqItems?.map((item, index) => {
                const isActive = activeIndex === index
                return (
                  <li
                    key={index}
                    className={`border-b transition-colors duration-300 ${
                      isActive ? 'border-primary/50' : 'border-gray-200'
                    }`}
                  >
                    <button
                      onClick={() => toggleItem(index)}
                      className="w-full flex items-center justify-between py-4 md:py-5 text-left group"
                    >
                      <span className="text-base md:text-lg font-semibold text-gray-900 pr-8 group-hover:text-primary transition-colors">
                        {item.question}
                      </span>
                      <span className="relative w-5 h-5 flex-shrink-0">
                        {/* Plus/Minus icon */}
                        <span
                          className={`absolute top-1/2 left-0 w-5 h-0.5 bg-gray-900 transition-all duration-300 ${
                            isActive ? 'rotate-0 bg-primary' : 'rotate-0'
                          }`}
                        />
                        <span
                          className={`absolute top-1/2 left-0 w-5 h-0.5 bg-gray-900 transition-all duration-300 ${
                            isActive ? 'rotate-0 opacity-0' : 'rotate-90'
                          }`}
                        />
                      </span>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isActive ? 'max-h-96 opacity-100 pb-5' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed pr-8">
                        {item.answer}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 13s ease-in-out 1s infinite;
        }
      `}</style>
    </section>
  )
}
