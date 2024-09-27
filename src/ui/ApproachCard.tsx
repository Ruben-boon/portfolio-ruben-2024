import { PortableText } from "@portabletext/react";
import Img from "./Img";

export default function ApproachCard({
  title,
  description,
}: Partial<{
  title: string;
  description: any;
}>) {
  return (
    <div className="approach-card">
      <h3 className="approach-card__title">{title}</h3>
      <div className="approach-card__content">
        {description && <PortableText value={description} />}
      </div>
    </div>
  );
}
