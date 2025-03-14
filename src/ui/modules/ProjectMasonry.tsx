"use client";
import { useState } from "react";
import { SanityDocument } from "next-sanity";
import ProjectCard from "@/ui/components/ProjectCard";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

interface Tag {
  _id: string;
  label: string;
}

export interface Project {
  title: string;
  tags?: {
    selectedTags?: Tag[];
  };
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
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract all unique tags from projects
  const allTags = Array.from(
    new Set(
      projects.flatMap(
        (project) => project.tags?.selectedTags?.map((tag) => tag.label) || []
      )
    )
  );

  // Filter projects based on selected tag
  const filteredProjects = selectedTag
    ? projects.filter((project) =>
        project.tags?.selectedTags?.some((tag) => tag.label === selectedTag)
      )
    : projects;

  if (projects.length === 0) {
    return <div>Loading projects...</div>;
  }
  console.log("fetched project", projects);

  return (
    <section className="project-masonry">


      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry gutter={"1.5rem"}>
          {filteredProjects.map((project: Project, index: number) => (
            <ProjectCard {...project} key={project.title} />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </section>
  );
}
