import type { RequiredDataFromCollectionSlug } from 'payload'

// Used for pre-seeded content so that the homepage is not empty
export const homeStatic: RequiredDataFromCollectionSlug<'pages'> = {
  slug: 'home',
  _status: 'published',
  hero: {
    type: 'lowImpact',
    richText: {
      root: {
        type: 'root',
        children: [
          {
            type: 'heading',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Payload Website Template',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            tag: 'h1',
            version: 1,
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'link',
                children: [
                  {
                    type: 'text',
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Visit the admin dashboard',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                fields: {
                  linkType: 'custom',
                  newTab: false,
                  url: '/admin',
                },
                format: '',
                indent: 0,
                version: 2,
              },
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: ' to make your account and seed content for your website.',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            textFormat: 0,
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
  },
  meta: {
    description: 'An open-source website built with Payload and Next.js.',
    title: 'Payload Website Template',
  },
  title: 'Home',
  layout: [
    {
      blockType: 'featuredListings',
      blockName: 'Featured Listings',
      heading: 'Featured Properties',
      subheading: 'Discover our handpicked selection of premium properties for sale and rent.',
      maxListings: 6,
      showFilters: true,
      showViewAllButton: true,
    },
    {
      blockType: 'testimonials',
      blockName: 'Testimonials',
      heading: 'What Our Clients Are Saying',
      subheading: 'Real stories from home buyers who found their dream properties effortlessly.',
      testimonials: [
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
    },
  ],
}
