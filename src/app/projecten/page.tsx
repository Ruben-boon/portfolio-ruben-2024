import Modules from "@/ui/modules";
import { fetchSanity, groq } from "../../../sanity/lib/fetch";
import { modulesQuery } from "../../../sanity/lib/queries";

async function getPage() {
  const page = await fetchSanity<Sanity.Page>(
    groq`*[_type == 'pages' && metadata.slug.current == 'projecten'][0]{
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
      "Missing 'page' document with metadata.slug 'projecten' in Sanity Studio"
    );

  return page;
}
async function getProjects() {
  const projects = await fetchSanity(
    groq`*[_type == 'post']{
      ...,
    modules[]{ ${modulesQuery} },
      metadata {
        ...,
        'ogimage': image.asset->url
      }
    }`,
    {
      tags: ["projects"],
    }
  );

  if (!projects || projects.length === 0) {
    throw new Error("No projects found in Sanity Studio.");
  }

  return projects;
}

export default async function Projecten() {
  const page = await getPage();
  const projects = await getProjects();
  // console.log(projects);
  const modifiedModules = (page?.modules ?? []).map((module) => {
    if (module._type === "projectMasonry") {
      return {
        ...module,
        projects, 
      };
    }
    return module;
  });

  return <Modules modules={modifiedModules} />;
}
