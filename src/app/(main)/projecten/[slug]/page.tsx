import { fetchSanity, groq } from "@/../sanity/lib/fetch";
import { modulesQuery } from "@/../sanity/lib/queries";
import Modules from "@/ui/modules";

interface Tag {
  _id: string;
  label: string;
}

interface RawProjectPage {
  title?: string;
  modules?: any[];
  tags?: {
    selectedTags?: Tag[];
  };
  metadata?: {
    ogimage?: string;
  };
}

interface ProjectPage {
  title: string;
  modules: any[];
  tags: {
    selectedTags: Tag[];
  };
}

async function getProjectPage(slug: string): Promise<ProjectPage> {
  const projectPage = await fetchSanity<RawProjectPage>(
    groq`*[_type == 'post' && metadata.slug.current == $slug][0]{
      title,
      'modules': modules[]{ ${modulesQuery} },
      'tags': {
        'selectedTags': tags.selectedTags[] {
          _id,
          label
        }
      },
      metadata {
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

  return {
    title: projectPage.title || '',
    modules: projectPage.modules || [],
    tags: {
      selectedTags: projectPage.tags?.selectedTags || []
    }
  };
}

export default async function ProjectSingle({
  params,
}: {
  params: { id: string; slug: string };
}) {
  const page = await getProjectPage(params.slug);
  const tags = page.tags.selectedTags || [];

  return (
    <section className="project-single">
      <div className="project-single-header container-width">
        <h2 data-animate="fade-up">{page.title}</h2>
        {tags.map((tag) => (
          <div key={tag._id} className="tag">
            {tag.label}
          </div>
        ))}
        <div className="dot"></div>
      </div>
      <Modules modules={page.modules} />
    </section>
  );
}