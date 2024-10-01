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
  const textAlignClass = spacingSettings?.textAlign
    ? `text-${spacingSettings.textAlign}`
    : "";
  return (
    <section
      className={`text-module container-width ${textAlignClass}`}
      style={{
        paddingTop: spacingSettings?.paddingTop || 0,
        paddingBottom: spacingSettings?.paddingBottom || 0,
      }}
      data-animate="fade-up"
      data-animate-delay="50"
    >
      <PortableText value={text} />
    </section>
  );
}
