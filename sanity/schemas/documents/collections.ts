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
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'tag' }], // Reference by type name here
      hidden: ({ parent }) => parent?.collectionType !== 'tags',
    }),
    // defineField({
    //   name: 'buttons',
    //   title: 'Buttons',
    //   type: 'array',
    //   of: [{type: 'link]'}],
    //   // hidden: ({ parent }) => parent?.collectionType !== 'link',
    // }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'collectionType',
    },
  },
})