"use client";
import { useEffect } from "react";
import ProjectsSlider from "./ProjectsSlider";
import Approach from "./Approach";
import TextBasic from "./TextBasic";
import ImageBasic from "./ImageBasic";
import HeroBasic from "./HeroBasic";
import dynamic from "next/dynamic";
import { ProjectMasonryModule } from "./ProjectMasonry";
import Services from "./Services";
//MODULE_IMPORT_MARKER
import TextImage from "./TextImage";

const ProjectMasonry = dynamic(() => import("./ProjectMasonry"), {
  loading: () => (
    <div className="placeholder-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-[64px] gap-6">
      <div
        className="placeholder-card"
        style={{ height: 400, width: "100%", backgroundColor: "black" }}
      ></div>
      <div
        className="placeholder-card"
        style={{ height: 400, width: "100%", backgroundColor: "black" }}
      ></div>
      <div
        className="placeholder-card"
        style={{ height: 400, width: "100%", backgroundColor: "black" }}
      ></div>
    </div>
  ),
  ssr: false,
});

// Define module types for each component
interface ProjectsSliderModule extends Sanity.Module {
  _type: "projectsSlider";
  title?: string;
  projects?: any[];
  spacingSettings?: {
    paddingTop?: number;
    paddingBottom?: number;
  };
}

export default function Modules({
  modules,
}: {
  modules?: Sanity.Module[];
  page?: Sanity.Page;
}) {
  //add animation class
  useEffect(() => {
    // Function to handle the intersection event (when elements enter the viewport)
    const handleIntersection: IntersectionObserverCallback = (
      entries,
      observer
    ) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
          observer.unobserve(entry.target); // Stop observing once animated
        }
      });
    };

    // Create an IntersectionObserver instance
    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: "0px 0px -64px 0px", // Trigger when element is 100px from entering the viewport
    });

    // Get all elements with the `data-animate` attribute
    const animateElements =
      document.querySelectorAll<HTMLElement>("[data-animate]");

    // Observe each element
    animateElements.forEach((element) => {
      observer.observe(element);
    });

    // Cleanup observer on unmount
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);
  
  return (
    <>
      {modules?.map((module) => {
        switch (module._type) {
          // MODULE_CASE_MARKER
          case "textImage":
            return <TextImage {...module} key={module._key} />;
          case "services":
            return <Services {...module} key={module._key} />;
          case "projectsSlider":
            const sliderModule = module as ProjectsSliderModule;
            return (
              <ProjectsSlider
                title={sliderModule.title}
                projects={sliderModule.projects}
                spacingSettings={sliderModule.spacingSettings}
                key={sliderModule._key}
              />
            );
          case "approach":
            return <Approach {...module} key={module._key} />;
          case "textBasic":
            return <TextBasic {...module} key={module._key} />;
          case "imageBasic":
            return <ImageBasic {...module} key={module._key} />;
          case "heroBasic":
            return <HeroBasic {...module} key={module._key} />;
          case "projectMasonry":
            return (
              <ProjectMasonry
                {...(module as ProjectMasonryModule)}
                key={module._key}
              />
            );
          default:
            return <div data-type={module._type} key={module._key} />;
        }
      })}
    </>
  );
}