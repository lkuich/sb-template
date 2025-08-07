import Image from "next/image";
import type { StoryblokAsset } from "@/types/sb";

import cn from "classnames";

export function InlineAsset({
  asset,
  unoptimized,
  fill,
  width,
  height,
  priority,
  rounded,
  className,
  ...rest
}: {
  asset: StoryblokAsset;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  unoptimized?: boolean;
  rounded?: boolean;
  className?: string;
} & React.HTMLAttributes<HTMLImageElement>) {
  const type = fileType(asset);

  if (type === "video") {
    return (
      <video
        autoPlay
        loop
        muted
        playsInline
        controls
        className={cn("rounded-md", className)}
        src={asset.filename!}
        {...(rest as React.VideoHTMLAttributes<HTMLVideoElement>)}
      />
    );
  } else if (type === "svg") {
    return (
      <img
        src={asset.filename!}
        alt={asset.alt || "SVG Image"}
        width={width || asset.width || 200}
        height={height || asset.height || 200}
        className={cn(rounded && "rounded-md", "w-full h-auto", className)}
        {...rest}
      />
    );
  } else if (type === "image") {
    return (
      <Image
        src={asset.filename!}
        alt={asset.alt || "Image"}
        width={fill ? undefined : width || asset.width || 200}
        height={fill ? undefined : height || asset.height || 200}
        unoptimized={unoptimized}
        fill={fill}
        priority={priority}
        className={cn(rounded && "rounded-md", "w-full h-auto", className)}
        {...rest}
      />
    );
  }
}

const fileTypes = {
  image: [".jpg", ".jpeg", ".png", ".gif", ".webp", ".avif"],
  video: [".mp4", ".webm", ".ogg"],
  svg: [".svg"],
};

type FileType = keyof typeof fileTypes;

function fileType(asset: StoryblokAsset): FileType | undefined {
  return Object.keys(fileTypes).find((type) => {
    const extensions = fileTypes[type as FileType];
    return extensions.some((ext) =>
      asset.filename?.toLowerCase().endsWith(ext)
    );
  }) as FileType | undefined;
}
