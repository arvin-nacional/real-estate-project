'use client'

import { Star } from 'lucide-react'
import type { TestimonialsBlock as TestimonialsBlockProps } from '@/payload-types'

export const TestimonialsBlock: React.FC<TestimonialsBlockProps> = ({
  heading,
  subheading,
  testimonials,
}) => {
  const firstRow = testimonials?.slice(0, Math.ceil((testimonials?.length || 0) / 2)) || []
  const secondRow = testimonials?.slice(Math.ceil((testimonials?.length || 0) / 2)) || []

  return (
    <section className="py-16 md:py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        {heading && <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">{heading}</h2>}
        {subheading && (
          <p className="text-lg text-muted-foreground max-w-3xl text-center mx-auto">
            {subheading}
          </p>
        )}
      </div>

      <style jsx>{`
        @keyframes scrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .testimonials-track-1 {
          animation: scrollLeft 80s linear infinite;
        }

        .testimonials-track-2 {
          animation: scrollLeft 65s linear infinite;
        }

        .testimonials-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="relative space-y-8">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>

        {/* First row - scrolling left */}
        {firstRow.length > 0 && (
          <div className="overflow-hidden">
            <div className="testimonials-track testimonials-track-1 flex gap-6 w-fit">
              {/* Original testimonials */}
              {firstRow.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-96 h-52 bg-white border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="text-foreground font-medium text-sm leading-relaxed line-clamp-3">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center gap-3 pt-4">
                    <div
                      className={`w-10 h-10 rounded-full ${testimonial.bgColor} flex items-center justify-center font-semibold text-foreground text-xs flex-shrink-0`}
                    >
                      {testimonial.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground text-xs truncate">
                        {testimonial.author}
                      </p>
                      <p className="text-muted-foreground text-xs truncate">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Duplicated testimonials for seamless loop */}
              {firstRow.map((testimonial, index) => (
                <div
                  key={`duplicate-${index}`}
                  className="flex-shrink-0 w-96 h-52 bg-white border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="text-foreground font-medium text-sm leading-relaxed line-clamp-3">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center gap-3 pt-4">
                    <div
                      className={`w-10 h-10 rounded-full ${testimonial.bgColor} flex items-center justify-center font-semibold text-foreground text-xs flex-shrink-0`}
                    >
                      {testimonial.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground text-xs truncate">
                        {testimonial.author}
                      </p>
                      <p className="text-muted-foreground text-xs truncate">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Second row - scrolling left with delay */}
        {secondRow.length > 0 && (
          <div className="overflow-hidden">
            <div className="testimonials-track testimonials-track-2 flex gap-6 w-fit">
              {/* Original testimonials */}
              {secondRow.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-96 h-52 bg-white border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="text-foreground font-medium text-sm leading-relaxed line-clamp-3">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center gap-3 pt-4">
                    <div
                      className={`w-10 h-10 rounded-full ${testimonial.bgColor} flex items-center justify-center font-semibold text-foreground text-xs flex-shrink-0`}
                    >
                      {testimonial.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground text-xs truncate">
                        {testimonial.author}
                      </p>
                      <p className="text-muted-foreground text-xs truncate">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Duplicated testimonials for seamless loop */}
              {secondRow.map((testimonial, index) => (
                <div
                  key={`duplicate-${index}`}
                  className="flex-shrink-0 w-96 h-52 bg-white border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="text-foreground font-medium text-sm leading-relaxed line-clamp-3">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center gap-3 pt-4">
                    <div
                      className={`w-10 h-10 rounded-full ${testimonial.bgColor} flex items-center justify-center font-semibold text-foreground text-xs flex-shrink-0`}
                    >
                      {testimonial.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground text-xs truncate">
                        {testimonial.author}
                      </p>
                      <p className="text-muted-foreground text-xs truncate">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
