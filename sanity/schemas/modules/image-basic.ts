import { defineField, defineType } from "sanity";
import { FaRegImage } from "react-icons/fa";


import { settingsSpacing } from "../objects/settingsSpacing";

export default defineType({
  name: "imageBasic",
  title: "Image basic",
  icon: FaRegImage,
  type: "object",
  groups: [{ name: "content", default: true }, { name: "settings" }],
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      group: "content",
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
      name: "spacingSettings",
      title: "Spacing Settings",
      type: "object",
      group: "settings",
      options: {
        columns: 2,
      },
      fields: [...settingsSpacing.fields],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Image basic",
      };
    },
  },
});
