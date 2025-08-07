import Image from "next/image";
import type {
  StoryblokTestimonialSection,
  StoryblokTestimonial,
} from "@/types/sb-components";
import RichTextField from "@/components/shared/RitchTextField";
import { storyblokEditableBlok } from "@/lib/storyblokApi";

export default function TestimonialSection({
  blok,
}: {
  blok: StoryblokTestimonialSection;
}) {
  return (
    <section className="py-16 bg-gray-50" {...storyblokEditableBlok(blok)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {blok.heading || "What Our Clients Say"}
          </h2>
          {blok.subheading && (
            <p className="mt-4 text-xl text-gray-600">{blok.subheading}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {blok.testimonials?.map((testimonial, i) => (
            // _uid is usually not unique
            <TestimonialCard key={testimonial._uid + i} testimonial={testimonial.content} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial,
}: {
  testimonial: StoryblokTestimonial;
}) {
  const authorName = testimonial.author || "Anonymous";
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    authorName
  )}&background=6366f1&color=fff`;

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center mb-6">
        <Image
          src={avatarUrl}
          alt={authorName}
          width={12}
          height={12}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h3 className="font-semibold text-gray-900">{authorName}</h3>
        </div>
      </div>

      <div className="relative">
        <svg
          className="absolute top-0 left-0 w-8 h-8 text-gray-200 -mt-2 -ml-2"
          fill="currentColor"
          viewBox="0 0 32 32"
        >
          <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
        </svg>
        <div className="relative pl-6">
          <RichTextField
            content={testimonial.body}
            // css props will override the default styles in the RichTextField
            className="text-gray-700"
          />
        </div>
      </div>

      <div className="mt-6 flex">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className="w-5 h-5 text-yellow-400 fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
      </div>
    </div>
  );
}
