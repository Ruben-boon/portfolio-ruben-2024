// sanity/lib/fetch.ts
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-02-17', // Use current date
  useCdn: false, // Disable the CDN
});

export async function fetchSanity<T>(
  query: string,
  options: {
    tags?: string[];
    params?: Record<string, unknown>;
  } = {}
): Promise<T> {
  try {
    const { tags, params } = options;
    
    const cacheParams = {
      ...params,
      _: new Date().getTime()
    };

    const result = await client.fetch<T>(
      query,
      cacheParams,
      {
        // cache: 'no-store',
        next: { revalidate: 60}
      }
    );

    return result;
  } catch (error) {
    console.error('Sanity fetch error:', error);
    throw error;
  }
}

export { groq } from 'next-sanity';