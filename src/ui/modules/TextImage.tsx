import React from "react";
import Image from "next/image"; // Assuming Next.js Image component
import { PortableText } from "@portabletext/react"; // For rendering block content
import Img from "../components/Img";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Typewriter from "../components/TypWriter";

export default function TextImage({
  image,
  text,
  background,
  isMirrored,
}: Partial<{
  image: Sanity.Image;
  text: any; // Block content
  background: { hex: string };
  isMirrored: boolean;
}>) {
  const dotGroupRef = useRef(null);
  const isInView = useInView(dotGroupRef, { once: true });

  return (
    <section className="text-image">
      <div
        className="content-wrapper grid grid-cols-1 lg:grid-cols-2 lg:grid-flow gap-10"
        // style={{ backgroundColor: background.hex || "transparent" }}
      >
        {text && (
          <div
            data-animate="fade-up"
            data-animate-delay="300"
            className={`w-full text-wrapper ${isMirrored ? "md:order-last" : "md:order-first"}`}
          >
            <h3 className="typewriter-text">
              Gemakkelijk zelf jouw 
              <Typewriter
                words={[
                  " website aanpassen",
                  " applicatie tweaken",
                  " webshop updaten",
                ]}
                typingSpeed={100}
                deletingSpeed={50}
                pauseBetween={1500}
              />
            </h3>
            <PortableText value={text} />
          </div>
        )}
        {image && (
          <div
            className={`w-full image-wrapper ${isMirrored ? "md:order-first" : "md:order-last"}`}
          >
            <Img
              image={image}
              width={800}
              height={600}
              data-animate="zoom-in"
              data-aniamte-delay="100"
            />
            <motion.div ref={dotGroupRef} className="dot-group">
              <motion.div
                className="dot dot-large"
                initial={{ x: 100, y: 100, opacity: 0 }}
                animate={
                  isInView
                    ? { x: 0, y: 0, opacity: 1 }
                    : { x: 100, y: 100, opacity: 0 }
                }
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
              <motion.div
                className="dot dot-medium"
                initial={{ x: -100, y: 150, opacity: 0 }}
                animate={
                  isInView
                    ? { x: 0, y: 0, opacity: 0.5 }
                    : { x: -100, y: 150, opacity: 0 }
                }
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              />
              <motion.div
                className="dot dot-small"
                initial={{ x: 50, y: -100, opacity: 0 }}
                animate={
                  isInView
                    ? { x: 0, y: 0, opacity: 0.2 }
                    : { x: 50, y: -100, opacity: 0 }
                }
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              />
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
