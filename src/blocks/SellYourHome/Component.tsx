import React from 'react'
import Image from 'next/image'
import {
  Home,
  Search,
  Camera,
  TrendingUp,
  Handshake,
  DollarSign,
  CheckCircle,
  ClipboardList,
  Check,
} from 'lucide-react'

import type { SellYourHomeBlock as SellYourHomeBlockProps, Media } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media as MediaComponent } from '@/components/Media'

const iconMap = {
  Home,
  Search,
  Camera,
  TrendingUp,
  Handshake,
  DollarSign,
  CheckCircle,
  ClipboardList,
}

export const SellYourHomeBlock: React.FC<SellYourHomeBlockProps> = ({
  heading,
  description,
  backgroundImage,
  steps,
  benefits,
  ctaHeading,
  ctaDescription,
  links,
}) => {
  const bgImage = backgroundImage as Media | undefined

  return (
    <section className="py-16 md:py-24 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Area */}
        <div className="relative rounded-2xl overflow-hidden mb-16">
          {bgImage ? (
            <div className="relative h-[400px] md:h-[500px]">
              <MediaComponent resource={bgImage} imgClassName="w-full h-full object-cover" fill />
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute inset-0 flex items-center justify-center px-8 md:px-16">
                <div className="text-center max-w-2xl">
                  {heading && (
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">{heading}</h2>
                  )}
                  {description && (
                    <p className="text-lg text-white/90 mb-8 leading-relaxed">{description}</p>
                  )}
                  {Array.isArray(links) && links.length > 0 && (
                    <div className="flex flex-wrap gap-4 justify-center">
                      {links.map(({ link }, i) => (
                        <CMSLink
                          key={i}
                          {...link}
                          className="bg-white text-[#0a2e2a] hover:bg-primary hover:text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="relative py-16 md:py-24 px-8 md:px-16 bg-gradient-to-br from-primary to-secondary">
              <div className="text-center max-w-2xl">
                {heading && (
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">{heading}</h2>
                )}
                {description && (
                  <p className="text-lg text-white/90 mb-8 leading-relaxed">{description}</p>
                )}
                {Array.isArray(links) && links.length > 0 && (
                  <div className="flex flex-wrap gap-4 justify-center">
                    {links.map(({ link }, i) => (
                      <CMSLink
                        key={i}
                        {...link}
                        className="bg-white text-[#0a2e2a] hover:bg-primary hover:text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* How It Works */}
        {Array.isArray(steps) && steps.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">How It Works</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => {
                const Icon = iconMap[step.icon as keyof typeof iconMap] || Home
                return (
                  <div key={index} className="text-center group">
                    <div className="relative mb-6">
                      <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <div
                        className="absolute -top-2 -right-2 w-7 h-7 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center mx-auto"
                        style={{ left: 'calc(50% + 20px)' }}
                      >
                        {index + 1}
                      </div>
                    </div>
                    <h4 className="font-semibold text-lg mb-2">{step.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Benefits + CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Benefits List */}
          {Array.isArray(benefits) && benefits.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold mb-8">Why Sell With Us</h3>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{benefit.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CTA Card */}
          <div className="bg-card border border-border rounded-2xl p-8 md:p-10 space-y-6">
            {ctaHeading && <h3 className="text-2xl font-bold">{ctaHeading}</h3>}
            {ctaDescription && (
              <p className="text-muted-foreground leading-relaxed">{ctaDescription}</p>
            )}
            {Array.isArray(links) && links.length > 0 && (
              <div className="flex flex-wrap gap-4 pt-2">
                {links.map(({ link }, i) => (
                  <CMSLink
                    key={i}
                    {...link}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 py-3 rounded-lg transition-all duration-300"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
