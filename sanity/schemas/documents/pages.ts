import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'pages',
  title: 'Pages',
  type: 'document',
  fields: [
    defineField({
      name: 'pageName',
      title: 'Page name',
      type: 'string',
    }),
    defineField({
      name: 'metadata',
      title: 'Metadata',
      type: 'object',
      fields: [
        defineField({
          name: 'slug',
          title: 'Slug',
          type: 'slug',
          options: {
            source: 'pageName',
            maxLength: 96,
          },
        }),
      ],
    }),
    defineField({
        name: 'modules',
        type: 'array',
        of: [
            { type: 'hero.split' },
            { type: 'pricing' },
            { type: 'hero' },

        ],
    }),
  ],
  preview: {
    select: {
      title: 'pageName',
      media: 'image',
    },
  },
})
