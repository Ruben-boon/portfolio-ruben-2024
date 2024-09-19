import Modules from '@/ui/modules'

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

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">

    </div>
  );
}

// export default async function Page() {
// 	const page = await getPage()
// 	return <Modules modules={page?.modules} />
// }