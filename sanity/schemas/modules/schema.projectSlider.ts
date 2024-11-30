import { defineField, defineType } from "sanity";
import { TfiLayoutSliderAlt } from "react-icons/tfi";


export default defineType({
  name: "projectsSlider",
  title: "Project slider",
  icon: TfiLayoutSliderAlt,
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: 'projects',
      title: 'Projects',
      type: 'array',
      of: [{ type: 'link' }],
      validation: (Rule) => Rule.max(6).error('You can only add up to 6 projects'),
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
