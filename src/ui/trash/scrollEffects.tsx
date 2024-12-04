// import { useEffect, useRef, MutableRefObject } from "react";

// interface ScrollOptions {
//   blur?: number;
//   scale?: number;
//   opacity?: number;
//   horizontal?: number;
// }

// const isHTMLElement = (element: any): element is HTMLElement => {
//   return element instanceof HTMLElement;
// };

// const applyStyles = (
//   element: HTMLElement,
//   scrollPosition: number,
//   options: ScrollOptions
// ) => {
//   const {
//     blur = 0,
//     scale = 0,
//     opacity = 0,
//     horizontal = 10
//   } = options;

//   let transform = '';
//   let filter = '';
//   let opacityValue = 1;

//   // Use CSS transform3d to force GPU acceleration
//   transform = 'translate3d(0,0,0)';

//   if (blur >= 1 && blur <= 9) {
//     const maxBlur = Math.min(Math.round(scrollPosition / (40 / blur)), 8);
//     filter = `blur(${maxBlur}px)`;
//   }

//   if (scale >= 1 && scale <= 9) {
//     // Reduced sensitivity - multiply by 3 to make it 3 times slower
//     const scrollFactor = Math.max(0, Math.min(1, scrollPosition / (6000 / scale))); // Changed from 2000 to 6000
//     const easeOutCubic = 1 - Math.pow(1 - scrollFactor, 3);
//     const scaleValue = 1 - (easeOutCubic * 0.5); // Limit scale reduction to 50%
//     transform += ` scale(${scaleValue.toFixed(3)})`;
//   }

//   if (opacity >= 1 && opacity <= 9) {
//     const maxOpacityAdjustment = 1 - (scrollPosition / (3000 / opacity));
//     opacityValue = Math.max(Math.round(maxOpacityAdjustment * 100) / 100, 0);
//   }

//   if (horizontal >= 0 && horizontal <= 19 && horizontal !== 10) {
//     const direction = horizontal < 10 ? -1 : 1;
//     const speed = Math.abs(horizontal - 10) / 20;
//     const maxHorizontalMove = Math.round(scrollPosition * speed * direction);
//     transform += ` translateX(${maxHorizontalMove}px)`;
//   }

//   return { transform, filter, opacity: opacityValue };
// };

// const ScrollEffects = ({
//   refEl,
//   options = { blur: 0, scale: 0, opacity: 0, horizontal: 10 },
// }: {
//   refEl: MutableRefObject<HTMLElement | null>;
//   options: ScrollOptions;
// }) => {
//   const frameRef = useRef<number>();
//   const prevScrollY = useRef(0);
//   const lastUpdate = useRef(Date.now());
//   const isMobile = useRef(false);
//   const smoothScrollY = useRef(0);

//   useEffect(() => {
//     isMobile.current = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
//     const handleScroll = () => {
//       if (frameRef.current) {
//         cancelAnimationFrame(frameRef.current);
//       }

//       const now = Date.now();
//       const minUpdateInterval = isMobile.current ? 32 : 16;

//       if (now - lastUpdate.current < minUpdateInterval) {
//         frameRef.current = requestAnimationFrame(handleScroll);
//         return;
//       }

//       frameRef.current = requestAnimationFrame(() => {
//         const currentScrollY = window.scrollY;
        
//         // Smooth out the scroll position using lerp
//         const lerp = (start: number, end: number, factor: number) => {
//           return start + (end - start) * factor;
//         };
        
//         smoothScrollY.current = lerp(
//           smoothScrollY.current,
//           currentScrollY,
//           isMobile.current ? 0.2 : 0.3
//         );

//         const element = refEl.current;

//         if (element && isHTMLElement(element) && 
//             Math.abs(currentScrollY - prevScrollY.current) > (isMobile.current ? 1 : 0.5)) {
//           const styles = applyStyles(element, smoothScrollY.current, options);
          
//           element.style.willChange = 'transform, opacity, filter';
//           element.style.transform = styles.transform;
//           element.style.filter = styles.filter;
//           element.style.opacity = styles.opacity.toString();
          
//           prevScrollY.current = currentScrollY;
//           lastUpdate.current = now;

//           // Add transition for smoother updates
//           element.style.transition = 'transform 0.1s ease-out';

//           setTimeout(() => {
//             if (element) {
//               element.style.willChange = 'auto';
//               element.style.transition = '';
//             }
//           }, 100);
//         }
//       });
//     };

//     window.addEventListener("scroll", handleScroll, { passive: true });

//     return () => {
//       if (frameRef.current) {
//         cancelAnimationFrame(frameRef.current);
//       }
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [refEl, options]);

//   return null;
// };

// export default ScrollEffects;