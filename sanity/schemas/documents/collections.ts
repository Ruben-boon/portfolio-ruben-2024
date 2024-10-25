import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'collections',
  title: 'Collections',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Collection Name',
      type: 'string',
    }),
    defineField({
      name: 'collectionType',
      title: 'Collection Type',
      type: 'string',
      options: {
        list: [
          { title: 'Tags', value: 'tags' },
          { title: 'Buttons', value: 'buttons' },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'collectionType',
    },
  },
})