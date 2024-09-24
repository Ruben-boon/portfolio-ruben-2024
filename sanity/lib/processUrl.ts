import { stegaClean } from "@sanity/client/stega";

export const BASE_URL = "https://sanitypress.vercel.app";

export default function (
  page: Sanity.PageBase,
  {
    base = true,
    params,
  }: {
    base?: boolean;
    params?: string;
  } = {}
) {

  const directory = page._type === "blog.post" ? "blog" : null;

  const slug = page.internal.metadata?.slug?.current;
  console.log(slug);
  const path = slug === "index" ? null : slug;
  return (
    (base ? BASE_URL + "/" : "/") +
    [path]
  );
}
