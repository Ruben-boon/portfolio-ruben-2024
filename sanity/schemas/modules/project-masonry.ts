import { defineField, defineType } from "sanity";
import { RiLayoutMasonryLine } from "react-icons/ri";
import { settingsSpacing } from "../objects/settingsSpacing";

export default defineType({
  name: "projectMasonry",
  title: "Project masonry",
  icon: RiLayoutMasonryLine,
  type: "object",
  groups: [{ name: "content", default: true }, { name: "settings" }],
  fields: [
    defineField({
        name: "columns",
        group: "content",
        type: "number", 
        options: {
          list: [
            { title: "2", value: 2 },
            { title: "3", value: 3 },
            { title: "4", value: 4 }
          ],
          layout: "radio" 
        },
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
        title: "Project masonry",
      };
    },
  },
});
