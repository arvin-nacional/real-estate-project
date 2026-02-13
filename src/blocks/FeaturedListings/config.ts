import type { Block } from 'payload'

export const FeaturedListings: Block = {
  slug: 'featuredListings',
  interfaceName: 'FeaturedListingsBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Featured Properties',
    },
    {
      name: 'subheading',
      type: 'text',
      defaultValue: 'Discover our handpicked selection of premium properties for sale and rent.',
    },
    {
      name: 'maxListings',
      type: 'number',
      defaultValue: 6,
      min: 1,
      max: 12,
      admin: {
        description: 'Maximum number of properties to display',
      },
    },
    {
      name: 'showFilters',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show property type and listing type filters',
      },
    },
    {
      name: 'showViewAllButton',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show "View All Properties" button',
      },
    },
  ],
  labels: {
    plural: 'Featured Listings',
    singular: 'Featured Listings',
  },
}
