import { useEffect, MutableRefObject } from "react";

interface ScrollOptions {
  blur?: number;  // Value from 1 to 9, controlling the intensity of the blur
  scale?: number; // Value from 1 to 9, controlling the intensity of the scale
  opacity?: number; // Value from 1 to 9, controlling the intensity of the opacity
  horizontal?: number; // Value from 0 to 19, controlling horizontal movement
}

const isHTMLElement = (element: any): element is HTMLElement => {
  return element instanceof HTMLElement;
};

const applyBlur = (element: HTMLElement, scrollPosition: number, intensity: number) => {
  const maxBlur = Math.min(scrollPosition / (40 / intensity), 8);
  element.style.filter = `blur(${maxBlur}px)`;
};

const applyScale = (element: HTMLElement, scrollPosition: number, intensity: number) => {
  const maxScaleAdjustment = 1 - (scrollPosition / (4000 / intensity));
  const scale = Math.max(maxScaleAdjustment, 0);
  element.style.transform = `scale(${scale})`;
};

const applyOpacity = (element: HTMLElement, scrollPosition: number, intensity: number) => {
  const maxOpacityAdjustment = 1 - (scrollPosition / (2000 / intensity));
  const opacity = Math.max(maxOpacityAdjustment, 0);
  element.style.opacity = opacity.toString();
};

const applyHorizontalScroll = (element: HTMLElement, scrollPosition: number, intensity: number) => {
  if (intensity === 10) return; // Neutral position, no movement
  
  const direction = intensity < 10 ? -1 : 1; // -1 for left, 1 for right
  const speed = Math.abs(intensity - 10) / 10; // Speed factor based on distance from neutral
  const maxHorizontalMove = scrollPosition * speed * direction;
  
  // Apply the horizontal movement
  element.style.transform = `${element.style.transform || ''} translateX(${maxHorizontalMove}px)`;
};

const ScrollEffects = ({
  refEl,
  options = { blur: 0, scale: 0, opacity: 0, horizontal: 10 },
}: {
  refEl: MutableRefObject<HTMLElement | null>;
  options: ScrollOptions;
}) => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const element = refEl.current;

      if (element && isHTMLElement(element)) {
        // Reset transform to handle scale and horizontal movement together
        element.style.transform = '';

        if (options.blur && options.blur >= 1 && options.blur <= 9) {
          applyBlur(element, scrollPosition, options.blur);
        }
        if (options.scale && options.scale >= 1 && options.scale <= 9) {
          applyScale(element, scrollPosition, options.scale);
        }
        if (options.opacity && options.opacity >= 1 && options.opacity <= 9) {
          applyOpacity(element, scrollPosition, options.opacity);
        }
        if (options.horizontal !== undefined && options.horizontal >= 0 && options.horizontal <= 19) {
          applyHorizontalScroll(element, scrollPosition, options.horizontal);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [refEl, options]);

  return null;
};

export default ScrollEffects;