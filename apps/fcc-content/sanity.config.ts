import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'
import { scheduledPublishing } from '@sanity/scheduled-publishing'

export default defineConfig({
  name: 'default',
  title: 'fcc-content',

  projectId: 'ygo45klz',
  dataset: 'production',

  plugins: [deskTool(), visionTool(), scheduledPublishing()],

  schema: {
    types: schemaTypes,
  },
})
