import { defineField, defineType } from "sanity";
import { PiSquaresFour } from "react-icons/pi";
import { settingsSpacing } from "../objects/settingsSpacing";


export default defineType({
  name: "approach",
  title: "Approach",
  icon: PiSquaresFour,
  type: "object",
  groups: [{ name: "content", default: true }, { name: "settings" }],

  fields: [
    defineField({
      name: "introText",
      title: "Intro text",
      group: "content",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "steps",
      title: "Steps",
      type: "array",
      group: "content",
      of: [{ type: "approachStep" }],
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
        title: "Approach",
      };
    },
  },
});
