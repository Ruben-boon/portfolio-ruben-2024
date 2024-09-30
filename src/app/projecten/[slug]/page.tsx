import { useRouter } from "next/router";
import { fetchSanity, groq } from "../../../../sanity/lib/fetch";
import { modulesQuery } from "../../../../sanity/lib/queries";

interface SpacingSettings {
  paddingTop?: number;
  paddingBottom?: number;
}

async function getProjectPage(slug: string) {
  const projectPage = await fetchSanity(
    groq`*[_type == 'post' && metadata.slug.current == $slug][0]{
      ...,
      modules[]{ ${modulesQuery} },
      spacingSettings,
      metadata {
        ...,
        'ogimage': image.asset->url
      }
    }`,
    {
      params: { slug },
      tags: ["project"],
    }
  );
  if (!projectPage) {
    throw new Error(`No project found with slug: ${slug}`);
  }
  return projectPage;
}

export default async function ProjectSingle({
  params,
}: {
  params: { id: string; slug: string };
}) {
  const page = await getProjectPage(params.slug);
  console.log(page);

  return (
    <section
      className="project-single"
      style={{
        paddingTop: page.spacingSettings?.paddingTop || 0,
        paddingBottom: page.spacingSettings?.paddingBottom || 0,
      }}
    >
      <h1>{page.title}</h1>
      <p>The slug of this page is: {page.metadata.slug.current}</p>
    </section>
  );
}