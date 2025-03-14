import Link from "next/link";
import Img from "@/ui/components/Img";
import { ArrowUpRight } from "lucide-react";

export default function ProjectCard({
  thumbnail,
  title,
  metadata,
  tags,
  excerpt,
}: Partial<{
  thumbnail: Sanity.Image;
  title: string;
  metadata: any;
  excerpt: string;
  tags?: {
    collection?: { _ref: string };
    selectedTags?: Array<{ _id: string; label: string }>;
  };
}>) {
  return (
    <Link href={`projecten/${metadata.slug.current}`} className="project-card">
      <div className="img-container">
        <Img image={thumbnail} imageWidth={800} />
      </div>
      <div className=" project-card__text text-center mt-4">
        <div className="tag-container">
          {tags &&
            tags.selectedTags.map((tag) => (
              <span key={tag._id} className="tag">
                {tag.label}
              </span>
            ))}
        </div>
        <p className="project-card__sub-title"></p>
        <p className="project-card__title">{title}</p>
        <p className="project-card__sub-title">{excerpt}</p>
      </div>
      {/* <div className="project-card__arrow">
        <ArrowUpRight color="#000000" width={32} />
      </div> */}
    </Link>
  );
}
