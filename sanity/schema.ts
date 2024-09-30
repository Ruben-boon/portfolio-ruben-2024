import { type SchemaTypeDefinition } from "sanity";
import blockContent from "./schemas/blockContent";
import post from "./schemas/documents/post";
import site from "./schemas/documents/site";
import pages from "./schemas/documents/pages";
import link from "./schemas/objects/link";
import hero from "./schemas/modules/hero";
import { settingsSpacing } from "./schemas/objects/settingsSpacing";
import { settingsImage } from "./schemas/objects/settingsImage";
import projectSlider from "./schemas/modules/project.slider";
import collections from "./schemas/documents/collections";
import tag from "./schemas/objects/tag";
import { approachStep } from "./schemas/objects/approachStep";
import approach from "./schemas/modules/approach";
import textBasic from "./schemas/modules/text-basic";
import imageBasic from "./schemas/modules/image-basic";
import form from "./schemas/documents/form";
import heroBasic from "./schemas/modules/hero-basic";
import projectMasonry from "./schemas/modules/project-masonry";


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Documents
    tag,
    post,
    blockContent,
    site,
    pages,
    link,
    hero,
    heroBasic,
    projectMasonry,
    projectSlider,
    collections,
    approach,
    textBasic,
    imageBasic,
    form,
    //Objects
    settingsSpacing,
    settingsImage,
    approachStep,

  ],
};
