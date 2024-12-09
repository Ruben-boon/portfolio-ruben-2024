"use client";
import { SanityDocument } from "next-sanity";
import ProjectCard from "@/ui/components/ProjectCard";
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
  columns,
  projects = [],
}: {
  columns?: string;
  projects: Project[];
}) {
  if (projects.length === 0) {
    return <div>Loading projects...</div>;
  }

  return (
    <section
      className="project-masonry"
    >
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry gutter={"1.5rem"}>
          {projects.map((project: Project, index: number) => {
            // const delay = 100 * (index + 1);

            return <ProjectCard {...project} key={project.title} />;
          })}
        </Masonry>
      </ResponsiveMasonry>
    </section>
  );
}
