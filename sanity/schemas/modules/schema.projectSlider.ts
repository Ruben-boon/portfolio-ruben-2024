import { defineField, defineType } from "sanity";
import { TfiLayoutSliderAlt } from "react-icons/tfi";

import { settingsSpacing } from "../objects/schema.settingsSpacing";

export default defineType({
  name: "projectsSlider",
  title: "Project slider",
  icon: TfiLayoutSliderAlt,
  type: "object",
  groups: [{ name: "content", default: true }, { name: "settings" }],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      group: "content",
      type: "string",
    }),
    defineField({
      name: 'projects',
      title: 'Projects',
      type: 'array',
      group: "content",
      of: [{ type: 'link' }],
      validation: (Rule) => Rule.max(3).error('You can only add up to 3 projects'),
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
        title: "Projects Slider",
      };
    },
  },
});
