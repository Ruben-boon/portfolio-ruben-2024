import { defineField, defineType } from "sanity";
import { FaImage } from "react-icons/fa6";
import { settingsSpacing } from "../objects/settingsSpacing";
import { settingsImage } from "../objects/settingsImage";

export default defineType({
  name: "hero",
  title: "Hero",
  icon: FaImage,
  type: "object",
  groups: [{ name: "content", default: true }, { name: "settings" }],

  fields: [
    defineField({
      name: "contentTop",
      title: "Top content",
      group: "content",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "imageDark",
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
      name: "imageLight",
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
      name: "contenBottom",
      title: "Bottom content",
      group: "content",

      type: "array",
      of: [{ type: "block" }],
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
    defineField({
      name: "imageSettings",
      title: "Image Settings",
      type: "object",
      group: "settings",
      options: {
        columns: 2,
      },
      fields: [...settingsImage.fields],
    }),
  ],
  preview: {
    select: {
      media: "imageDark",
    },
    prepare() {
      return {
        title: "Hero",
      };
    },
  },
});
