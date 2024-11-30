"use client";
import { PortableText } from "@portabletext/react";
import Img from "@/ui/components/Img";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

interface SpacingSettings {
  paddingTop?: number;
  paddingBottom?: number;
}

export default function Services({
  imageLight,
  imageDark,
  contentBottom,
  columns,
}: Partial<{
  imageLight: Sanity.Image;
  imageDark: Sanity.Image;
  contentBottom: any;
  columns: Array<{
    content: any;
    image: Sanity.Image;
  }>;
}>) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end start"],
  });
  const contentBottomOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const contentBottomScale = useTransform(scrollYProgress, [0, 0.3], [0.9, 1]);

  const mainImageScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.6]);
  const mainImageOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const mainImageY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const sideImageY = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const sideImageX = useTransform(scrollYProgress, [0, 0.3], [0, 220]);
  const sideImageScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.1]);
  const sideImageOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <motion.section
      ref={sectionRef}
      className="services relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="main-image relative"
        style={{
          scale: mainImageScale,
          opacity: mainImageOpacity,
          y: mainImageY,
        }}
        // initial={{ opacity: 0, y: 40 }}
        // animate={{ opacity: 1, y: 0 }}
        // transition={{ duration: 1 }}
      >
        {imageDark && (
          <Img
            image={imageDark}
            alt="Afbeelding van de aarde"
            imageWidth={2000}
          />
        )}
      </motion.div>
      <motion.div
        className="side-image"
        style={{
          opacity: sideImageOpacity,
          y: sideImageY,
          x: sideImageX,
          scale: sideImageScale,
        }}
      >
        {imageDark && (
          <Img
            image={imageLight}
            alt="Afbeelding van een ruimteschip"
            imageWidth={400}
          />
        )}
      </motion.div>
      <motion.div
        className="content-bottom light-text"
        style={{
          opacity: contentBottomOpacity,
          scale: contentBottomScale,
        }}
      >
        {contentBottom && <PortableText value={contentBottom} />}
        {columns && (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 pt-7">
            {columns.map((column, index) => (
              <motion.div
                key={index}
                className="icon-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Img
                  image={column.image}
                  alt={column.image.alt}
                  imageWidth={44}
                  className="icon-card__icon pb-4"
                />
                <PortableText value={column.content} />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.section>
  );
}
