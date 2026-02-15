import type { Block } from 'payload'

export const FeaturedSoldProperties: Block = {
  slug: 'featuredSoldProperties',
  interfaceName: 'FeaturedSoldProperties',
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Recently Sold Properties',
      admin: {
        description: 'Main heading for the featured sold properties section',
      },
    },
    {
      name: 'subheading',
      type: 'textarea',
      defaultValue: 'Take a look at these amazing properties that found their new owners',
      admin: {
        description: 'Subheading or description text below the main heading',
      },
    },
    {
      name: 'maxListings',
      type: 'number',
      defaultValue: 6,
      admin: {
        description: 'Maximum number of sold properties to display',
        step: 1,
      },
      validate: (value: any) => {
        if (value && (value < 1 || value > 12)) {
          return 'Max listings must be between 1 and 12'
        }
        return true
      },
    },
  ],
}
