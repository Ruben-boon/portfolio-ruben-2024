import { useEffect, MutableRefObject } from "react";

interface ScrollOptions {
  blur?: number;  // Value from 1 to 9, controlling the intensity of the blur
  scale?: number; // Value from 1 to 9, controlling the intensity of the scale
  opacity?: number; // Value from 1 to 9, controlling the intensity of the opacity
}

// Utility function to check if the ref contains a valid HTML element
const isHTMLElement = (element: any): element is HTMLElement => {
  return element instanceof HTMLElement;
};

// Apply blur effect
const applyBlur = (element: HTMLElement, scrollPosition: number, intensity: number) => {
  const maxBlur = Math.min(scrollPosition / (40 / intensity), 8); // Adjust blur intensity based on value
  element.style.filter = `blur(${maxBlur}px)`;
};

// Apply scale effect
const applyScale = (element: HTMLElement, scrollPosition: number, intensity: number) => {
  const maxScaleAdjustment = 1 - (scrollPosition / (4000 / intensity)); // Adjust scale intensity
  const scale = Math.max(maxScaleAdjustment, 0);
  element.style.transform = `scale(${scale})`;
};

// Apply opacity effect
const applyOpacity = (element: HTMLElement, scrollPosition: number, intensity: number) => {
  const maxOpacityAdjustment = 1 - (scrollPosition / (2000 / intensity)); // Adjust opacity intensity
  const opacity = Math.max(maxOpacityAdjustment, 0);
  element.style.opacity = opacity.toString();
};

// ScrollEffects Component
const ScrollEffects = ({
  refEl,
  options = { blur: 0, scale: 0, opacity: 0 },
}: {
  refEl: MutableRefObject<HTMLElement | null>;
  options: ScrollOptions;
}) => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const element = refEl.current;

      if (element && isHTMLElement(element)) {
        if (options.blur && options.blur >= 1 && options.blur <= 9) {
          applyBlur(element, scrollPosition, options.blur);
        }
        if (options.scale && options.scale >= 1 && options.scale <= 9) {
          applyScale(element, scrollPosition, options.scale);
        }
        if (options.opacity && options.opacity >= 1 && options.opacity <= 9) {
          applyOpacity(element, scrollPosition, options.opacity);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [refEl, options]);

  return null; // This component only handles effects, so no JSX is returned
};

export default ScrollEffects;
