import React from "react";
import type { StoryblokBanner } from "@/types/sb-components";
import { storyblokEditableBlok } from "@/lib/storyblokApi";

import { InlineAsset } from "@/components/shared/Asset";

export default function Banner({ blok }: { blok: StoryblokBanner }) {
  const { headline, subheading, backgroundImage } = blok;

  return (
    <div
      className="relative w-full h-96 md:h-[500px] overflow-hidden"
      {...storyblokEditableBlok(blok)}
    >
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <InlineAsset
            asset={backgroundImage}
            fill
            priority
            className="object-cover z-1"
            data-cy="background-image"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </div>
      )}

      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          {headline && (
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4" data-cy="headline">
              {headline}
            </h1>
          )}
          {subheading && (
            <p className="text-lg md:text-xl lg:text-2xl text-white/90" data-cy="subheading">
              {subheading}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
