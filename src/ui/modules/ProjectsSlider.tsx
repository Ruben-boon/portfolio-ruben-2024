"use client";
import ScrollEffects from "../scrollEffects";
import { useRef } from "react";
import ProjectCard from "../ProjectCard";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

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
  const cardContainerRef = useRef(null);
  return (
    <section
      className="projects-slider-module overflow-x-hidden"
      style={{
        paddingTop: spacingSettings?.paddingTop || 0,
        paddingBottom: spacingSettings?.paddingBottom || 0,
      }}
    >
      <ScrollEffects refEl={cardContainerRef} options={{ horizontal: 11 }} />
      <h2>{title}</h2>
      <div className="card-container ml-[-60px] w-full max-w-screen-['1800px']" ref={cardContainerRef}>
        <Swiper
          spaceBetween={30}
          slidesPerView={3}
          breakpoints={{
            768: {
              slidesPerView: 3,
            },
            0: {
              slidesPerView: 1.3,
            },
          }}
        >
          {projects.map((project: any) => (
            <SwiperSlide key={project.internal.title} >
              <ProjectCard {...project.internal}  />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
