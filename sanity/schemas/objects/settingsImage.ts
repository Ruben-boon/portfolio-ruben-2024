import { defineField } from "sanity";

export const settingsImage= {
  name: "imageSettings",
  title: "Image Settings",
  type: "object",
  fields: [
    defineField({
      name: "imagePosition",
      title: "Image Position",
      type: "string",
      options: {
        list: ["left", "right", "top", "bottom"],
        layout: "radio",
      },
    }),
    defineField({
      name: "imageFit",
      title: "Image Fit",
      type: "string",
      options: {
        list: ["cover", "contain", "cover-height", "contain-height"],
        layout: "radio",
      },
    }),
  ],
};
