// schemas/form.ts
import { defineType, defineField } from 'sanity'

const form = defineType({
  name: 'form',
  title: 'Form',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Form Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fields',
      title: 'Form Fields',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'fieldType',
              title: 'Field Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Text', value: 'text' },
                  { title: 'Email', value: 'email' },
                  { title: 'Number', value: 'number' },
                  { title: 'Textarea', value: 'textarea' },
                  { title: 'Select', value: 'select' },
                ],
              },
            }),
            defineField({
              name: 'name',
              title: 'Field Name',
              type: 'string',
            }),
            defineField({
              name: 'label',
              title: 'Field Label',
              type: 'string',
            }),
            defineField({
              name: 'required',
              title: 'Required',
              type: 'boolean',
            }),
            defineField({
              name: 'width',
              title: 'Width',
              description: 'Default value is 100%',
              type: 'string',
              options: {
                list: [
                  { title: '100%', value: 'w-full' },
                  { title: '50%', value: 'w-half' },
                  { title: '33%', value: 'w-1/3' },
                ],
                layout: 'radio',
                direction: 'horizontal',
              },
              initialValue: '100%',
            }),
            defineField({
              name: 'options',
              title: 'Options',
              type: 'array',
              of: [{ type: 'string' }],
              hidden: ({ parent }) => parent?.fieldType !== 'select',
            }),
          ],
        },
      ],
    }),
  ],
})

export default form

// You might also want to define a type for the form field
export type FormField = {
  fieldType: 'text' | 'email' | 'number' | 'textarea' | 'select'
  name: string
  label: string
  required: boolean
  options?: string[]
}

// And a type for the entire form document
export type FormDocument = {
  _type: 'form'
  _id: string
  name: string
  fields: FormField[]
}