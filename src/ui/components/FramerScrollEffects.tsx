
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollEffectsProps {
  children: React.ReactNode;
  options?: {
    blur?: number;
    scale?: number;
    opacity?: number;
    horizontal?: number;
  };
}

const FramerScrollEffects = ({ children, options = {} }: ScrollEffectsProps) => {
  const {
    blur = 0,
    scale = 0,
    opacity = 0,
    horizontal = 10
  } = options;

  const { scrollY } = useScroll();

  // Transform scroll values into animation values
  const blurValue = useTransform(
    scrollY,
    [0, 400],
    [0, blur >= 1 && blur <= 9 ? (blur * 0.8) : 0]
  );

  const scaleValue = useTransform(
    scrollY,
    [0, 1000],
    [1, scale >= 1 && scale <= 9 ? (1 - scale / 10) : 1]
  );

  const opacityValue = useTransform(
    scrollY,
    [0, 1500],
    [1, opacity >= 1 && opacity <= 9 ? (1 - opacity / 10) : 1]
  );

  const horizontalValue = useTransform(
    scrollY,
    [0, 1000],
    [0, horizontal >= 0 && horizontal <= 19 && horizontal !== 10
      ? (horizontal - 10) * 10
      : 0]
  );

  // Style object for the motion component
  const style = {
    filter: blur ? blurValue.get() && `blur(${blurValue}px)` : undefined,
    scale: scale ? scaleValue : undefined,
    opacity: opacity ? opacityValue : undefined,
    x: horizontal !== 10 ? horizontalValue : undefined,
  };

  return (
    <motion.div
      style={style}
      initial={false}
      className="motion-safe:transition-all"
    >
      {children}
    </motion.div>
  );
};

export default FramerScrollEffects;