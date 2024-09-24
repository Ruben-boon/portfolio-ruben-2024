import Modules from "@/ui/modules";
import { getPage } from "../../sanity/lib/queries";

// async function getPage() {
// 	const page = await fetchSanity<Sanity.Page>(
// 		groq`*[_type == 'page' && metadata.slug.current == 'index'][0]{
// 			...,
// 			modules[]{ ${modulesQuery} },
// 			metadata {
// 				...,
// 				'ogimage': image.asset->url
// 			}
// 		}`,
// 		{
// 			tags: ['homepage'],
// 		},
// 	)

// 	if (!page)
// 		throw new Error(
// 			"Missing 'page' document with metadata.slug 'index' in Sanity Studio",
// 		)

// 	return page
// }

export default async function Home() {
  const page = await getPage();
  return <Modules modules={page?.modules} />
}

// export default async function Page() {
// 	const page = await getPage()
// 	return <Modules modules={page?.modules} />
// }
