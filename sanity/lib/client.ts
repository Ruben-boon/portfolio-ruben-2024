

import { createClient } from '@sanity/client'
import { apiVersion, dataset, projectId, useCdn } from '../env'
import { QueryParams } from 'sanity';


export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
})
