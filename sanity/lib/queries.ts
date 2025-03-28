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
	_id,
	title,
	excerpt,
	thumbnail,
	body,
	mainImage,
	secondaryImage,
	secondaryText,
	metadata {
		publishedAt,
		slug
	},
	tags {
		collection,
		'selectedTags': selectedTags[]->{
			_id,
			label
		}
	}
`;
export async function getSite() {
  // Add console logging to debug the fetch request
  console.log("Fetching site data from Sanity...");

  try {
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
      footerContent,
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
      {
        tags: ["site"],
        // Add cache busting parameter
        // next: {
        //   revalidate: 0, // Disable cache in development
        // },
      }
    );

    if (!site) {
      console.error("No site document found in Sanity");
      throw new Error("Missing 'site' document in Sanity Studio");
    }

    // Log the received data
    // console.log("Received site data:", {
    //   hasLogo: !!site.logo,
    //   hasNavigation: !!site.navigation,
    //   navigationLinks: site.navigation?.links?.length,
    // });

    return site;
  } catch (error) {
    console.error("Error fetching site data:", error);
    throw error;
  }
}

// Helper function to manually clear cache and refetch
export async function refreshSiteData() {
  try {
    // Clear local storage cache if you're using it
    if (typeof window !== "undefined") {
      localStorage.removeItem("site-cache");
    }

    const fresh = await getSite();
    return fresh;
  } catch (error) {
    console.error("Error refreshing site data:", error);
    throw error;
  }
}

export const modulesQuery = groq`
	...,
	ctas[]{
		...,
		link{ ${linkQuery} }
	},
	_type == 'blog-list' => { predefinedFilters[]-> },
	_type == 'projectsSlider' => {
		projects[]->{
			${projectQuery}
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

// New form-related queries
export const formFieldQuery = groq`
  fieldType,
  name,
  label,
  required,
  options
`;

export const formQuery = groq`
  _id,
  name,
  fields[]{
    ${formFieldQuery}
  }
`;

export async function getForm(formId: string) {
  const form = await fetchSanity<Form>(
    groq`*[_type == "form" && _id == $formId][0]{
      ${formQuery}
    }`,
    {
      tags: ["form"],
      params: { formId },
    }
  );

  if (!form) throw new Error(`No form found with ID: ${formId}`);

  return form;
}

// Add type definitions
export interface FormField {
  fieldType: "text" | "email" | "number" | "textarea" | "select";
  name: string;
  label: string;
  required: boolean;
  options?: string[];
}

export interface Form {
  _id: string;
  name: string;
  fields: FormField[];
}
