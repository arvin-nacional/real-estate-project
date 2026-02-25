import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { FeaturedListingsBlock } from './FeaturedListings/Component'
import { FeaturedSoldPropertiesComponent } from './FeaturedSoldProperties/Component'
import { TestimonialsBlock } from './Testimonials/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { PageHeaderBlock } from '@/blocks/PageHeader/Component'
import { ContactSectionBlock } from '@/blocks/ContactSection/Component'
import { HeroCarouselBlock } from '@/blocks/HeroCarousel/Component'
import { SellYourHomeBlock } from '@/blocks/SellYourHome/Component'
import { FAQBlock } from '@/blocks/FAQ/Component'
import { SideBySideBlock } from '@/blocks/SideBySide/Component'
import { TeamSectionBlock } from '@/blocks/TeamSection/Component'
import { WhyChooseUsBlock } from '@/blocks/WhyChooseUs/Component'

const blockComponents = {
  archive: ArchiveBlock,
  callToAction: CallToActionBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  featuredListings: FeaturedListingsBlock,
  featuredSoldProperties: FeaturedSoldPropertiesComponent,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  pageHeader: PageHeaderBlock,
  testimonials: TestimonialsBlock,
  contactSection: ContactSectionBlock,
  heroCarousel: HeroCarouselBlock,
  sellYourHome: SellYourHomeBlock,
  faq: FAQBlock,
  sideBySide: SideBySideBlock,
  teamSection: TeamSectionBlock,
  whyChooseUs: WhyChooseUsBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
