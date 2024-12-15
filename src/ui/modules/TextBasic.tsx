"use client";
import { PortableText } from "@portabletext/react";

interface SpacingSettings {
  paddingTop?: number; // Optional paddingTop property
  paddingBottom?: number; // Optional paddingBottom property
  textAlign: string;
}

export default function TextBasic({
  spacingSettings,
  text,
}: Partial<{
  spacingSettings?: SpacingSettings;
  text: any;
}>) {
  return (
    <section
      className={`text-module container-width`}
      data-animate="fade-up"
      data-animate-delay="50"
    >
      <PortableText value={text} />
    </section>
  );
}
