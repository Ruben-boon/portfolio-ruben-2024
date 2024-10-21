import { useEffect, useRef, MutableRefObject } from "react";

interface ScrollOptions {
  blur?: number;
  scale?: number;
  opacity?: number;
  horizontal?: number;
}

const isHTMLElement = (element: any): element is HTMLElement => {
  return element instanceof HTMLElement;
};

const applyStyles = (
  element: HTMLElement,
  scrollPosition: number,
  options: ScrollOptions
) => {
  const {
    blur = 0,
    scale = 0,
    opacity = 0,
    horizontal = 10
  } = options;

  let transform = '';
  let filter = '';
  let opacityValue = 1;

  if (blur >= 1 && blur <= 9) {
    const maxBlur = Math.min(scrollPosition / (40 / blur), 8);
    filter = `blur(${maxBlur}px)`;
  }

  if (scale >= 1 && scale <= 9) {
    const maxScaleAdjustment = 1 - (scrollPosition / (4000 / scale));
    const scaleValue = Math.max(maxScaleAdjustment, 0);
    transform += `scale(${scaleValue})`;
  }

  if (opacity >= 1 && opacity <= 9) {
    const maxOpacityAdjustment = 1 - (scrollPosition / (1500 / opacity));
    opacityValue = Math.max(maxOpacityAdjustment, 0);
  }

  if (horizontal >= 0 && horizontal <= 19 && horizontal !== 10) {
    const direction = horizontal < 10 ? -1 : 1;
    const speed = Math.abs(horizontal - 10) / 20;
    const maxHorizontalMove = scrollPosition * speed * direction;
    transform += ` translateX(${maxHorizontalMove}px)`;
  }

  return { transform, filter, opacity: opacityValue };
};

const ScrollEffects = ({
  refEl,
  options = { blur: 0, scale: 0, opacity: 0, horizontal: 10 },
}: {
  refEl: MutableRefObject<HTMLElement | null>;
  options: ScrollOptions;
}) => {
  const frameRef = useRef<number>();
  const prevScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }

      frameRef.current = requestAnimationFrame(() => {
        const scrollPosition = window.scrollY;
        const element = refEl.current;

        if (element && isHTMLElement(element) && scrollPosition !== prevScrollY.current) {
          const styles = applyStyles(element, scrollPosition, options);
          element.style.transform = styles.transform;
          element.style.filter = styles.filter;
          element.style.opacity = styles.opacity.toString();
          prevScrollY.current = scrollPosition;
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, [refEl, options]);

  return null;
};

export default ScrollEffects;