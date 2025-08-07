import cx from "classnames";
import { StoryblokServerComponent } from "@storyblok/react/rsc";
import { storyblokEditableBlok } from "@/lib/storyblokApi";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

import type { StoryblokPage } from "@/types/sb-components";

export default function Page<T extends StoryblokPage>({
  blok,
  className,
}: PageProps<T>) {
  return (
    <main className={className} {...storyblokEditableBlok(blok)}>
      {blok.navbar && (
        <div className={cx("sticky top-0 z-[4000]")}>
          <NavBar blok={blok.navbar.content} />
        </div>
      )}

      <PageBody bloks={blok.body} />

      {blok.footer && <Footer blok={blok.footer.content} />}
    </main>
  );
}

export function PageBody<T extends StoryblokPage>({
  bloks,
  children,
}: PageBodyProps<T>) {
  return !children
    ? bloks?.map((nestedBlok) => {
        const blokItem = nestedBlok as StoryblokPage;

        return (
          <div key={blokItem._uid}>
            <StoryblokServerComponent blok={blokItem} key={blokItem._uid} />
          </div>
        );
      })
    : children;
}

type PageProps<T extends StoryblokPage> = {
  blok: T;
  children?: React.ReactNode;
  className?: string;
};

type PageBodyProps<T extends StoryblokPage> = {
  bloks: T["body"];
  unpadded?: boolean;
  children?: React.ReactNode;
};
