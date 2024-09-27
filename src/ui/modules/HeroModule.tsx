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
}: Partial<{
  spacingSettings: SpacingSettings;
  contentTop: any;
  ctas: any;
  imageLight: Sanity.Image;
  imageDark: Sanity.Image;
  contentBottom: any;
}>) {
  // console.log(processUrl(ctas[0]));
  const { darkMode } = useDarkMode();

  const contentTopRef = useRef(null);
  const sideImageRef = useRef(null);
  const bigImageRef = useRef(null);
  const dotRef = useRef(null);

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
      {/* <ScrollEffects refEl={sideImageRef} options={{ scale: 1, opacity: 4}} /> */}
      <ScrollEffects
        refEl={bigImageRef}
        options={{ blur: 1, scale: 2, opacity: 1 }}
      />
      <ScrollEffects
        refEl={sideImageRef}
        options={{ blur: 0, scale: 2, opacity: 3 }}
      />
      <ScrollEffects
        refEl={dotRef}
        options={{ blur: 0, scale: 0, opacity: 9 }}
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
      <div className="side-image" ref={sideImageRef}>
        {imageLight && darkMode && (
          <Img image={imageLight} alt="Image of a globe" imageWidth={400} />
        )}
        {imageDark && !darkMode && (
          <Img image={imageDark} alt="Image of a globe" imageWidth={1200} />
        )}
      </div>
      <div className="main-image" ref={bigImageRef}>
        {imageLight && !darkMode && (
          <Img image={imageLight} alt="Image of a globe" imageWidth={400} />
        )}
        {imageDark && darkMode && (
          <Img image={imageDark} alt="Image of a globe" imageWidth={1200} />
        )}
      </div>
      <div
        className="content-bottom"
        data-animate="fade-up"
        data-animate-delay="200"
      >
        {contentBottom && <PortableText value={contentBottom} />}
      </div>
    </section>
  );
}
