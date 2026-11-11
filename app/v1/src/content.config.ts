import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// The text of the viewer's pages, in Czech and English: `content/<locale>/`
// (the template's: guidelines, foundations, components) and
// `brand/content/<locale>/` (the Organization's own brand pages). An entry's
// id is `<locale>/<page slug>`.
const page = z.object({
  title: z.string(),
  description: z.string(),
  do: z.array(z.string()).optional(),
  dont: z.array(z.string()).optional(),
});

// The id is the file's path without `.md`, so `cs/index.md` is `cs/index`.
const id = ({ entry }: { entry: string }) => entry.replace(/\.md$/, "");

const docs = defineCollection({
  loader: glob({ pattern: "{cs,en}/**/*.md", base: "../../content", generateId: id }),
  schema: page,
});

const brand = defineCollection({
  loader: glob({ pattern: "{cs,en}/**/*.md", base: "../../brand/content", generateId: id }),
  schema: page,
});

export const collections = { docs, brand };
