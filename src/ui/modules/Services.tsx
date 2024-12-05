"use client";
import { PortableText } from "@portabletext/react";
import Img from "@/ui/components/Img";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";

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
  const columnsRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end start"],
  });
  const contentBottomOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const contentBottomScale = useTransform(scrollYProgress, [0, 0.3], [0.9, 1]);

  const mainImageScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.6]);
  const mainImageOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const mainImageY = useTransform(scrollYProgress, [0, 1], [0, -300]);

  const sideImageY = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const sideImageX = useTransform(scrollYProgress, [0, 0.3], [0, 220]);
  const sideImageScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.1]);
  const sideImageOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const isColumnsInView = useInView(columnsRef, { once: true, amount: 0.5 });

  return (
    <>
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
        >
          {imageDark && (
            <Img
              image={imageDark}
              alt="Afbeelding van de aarde"
              imageWidth={2000}
              loading="eager"
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
              loading="eager"

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
            <div 
              ref={columnsRef}
              className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 pt-7"
            >
              {columns.map((column, index) => (
                <motion.div
                  key={index}
                  className="icon-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isColumnsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: isColumnsInView ? 0.2 + index * 0.15 : 0 
                  }}
                >
                  <Img
                    image={column.image}
                    alt={column.image.alt}
                    imageWidth={44}
                    className="icon-card__icon"
                  />
                  <PortableText value={column.content} />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </motion.section>
    </>
  );
}