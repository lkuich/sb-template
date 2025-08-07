export default function HeadTags() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "WebSite",
            url: "https://www.weightwatchers.com/",
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate:
                  "https://www.weightwatchers.com/search?q={search_term}",
              },
              "query-input": "required name=search_term",
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "LocalBusiness",
            name: "WeightWatchers",
            url: "https://www.weightwatchers.com",
            image:
              "https://v.cdn.ww.com/media/system/cms/ca/US_site_logo_recenter_2.svg",
            address: {
              "@type": "...",
              addressCountry: "...",
              addressLocality: "...",
              addressRegion: "...",
              postalCode: "...",
              streetAddress: "...",
            },
            telephone: "....",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "WebSite",
            name: "weight watchers",
            url: "https://www.weightwatchers.com",
          }),
        }}
      />
    </>
  );
}
