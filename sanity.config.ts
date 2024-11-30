/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/admin/[[...index]]/page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { schema } from "./sanity/schema";
import structure from "./sanity/structure";
import { structureTool } from "sanity/structure";
import { colorInput } from "@sanity/color-input";

export default defineConfig({
  title: "Ruben",
  basePath: "/admin",
  projectId: "636ezsdx",
  dataset: "production",
  schema,
  plugins: [
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: "1" }),
    structureTool({
      title: "Content",
      structure,
    }),
    colorInput(),
  ],
});
