import {defineConfig} from 'sanity'
import {structureTool, StructureBuilder} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'dgt-xyz',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Website Content')
          .items([
            // Singleton for Site Settings
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            // Singleton for Landing Page
            S.listItem()
              .title('Landing Page')
              .id('landingPage')
              .child(S.document().schemaType('landingPage').documentId('landingPage')),
            // This filters out the singletons from the "generic" list
            // so they don't show up twice
            ...S.documentTypeListItems().filter(
              (listItem) => !['siteSettings', 'landingPage'].includes(listItem.getId()!),
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
