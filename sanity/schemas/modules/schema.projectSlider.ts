import { defineField, defineType } from "sanity";
import { RiSlideshow3Line } from "react-icons/ri";
import { settingsSpacing } from "../objects/schema.settingsSpacing";

export default defineType({
  name: "projectsSlider",
  title: "Projects Slider",
  icon: RiSlideshow3Line,
  type: "object",
  groups: [{ name: "content", default: true }, { name: "settings" }],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "projects",
      title: "Projects",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "post" }],
        },
      ],
      group: "content",
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
    select: {
      title: "title",
      projects: "projects",
    },
    prepare({ title, projects }) {
      return {
        title: title || "Projects Slider",
        subtitle: projects ? `${projects.length} projects selected` : "No projects selected",
      };
    },
  },
});