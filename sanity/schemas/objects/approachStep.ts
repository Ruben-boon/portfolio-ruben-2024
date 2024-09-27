import { defineField } from "sanity";

export const approachStep = {
  name: "approachStep",
  title: "Approach step",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
};
