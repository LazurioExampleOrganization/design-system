import type { CollectionEntry } from "astro:content";
import type { Locale } from "../lib/site";

/** What every view gets from the page route. */
export type ViewProps = {
  locale: Locale;
  slug: string;
  entry: CollectionEntry<"docs"> | CollectionEntry<"brand">;
};
