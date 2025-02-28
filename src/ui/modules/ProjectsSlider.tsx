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
    <section className="projects-slider-module overflow-x-hidden">
      {title && <h3 className="title">{title}</h3>}
      {projects && (
        <div className="card-container">
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)} // Save instance to ref
            grabCursor={true}
            slidesPerView={3}
            touchEventsTarget="wrapper" // This ensures touch events work on the entire swiper area
            touchRatio={1} // Ensures responsive touch movement
            longSwipesRatio={0.2} // Makes shorter swipes register as navigation
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
            {projects.map((project: any, index: number) => (
              <SwiperSlide key={project.internal.title}>
                <div className="w-full h-full touch-action-pan-y">
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