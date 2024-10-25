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

  // Use CSS transform3d to force GPU acceleration
  transform = 'translate3d(0,0,0)';

  if (blur >= 1 && blur <= 9) {
    // Reduced precision for better performance
    const maxBlur = Math.min(Math.round(scrollPosition / (40 / blur)), 8);
    filter = `blur(${maxBlur}px)`;
  }

  if (scale >= 1 && scale <= 9) {
    // Reduced precision and smoother scale calculation
    const maxScaleAdjustment = 1 - (scrollPosition / (4000 / scale));
    const scaleValue = Math.max(maxScaleAdjustment, 0).toFixed(2);
    transform += ` scale(${scaleValue})`;
  }

  if (opacity >= 1 && opacity <= 9) {
    // Reduced precision for opacity
    const maxOpacityAdjustment = 1 - (scrollPosition / (3000 / opacity));
    opacityValue = Math.max(Math.round(maxOpacityAdjustment * 100) / 100, 0);
  }

  if (horizontal >= 0 && horizontal <= 19 && horizontal !== 10) {
    const direction = horizontal < 10 ? -1 : 1;
    const speed = Math.abs(horizontal - 10) / 20;
    // Round horizontal movement to reduce jitter
    const maxHorizontalMove = Math.round(scrollPosition * speed * direction);
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
  const lastUpdate = useRef(Date.now());
  const isMobile = useRef(false);

  useEffect(() => {
    // Check if device is mobile
    isMobile.current = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    const handleScroll = () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }

      const now = Date.now();
      // Throttle updates more aggressively on mobile
      const minUpdateInterval = isMobile.current ? 32 : 16; // ~30fps on mobile, ~60fps on desktop

      if (now - lastUpdate.current < minUpdateInterval) {
        frameRef.current = requestAnimationFrame(handleScroll);
        return;
      }

      frameRef.current = requestAnimationFrame(() => {
        const scrollPosition = Math.round(window.scrollY);
        const element = refEl.current;

        // Only update if scroll position changed significantly (especially important on mobile)
        if (element && isHTMLElement(element) && 
            Math.abs(scrollPosition - prevScrollY.current) > (isMobile.current ? 2 : 1)) {
          const styles = applyStyles(element, scrollPosition, options);
          
          // Apply will-change only during animation
          element.style.willChange = 'transform, opacity, filter';
          element.style.transform = styles.transform;
          element.style.filter = styles.filter;
          element.style.opacity = styles.opacity.toString();
          
          prevScrollY.current = scrollPosition;
          lastUpdate.current = now;

          // Remove will-change after animation
          setTimeout(() => {
            if (element) {
              element.style.willChange = 'auto';
            }
          }, 100);
        }
      });
    };

    // Use passive scroll listener for better performance
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