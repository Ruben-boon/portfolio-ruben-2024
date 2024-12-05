import { PortableText } from "@portabletext/react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import processUrl from "sanity/lib/processUrl";

export default function HeroBasic({
  text,
  ctas,
}: Partial<{
  text: any;
  ctas: any;
}>) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 120px", "end start"],
  });

  const dotGroupY = useTransform(scrollYProgress, [0, 0.5], [0, -200]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  const parentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (

      <motion.section
        className="hero-basic relative"
        ref={sectionRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="dot-group"
          style={{
            y: dotGroupY,
          }}
        >
          <motion.div
            className="dot dot-large"
            initial={{ x: 100, y: 100, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          <motion.div
            className="dot dot-medium"
            initial={{ x: -100, y: 150, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          />
          <motion.div
            className="dot dot-small"
            initial={{ x: 50, y: -100, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          />
        </motion.div>

        <motion.div
          className="text-container light-text"
          initial="hidden"
          animate="visible"
          variants={parentVariants}
          transition={{ staggerChildren: 0.2 }}
          style={{
            opacity: textOpacity,
            scale: textScale,
          }}
        >
          {text && (
            <motion.div
              variants={parentVariants}
              transition={{ duration: 0.4 }}
            >
              <PortableText value={text} />
            </motion.div>
          )}
          {ctas?.[0] && (
            <motion.div
              variants={parentVariants}
              transition={{ duration: 0.4 }}
            >
              <Link
                className="btn-outline-light"
                href={processUrl(ctas[0], {
                  base: false,
                  params: ctas[0],
                })}
              >
                {ctas[0].label}
              </Link>
            </motion.div>
          )}
        </motion.div>
      </motion.section>
  );
}
