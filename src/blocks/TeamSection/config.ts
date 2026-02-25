import type { Block } from 'payload'

export const TeamSection: Block = {
  slug: 'teamSection',
  interfaceName: 'TeamSectionBlock',
  fields: [
    {
      name: 'tagline',
      type: 'text',
      defaultValue: 'Our Team',
      admin: {
        description: 'Small text above the title',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Our Expert Team Members',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue: 'Meet the team members that make it all possible.',
    },
    {
      name: 'teamMembers',
      type: 'array',
      label: 'Team Members',
      minRows: 1,
      maxRows: 12,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            description: 'Job title or role',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Team member photo',
          },
        },
      ],
    },
  ],
  labels: {
    plural: 'Team Sections',
    singular: 'Team Section',
  },
}
