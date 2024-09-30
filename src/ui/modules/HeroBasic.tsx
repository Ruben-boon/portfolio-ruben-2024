import { PortableText } from "@portabletext/react";
import ScrollEffects from "../scrollEffects";
import { useRef } from "react";
import { groq } from "next-sanity";
import { fetchSanity } from "../../../sanity/lib/fetch";
import { modulesQuery } from "../../../sanity/lib/queries";
import ProjectCard from "../ProjectCard";

interface SpacingSettings {
  paddingTop?: number;
  paddingBottom?: number;
}

export default function HeroBasic({
  spacingSettings,
  text,
}: Partial<{
  spacingSettings?: SpacingSettings;
  text: any;
}>) {
  const dotRef = useRef(null);
  const headerRef = useRef(null);

  return (
    <section
      className="hero-basic-module container-width"
      style={{
        paddingBottom: spacingSettings?.paddingBottom || 0,
      }}
      data-animate="fade-up"
      data-animate-delay="100"
    >
      <ScrollEffects
        refEl={dotRef}
        options={{ blur: 0, scale: 0, opacity: 2 }}
      />
      <ScrollEffects
        refEl={headerRef}
        options={{ blur: 1, scale: 4, opacity: 3 }}
      />
      <div className="project-header" ref={headerRef}>
        <PortableText value={text} />
      </div>
      <div className="dot" ref={dotRef}></div>
    </section>
  );
}
