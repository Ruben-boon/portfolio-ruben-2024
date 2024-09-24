// import client from '@/lib/sanity/client'
// import dev from '@/lib/env'
// import { draftMode } from 'next/headers'
import { QueryParams } from "sanity";
import { client } from "./client";
import { QueryOptions } from "@sanity/client";

export { default as groq } from "groq";

export function fetchSanity<T = any>(
  query: string,
  {
    params = {},
    ...next
  }: {
    params?: QueryParams;
  } & QueryOptions["next"] = {}
) {
  return client.fetch<T>(query, params);
}
