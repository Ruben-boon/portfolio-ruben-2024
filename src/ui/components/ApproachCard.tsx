import { PortableText } from "@portabletext/react";
// import Img from "./Img";

export default function ApproachCard({
  title,
  description,
}: Partial<{
  title: string;
  description: any;
}>) {
  return (
    <div className="approach-card">
      <h4 className="approach-card__title">{title}</h4>
      <div className="approach-card__content">
        {description && <PortableText value={description} />}
    </div>
    </div>
  );
}
