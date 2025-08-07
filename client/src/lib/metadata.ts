import type { Metadata } from "next";

export type MetaDataInput = {
  // Basic page metadata
  title: string;
  description: string;
  robotsIndex: "index" | "noindex";
  robotsFollow: "follow" | "nofollow";
  canonicalUrl: string;
  // Open Graph tags
  ogTitle: string;
  ogDescription: string;
  ogImage?: {
    filename: string;
  };
  ogImageHeight?: number;
  ogImageWidth?: number;
  ogImageType?: string;
  ogUrl?: string;
};

export function createMetadata(meta: MetaDataInput): Metadata {
  const defaultTitle = "WeightWatchers";
  const defaultDescription = "WW is the best...";

  return {
    title: meta.title || defaultTitle,
    description: meta.description || defaultDescription,
    robots: `${meta.robotsIndex}, ${meta.robotsFollow}`,
    alternates: {
      canonical: meta.canonicalUrl,
    },
    openGraph: {
      title: meta.title || defaultTitle,
      description: meta.description || defaultDescription,
      url: meta.ogUrl,
      type: "article",
      locale: "en_Us",
      siteName: "WeightWatchers",
      images: meta.ogImage
        ? [
            {
              url: meta.ogImage.filename,
              ...imageDimensions(meta.ogImage.filename),
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

function imageDimensions(url: string) {
  return {
    width: url.split("/")[5].split("x")[0],
    height: url.split("/")[5].split("x")[1],
  };
}

export function getImageTypeFromFilename(filename?: string): string {
  if (!filename) {
    return "";
  }

  const extension = filename.split(".").pop()?.toLowerCase();

  const extensionToMimeType: Record<string, string> = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    webp: "image/webp",
    svg: "image/svg+xml",
    bmp: "image/bmp",
    tiff: "image/tiff",
    tif: "image/tiff",
    ico: "image/x-icon",
    avif: "image/avif",
  };

  return extensionToMimeType[extension || ""] || "";
}
