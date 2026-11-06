import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import { existsSync, mkdtempSync, readFileSync, realpathSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { createElement, type FunctionComponent } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { brandName } from "../kit/brand";
import { messages } from "../kit/core/i18n";
import * as React from "../kit/react";
import { href, LOCALES, type Locale, PAGES, WORDS } from "../src/lib/site";
import { canonical } from "./html";
import { FIXTURES } from "./parity-fixtures";

// The static build (Lazurio Module Standard 4.5): it succeeds without the
// listener, every page exists in both languages, a screen speaks one
// language, the pages are sound HTML, and the Astro and React components
// render the same markup from the same input.
const app = resolve(import.meta.dir, "..");
const bun = process.execPath;
const env = { HOME: process.env.HOME ?? "", PATH: dirname(process.execPath) };
const base = realpathSync.native(tmpdir());
let site = "";
let parity = "";

function build(outDir: string, extra: Record<string, string> = {}) {
  const run = Bun.spawnSync([bun, "x", "astro", "build", "--outDir", outDir], {
    cwd: app,
    env: { ...env, ...extra },
    stdout: "pipe",
    stderr: "pipe",
  });
  if (run.exitCode !== 0) throw new Error(`astro build failed:\n${run.stdout}\n${run.stderr}`);
}

beforeAll(() => {
  site = mkdtempSync(join(base, "ds-site-"));
  parity = mkdtempSync(join(base, "ds-parity-"));
  build(site);
  build(parity, { DS_PARITY: "1" });
}, 240_000);

afterAll(() => {
  for (const dir of [site, parity]) if (dir) rmSync(dir, { recursive: true, force: true });
});

const fileOf = (dir: string, path: string) =>
  join(dir, path.replace(/^\//, ""), path.endsWith("/") ? "index.html" : "");
const pageHtml = (locale: Locale, slug: string) =>
  readFileSync(fileOf(site, href(locale, slug)), "utf8");

// The other language's own words; an exact text of one of them on a page is a mixed screen.
function foreignWords(locale: Locale): Set<string> {
  const other: Locale = locale === "cs" ? "en" : "cs";
  const words = new Set<string>();
  const add = (mine: string, theirs: string) => {
    if (mine !== theirs && theirs.length > 2 && theirs !== brandName) words.add(theirs);
  };
  for (const word of Object.values(WORDS)) add(word[locale], word[other]);
  for (const page of PAGES) add(page.label[locale], page.label[other]);
  for (const [key, value] of Object.entries(messages[other])) {
    if (typeof value === "string") add(String(messages[locale][key as "close"]), value);
  }
  return words;
}

describe("the build", () => {
  test("succeeds without the listener and has the health path and the 404 page", () => {
    expect(existsSync(join(site, "index.html"))).toBe(true);
    expect(existsSync(join(site, "404.html"))).toBe(true);
    expect(existsSync(join(site, "parity"))).toBe(false);
  });

  test("has every page in Czech and English", () => {
    const missing = LOCALES.flatMap((locale) =>
      PAGES.map((page) => href(locale, page.slug)).filter(
        (path) => !existsSync(fileOf(site, path)),
      ),
    );
    expect(missing).toEqual([]);
  });

  test("every page is sound: one language, one h1, unique ids, live links, named controls", async () => {
    const problems: string[] = [];
    for (const locale of LOCALES) {
      const foreign = foreignWords(locale);
      for (const page of PAGES) {
        const path = href(locale, page.slug);
        const html = pageHtml(locale, page.slug);
        const say = (message: string) => problems.push(`${path}: ${message}`);
        if (!html.includes(`<html lang="${locale}"`)) say("wrong html lang");
        if ((html.match(/<h1\b/g) ?? []).length !== 1) say("not exactly one h1");
        const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(([, id]) => id);
        const twice = ids.filter((id, i) => ids.indexOf(id) !== i);
        if (twice.length) say(`duplicate ids ${twice.join(", ")}`);
        if (html.includes('href="#"')) say('href="#"');
        for (const [, link] of html.matchAll(/\shref="(\/[^"#?]*)/g)) {
          if (link && !existsSync(fileOf(site, link)) && !existsSync(join(site, link)))
            say(`dead link ${link}`);
        }
        for (const [tag] of html.matchAll(/<dialog\b[^>]*>/g)) {
          if (!/aria-labelledby="/.test(tag)) say("a dialog without a name");
        }
        for (const [whole, attributes = "", inner = ""] of html.matchAll(
          /<button\b([^>]*)>([\s\S]*?)<\/button>/g,
        )) {
          const text = inner.replace(/<[^>]+>/g, "").trim();
          if (!text && !/aria-label="[^"]+"/.test(attributes))
            say(`an unnamed button ${whole.slice(0, 80)}`);
        }
        for (const [tag] of html.matchAll(/<svg\b[^>]*>/g)) {
          if (
            !/aria-hidden="true"|role="img"[^>]*aria-label="|aria-label="[^"]+"[^>]*role="img"/.test(
              tag,
            )
          ) {
            say(`an svg without aria-hidden or a name ${tag.slice(0, 80)}`);
          }
        }
        const body = html
          .replace(/<head>[\s\S]*?<\/head>/, "")
          .replace(/<(pre|code|script)\b[\s\S]*?<\/\1>/g, "")
          .replace(/<a\b[^>]*\slang="[^"]+"[^>]*>[\s\S]*?<\/a>/g, "");
        for (const token of await canonical(body)) {
          if (token.startsWith("#") && foreign.has(token.slice(1)))
            say(`mixed language: "${token.slice(1)}"`);
        }
      }
    }
    expect(problems).toEqual([]);
  });
});

describe("Astro and React render the same markup", () => {
  const components = React as unknown as Record<string, FunctionComponent<Record<string, unknown>>>;
  const slotProps = (component: string, slots: Record<string, string> = {}) => {
    if (component === "Tabs") return Object.keys(slots).length ? { panels: slots } : {};
    const props: Record<string, unknown> = {};
    if (slots.footer !== undefined) props.footer = slots.footer;
    if (slots.actions !== undefined) props.actions = slots.actions;
    return props;
  };

  for (const fixture of FIXTURES) {
    test(fixture.id, async () => {
      const html = readFileSync(join(parity, "parity/index.html"), "utf8");
      const start = html.indexOf(`<div data-parity="${fixture.id}">`);
      expect(start, "rendered by Astro").toBeGreaterThanOrEqual(0);
      const from = html.indexOf(">", start) + 1;
      const astro = html.slice(from, html.indexOf("</div><hr data-parity-end", from));
      const Component = components[fixture.component];
      expect(Component, `React exports ${fixture.component}`).toBeDefined();
      if (!Component) return;
      const react = renderToStaticMarkup(
        createElement(
          Component,
          { ...fixture.props, ...fixture.react, ...slotProps(fixture.component, fixture.slots) },
          fixture.text,
        ),
      );
      expect(await canonical(react)).toEqual(await canonical(astro));
    });
  }
});
