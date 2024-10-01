import { fetchSanity, groq } from "../../../../sanity/lib/fetch";
import { modulesQuery } from "../../../../sanity/lib/queries";
import Modules from "@/ui/modules";

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
    >
      <div className="project-single-header container-width">
        <h2 data-animate="fade-up">{page.title}</h2>
        <div className="dot"></div>
      </div>
      <Modules modules={page.modules} />
    </section>
  );
}
