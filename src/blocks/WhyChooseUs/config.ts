import type { Block } from 'payload'

export const WhyChooseUs: Block = {
  slug: 'whyChooseUs',
  interfaceName: 'WhyChooseUsBlock',
  fields: [
    {
      name: 'tagline',
      type: 'text',
      defaultValue: 'Why Choose Us',
      admin: {
        description: 'Small text above the title',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Trusted by 2,500+ Homeowners',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue: 'With decades of experience in the real estate market, we provide exceptional service and results that exceed expectations.',
    },
    {
      name: 'features',
      type: 'array',
      label: 'Key Features',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          type: 'select',
          options: [
            { label: 'Home', value: 'home' },
            { label: 'Shield', value: 'shield' },
            { label: 'Trending Up', value: 'trending-up' },
            { label: 'Users', value: 'users' },
            { label: 'Award', value: 'award' },
            { label: 'Clock', value: 'clock' },
            { label: 'Map Pin', value: 'map-pin' },
            { label: 'Building', value: 'building' },
          ],
          defaultValue: 'home',
        },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Statistics',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          required: true,
          admin: {
            description: 'Display value (e.g., "15+", "2.5k+")',
          },
        },
      ],
    },
  ],
  labels: {
    plural: 'Why Choose Us Sections',
    singular: 'Why Choose Us Section',
  },
}
