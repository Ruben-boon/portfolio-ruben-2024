import { fetchSanity, groq } from "./fetch";

export const linkQuery = groq`
	...,
	internal->{ _type, title,  metadata {
      slug,
    } }
`;
const navigationQuery = groq`
	title,
	items[]{
		${linkQuery},
		link{ ${linkQuery} },
		links[]{ ${linkQuery} }
	}
`;

const projectQuery = groq`
	title,
	thumbnail,
	body,
	mainImage,
	secondaryImage,
	secondaryText,
	metadata
`;
export async function getSite() {
  const site = await fetchSanity<Sanity.Site>(
    groq`
		  *[_type == 'site'][0]{
			...,
			ctas[]{
			  ...,
			  link { ${linkQuery} }
			},
			title,
			copyright,
			logo,
			navigation{
          links[]{
            ${linkQuery}
          }
        },
			socials[]{
			  ${navigationQuery}
			},
			'ogimage': ogimage.asset->url
		  }
		`,
    { tags: ["site"] }
  );

  if (!site) throw new Error("Missing 'site' document in Sanity Studio");

  return site;
}

export const modulesQuery = groq`
	...,
	ctas[]{
		...,
		link{ ${linkQuery} }
	},
	_type == 'blog-list' => { predefinedFilters[]-> },
	_type == 'projectsSlider' => {
    projects[]{
      ${linkQuery},
      internal->{ ${projectQuery} }
    }
  },

	_type == 'breadcrumbs' => { crumbs[]{ ${linkQuery} } },
	_type == 'creative-module' => {
		modules[]{
			...,
			subModules[]{
				...,
				ctas[]{
					...,
					link{ ${linkQuery} }
				}
			}
		}
	},
	_type == 'logo-list' => { logos[]-> },
	_type == 'pricing-list' => { tiers[]-> },
	_type == 'richtext-module' => {
		'headings': select(
			tableOfContents => content[style in ['h2', 'h3', 'h4', 'h5', 'h6']]{
				style,
				'text': pt::text(@)
			}
		),
	},
	_type == 'testimonial.featured' => { testimonial-> },
	_type == 'testimonial-list' => { testimonials[]-> },
	_type == 'hero' => {
    ...,
    ctas[]{
      ${linkQuery}
    }
  }
`;
