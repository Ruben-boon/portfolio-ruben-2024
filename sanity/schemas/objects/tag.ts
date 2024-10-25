import { defineField, defineType } from "sanity";
import { FaTag } from "react-icons/fa";


export default defineType({
  name: "tag",
  title: "Tag",
  icon: FaTag,
  type: "document",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
    }),
  ],
  preview: {
    select: {
      label: "label",
      title: "label",
    },
  },
});
