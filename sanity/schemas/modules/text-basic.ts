import { defineField, defineType } from "sanity";
import { CiTextAlignLeft } from "react-icons/ci";

import { settingsSpacing } from "../objects/settingsSpacing";

export default defineType({
  name: "textBasic",
  title: "Text basic",
  icon: CiTextAlignLeft,
  type: "object",
  groups: [{ name: "content", default: true }, { name: "settings" }],
  fields: [
    defineField({
      name: "text",
      title: "Text",
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
      fields: [
        ...settingsSpacing.fields,
        {
          name: "textAlign",
          title: "Text Alignment",
          type: "string",
          options: {
            list: [
              { title: "Left", value: "left" },
              { title: "Center", value: "center" },
              { title: "Right", value: "right" },
            ],
            layout: "radio", 
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Text basic",
      };
    },
  },
});
