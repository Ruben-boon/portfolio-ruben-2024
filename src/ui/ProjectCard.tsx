
import Link from "next/link";
import Img from "./Img";

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
      <p className="text-center mt-4">{title}</p>
    </Link>
  );
}
