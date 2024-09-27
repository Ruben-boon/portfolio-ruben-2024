import Img from "./Img";

export default function ProjectCard({
  thumbnail,
  title,
}: Partial<{
  thumbnail: Sanity.Image;
  title: string;
}>) {
  return (
    <div className="project-card">
      <Img image={thumbnail} imageWidth={600}/>
      <h4 className="text-center">{title}</h4>
    </div>
  );
}
