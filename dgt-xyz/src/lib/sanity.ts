// Import everything from the next-sanity wrapper
import { createClient, groq } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url";
import { createImageUrlBuilder } from "@sanity/image-url";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: true,
});

// The builder still comes from the dedicated image-url package
const builder = createImageUrlBuilder(client);

export const urlFor = (source: SanityImageSource) => builder.image(source);

// You can export groq from here too if you want a single source for imports
export { groq };
