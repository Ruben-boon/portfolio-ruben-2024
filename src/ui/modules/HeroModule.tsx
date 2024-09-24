"use client";
import { PortableText } from "@portabletext/react";
import Img from "../Img";
import Link from "next/link";
import processUrl from "../../../sanity/lib/processUrl";
import { useDarkMode } from "../useDarkmode";

export default function HeroModule({
  spacingSettings,
  contentTop,
  buttons,
  imageLight,
  imageDark,
  contentBottom,
}: Partial<{
  spacingSettings: object;
  contentTop: any;
  buttons: any;
  imageLight: Sanity.Image;
  imageDark: Sanity.Image;
  contentBottom: any;
}>) {
  console.log(buttons)
  const { darkMode } = useDarkMode();
  return (
    <section className="hero-module relative">
      <div className="content-top">
        {contentTop && <PortableText value={contentTop} />}
      </div>
      <div className="button-container">
        {/* <Link
          href={processUrl(Buttons[0], {
            base: false,
            params: Buttons,
          })}
        >
          {Buttons[0].label}
        </Link> */}
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
