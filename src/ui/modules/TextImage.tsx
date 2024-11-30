import React from "react";
import Image from "next/image"; // Assuming Next.js Image component
import { PortableText } from "@portabletext/react"; // For rendering block content

export default function TextImage({
  image,
  text,
  background,
  isMirrored,
}: Partial<{
  image: { url: string; alt?: string };
  text: any; // Block content
  background: { hex: string };
  isMirrored: boolean;
}>) {
  console.log(background);

  return (
    <section className={`text-image ${isMirrored ? "mirrored" : ""}`}>
      <div
        className="content-wrapper"
        style={{ backgroundColor: background.hex || "transparent" }}
      >
        {text && (
          <div className="text-wrapper">
            <PortableText value={text} />
          </div>
        )}
        {image && (
          <div className="image-wrapper">
            <Image
              src={image.url}
              alt={image.alt || "Image"}
              layout="responsive"
              width={500}
              height={300}
            />
          </div>
        )}
      </div>
    </section>
  );
}
