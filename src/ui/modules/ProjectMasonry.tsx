"use client";
import { SanityDocument } from "next-sanity";
import ProjectCard from "@/ui/components/ProjectCard";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

interface Tag {
  _id: string;
  label: string;
}

export interface Project {
  title: string;
  metadata?: {
    publishedAt?: string;
    slug?: {
      current: string;
    };
  };
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
  if (projects.length === 0) {
    return <div>Loading projects...</div>;
  }

  const sortedProjects = [...projects].sort((a, b) => {
    const dateA = a.metadata?.publishedAt ? new Date(a.metadata.publishedAt).getTime() : 0;
    const dateB = b.metadata?.publishedAt ? new Date(b.metadata.publishedAt).getTime() : 0;
    return dateB - dateA; 
  });

  console.log("Sorted projects:", sortedProjects);

  return (
    <section className="project-masonry">
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry gutter={"1.5rem"}>
          {sortedProjects.map((project: Project) => (
            <ProjectCard {...project} key={project.title} />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </section>
  );
}