import { describe, expect, test } from "bun:test";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import manifest from "../kit/manifest.json";
import packageJson from "../package.json";

// The template contract of the Marketplace of Lazurio: what the repository
// carries so that another Organization can adopt it (docs/adoption.md) and
// take its later releases by merge (docs/extending.md).
const root = resolve(import.meta.dir, "../../..");
const read = (path: string) => readFileSync(join(root, path), "utf8");

// Width and height of a WebP image from its header (VP8, VP8L or VP8X).
function webpSize(bytes: Uint8Array): { width: number; height: number } {
  const ascii = (from: number, to: number) => String.fromCharCode(...bytes.subarray(from, to));
  if (ascii(0, 4) !== "RIFF" || ascii(8, 12) !== "WEBP") throw new Error("not a WebP file");
  const chunk = ascii(12, 16);
  const at = (i: number) => bytes[i] ?? 0;
  if (chunk === "VP8X") {
    return {
      width: 1 + (at(24) | (at(25) << 8) | (at(26) << 16)),
      height: 1 + (at(27) | (at(28) << 8) | (at(29) << 16)),
    };
  }
  if (chunk === "VP8 ") {
    return { width: (at(26) | (at(27) << 8)) & 0x3fff, height: (at(28) | (at(29) << 8)) & 0x3fff };
  }
  if (chunk === "VP8L") {
    const bits = at(21) | (at(22) << 8) | (at(23) << 16) | (at(24) << 24);
    return { width: 1 + (bits & 0x3fff), height: 1 + ((bits >>> 14) & 0x3fff) };
  }
  throw new Error(`unknown WebP chunk ${chunk}`);
}

describe("template contract", () => {
  test("carries its license, notice and documents", () => {
    for (const path of [
      "LICENSE",
      "NOTICE",
      "README.md",
      "AGENTS.md",
      "CHANGELOG.md",
      "docs/adoption.md",
      "docs/extending.md",
      "ARCHITECTURE.md",
      "DESIGN.md",
      "brand/README.md",
    ]) {
      expect(existsSync(join(root, path)) && read(path).trim().length > 0, path).toBe(true);
    }
    expect(read("LICENSE")).toStartWith("MIT License");
  });

  test("pins Bun and every dependency exactly", () => {
    expect(packageJson.packageManager).toMatch(/^bun@\d+\.\d+\.\d+$/);
    const ranges = Object.entries({
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    }).filter(
      ([, version]) => !/^(?:\d+\.\d+\.\d+|github:[\w.-]+\/[\w.-]+#v\d+\.\d+\.\d+)$/.test(version),
    );
    expect(ranges).toEqual([]);
  });

  test("CI runs the pinned Bun and the one check", () => {
    const bun = packageJson.packageManager.replace("bun@", "");
    const workflow = read(".github/workflows/check.yml");
    expect(workflow).toContain(`bun-version: ${bun}`);
    expect(workflow).toContain(`test "$(bun --version)" = "${bun}"`);
    expect(workflow).toContain("run: bun run check");
  });

  test("the changelog and the kit's manifest carry the App's version", () => {
    expect(read("CHANGELOG.md")).toContain(`## ${packageJson.version}`);
    expect(manifest.version).toBe(packageJson.version);
  });

  test("the Marketplace screens are the same WebP shots in Czech and English, 1600 px wide", () => {
    const shots = (locale: string) =>
      readdirSync(join(root, "docs/screenshots", locale))
        .filter((name) => !name.startsWith("."))
        .sort();
    expect(shots("cs").length).toBeGreaterThan(0);
    expect(shots("en")).toEqual(shots("cs"));
    for (const locale of ["cs", "en"]) {
      for (const name of shots(locale)) {
        expect(name).toEndWith(".webp");
        const size = webpSize(readFileSync(join(root, "docs/screenshots", locale, name)));
        expect(size.width, `${locale}/${name}`).toBe(1600);
      }
    }
  });

  test("the identity of the Organization is placeholders", () => {
    const module = JSON.parse(read("lazurio.module.json"));
    expect(module.company).toBe("REPLACE-WITH-ORG-NAME");
    expect(packageJson.lazurio.runtime.company).toBe("REPLACE-WITH-ORG-NAME");
    expect(packageJson.lazurio.runtime.id).toStartWith("replace-with-org-slug-");
  });

  test("AGENTS.md, adoption.md and extending.md state the same merge rule", () => {
    const rule = (path: string) => {
      const quote = read(path)
        .split("\n")
        .filter((line) => line.startsWith(">"))
        .map((line) => line.replace(/^>\s?/, ""))
        .join(" ")
        .replace(/\s+/g, " ")
        .trim();
      expect(quote, path).toStartWith("When a merge of a release conflicts");
      return quote;
    };
    const agents = rule("AGENTS.md");
    expect(rule("docs/adoption.md")).toBe(agents);
    expect(rule("docs/extending.md")).toBe(agents);
  });

  test("the vendored design skill carries its licence, notice and source", () => {
    for (const dir of [".agents/skills/impeccable", ".claude/skills/impeccable"]) {
      expect(read(`${dir}/LICENSE`)).toContain("Apache License");
      expect(existsSync(join(root, dir, "NOTICE.md")), dir).toBe(true);
      const vendor = JSON.parse(read(`${dir}/VENDOR.json`));
      expect(vendor.license).toBe("Apache-2.0");
      expect(vendor.commit).toMatch(/^[0-9a-f]{40}$/);
      expect(read("NOTICE")).toContain(vendor.commit);
    }
    expect(read(".claude/skills/design-system/SKILL.md")).toBe(
      read(".agents/skills/design-system/SKILL.md"),
    );
  });
});
