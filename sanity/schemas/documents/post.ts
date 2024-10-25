import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "object",
      fields: [
        defineField({
          name: "collection",
          title: "Tag Collection",
          type: "reference",
          to: [{ type: "collections" }],
          options: {
            filter: 'collectionType == "tags"'
          }
        }),
        defineField({
          name: "selectedTags",
          title: "Selected Tags",
          type: "array",
          of: [{ 
            type: "reference", 
            to: [{ type: "tag" }],
          }],
          options: {
            // disableNew: true, // Prevents creation of new tags
            filter: ({ parent }) => {
              if (!parent?.collection?._ref) return '';
              return {
                filter: '_type == "tag" && references($collectionId)',
                params: {
                  collectionId: parent.collection._ref
                }
              }
            }
          }
        })
      ]
    }),
    {
      name: "metadata",
      type: "object",
      fields: [
        defineField({
          name: "publishedAt",
          title: "Published at",
          type: "datetime",
        }),
        defineField({
          name: "slug",
          title: "Slug",
          type: "slug",
          options: {
            source: "title",
            maxLength: 96,
          },
        }),
      ],
      options: {
        layout: "grid",
        columns: 2,
      },
    },
    defineField({
      name: "modules",
      title: "Content modules",
      description: "Use the modules to construct your post",
      type: "array",
      of: [
        { type: "textBasic" },
        { type: "imageBasic" },
        {
          type: "link",
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: "title",
      media: "mainImage",
    },
  },
});
