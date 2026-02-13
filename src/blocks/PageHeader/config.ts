import type { Block } from 'payload'

export const PageHeader: Block = {
  slug: 'pageHeader',
  interfaceName: 'PageHeaderBlock',
  fields: [
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
