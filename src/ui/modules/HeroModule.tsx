"use client";
import { PortableText } from "@portabletext/react";
import Img from "../Img";
import Link from "next/link";
import processUrl from "../../../sanity/lib/processUrl";
import { useDarkMode } from "../useDarkmode";
import { Ref, useEffect, useRef } from "react";
import ScrollEffects from "../scrollEffects";

export default function HeroModule({
  spacingSettings,
  contentTop,
  ctas,
  imageLight,
  imageDark,
  contentBottom,
}: Partial<{
  spacingSettings: object;
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

  return (
    <section className="hero-module relative">
      <ScrollEffects
        refEl={contentTopRef}
        options={{ blur: 2, scale: 4, opacity: 5 }}
      />
      {/* <ScrollEffects refEl={sideImageRef} options={{ scale: 1, opacity: 4}} /> */}
      <ScrollEffects refEl={bigImageRef} options={{ blur:1, scale: 3, opacity: 3}} />

      <div className="content-top" ref={contentTopRef}>
        {contentTop && <PortableText value={contentTop} />}
        <div className="button-container">
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
        <div className="content-bottom">
          {contentBottom && <PortableText value={contentBottom} />}
        </div>
    </section>
  );
}
