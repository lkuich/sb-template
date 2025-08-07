/// <reference types="cypress" />

import React from "react";
import "cypress/react";

import { VIEWPORT, setViewport, buildAsset } from "@/lib/cypress";
import Banner from "@/components/Banner";

import type { StoryblokBanner } from "@/types/sb-components";

// @lkuich - We should move away from this global import
import "../../app/globals.css";

describe("<CareCard />", () => {
  const blok: StoryblokBanner = {
    headline: "The care you need, whenever you need it",
    subheading:
      "No matter where you start, your provider will work with you to develop a treatment plan that’s tailored around you and your individual needs.",
    backgroundImage: buildAsset({
      filename:
        "https://a.storyblok.com/f/286267789414235/1618x1308/2c3f6f82db/happy_cooking_people.webp",
      alt: "Happy People",
    }),
    component: "banner",
    _uid: "banner1",
  };

  it.only("Renders correctly on mobile", () => {
    setViewport(VIEWPORT.MOBILE);
    cy.mount(<Banner blok={blok} />);

    // Headline
    cy.get("[data-cy=headline]").should("have.text", blok.headline);

    // Description
    cy.get("[data-cy=subheading]").should("have.text", blok.subheading);

    // Images
    cy.get("[data-cy=background-image]").should("exist");
  });

  it("Renders correctly on tablet", () => {
    setViewport(VIEWPORT.TABLET);
    cy.mount(<Banner blok={blok} />);

    // ...
  });

  it("Renders correctly on desktop", () => {
    setViewport(VIEWPORT.DESKTOP);
    cy.mount(<Banner blok={blok} />);

    // ...
  });
});
