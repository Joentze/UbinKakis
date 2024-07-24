// ./schemaTypes/youTubeType/index.ts

import {defineType, defineField} from 'sanity'
import {SquareIcon} from '@sanity/icons'
// import {YouTubePreview} from './YouTubePreview'

export const instagram = defineType({
  name: 'instagram',
  type: 'object',
  title: 'Instagram Post',
  icon: SquareIcon,
  fields: [
    defineField({
      name: 'url',
      type: 'url',
      title: 'Instagram Post Embed',
      description: 'Add in the url for instagram post embed',
    }),
  ],
})
