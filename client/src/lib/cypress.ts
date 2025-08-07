import type { StoryblokAsset } from "@/types/sb";

export const VIEWPORT = {
  PHONE: { width: 639, height: 772 },
  MOBILE: { width: 768, height: 772 },
  TABLET: { width: 1279, height: 772 },
  DESKTOP: { width: 1800, height: 992 },
} as const;

export type ViewportPreset = (typeof VIEWPORT)[keyof typeof VIEWPORT];

export const setViewport = (preset: ViewportPreset) => {
  cy.viewport(preset.width, preset.height);
};

export function buildAsset(file: Partial<StoryblokAsset>): StoryblokAsset {
  return {
    filename: file.filename || "https://example.com/image.png",
    alt: file.alt || "Image alt",
    title: file.title || "Default Title",
    id: file.id || 123,
    name: file.name || "Image",
    focus: file.focus || null,
    fieldtype: file.fieldtype || "asset",
    source: file.source || null,
    copyright: null,
    meta_data: {},
    is_external_url: false,
    is_private: false,
    src: "",
    updated_at: "",
    width: null,
    height: null,
    aspect_ratio: null,
    public_id: null,
    content_type: "",
  };
}
