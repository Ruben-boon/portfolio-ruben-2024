import Link from "next/link";
import Img from "@/ui/components/Img";
import { ArrowUpRight } from "lucide-react";

export default function ProjectCard({
  thumbnail,
  title,
  metadata,
}: Partial<{
  thumbnail: Sanity.Image;
  title: string;
  metadata: any;
}>) {
  return (
    <Link href={`projecten/${metadata.slug.current}`} className="project-card">
      <Img image={thumbnail} imageWidth={800} />
      <div className=" project-card__text text-center mt-4">
        <p className="project-card__sub-title">Test subtitle</p>
        <p className="project-card__title">{title}</p>
      </div>
      <div className="project-card__arrow">
        <ArrowUpRight color="#e3e3e3" width={32} />
      </div>
    </Link>
  );
}
