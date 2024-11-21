"use client";
import { PortableText } from "@portabletext/react";
import Img from "@/ui/components/Img";
import Link from "next/link";
import processUrl from "sanity/lib/processUrl";
import { useDarkMode } from "@/ui/trash/useDarkmode";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface SpacingSettings {
  paddingTop?: number;
  paddingBottom?: number;
}

export default function HeroModule({
  spacingSettings,
  contentTop,
  ctas,
  imageLight,
  imageDark,
  contentBottom,
  columns,
}: Partial<{
  spacingSettings: SpacingSettings;
  contentTop: any;
  ctas: any;
  imageLight: Sanity.Image;
  imageDark: Sanity.Image;
  contentBottom: any;
  columns: Array<{
    content: any;
    image: Sanity.Image;
  }>;
}>) {
  // const { darkMode, isInitialized } = useDarkMode();

  // Create refs for scroll animations
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

  const mainImageScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const mainImageOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0.03]);
  const mainImageY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const sideImageY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const sideImageX = useTransform(scrollYProgress, [0, 0.3], [0, 300]);
  const sideImageScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.3]);
  const sideImageOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // const contentBottomY = useTransform(scrollYProgress, [0, 0.3], [0, -120]);

  // const shouldRenderLight = isInitialized && !darkMode;
  // const shouldRenderDark = isInitialized && darkMode;

  return (
    <motion.section
      ref={sectionRef}
      className="hero-module relative"
      style={{
        paddingBottom: spacingSettings?.paddingBottom || 0,
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
          {contentTop && <PortableText value={contentTop} />}
        </motion.div>

        <motion.div
          className="button-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          {ctas?.[0] && (
            <Link
              className="btn-outline"
              href={processUrl(ctas[0], {
                base: false,
                params: ctas[0],
              })}
            >
              {ctas[0].label}
            </Link>
          )}
        </motion.div>
      </motion.div>

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
            image={imageDark}
            style={{
              filter:
                "brightness(200%) contrast(100%) saturate(180%) hue-rotate(-30deg)",
              opacity: 0.15,
            }}
            alt="Afbeelding van een ruimteschip"
            imageWidth={400}
          />
        )}
      </motion.div>
      <motion.div
        className="content-bottom"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
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
                  className="icon-card__icon invert dark:invert-0 pb-4"
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
