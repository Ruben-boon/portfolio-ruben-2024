import Link from "next/link";
import Img from "@/ui/components/Img";
import { ArrowUpRight } from "lucide-react";

export default function ProjectCard({
  thumbnail,
  title,
  metadata,
  tags,
}: Partial<{
  thumbnail: Sanity.Image;
  title: string;
  metadata: any;
  tags?: {
    collection?: { _ref: string };
    selectedTags?: Array<{ _id: string; label: string }>;
  };
}>) {
  console.log(tags);
  return (
    <Link href={`projecten/${metadata.slug.current}`} className="project-card">
      <Img image={thumbnail} imageWidth={800} />
      <div className=" project-card__text text-center mt-4">
        {tags &&
          tags.selectedTags.map((tag) => (
            <span
              key={tag._id}
              className="text-sm py-1 rounded-md mr-2"
            >
              {tag.label}
            </span>
          ))}
        <p className="project-card__sub-title"></p>
        <p className="project-card__title">{title}</p>
      </div>
      <div className="project-card__arrow">
        <ArrowUpRight color="#e3e3e3" width={32} />
      </div>
    </Link>
  );
}
