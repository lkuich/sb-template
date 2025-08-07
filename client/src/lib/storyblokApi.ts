import {
  apiPlugin,
  storyblokInit,
  storyblokEditable,
} from "@storyblok/react/rsc";

import Page from "@/components/Page";
import Banner from "@/components/Banner";
import TestimonialSection from "@/components/TestimonialSection";

export const STORYBLOK_VERSION =
  process.env.STORYBLOK_VERSION === "published" ||
  process.env.STORYBLOK_VERSION === "draft"
    ? process.env.STORYBLOK_VERSION
    : "published";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function storyblokEditableBlok(blok: any) {
  return storyblokEditable(blok);
}

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.STORYBLOK_TOKEN,
  use: [apiPlugin],
  apiOptions: {
    region: process.env.STORYBLOK_REGION ?? "eu",
  },
  components: {
    page: Page,
    banner: Banner,
    testimonialSection: TestimonialSection,
  },
});
