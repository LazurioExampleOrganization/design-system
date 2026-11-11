// All pages of the viewer: the template's (lib/site.ts) and, after the brand
// page, any further page the Organization puts into brand/content/<locale>/,
// with no change of the template's code. Astro only (reads the collections).
import { getCollection } from "astro:content";
import { PAGES, type Page } from "./site";

export async function allPages(): Promise<Page[]> {
  const brand = await getCollection("brand");
  const extra = brand
    .filter((entry) => entry.id.startsWith("cs/") && entry.id !== "cs/brand")
    .map((entry): Page => {
      const name = entry.id.slice("cs/".length);
      const english = brand.find((other) => other.id === `en/${name}`);
      return {
        slug: `brand/${name}`,
        group: "start",
        label: { cs: entry.data.title, en: english?.data.title ?? entry.data.title },
        text: "brand",
      };
    })
    .sort((a, b) => a.slug.localeCompare(b.slug));
  const at = PAGES.findIndex((page) => page.slug === "brand") + 1;
  return [...PAGES.slice(0, at), ...extra, ...PAGES.slice(at)];
}

/** The page's text in the repository, for the link to its source. */
export function sourcePath(page: Page, locale: string): string {
  const file = `${locale}/${page.slug.replace(/^brand\//, "") || "index"}.md`;
  return page.text === "brand" ? `brand/content/${file}` : `content/${file}`;
}
