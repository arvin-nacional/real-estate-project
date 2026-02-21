import type { Block } from 'payload'

import { linkGroup } from '../../fields/linkGroup'

export const SellYourHome: Block = {
  slug: 'sellYourHome',
  interfaceName: 'SellYourHomeBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Ready to Sell Your Home?',
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue:
        'Get a free home valuation and let our experienced agents guide you through a seamless selling process. We handle everything so you can focus on what matters.',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional background image for the hero area.',
      },
    },
    {
      name: 'steps',
      type: 'array',
      label: 'How It Works Steps',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'icon',
          type: 'select',
          required: true,
          options: [
            { label: 'Home', value: 'Home' },
            { label: 'Search', value: 'Search' },
            { label: 'Camera', value: 'Camera' },
            { label: 'TrendingUp', value: 'TrendingUp' },
            { label: 'Handshake', value: 'Handshake' },
            { label: 'DollarSign', value: 'DollarSign' },
            { label: 'CheckCircle', value: 'CheckCircle' },
            { label: 'ClipboardList', value: 'ClipboardList' },
          ],
          defaultValue: 'Home',
        },
      ],
      defaultValue: [
        {
          icon: 'ClipboardList',
          title: 'Request a Valuation',
          description:
            'Fill out our simple form or give us a call to schedule a free, no-obligation home valuation.',
        },
        {
          icon: 'Search',
          title: 'Market Analysis',
          description:
            'Our agents perform a comprehensive market analysis to price your home competitively.',
        },
        {
          icon: 'Camera',
          title: 'Professional Listing',
          description:
            'We handle professional photography, staging advice, and create a compelling listing.',
        },
        {
          icon: 'DollarSign',
          title: 'Close the Deal',
          description:
            'We negotiate on your behalf and guide you through closing for the best possible outcome.',
        },
      ],
    },
    {
      name: 'benefits',
      type: 'array',
      label: 'Why Sell With Us',
      minRows: 1,
      maxRows: 8,
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
      defaultValue: [
        { text: 'Free, no-obligation home valuation' },
        { text: 'Expert local market knowledge' },
        { text: 'Professional photography & staging' },
        { text: 'Maximum exposure across platforms' },
        { text: 'Skilled negotiation on your behalf' },
        { text: 'Dedicated agent from listing to close' },
      ],
    },
    {
      name: 'ctaHeading',
      type: 'text',
      defaultValue: 'Get Your Free Home Valuation',
    },
    {
      name: 'ctaDescription',
      type: 'textarea',
      defaultValue:
        'Find out what your home is worth in today\'s market. Our team will provide a detailed, no-obligation valuation.',
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
  ],
  labels: {
    plural: 'Sell Your Home Blocks',
    singular: 'Sell Your Home',
  },
}
