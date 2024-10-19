import {
  useNextSanityImage,
  type UseNextSanityImageOptions,
} from "next-sanity-image";

import { stegaClean } from "@sanity/client/stega";
import { client } from "../../sanity/lib/client";
import { urlFor } from "../../sanity/lib/urlFor";

const SIZES = [
  120, 160, 200, 240, 320, 400, 480, 520, 560, 600, 640, 800, 960, 1280, 1440,
  1600, 1800, 2000,
];

export default function Img({
  image,
  imageWidth,
  imageSizes = SIZES,
  alt = "",
  options,
  ...props
}: {
  image: Sanity.Image | undefined;
  imageWidth?: number;
  imageSizes?: number[];
  options?: UseNextSanityImageOptions;
} & React.ImgHTMLAttributes<HTMLImageElement>) {
  const { src, width, height } = useNextSanityImage(
    client,
    image,
    imageWidth ? { imageBuilder: (b) => b.width(imageWidth) } : options
  );

  if (!image?.asset) return null;

  return (
    <img
      src={src}
      srcSet={
        generateSrcset(image, { width: imageWidth, sizes: imageSizes }) || src
      }
      width={width}
      height={height}
      alt={stegaClean(image.alt) || alt}
      loading={stegaClean(image.loading) || "lazy"}
      decoding="async"
      {...props}
    />
  );
}

export function Source({
  image,
  imageWidth,
  imageSizes = SIZES,
  options,
  media = "(max-width: 768px)",
}: {
  image: Sanity.Image | undefined;
  imageWidth?: number;
  imageSizes?: number[];
options?: UseNextSanityImageOptions;
  media?: string;
}) {
  const { src, width, height } = useNextSanityImage(
    client,
    image,
    imageWidth ? { imageBuilder: (b) => b.width(imageWidth) } : options
  );
  if (!image) return null;

  return (
    <source
      srcSet={
        generateSrcset(image, { width: imageWidth, sizes: imageSizes }) || src
      }
      width={width}
      height={height}
      media={media}
    />
  );
}

function generateSrcset(
  image: Sanity.Image,
  {
    width,
    sizes = SIZES,
  }: {
    width?: number;
    sizes: number[];
  }
) {
  return (
    sizes
      .filter((size) => !width || size <= width)
      .map(
        (size) => `${urlFor(image).width(size).auto("format").url()} ${size}w`
      )
      .join(", ") || undefined
  );
}
