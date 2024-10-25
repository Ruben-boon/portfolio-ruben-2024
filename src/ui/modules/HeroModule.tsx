"use client";
import { PortableText } from "@portabletext/react";
import Img from "../Img";
import Link from "next/link";
import processUrl from "../../../sanity/lib/processUrl";
import { useDarkMode } from "../useDarkmode";
import { Ref, useEffect, useRef } from "react";
import ScrollEffects from "../scrollEffects";

interface SpacingSettings {
  paddingTop?: number; // Optional paddingTop property
  paddingBottom?: number; // Optional paddingBottom property
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
  const { darkMode, isInitialized } = useDarkMode();
  
  const contentTopRef = useRef(null);
  const sideImageRef = useRef(null);
  const bigImageRef = useRef(null);
  const dotRef = useRef(null);

  const shouldRenderLight = isInitialized && !darkMode;
  const shouldRenderDark = isInitialized && darkMode;

  return (
    <section
      className="hero-module relative"
      style={{
        paddingBottom: spacingSettings?.paddingBottom || 0,
      }}
    >
      <ScrollEffects
        refEl={contentTopRef}
        options={{ blur: 1, scale: 4, opacity: 3 }}
      />

      <ScrollEffects
        refEl={bigImageRef}
        options={{ blur: 1, scale: 0, opacity: 3 }}
      />
      <ScrollEffects
        refEl={sideImageRef}
        options={{ blur: 0, scale: 3, opacity: 2 }}
      />
      <ScrollEffects
        refEl={dotRef}
        options={{ blur: 0, scale: 0, opacity: 2 }}
      />
      <div className="dot" ref={dotRef}></div>
      <div className="content-top" ref={contentTopRef}>
        <div
          className="text-container"
          data-animate="fade-up"
          data-animate-delay="50"
        >
          {contentTop && <PortableText value={contentTop} />}
        </div>
        <div
          className="button-container"
          data-animate="fade-up"
          data-animate-delay="150"
        >
          <Link
            className="btn-outline"
            href={processUrl(ctas[0], {
              base: false,
              params: ctas[0],
            })}
          >
            {ctas[0].label}
          </Link>
        </div>
      </div>

      <div className="main-image relative" ref={bigImageRef}>
        {imageLight && shouldRenderLight && (
          <Img
            image={imageLight}
            alt="Afbeelding van een ruimteschip"
            imageWidth={2000}
          />
        )}
        {imageDark && shouldRenderDark && (
          <Img
            image={imageDark}
            alt="Afbeelding van de aarde"
            imageWidth={2000}
          />
        )}
        <div
          className="side-image"
          style={{
            opacity: isInitialized ? 1 : 0, // Hide side image until initialized
          }}
          ref={sideImageRef}
        >
          {imageLight && shouldRenderDark && (
            <Img
              image={imageLight}
              alt="Afbeelding van de aarde"
              imageWidth={400}
            />
          )}
          {imageDark && shouldRenderLight && (
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
        </div>
      </div>
      <div
        className="content-bottom"
        data-animate="fade-up"
        data-animate-delay="200"
      >
        {contentBottom && <PortableText value={contentBottom} />}
        {columns && (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 pt-7">
            {columns.map((column, index) => {
              const delay = index * 100;
              return (
                <div
                  key={index}
                  className="icon-card"
                  data-animate-delay={delay}
                  data-animate="fade-up"
                >
                  <Img
                    image={column.image}
                    alt={column.image.alt}
                    imageWidth={44}
                    className="icon-card__icon invert dark:invert-0"
                  />
                  <PortableText value={column.content} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
