import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-09-24', // Use current API version
  useCdn: process.env.NODE_ENV === 'production'
})

export const fetchSanity = async <T = any>(
  query: string,
  params: { tags?: string[]; params?: Record<string, any> } = {}
): Promise<T> => {
  try {
    return await client.fetch<T>(query, params.params || {}, {
      cache: 'force-cache',
      ...(params.tags && { tags: params.tags })
    });
  } catch (err) {
    console.error('Sanity fetch error:', err);
    throw new Error(`Failed to fetch from Sanity: ${err instanceof Error ? err.message : 'Unknown error'}`);
  }
}

export { groq } from 'next-sanity';