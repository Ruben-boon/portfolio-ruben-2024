import { defineField, defineType } from "sanity";
import { FaImage } from "react-icons/fa6";

export default defineType({
  name: "services",
  title: "Services",
  icon: FaImage,
  type: "object",
  fields: [
    defineField({
      name: "imageDark",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "imageLight",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "contentBottom",
      title: "Bottom content",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "columns",
      title: "Columns",
      type: "array",
      of: [
        {
          type: "object",
          name: "column",
          fields: [
            {
              name: "content",
              title: "Content",
              type: "array",
              of: [{ type: "block" }],
            },
            {
              name: "image",
              title: "Image",
              type: "image",
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: "alt",
                  type: "string",
                  title: "Alternative text",
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'content',
              media: 'image',
            },
            prepare({ title, media }) {
              return {
                title: title && title.length > 0 ? title[0].children[0].text : 'No content',
                media: media,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.length(3).error('You must add exactly 3 columns.'),
      options: {
        layout: 'grid',
      },
    }),
  ],
  preview: {
    select: {
      media: "imageDark",
    },
    prepare() {
      return {
        title: "Services",
      };
    },
  },
});