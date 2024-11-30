import { defineField, defineType } from "sanity";
import { TfiLayoutMediaRight } from "react-icons/tfi";

export default defineType({
  name: "textImage",
  title: "Text Image",
  icon: TfiLayoutMediaRight,
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Text",
      type: "array",
      of: [
        {
          type: "block",
        },
      ],
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true, // Allow cropping
      },
    }),
 
    defineField({
      name: "background",
      title: "Background Color",
      type: "color",
    }),
    defineField({
      name: "isMirrored",
      title: "Mirror Layout",
      type: "boolean",
      description: "Toggle to mirror the layout.",
    }),
  ],
  preview: {
    select: {
      image: "image",
      text: "text",
      isMirrored: "isMirrored",
    },
    prepare({ image, text, isMirrored }) {
      const plainText = text
        ? text
            .filter((block) => block._type === "block")
            .map((block) => block.children.map((child) => child.text).join(""))
            .join(" ")
        : "";

      return {
        title: "Text Image",
        subtitle: `${isMirrored ? "Mirrored Layout" : "Normal Layout"} - ${plainText}`,
        media: image,
      };
    },
  },
});
