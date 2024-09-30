"use client";
import { PortableText } from "@portabletext/react";
import Img from "../Img";

interface SpacingSettings {
  paddingTop?: number; // Optional paddingTop property
  paddingBottom?: number; // Optional paddingBottom property
}

export default function ImageBasic({
  spacingSettings,
  image,
}: Partial<{
  spacingSettings: SpacingSettings;
  image: Sanity.Image;
}>) {

  return (
    <section
      className="image-module container-xl-width"
      data-animate="zoom-in"
      data-animate-delay="100"
      style={{
        paddingTop: spacingSettings?.paddingTop || 0,
        paddingBottom: spacingSettings?.paddingBottom || 0,
      }}
    >
      <Img image={image} />
    </section>
  );
}
