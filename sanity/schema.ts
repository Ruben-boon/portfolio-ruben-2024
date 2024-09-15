import { type SchemaTypeDefinition } from "sanity";
import blockContent from "./schemas/blockContent";
import post from "./schemas/documents/post";
import site from "./schemas/documents/site";
import pages from "./schemas/documents/pages";
import heroSplit from "./schemas/modules/hero.split";
import pricing from "./schemas/modules/pricing";
import link from "./schemas/objects/link";
import hero from "./schemas/modules/hero";
import { settingsSpacing } from "./schemas/objects/settingsSpacing";
import { settingsImage } from "./schemas/objects/settingsImage";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Documents
    post,
    blockContent,
    site,
    pages,
    heroSplit,
    pricing,
    link,
    hero,
    //Objects
    settingsSpacing,
    settingsImage,
  ],
};
