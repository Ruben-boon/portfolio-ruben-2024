"use client";
import { PortableText } from "@portabletext/react";

interface SpacingSettings {
  paddingTop?: number; // Optional paddingTop property
  paddingBottom?: number; // Optional paddingBottom property
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
      className="text-module container-width text-center"
      style={{
        paddingTop: spacingSettings?.paddingTop || 0,
        paddingBottom: spacingSettings?.paddingBottom || 0,
      }}
      data-animate="fade-up" data-animate-delay="100"
    >
      <PortableText value={text} />
    </section>
  );
}
