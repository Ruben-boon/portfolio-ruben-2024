"use client";
import { PortableText } from "@portabletext/react";
import Img from "../Img";
import Link from "next/link";
import processUrl from "../../../sanity/lib/processUrl";
import { useDarkMode } from "../useDarkmode";

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
  return (
    <section className="hero-module relative">
      <div className="content-top">
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
      <div className={`image ${darkMode ? "side-image" : "main-image"}`}>
        {imageLight && (
          <Img image={imageLight} alt="Image of a globe" imageWidth={400} />
        )}
      </div>
      <div className={`image ${darkMode ? "main-image" : "side-image"}`}>
        {imageDark && (
          <Img image={imageDark} alt="Image of a globe" imageWidth={1200} />
        )}
      </div>
      <div className="content-bottom">
        {/* the name should revert back to contentBottom soon i think? */}
        {contentBottom && <PortableText value={contentBottom} />}
      </div>
    </section>
  );
}
