'use client'

import React from 'react'
import type { WhyChooseUsBlock as WhyChooseUsBlockType } from '@/payload-types'
import {
  Home,
  Shield,
  TrendingUp,
  Users,
  Award,
  Clock,
  MapPin,
  Building,
} from 'lucide-react'

type Props = WhyChooseUsBlockType

const iconMap = {
  home: Home,
  shield: Shield,
  'trending-up': TrendingUp,
  users: Users,
  award: Award,
  clock: Clock,
  'map-pin': MapPin,
  building: Building,
}

export const WhyChooseUsBlock: React.FC<Props> = ({
  tagline,
  title,
  description,
  features,
  stats,
}) => {
  return (
    <section className="py-16 md:py-24 bg-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-20">
          {/* Left Content */}
          <div className="flex-1">
            <div className="space-y-8">
              <div className="space-y-4">
                {tagline && (
                  <span className="text-sm md:text-base font-semibold text-primary uppercase tracking-wider">
                    {tagline}
                  </span>
                )}
                {title && (
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 max-w-lg">
                    {title}
                  </h2>
                )}
                {description && (
                  <p className="text-base md:text-lg text-gray-600 max-w-lg leading-relaxed">
                    {description}
                  </p>
                )}
              </div>

              {/* Features Grid */}
              {features && features.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {features.map((feature, index) => {
                    const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || Home
                    return (
                      <div
                        key={index}
                        className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <IconComponent className="w-8 h-8 text-primary" />
                          </div>
                          <h3 className="text-lg md:text-xl font-bold text-gray-900">
                            {feature.title}
                          </h3>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right Stats */}
          <div className="flex-1 lg:max-w-md">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-6 lg:gap-8">
              {stats?.map((stat, index) => (
                <div
                  key={index}
                  className="text-center relative"
                >
                  {index < stats.length - 1 && (
                    <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent" />
                  )}
                  <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-gray-600 leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
