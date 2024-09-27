"use client";
import { useEffect } from "react";
import HeroModule from "./HeroModule";
import ProjectsSlider from "./ProjectsSlider";
import Approach from "./Approach";
import TextBasic from "./TextBasic";
import ImageBasic from "./ImageBasic";

export default function Modules({
  modules,
  // page,
}: {
  modules?: Sanity.Module[];
  page?: Sanity.Page;
}) {
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
      threshold: 0.3, // Trigger when 10% of the element is visible
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
        // console.log(module);
        switch (module._type) {
          case "hero":
            return <HeroModule {...module} key={module._key} />;
          case "projectsSlider":
            return <ProjectsSlider {...module} key={module._key} />;
          case "approach":
            return <Approach {...module} key={module._key} />;
          case "textBasic":
            return <TextBasic {...module} key={module._key} />;
          case "imageBasic":
            return <ImageBasic {...module} key={module._key} />;
          //   case "testimonial.featured":
          //     return <TestimonialFeatured {...module} key={module._key} />;
          //   case "breadcrumbs":
          //     return (
          //       <Breadcrumbs {...module} currentPage={page} key={module._key} />
          //     );
          default:
            return <div data-type={module._type} key={module._key} />;
        }
      })}
    </>
  );
}
