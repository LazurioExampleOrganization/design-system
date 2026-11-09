// Reads the two sources of the design system and resolves them: the
// Organization's brand (`brand/brand.json`: name, palette, fonts, radius, logo)
// and the system tokens of the template (`tokens/tokens.json`: colour roles for
// both themes, type, space, shadow, motion, sizes). Everything else is
// generated from these two files by `scripts/tokens.ts`.
import { readFileSync } from "node:fs";
import { join, resolve } from "node:path";

export const ROOT = resolve(import.meta.dir, "../../..");
export const THEMES = ["light", "dark"] as const;
export type Theme = (typeof THEMES)[number];
export const LOCALES = ["cs", "en"] as const;

type Ramp = Record<string, string>;
export type FontFile = { file: string; subset: "latin" | "latin-ext" };
export type FontRole = { family: string; fallback: string[]; weight: string; files: FontFile[] };

export type Brand = {
  schema: "design-system.brand.v1";
  name: string;
  summary: Record<(typeof LOCALES)[number], string>;
  repository: string;
  palette: Record<string, Ramp>;
  fonts: Record<"text" | "heading" | "mono", FontRole>;
  radius: Record<"xs" | "sm" | "md" | "lg" | "pill", string>;
  logo: { symbol: string };
  illustrations: Record<string, string>;
  roles: Record<Theme, Record<string, string>>;
};

type Words = Record<(typeof LOCALES)[number], string>;
type ThemedRole = { light: string; dark: string; use: Words };
export type TypeRole = {
  font: "text" | "heading" | "mono";
  size: string;
  leading: string;
  weight: string;
  tracking: string;
};

export type SystemTokens = {
  schema: "design-system.tokens.v1";
  prefix: string;
  color: Record<string, ThemedRole>;
  contrast: { text: [string, string][]; graphic: [string, string][] };
  type: Record<string, TypeRole>;
  space: Record<string, string>;
  shadow: Record<string, ThemedRole>;
  motion: { duration: Record<string, string>; ease: Record<string, string> };
  size: Record<string, string>;
  z: Record<string, string>;
  breakpoint: Record<string, string>;
};

export type Resolved = {
  brand: Brand;
  system: SystemTokens;
  /** Every role in both themes as a hex colour. */
  colors: Record<Theme, Record<string, string>>;
  /** Where each role's colour comes from: `ramp.step` or a literal colour. */
  sources: Record<Theme, Record<string, string>>;
};

const HEX = /^#[0-9a-f]{6}$/;
const LENGTH = /^-?\d+(?:\.\d+)?(?:px|em|ch|ms)$|^0$|^clamp\(.+\)$/;

function fail(message: string): never {
  throw new Error(`design system tokens: ${message}`);
}

