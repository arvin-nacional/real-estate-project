import type { Block } from 'payload'

export const PageHeader: Block = {
  slug: 'pageHeader',
  interfaceName: 'PageHeaderBlock',
  fields: [
    {
      name: 'backgroundVideo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Optional background video (MP4 recommended). Falls back to gradient if not set.',
      },
    },
    {
      name: 'overlayOpacity',
      type: 'number',
      min: 0,
      max: 100,
      defaultValue: 60,
      admin: {
        description: 'Dark overlay opacity (0–100%). Helps text readability over video.',
        step: 5,
      },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
  ],
  labels: {
    plural: 'Page Headers',
    singular: 'Page Header',
  },
}
