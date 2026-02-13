import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { slugField } from 'payload'

export const Properties: CollectionConfig = {
  slug: 'properties',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: [
      'title',
      'propertyType',
      'listingType',
      'price',
      'city',
      'status',
      'updatedAt',
    ],
    useAsTitle: 'title',
  },
  defaultPopulate: {
    title: true,
    slug: true,
    propertyType: true,
    listingType: true,
    price: true,
    bedrooms: true,
    bathrooms: true,
    area: true,
    city: true,
    state: true,
    featuredImage: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Details',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'propertyType',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'House', value: 'house' },
                    { label: 'Apartment', value: 'apartment' },
                    { label: 'Condo', value: 'condo' },
                    { label: 'Townhouse', value: 'townhouse' },
                    { label: 'Villa', value: 'villa' },
                    { label: 'Land', value: 'land' },
                    { label: 'Commercial', value: 'commercial' },
                  ],
                },
                {
                  name: 'listingType',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'For Sale', value: 'sale' },
                    { label: 'For Rent', value: 'rent' },
                  ],
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'price',
                  type: 'number',
                  required: true,
                  min: 0,
                },
                {
                  name: 'area',
                  type: 'number',
                  label: 'Area (sq ft)',
                  min: 0,
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'bedrooms',
                  type: 'number',
                  min: 0,
                },
                {
                  name: 'bathrooms',
                  type: 'number',
                  min: 0,
                },
                {
                  name: 'garages',
                  type: 'number',
                  min: 0,
                },
              ],
            },
            {
              name: 'description',
              type: 'richText',
            },
            {
              name: 'features',
              type: 'select',
              hasMany: true,
              options: [
                { label: 'Swimming Pool', value: 'pool' },
                { label: 'Garden', value: 'garden' },
                { label: 'Garage', value: 'garage' },
                { label: 'Air Conditioning', value: 'ac' },
                { label: 'Heating', value: 'heating' },
                { label: 'Fireplace', value: 'fireplace' },
                { label: 'Balcony', value: 'balcony' },
                { label: 'Gym', value: 'gym' },
                { label: 'Security', value: 'security' },
                { label: 'Parking', value: 'parking' },
                { label: 'Laundry', value: 'laundry' },
                { label: 'Pet Friendly', value: 'pet-friendly' },
              ],
            },
          ],
        },
        {
          label: 'Location',
          fields: [
            {
              name: 'address',
              type: 'text',
              required: true,
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'city',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'state',
                  type: 'text',
                },
                {
                  name: 'zipCode',
                  type: 'text',
                },
              ],
            },
          ],
        },
        {
          label: 'Media',
          fields: [
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
              required: false,
            },
            {
              name: 'gallery',
              type: 'array',
              label: 'Gallery Images',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
