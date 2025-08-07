import { getStoryblokApi } from "@/lib/storyblokApi";

export default function StoryblokProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  getStoryblokApi(); // Re-initialize on the client
  return children;
}