function readJson(path: string): unknown {
  return JSON.parse(readFileSync(join(ROOT, path), "utf8"));
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function strings(value: unknown, where: string): Record<string, string> {
  if (!isRecord(value)) fail(`${where} is not an object`);
  for (const [key, item] of Object.entries(value)) {
    if (typeof item !== "string") fail(`${where}.${key} is not a string`);
  }
  return value as Record<string, string>;
}

export function checkBrand(input: unknown): Brand {
  if (!isRecord(input) || input.schema !== "design-system.brand.v1") {
    fail("brand/brand.json: schema is not design-system.brand.v1");
  }
  if (typeof input.name !== "string" || input.name.trim() === "") fail("brand: name is empty");
  const summary = strings(input.summary, "brand.summary");
  for (const locale of LOCALES) if (!summary[locale]) fail(`brand.summary.${locale} is missing`);
  if (typeof input.repository !== "string" || !input.repository.startsWith("https://")) {
    fail("brand.repository is not an https URL");
  }
  if (!isRecord(input.palette)) fail("brand.palette is not an object");
  for (const [ramp, steps] of Object.entries(input.palette)) {
    if (!/^[a-z]+$/.test(ramp))
      fail(`brand.palette.${ramp}: a ramp is named in lower-case letters`);
    for (const [step, value] of Object.entries(strings(steps, `brand.palette.${ramp}`))) {
      if (!/^\d+$/.test(step)) fail(`brand.palette.${ramp}.${step}: a step is a number`);
      if (!HEX.test(value)) fail(`brand.palette.${ramp}.${step}: ${value} is not #rrggbb`);
    }
  }
  if (!isRecord(input.fonts)) fail("brand.fonts is not an object");
  for (const role of ["text", "heading", "mono"] as const) {
    const font = input.fonts[role];
    if (!isRecord(font) || typeof font.family !== "string" || !Array.isArray(font.fallback)) {
      fail(`brand.fonts.${role} needs family and fallback`);
    }
    if (!Array.isArray(font.files)) fail(`brand.fonts.${role}.files is not a list`);
    for (const file of font.files) {
      if (!isRecord(file) || typeof file.file !== "string" || !/\.woff2$/.test(file.file)) {
        fail(`brand.fonts.${role}: every file is a .woff2 path`);
      }
      if (file.subset !== "latin" && file.subset !== "latin-ext") {
        fail(`brand.fonts.${role}: subset is latin or latin-ext`);
      }
    }
  }
  const radius = strings(input.radius, "brand.radius");
  for (const key of ["xs", "sm", "md", "lg", "pill"]) {
    if (!radius[key] || !LENGTH.test(radius[key])) fail(`brand.radius.${key} is not a length`);
  }
  if (!isRecord(input.logo) || typeof input.logo.symbol !== "string") fail("brand.logo.symbol");
  strings(input.illustrations, "brand.illustrations");
  if (!isRecord(input.roles)) fail("brand.roles is not an object");
  for (const theme of THEMES) strings(input.roles[theme], `brand.roles.${theme}`);
  return input as Brand;
}

export function checkSystem(input: unknown): SystemTokens {
  if (!isRecord(input) || input.schema !== "design-system.tokens.v1") {
    fail("tokens/tokens.json: schema is not design-system.tokens.v1");
  }
  if (input.prefix !== "ds") fail("tokens.prefix is ds");
  if (!isRecord(input.color)) fail("tokens.color is not an object");
  for (const [role, value] of Object.entries(input.color)) {
    if (!/^[a-z]+(?:-[a-z]+)*$/.test(role)) fail(`tokens.color.${role}: role names are kebab-case`);
    if (!isRecord(value) || typeof value.light !== "string" || typeof value.dark !== "string") {
      fail(`tokens.color.${role} needs light and dark`);
    }
    const use = strings(value.use, `tokens.color.${role}.use`);
    for (const locale of LOCALES)
      if (!use[locale]) fail(`tokens.color.${role}.use.${locale} is missing`);
  }
  for (const group of ["space", "size", "z", "breakpoint"])
    strings(input[group], `tokens.${group}`);
  if (!isRecord(input.motion)) fail("tokens.motion");
  strings(input.motion.duration, "tokens.motion.duration");
  strings(input.motion.ease, "tokens.motion.ease");
  if (!isRecord(input.type)) fail("tokens.type");
  for (const [name, role] of Object.entries(input.type)) {
    const value = strings(role, `tokens.type.${name}`);
    if (!["text", "heading", "mono"].includes(value.font ?? "")) fail(`tokens.type.${name}.font`);
  }
  return input as SystemTokens;
}

/** A role's colour in a theme: `ramp.step` from the brand palette, or #rrggbb. */
function colourOf(brand: Brand, reference: string, where: string): string {
  if (HEX.test(reference)) return reference;
  const [ramp = "", step = ""] = reference.split(".");
  const value = brand.palette[ramp]?.[step];
  if (!value) fail(`${where}: ${reference} is not in brand.palette`);
  return value;
}

export function resolveTokens(brand: Brand, system: SystemTokens): Resolved {
  const colors = { light: {}, dark: {} } as Resolved["colors"];
  const sources = { light: {}, dark: {} } as Resolved["sources"];
  for (const theme of THEMES) {
    for (const role of Object.keys(brand.roles[theme])) {
      if (!system.color[role]) fail(`brand.roles.${theme}.${role} is not a role of tokens.color`);
    }
    for (const [role, value] of Object.entries(system.color)) {
      const reference = brand.roles[theme][role] ?? value[theme];
      sources[theme][role] = reference;
      colors[theme][role] = colourOf(brand, reference, `${theme}.${role}`);
    }
  }
  for (const pair of [...system.contrast.text, ...system.contrast.graphic]) {
    for (const role of pair) if (!system.color[role]) fail(`tokens.contrast names ${role}`);
  }
  return { brand, system, colors, sources };
}

export function loadTokens(): Resolved {
  return resolveTokens(
    checkBrand(readJson("brand/brand.json")),
    checkSystem(readJson("tokens/tokens.json")),
  );
}
