import type { Metadata } from "next";
import type { ISbStoriesParams, StoryblokClient } from "@storyblok/react/rsc";

import { getStoryblokApi, STORYBLOK_VERSION } from "@/lib/storyblokApi";
import { createMetadata } from "@/lib/metadata";

import OgTags from "./ogTags";

import Page from "@/components/Page";

export default async function EntryPage({ params }: {
  params: Promise<{ slug: string }>;
}) {
  // @ts-expect-error Server Component
  const slugPath = (await params).slug?.join("/") || "home";

  const { data } = await fetchData(slugPath);

  return (
    <>
      <OgTags />
      <Page blok={data.story.content} />
    </>
  );
}

export async function generateStaticParams() {
  // Skip SSG in development mode to fetch fresh data on each request
  if (process.env.NODE_ENV === "development") {
    return [];
  }

  const storyblokApi: StoryblokClient = await getStoryblokApi();

  const stories = await storyblokApi.getStories({
    version: STORYBLOK_VERSION,
    cv: Date.now(), // Skips storyblok cache
    resolve_links: "link",
  });

  return stories.data.stories
    .filter((story) => story.content.component === "page")
    .map((story) => ({
      slug: story.full_slug.split("/"),
    }));
}

async function fetchData(
  slug: string,
) {
  const sbParams: ISbStoriesParams = {
    version: STORYBLOK_VERSION,
    cv: Date.now(), // Skips storyblok cache
    resolve_links: "link",
    resolve_relations:
      "page.navbar,page.footer,testimonialSection.testimonials",
  };

  const storyblokApi: StoryblokClient = await getStoryblokApi();
  return storyblokApi.get(`cdn/stories/${slug || "home"}`, sbParams);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; slug: string | string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const fullSlug = buildPath(...(Array.isArray(slug) ? slug : [slug]));

  const { data } = await fetchData(fullSlug);

  return createMetadata(data.story.content?.seo?.[0] || {});
}

function buildPath(...args: (string | undefined)[]) {
  return args
    .filter((arg) => arg)
    .map((arg) => arg?.replace(/^\//, ""))
    .join("/");
}
