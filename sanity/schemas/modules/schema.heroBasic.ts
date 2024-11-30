import { defineField, defineType } from "sanity";
import { CiTextAlignLeft } from "react-icons/ci";

export default defineType({
  name: "heroBasic",
  title: "Hero basic",
  icon: CiTextAlignLeft,
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Text",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: 'ctas',
      title: 'Buttons',
      type: 'array',
      of: [{ type: 'link' }],
      validation: (Rule) => Rule.max(2).error('You can only add up to 2 buttons.'),
    }),
  ],
  preview: {
    select: {
      text: "text",
      buttonLabel: "button.label"
    },
    prepare({ text, buttonLabel }) {
      return {
        title: "Hero basic",
      };
    }
  }
});