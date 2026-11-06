import { describe, expect, test } from "bun:test";
import { readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { contrast, MINIMUM } from "../kit/core/contrast";
import { color, contrastPairs } from "../kit/tokens";
import {
  checkBrand,
  checkSystem,
  loadTokens,
  ROOT,
  resolveTokens,
  THEMES,
} from "../scripts/token-source";
import { stale } from "../scripts/tokens";

// The one source of the tokens (brand/brand.json and tokens/tokens.json), what
// is generated from it, and the contrast of every role pair in both themes.
const kit = resolve(import.meta.dir, "../kit");
const css = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? css(join(dir, entry.name))
      : entry.name.endsWith(".css")
        ? [join(dir, entry.name)]
        : [],
  );

describe("tokens", () => {
  test("the sources are valid and every role resolves in both themes", () => {
    const tokens = loadTokens();
    for (const theme of THEMES) {
      expect(Object.keys(tokens.colors[theme]).sort()).toEqual(
        Object.keys(tokens.system.color).sort(),
      );
    }
  });

  test("every generated file is up to date", () => {
    expect(stale()).toEqual([]);
  });

  test("every role pair reaches WCAG contrast in both themes", () => {
    const failures: string[] = [];
    for (const theme of THEMES) {
      for (const kind of ["text", "graphic"] as const) {
        for (const [fg, bg] of contrastPairs[kind]) {
          const ratio = contrast(color[theme][fg], color[theme][bg]);
          if (ratio < MINIMUM[kind]) failures.push(`${theme} ${fg} on ${bg}: ${ratio.toFixed(2)}`);
        }
      }
    }
    expect(failures).toEqual([]);
  });

  test("a palette that fails contrast fails the check", () => {
    const brand = checkBrand(JSON.parse(readFileSync(join(ROOT, "brand/brand.json"), "utf8")));
    const system = checkSystem(JSON.parse(readFileSync(join(ROOT, "tokens/tokens.json"), "utf8")));
    const weak = resolveTokens(
      { ...brand, roles: { light: { "ink-muted": "neutral.300" }, dark: {} } },
      system,
    );
    expect(
      contrast(weak.colors.light["ink-muted"] ?? "", weak.colors.light.surface ?? ""),
    ).toBeLessThan(MINIMUM.text);
  });

  test("a role override must name a known role and a palette step", () => {
    const brand = checkBrand(JSON.parse(readFileSync(join(ROOT, "brand/brand.json"), "utf8")));
    const system = checkSystem(JSON.parse(readFileSync(join(ROOT, "tokens/tokens.json"), "utf8")));
    expect(() =>
      resolveTokens({ ...brand, roles: { light: { nope: "#000000" }, dark: {} } }, system),
    ).toThrow();
    expect(() =>
      resolveTokens({ ...brand, roles: { light: { ink: "accent.12" }, dark: {} } }, system),
    ).toThrow();
  });

  test("the kit's CSS uses only tokens: no literal colour, length or duration", () => {
    const breakpoints = ["640px", "768px", "1024px", "1280px"];
    const problems: string[] = [];
    for (const file of css(join(kit, "css"))) {
      const lines = readFileSync(file, "utf8")
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .split("\n");
      lines.forEach((line, index) => {
        const where = `${file.slice(kit.length + 1)}:${index + 1}`;
        if (/#[0-9a-f]{3,8}\b|rgba?\(|hsla?\(/i.test(line)) problems.push(`${where} colour`);
        const literals = (line.match(/(?<![\w-])\d*\.?\d+(?:px|rem|ms|s)\b/g) ?? []).filter(
          (value) => Number.parseFloat(value) !== 0,
        );
        const media = line.trim().startsWith("@media");
        for (const value of literals) {
          if (
            !(
              media &&
              breakpoints.some(
                (bp) => value === bp || value === `${Number.parseFloat(bp) - 0.02}px`,
              )
            )
          ) {
            problems.push(`${where} ${value}`);
          }
        }
      });
    }
    expect(problems).toEqual([]);
  });

  test("every custom property the CSS reads is defined, and every class is ds-", () => {
    const defined = new Set(
      [...readFileSync(join(kit, "tokens.css"), "utf8").matchAll(/(--ds-[a-z0-9-]+)\s*:/g)].map(
        (m) => m[1],
      ),
    );
    const problems: string[] = [];
    for (const file of [
      ...css(join(kit, "css")),
      resolve(import.meta.dir, "../src/styles/viewer.css"),
    ]) {
      const text = readFileSync(file, "utf8")
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/url\([^)]*\)/g, "url()");
      const local = new Set([...text.matchAll(/(--_[a-z-]+)\s*:/g)].map((m) => m[1]));
      for (const [, name] of text.matchAll(/var\((--[a-z0-9_-]+)/g)) {
        if (name && !name.startsWith("--_") && !defined.has(name) && !local.has(name))
          problems.push(`${file}: ${name}`);
      }
      if (file.includes("/kit/")) {
        for (const [, name] of text.matchAll(/\.([a-z][a-z0-9_-]*)/g)) {
          if (name && !name.startsWith("ds-") && !/^\d/.test(name))
            problems.push(`${file}: .${name}`);
        }
      }
    }
    expect(problems).toEqual([]);
  });
});
