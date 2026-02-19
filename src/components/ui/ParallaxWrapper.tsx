'use client'

import React from 'react'
import { ScrollParallax } from 'react-just-parallax'

interface ParallaxWrapperProps {
  children: React.ReactNode
  strength?: number
  className?: string
  enableOnMobile?: boolean
}

export const ParallaxWrapper: React.FC<ParallaxWrapperProps> = ({
  children,
  strength = 0.5,
  className = '',
  enableOnMobile = false,
}) => {
  return (
    <div className={className}>
      <ScrollParallax strength={strength} enableOnTouchDevice={enableOnMobile}>
        {children}
      </ScrollParallax>
    </div>
  )
}
