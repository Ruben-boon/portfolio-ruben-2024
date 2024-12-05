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

export default function ProjectsSlider({
  title,
  projects,
}: Partial<{
  spacingSettings: SpacingSettings;
  title: string;
  projects: any;
}>) {
  const swiperRef = useRef<any>(null); // Reference for Swiper instance

  return (
    <section className="projects-slider-module overflow-x-hidden pt-20">
      {title && <h3 className="title">{title}</h3>}
      {projects && (
        <div className="card-container">
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)} // Save instance to ref
            grabCursor={true}
            spaceBetween={24}
            slidesPerView={3}
            coverflowEffect={{
              rotate: 0,
              stretch: -100,
              depth: 300,
              modifier: 1,
              slideShadows: false,
            }}
            breakpoints={{
              1536: {
                slidesPerView: 4.5,
                spaceBetween: 20,
                initialSlide: 1,
                centeredSlides: true,
              },
              768: {
                slidesPerView: 3.5,
                initialSlide: 0,
                centeredSlides: false,
              },
              0: {
                slidesPerView: 1.2,
                initialSlide: 0,
                centeredSlides: false,
              },
            }}
          >
            {projects.map((project: any, index: number) => (
              <SwiperSlide key={project.internal.title}>
                <div>
                  <ProjectCard {...project.internal} />
                </div>
              </SwiperSlide>
            ))}
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
      )}
    </section>
  );
}
