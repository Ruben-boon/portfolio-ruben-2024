import { PortableText } from "@portabletext/react";
import ScrollEffects from "../trash/scrollEffects";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";


interface SpacingSettings {
  paddingTop?: number;
  paddingBottom?: number;
}

export default function HeroBasic({
  spacingSettings,
  text,
}: Partial<{
  spacingSettings?: SpacingSettings;
  text: any;
}>) {
  const dotRef = useRef(null);
  const headerRef = useRef(null);

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Transform values for different elements
  const dotScaleY = useTransform(scrollYProgress, [0, 0.3], [0, -320]);
  const dotScale = useTransform(scrollYProgress, [0, 0.3], [1, 2.5]);
  const dotOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 1]);

  // const contentTopY = useTransform(scrollYProgress, [0, 0.3], [0, -120]);
  const contentTopOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const contentTopScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);
  

  // return (
  //   <motion.section
  //   ref={sectionRef}
  //     className="hero-basic-module container-width"
  //     style={{
  //       paddingBottom: spacingSettings?.paddingBottom || 0,
  //     }}
  //     data-animate="fade-up"
  //     data-animate-delay="100"
  //   >
  //     <ScrollEffects
  //       refEl={dotRef}
  //       options={{ blur: 0, scale: 0, opacity: 2 }}
  //     />
  //     <ScrollEffects
  //       refEl={headerRef}
  //       options={{ blur: 1, scale: 4, opacity: 3 }}
  //     />
  //     <div className="project-header" ref={headerRef}>
  //       <PortableText value={text} />
  //     </div>
  //     <div className="dot" ref={dotRef}></div>
  //   </section>
  // );
  return (  <motion.section
    ref={sectionRef}
    className="hero-module relative"
    style={{
      // paddingBottom: spacingSettings?.paddingBottom || 0,
    }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    {/* Dot Element */}
    <motion.div
      className="dot"
      style={{
        y: dotScaleY,
        scale: dotScale,
        opacity: dotOpacity,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: 0.2,
        ease: "easeOut",
      }}
    />

    <motion.div
      className="content-top"
      style={{
        opacity: contentTopOpacity,
        scale: contentTopScale,
      }}
    >
      <motion.div
        className="text-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        {text && <PortableText value={text} />}
      </motion.div>


    </motion.div>
  </motion.section>);
}
