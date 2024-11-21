

import { createClient } from '@sanity/client'
// import { QueryParams } from 'sanity';


export const client = createClient({
  apiVersion: "2024-09-24",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: false,
})
