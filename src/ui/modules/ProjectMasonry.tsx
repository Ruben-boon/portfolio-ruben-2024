"use client";
import { SanityDocument } from "next-sanity";
import ProjectCard from "../ProjectCard";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

interface SpacingSettings {
  paddingTop?: number;
  paddingBottom?: number;
}

export interface Project {
  title: string;
}
export interface Module<T extends string = string> extends SanityDocument {
  _type: T;
  _key: string;
  projects?: Project[];
}
export interface ProjectMasonryModule extends Module<"projectMasonry"> {
  projects: Project[];
}

export default function ProjectMasonry({
  spacingSettings,
  columns,
  projects = [],
}: {
  spacingSettings?: SpacingSettings;
  columns?: string;
  projects: Project[];
}) {
  if (projects.length === 0) {
    return <div>Loading projects...</div>;
  }


  return (
    <section
      className="project-masonry"
      style={{
        paddingTop: spacingSettings?.paddingTop || 0,
        paddingBottom: spacingSettings?.paddingBottom || 0,
      }}
    >
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry gutter={"1.5rem"}>
          {projects.map((project: Project, index: number) => {
            const delay = 50 * (index + 1);

            return <ProjectCard {...project} key={project.title} />;
          })}
        </Masonry>
      </ResponsiveMasonry>
    </section>
  );
}
