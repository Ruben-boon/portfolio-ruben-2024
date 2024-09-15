import { defineField, defineType } from "sanity";
import { VscLink } from "react-icons/vsc";

export default defineType({
  name: "link",
  title: "Link",
  icon: VscLink,
  type: "object",
  options: {
    columns: 2,
  },
  fields: [
    defineField({
      name: "type",
      type: "string",
      options: {
        layout: "radio",
        list: [
          { title: "internal", value: "internal" },
          { title: "external", value: "external" },
        ],
      },
    }),

    defineField({
      name: "internal",
      type: "reference",
      to: [{ type: "pages" }, { type: "post" }],
      hidden: ({ parent }) => parent?.type !== "internal",
    }),

    defineField({
      name: "external",
      type: "url",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https", "mailto", "tel"],
          allowRelative: true,
        }),
      hidden: ({ parent }) => parent?.type !== "external",
    }),
    defineField({
      name: "label",
      type: "string",
    }),
    defineField({
      name: "params",
      title: "URL params",
      type: "string",
      hidden: ({ parent }) => parent?.type !== "internal",
    }),
  ],
  preview: {
    select: {
      label: "label",
      _type: "internal._type",
      title: "label",
      slug: "internal.metadata.slug.current",
      external: "external",
      params: "params",
    },
  },
});
