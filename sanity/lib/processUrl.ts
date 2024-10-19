import { stegaClean } from "@sanity/client/stega";

export const BASE_URL = "https://sanitypress.vercel.app";

interface PageBase {
  _type: string;
  internal?: {
    metadata?: {
      slug?: {
        current?: string;
      };
    };
  };
}
// Use the extended PageBase interface in the function signature
export default function (
  page: PageBase, // Use your custom PageBase interface
  {
    base = true,
    params,
  }: {
    base?: boolean;
    params?: string;
  } = {}
) {
  const directory = page._type === "blog.post" ? "blog" : null;

  const slug = page.internal?.metadata?.slug?.current;
  const path = slug === "index" ? null : slug;
  return (base ? BASE_URL + "/" : "/") + [path];
}
