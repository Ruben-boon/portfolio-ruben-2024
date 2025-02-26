// External imports
import { type SchemaTypeDefinition } from "sanity";

// Document schemas
import blockContent from "./schemas/schema.blockContent";
import post from "./schemas/documents/schema.post";
import pages from "./schemas/documents/schema.pages";
import site from "./schemas/documents/schema.site";
import collections from "./schemas/documents/schema.collections";
import form from "./schemas/documents/schema.form";

// Object schemas
import link from "./schemas/objects/schema.link";
import tag from "./schemas/objects/schema.tag";
import { approachStep } from "./schemas/objects/schema.approachStep";
import { settingsSpacing } from "./schemas/objects/schema.settingsSpacing";
import { settingsImage } from "./schemas/objects/schema.settingsImage";

// Module schemas
// SCHEMA_IMPORT_MARKER
import textImage from "./schemas/modules/schema.textImage";
import heroBasic from "./schemas/modules/schema.heroBasic";
import projectSlider from "./schemas/modules/schema.projectSlider";
import projectMasonry from "./schemas/modules/schema.projectMasonry";
import textBasic from "./schemas/modules/schema.textBasic";
import imageBasic from "./schemas/modules/schema.imageBasic";
import approach from "./schemas/modules/schema.approach";
import services from "./schemas/modules/schema.services";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Documents
    // SCHEMA_TYPE_MARKER
textImage,
    tag,
    post,
    blockContent,
    site,
    pages,
    link,
    services,
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
