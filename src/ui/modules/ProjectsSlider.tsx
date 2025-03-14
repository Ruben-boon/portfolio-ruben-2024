"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import ProjectCard from "@/ui/components/ProjectCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SpacingSettings {
  paddingTop?: number;
  paddingBottom?: number;
}

interface Tag {
  _id: string;
  label: string;
}

interface Project {
  _id?: string;
  title: string;
  excerpt?: string;
  thumbnail?: Sanity.Image;
  metadata?: {
    publishedAt?: string;
    slug?: {
      current: string;
    };
  };
  tags?: {
    collection?: { _ref: string };
    selectedTags?: Tag[];
  };
}

export default function ProjectsSlider({
  title,
  projects,
  spacingSettings,
}: Partial<{
  spacingSettings: SpacingSettings;
  title: string;
  projects: any[];
}>) {
  const swiperRef = useRef<any>(null); // Reference for Swiper instance

  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section className="projects-slider-module overflow-x-hidden">
      {title && <h2 className="title">{title}</h2>}
      <div className="card-container">
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          grabCursor={true}
          slidesPerView={3}
          touchEventsTarget="wrapper"
          touchRatio={1}
          longSwipesRatio={0.2}
          breakpoints={{
            1536: {
              slidesPerView: 4.5,
              spaceBetween: 20,
              initialSlide: 1,
              centeredSlides: true,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 20,
              initialSlide: 1,
              centeredSlides: true,
            },
            768: {
              slidesPerView: 3.5,
              spaceBetween: 20,
              initialSlide: 0,
              centeredSlides: false,
            },
            0: {
              slidesPerView: 1.2,
              spaceBetween: 15,
              initialSlide: 0,
              centeredSlides: false,
            },
          }}
        >
          {projects.map((project) => {
            // Extract the project data from the internal property if it exists
            const projectData: Project = project.internal ? {
              ...project.internal,
              // Preserve any top-level properties that might be needed
              _id: project._id || project.internal._id,
            } : project;

            return (
              <SwiperSlide key={projectData._id || projectData.title}>
                <div className="w-full h-full touch-action-pan-y">
                  <ProjectCard
                    title={projectData.title}
                    excerpt={projectData.excerpt}
                    thumbnail={projectData.thumbnail}
                    metadata={projectData.metadata}
                    tags={projectData.tags}
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="navigation-buttons flex justify-end mb-4 p-10 gap-2">
          <button
            className="prev-button bg-gray-200 p-2 rounded-full"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <ChevronLeft />
          </button>
          <button
            className="next-button bg-gray-200 p-2 rounded-full"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}