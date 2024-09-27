"use client";
import { useDarkMode } from "../useDarkmode";
import ScrollEffects from "../scrollEffects";
import { useRef } from "react";
import ProjectCard from "../ProjectCard";

interface SpacingSettings {
  paddingTop?: number; // Optional paddingTop property
  paddingBottom?: number; // Optional paddingBottom property
}

export default function ProjectsSlider({
  spacingSettings,
  title,
  projects,
}: Partial<{
  spacingSettings: SpacingSettings;
  title: string;
  projects: any;
}>) {
  const { darkMode } = useDarkMode();
  const cardContainerRef = useRef(null);
  return (
    <section
      className="projects-slider-module"
      style={{
        paddingTop: spacingSettings?.paddingTop || 0,
        paddingBottom: spacingSettings?.paddingBottom || 0,
      }}
    >
      <ScrollEffects refEl={cardContainerRef} options={{ horizontal: 11 }} />
      <h2>{title}</h2>
      <div
        className="card-container flex flex-row gap-5 mr-52"
        ref={cardContainerRef}
      >
        {projects.map((project: any) => (
          <ProjectCard {...project.internal} key={project.internal.title} />
        ))}
      </div>
    </section>
  );
}
