import React from 'react'

import type { PageHeaderBlock as PageHeaderBlockProps } from '@/payload-types'

export const PageHeaderBlock: React.FC<PageHeaderBlockProps> = ({ heading, description }) => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary to-secondary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        {heading && <h1 className="text-4xl md:text-5xl font-bold text-white">{heading}</h1>}
        {description && <p className="text-lg text-white max-w-2xl mx-auto">{description}</p>}
      </div>
    </section>
  )
}
