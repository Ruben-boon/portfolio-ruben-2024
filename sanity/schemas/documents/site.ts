import { defineField, defineType } from "sanity";

export default defineType({
  name: "site",
  title: "Site",
  type: "document",
  groups: [
    { name: "general", title: "General", default: true },
    { name: "header", title: "Header" },
    { name: "footer", title: "Footer" },
  ],
  fields: [
    defineField({
      name: "title",
      type: "string",
      group: "general",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "copyright",
      type: "array",
      of: [
        {
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
        },
      ],
      group: "general",
    }),
	defineField({
		name: 'logo',
		type: 'image',
		options: {
			hotspot: true,
		},
		fields: [
			defineField({
				name: 'alt',
				type: 'string',
			}),
		],
		group: 'header',
	}),
	defineField({
		name: 'navigation',
		title: 'Navigation',
		type: 'object',
		group: 'header',
		fields: [
			defineField({
				name: 'links',
				type: 'array',
				of: [{ type: 'link' }],
			}),
		],
		preview: {
			select: {
				link: 'link',
				links: 'links',
			},
			prepare: ({ link, links }) => ({
				title: link.label || link.internal?.title,
			}),
		},
	}),
  ],
  preview: {
    prepare: () => ({
      title: "Site Settings",
    }),
  },
});
