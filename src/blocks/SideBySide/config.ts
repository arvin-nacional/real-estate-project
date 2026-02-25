import type { Block } from 'payload'

export const SideBySide: Block = {
  slug: 'sideBySide',
  interfaceName: 'SideBySideBlock',
  fields: [
    {
      name: 'tagline',
      type: 'text',
      defaultValue: 'About Us',
      admin: {
        description: 'Small text above the title',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Capture the Perfect Moments that will Make Memories',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Main description text',
      },
    },
    {
      name: 'primaryImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Main image (left/top)',
      },
    },
    {
      name: 'secondaryImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Secondary image (right/bottom, optional)',
      },
    },
    {
      name: 'weekdays',
      type: 'text',
      defaultValue: 'Mon - Fri: 9am - 12pm',
      admin: {
        description: 'Weekday hours',
      },
    },
    {
      name: 'weekends',
      type: 'text',
      defaultValue: 'Saturday: 9am - 12pm',
      admin: {
        description: 'Weekend hours',
      },
    },
    {
      name: 'button',
      type: 'group',
      fields: [
        {
          name: 'text',
          type: 'text',
          defaultValue: 'Learn More',
        },
        {
          name: 'link',
          type: 'text',
          admin: {
            description: 'URL or path for the button',
          },
        },
      ],
    },
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'bg-gray-50',
      options: [
        { label: 'Light Gray', value: 'bg-gray-50' },
        { label: 'Light Blue', value: 'bg-blue-50' },
        { label: 'Light Green', value: 'bg-green-50' },
        { label: 'Light Yellow', value: 'bg-yellow-50' },
        { label: 'White', value: 'bg-white' },
      ],
      admin: {
        description: 'Background color for the section',
      },
    },
  ],
  labels: {
    plural: 'Side By Side Sections',
    singular: 'Side By Side Section',
  },
}
