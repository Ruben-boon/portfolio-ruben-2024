import { fetchSanity, groq } from "@/../sanity/lib/fetch";
import { modulesQuery } from "@/../sanity/lib/queries";
import Modules from "@/ui/modules";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Tag {
  _id: string;
  label: string;
}

interface RawProjectPage {
  title?: string;
  excerpt?: string;
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
  excerpt: string;
  modules: any[];
  tags: {
    selectedTags: Tag[];
  };
}

function Breadcrumbs({ title, slug }: { title: string; slug: string }) {
  return (
    <div className="breadcrumbs flex items-center text-sm mb-6">
      {/* <Link href="/" className="hover:underline">
        Home
      </Link>
      <ChevronRight className="mx-2" size={16} /> */}
      <Link href="/projecten" className="hover:underline">
        Projecten
      </Link>
      <ChevronRight className="mx-2" size={16} />
      <span className="text-gray-600">{title}</span>
    </div>
  );
}

async function getProjectPage(slug: string): Promise<ProjectPage> {
  const projectPage = await fetchSanity<RawProjectPage>(
    groq`*[_type == 'post' && metadata.slug.current == $slug][0]{
      title,
      excerpt,
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
    excerpt: projectPage.excerpt || '',
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
      <div className="container-width">
        <Breadcrumbs title={page.title} slug={params.slug} />
        
        <div className="project-single-header">
          <h2 data-animate="fade-up">{page.title}</h2>
          {/* {page.excerpt && (
            <p className="text-lg mb-4">{page.excerpt}</p>
          )} */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <div key={tag._id} className="tag">
                {tag.label}
              </div>
            ))}
          </div>
          <div className="dot"></div>
        </div>
      </div>
      <Modules modules={page.modules} />
    </section>
  );
}