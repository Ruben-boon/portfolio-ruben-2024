import Modules from "@/ui/modules";
import { modulesQuery } from "@/../sanity/lib/queries";
import { fetchSanity, groq } from "@/../sanity/lib/fetch";

async function getPage() {
  const page = await fetchSanity<Sanity.Page>(
    groq`*[_type == 'pages' && metadata.slug.current == 'index'][0]{
			...,
			modules[]{ ${modulesQuery} },
			metadata {
				...,
				'ogimage': image.asset->url
			}
		}`,
    {
      tags: ["homepage"],
    }
  );

  if (!page)
    throw new Error(
      "Missing 'page' document with metadata.slug 'index' in Sanity Studio"
    );

  return page;
}

export default async function Home() {
  const page = await getPage();
  return <Modules modules={page?.modules} />;
}
export const revalidate = 10;
