import { defineField, defineType } from "sanity";
import { CiTextAlignLeft } from "react-icons/ci";

import { settingsSpacing } from "../objects/settingsSpacing";

export default defineType({
  name: "heroBasic",
  title: "Hero basic",
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
      fields: [...settingsSpacing.fields],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Hero basic",
      };
    },
  },
});
