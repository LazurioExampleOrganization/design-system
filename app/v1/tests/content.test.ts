import { describe, expect, test } from "bun:test";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { ROLES, roleColor, tokens } from "../src/tokens";

// The content contract of the design system (issue #5): every layer has its
// pages, the pages follow the shared structure, links between them resolve and
// templates only use colours of the tokens.
const content = resolve(import.meta.dir, "../../../content");
const pages = resolve(import.meta.dir, "../src/pages");

function files(dir: string, suffix: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? files(path, suffix) : path.endsWith(suffix) ? [path] : [];
  });
}
const markdown = files(content, ".md");
const read = (path: string) => readFileSync(join(content, path), "utf8");

const LAYERS: Record<string, string[]> = {
  brand: [
    "README.md",
    "brand.md",
    "voice-and-tone.md",
    "colors/palette.md",
    "colors/tokens.json",
    "typography/typography.md",
    "layout/spacing-and-radius.md",
    "iconography/iconography.md",
  ],
  components: [
    "README.md",
    "button.md",
    "input.md",
    "card.md",
    "table.md",
    "dialog.md",
    "toast.md",
    "badge.md",
    "empty-state.md",
  ],
  patterns: [
    "README.md",
    "forms-and-validation.md",
    "empty-and-error-states.md",
    "navigation.md",
    "data-tables.md",
    "irreversible-actions.md",
  ],
  writing: ["README.md", "ui-text.md", "documents.md", "terminology.md"],
  templates: [
    "README.md",
    "document/research-brief.md",
    "presentation/experiment-review.md",
    "email/experiment-update.md",
    "email/experiment-update.html",
  ],
  examples: [
    "README.md",
    "screens/experiments.md",
    "screens/new-experiment.md",
    "screens/stop-or-scale.md",
    "screens/research-sources.md",
  ],
};

describe("content", () => {
  for (const [layer, required] of Object.entries(LAYERS)) {
    test(`the ${layer} layer has its pages`, () => {
      for (const file of required) expect(existsSync(join(content, layer, file))).toBe(true);
    });
  }

  test("every Markdown page has front matter with a title", () => {
    for (const path of markdown) {
      expect(readFileSync(path, "utf8")).toMatch(/^---\ntitle: .+\n[\s\S]*?\n---\n/);
    }
  });

  test("every component page has the shared sections", () => {
    const sections = [
      "Purpose",
      "Anatomy",
      "Variants",
      "States",
      "Usage",
      "Content",
      "Accessibility",
      "Tokens",
    ];
    for (const file of LAYERS.components ?? []) {
      if (file === "README.md") continue;
      const text = read(`components/${file}`);
      for (const section of sections) expect(text).toContain(`\n## ${section}\n`);
    }
  });

  test("irreversible actions wait for Publish", () => {
    const text = read("patterns/irreversible-actions.md");
    expect(text).toContain('**Nothing irreversible happens without "Publish".**');
    expect(text).toContain("Draft");
  });

  test("relative links between content files resolve", () => {
    const broken: string[] = [];
    for (const path of markdown) {
      const text = readFileSync(path, "utf8").replace(/```[\s\S]*?```/g, "");
      for (const [, href] of text.matchAll(/\]\(([^)\s]+)\)/g)) {
        if (!href || /^(?:[a-z][a-z0-9+.-]*:|\/|#)/i.test(href)) continue;
        const target = resolve(dirname(path), href.split("#")[0] ?? "");
        if (!existsSync(target)) broken.push(`${relative(content, path)} → ${href}`);
      }
    }
    expect(broken).toEqual([]);
  });

  test("every example screen points at a page of the viewer", () => {
    for (const file of files(join(content, "examples/screens"), ".md")) {
      const screen = /\nscreen: (\/screens\/[a-z-]+\/)\n/.exec(readFileSync(file, "utf8"))?.[1];
      expect(screen).toBeDefined();
      expect(existsSync(join(pages, `${screen?.slice(1, -1)}.astro`))).toBe(true);
    }
  });

  test("the e-mail template uses only colours of the light theme", () => {
    const light = new Set(ROLES.map((role) => roleColor(tokens, "light", role).toLowerCase()));
    const used = [
      ...read("templates/email/experiment-update.html").matchAll(/#[0-9a-f]{6}\b/gi),
    ].map(([hex]) => hex.toLowerCase());
    expect(used.length).toBeGreaterThan(0);
    expect(used.filter((hex) => !light.has(hex))).toEqual([]);
  });
});
