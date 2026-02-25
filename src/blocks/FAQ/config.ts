import type { Block } from 'payload'

export const FAQ: Block = {
  slug: 'faq',
  interfaceName: 'FAQBlock',
  fields: [
    {
      name: 'tagline',
      type: 'text',
      defaultValue: 'Questions & Answers',
      admin: {
        description: 'Small text above the title',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Frequently Asked Questions',
    },
    {
      name: 'primaryImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Large circular image (main)',
      },
    },
    {
      name: 'secondaryImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Medium circular image (top-left, optional)',
      },
    },
    {
      name: 'tertiaryImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Small circular image (bottom-right, optional)',
      },
    },
    {
      name: 'faqItems',
      type: 'array',
      label: 'FAQ Items',
      minRows: 1,
      maxRows: 10,
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          required: true,
        },
        {
          name: 'defaultOpen',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Show this item expanded by default',
          },
        },
      ],
    },
  ],
  labels: {
    plural: 'FAQ Sections',
    singular: 'FAQ Section',
  },
}
