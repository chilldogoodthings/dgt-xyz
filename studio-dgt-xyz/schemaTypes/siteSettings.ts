// schemas/siteSettings.ts
import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  // No icon here (optional) — can add later if desired
  fields: [
    defineField({
      name: 'headerTitle',
      title: 'Header Title (Company Name)',
      type: 'string',
      description: 'Non-localized title displayed in the header (e.g., company/brand name).',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'headerIcon',
      title: 'Header Icon / Logo',
      type: 'image',
      options: {
        hotspot: true, // Allows cropping/focusing
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'For accessibility – describe the icon/logo.',
        }),
      ],
      //validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'footer',
      title: 'Footer Text',
      type: 'object',
      description: 'Localized footer content. Add more languages later if needed.',
      fields: [
        defineField({
          name: 'en',
          type: 'text',
          title: 'English',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'es',
          type: 'text',
          title: 'Spanish',
          // Not required yet – can be empty until localization is active
        }),
        // Future: add more locales here (fr, de, etc.) without breaking anything
      ],
    }),

    // Optional: placeholder for future global fields (e.g., social links, contact email)
    // defineField({ name: 'socialLinks', type: 'array', of: [{ type: 'object' }], ... }),
  ],

  // Optional: make preview nicer in Sanity Studio
  preview: {
    select: {
      title: 'headerTitle',
    },
    prepare({title}: {title?: string}) {
      return {
        title: title || 'Site Settings',
        subtitle: 'Global configuration',
      }
    },
  },
})
