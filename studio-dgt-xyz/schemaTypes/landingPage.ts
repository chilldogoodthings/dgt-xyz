// schemas/landingPage.ts
import {defineField, defineType} from 'sanity'

export const landingPage = defineType({
  name: 'landingPage',
  title: 'Landing Page (Home)',
  type: 'document',
  groups: [
    {name: 'content', title: 'Page Content'},
    {name: 'admin', title: 'Admin Settings'},
  ],
  // Optional icon for studio - admin users will see this
  icon: () => '🏠', // emoji or import SVG

  fields: [
    defineField({
      name: 'title',
      title: 'Internal Title',
      type: 'string',
      description: 'Only used in Sanity Studio (e.g., "Home Page")',
      group: 'admin',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      description: 'Should stay "home" or "/" – used for routing.',
      group: 'admin',
      validation: (Rule) => Rule.required(),
    }),

    // Future content blocks array – this is the key future-proof field
    // We'll populate it later with portable text, heroes, CTAs, etc.
    defineField({
      name: 'contentBlocks',
      title: 'Content Sections',
      type: 'array',
      group: 'content',
      of: [
        // Future block types go here, e.g.:
        // { type: 'heroBlock' },
        // { type: 'textBlock' },
        // { type: 'ctaBlock' },
        // For now: empty or placeholder reference/object
        {
          type: 'object',
          name: 'placeholder',
          title: 'Coming soon – sections',
          fields: [
            {
              name: 'info',
              type: 'string',
              title: 'Section Info',
              initialValue: 'This is a placeholder for future content blocks.',
              readOnly: true, // This makes it look like a nice label in the Studio
            },
          ],
        },
      ],
      description:
        'Add hero sections, trading block, technologist block, consulting block here later.',
    }),

    // Optional: SEO fields for future
    // defineField({ name: 'seo', type: 'seoObject', ... }),
  ],

  preview: {
    select: {
      title: 'title',
    },
    prepare({title}: {title?: string}) {
      return {
        title: title || 'Landing Page',
        subtitle: 'Homepage content',
      }
    },
  },
})
