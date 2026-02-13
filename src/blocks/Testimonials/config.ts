import type { Block } from 'payload'

export const Testimonials: Block = {
  slug: 'testimonials',
  interfaceName: 'TestimonialsBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'What Our Clients Are Saying',
    },
    {
      name: 'subheading',
      type: 'text',
      defaultValue: 'Real stories from home buyers who found their dream properties effortlessly.',
    },
    {
      name: 'testimonials',
      type: 'array',
      required: true,
      minRows: 4,
      maxRows: 12,
      defaultValue: [
        {
          quote:
            'I found my dream home in just a few clicks! The search was so easy and the property details were super clear.',
          author: 'Anna Rivera',
          role: 'Home Buyer',
          initials: 'AR',
          bgColor: 'bg-blue-100',
        },
        {
          quote:
            'This website made house hunting fun! I loved the filters and the photos were amazing.',
          author: 'Michael Tan',
          role: 'Buyer',
          initials: 'MT',
          bgColor: 'bg-purple-100',
        },
        {
          quote:
            'Everything is so organized and easy to navigate. I was able to find a condo that fits my budget perfectly.',
          author: 'Sophia Lee',
          role: 'First-time Buyer',
          initials: 'SL',
          bgColor: 'bg-pink-100',
        },
        {
          quote:
            'I love how fast the website loads and how clear the property info is. Definitely recommending this to my friends!',
          author: 'James Cruz',
          role: 'Home Seeker',
          initials: 'JC',
          bgColor: 'bg-green-100',
        },
        {
          quote:
            'The interactive maps and filters helped me narrow down my options quickly. Such a smooth experience!',
          author: 'Maria Santos',
          role: 'Buyer',
          initials: 'MS',
          bgColor: 'bg-yellow-100',
        },
        {
          quote:
            'Browsing properties here was a joy. The design is beautiful and everything works perfectly on my phone.',
          author: 'David Lim',
          role: 'Property Shopper',
          initials: 'DL',
          bgColor: 'bg-indigo-100',
        },
        {
          quote:
            'I love that I could see all the details I needed without contacting anyone yet. Made my decision so much easier.',
          author: 'Clara Gomez',
          role: 'Home Buyer',
          initials: 'CG',
          bgColor: 'bg-teal-100',
        },
        {
          quote:
            'Finding a house used to be stressful. This site made it simple and even fun to explore listings.',
          author: 'Ethan Navarro',
          role: 'Buyer',
          initials: 'EN',
          bgColor: 'bg-orange-100',
        },
        {
          quote:
            'I was impressed by how smooth everything is. Filters, images, and info all load instantly. Amazing UX!',
          author: 'Lily Wong',
          role: 'First-time Buyer',
          initials: 'LW',
          bgColor: 'bg-red-100',
        },
        {
          quote:
            'It felt like the website understood what I was looking for. I found my new home faster than I expected!',
          author: 'Carlos Reyes',
          role: 'Home Seeker',
          initials: 'CR',
          bgColor: 'bg-cyan-100',
        },
      ],
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          required: true,
        },
        {
          name: 'author',
          type: 'text',
          required: true,
        },
        {
          name: 'role',
          type: 'text',
          required: true,
        },
        {
          name: 'initials',
          type: 'text',
          required: true,
          maxLength: 3,
        },
        {
          name: 'bgColor',
          type: 'select',
          required: true,
          options: [
            { label: 'Blue', value: 'bg-blue-100' },
            { label: 'Purple', value: 'bg-purple-100' },
            { label: 'Pink', value: 'bg-pink-100' },
            { label: 'Green', value: 'bg-green-100' },
            { label: 'Yellow', value: 'bg-yellow-100' },
            { label: 'Indigo', value: 'bg-indigo-100' },
            { label: 'Teal', value: 'bg-teal-100' },
            { label: 'Orange', value: 'bg-orange-100' },
            { label: 'Red', value: 'bg-red-100' },
            { label: 'Cyan', value: 'bg-cyan-100' },
          ],
          defaultValue: 'bg-blue-100',
        },
      ],
    },
  ],
  labels: {
    plural: 'Testimonials',
    singular: 'Testimonials',
  },
}
