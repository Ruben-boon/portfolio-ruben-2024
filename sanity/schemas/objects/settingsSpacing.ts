import { defineField } from "sanity";

export const settingsSpacing = {
  name: "spacingSettings",
  title: "Spacing Settings",
  type: "object",
 
  fields: [
    defineField({
      name: "paddingTop",
      title: "Padding Top (px)",
      type: "number",
    }),
    defineField({
      name: "paddingBottom",
      title: "Padding Bottom (px)",
      type: "number",
    }),
    defineField({
      name: "container",
      title: "Container",
      type: "boolean",
      initialValue: true,
    }),
  ],
};
