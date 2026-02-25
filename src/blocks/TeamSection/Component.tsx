'use client'

import React from 'react'
import type { TeamSectionBlock as TeamSectionBlockType, Media } from '@/payload-types'
import { Media as MediaComponent } from '@/components/Media'

type Props = TeamSectionBlockType

export const TeamSectionBlock: React.FC<Props> = ({
  tagline,
  title,
  description,
  teamMembers,
}) => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          {tagline && (
            <span className="text-sm md:text-base font-semibold text-primary uppercase tracking-wider mb-2 block">
              {tagline}
            </span>
          )}
          {title && (
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 max-w-3xl mx-auto">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {teamMembers?.map((member, index) => (
            <div
              key={index}
              className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative w-full aspect-[4/5] overflow-hidden">
                {member.image && typeof member.image === 'object' && (
                  <MediaComponent
                    resource={member.image as Media}
                    imgClassName="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                    fill
                  />
                )}
                
                {/* Overlay with info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    {member.name && (
                      <h3 className="text-xl md:text-2xl font-bold mb-1">
                        {member.name}
                      </h3>
                    )}
                    {member.title && (
                      <p className="text-sm md:text-base text-gray-200">
                        {member.title}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
