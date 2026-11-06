import { describe, expect, test } from "bun:test";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { LOCALES, PAGES } from "../src/lib/site";

// Every page of the viewer has its text in Czech and in English, with the
// same front matter, and the two languages hold the same set of files.
const root = resolve(import.meta.dir, "../../..");
const sources = { docs: join(root, "content"), brand: join(root, "brand/content") };

function markdown(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return markdown(path);
    return name.endsWith(".md") ? [path] : [];
  });
}

function frontMatter(path: string): Record<string, unknown> {
  const match = /^---\n([\s\S]*?)\n---\n/.exec(readFileSync(path, "utf8"));
  if (!match?.[1]) throw new Error(`${path}: no front matter`);
  return Bun.YAML.parse(match[1]) as Record<string, unknown>;
}

describe("content", () => {
  test("every page has its text in both languages", () => {
    const missing = PAGES.flatMap((page) =>
      LOCALES.map((locale) =>
        join(sources[page.text], locale, `${page.slug || "index"}.md`),
      ).filter((path) => !existsSync(path)),
    );
    expect(missing).toEqual([]);
  });

  for (const [name, dir] of Object.entries(sources)) {
    test(`${name}: Czech and English hold the same files and the same front matter`, () => {
      const cs = markdown(join(dir, "cs"))
        .map((path) => relative(join(dir, "cs"), path))
        .sort();
      const en = markdown(join(dir, "en"))
        .map((path) => relative(join(dir, "en"), path))
        .sort();
      expect(en).toEqual(cs);
      for (const file of cs) {
        const a = frontMatter(join(dir, "cs", file));
        const b = frontMatter(join(dir, "en", file));
        expect(Object.keys(b).sort(), file).toEqual(Object.keys(a).sort());
        expect(typeof a.title === "string" && typeof a.description === "string", file).toBe(true);
        for (const key of ["do", "dont"]) {
          expect((b[key] as unknown[] | undefined)?.length, `${file} ${key}`).toBe(
            (a[key] as unknown[] | undefined)?.length,
          );
        }
      }
    });
  }

  test("component pages have do and don't", () => {
    for (const page of PAGES.filter((p) => p.slug.startsWith("components/"))) {
      for (const locale of LOCALES) {
        const data = frontMatter(join(sources.docs, locale, `${page.slug}.md`));
        expect((data.do as unknown[]).length, `${locale}/${page.slug}`).toBeGreaterThan(0);
        expect((data.dont as unknown[]).length, `${locale}/${page.slug}`).toBeGreaterThan(0);
      }
    }
  });
});
