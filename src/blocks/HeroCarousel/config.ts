import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '../../fields/link'

export const HeroCarousel: Block = {
  slug: 'heroCarousel',
  interfaceName: 'HeroCarouselBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Main hero title (e.g., "Rosie & James")',
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      admin: {
        description: 'Subtitle text (e.g., "June 15th, 2024 • Bloomfield, CA")',
      },
    },
    {
      name: 'description',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      admin: {
        description: 'Optional rich text description below the subtitle',
      },
    },
    {
      name: 'images',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 10,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
      admin: {
        description: 'Hero background images for the carousel',
        components: {
          RowLabel: '@/blocks/HeroCarousel/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'primaryButton',
      type: 'group',
      fields: [
        link({
          appearances: ['default'],
        }),
      ],
      admin: {
        description: 'Primary call-to-action button (e.g., "RSVP Now")',
      },
    },
    {
      name: 'autoAdvance',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Automatically advance carousel images',
      },
    },
    {
      name: 'autoAdvanceInterval',
      type: 'number',
      defaultValue: 5000,
      min: 1000,
      max: 30000,
      admin: {
        description: 'Auto-advance interval in milliseconds (1000-30000)',
        condition: (data) => data.autoAdvance === true,
      },
    },
  ],
  labels: {
    plural: 'Hero Carousels',
    singular: 'Hero Carousel',
  },
}
