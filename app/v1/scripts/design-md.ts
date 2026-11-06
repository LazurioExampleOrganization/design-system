// DESIGN.md for agents (Impeccable and other DESIGN.md readers), in the
// DESIGN.md format (https://github.com/google-labs-code/design.md): YAML front
// matter with the tokens, then the prose. The values come only from the token
// sources; the prose from tokens/design.md (the system, the template's) and
// brand/design.md (the brand, the Organization's).
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Resolved } from "./token-source";
import { ROOT } from "./token-source";

type Yaml = string | number | { [key: string]: Yaml };

function yaml(value: { [key: string]: Yaml }, indent = ""): string {
  return Object.entries(value)
    .map(([key, item]) =>
      typeof item === "object"
        ? `${indent}${key}:\n${yaml(item, `${indent}  `)}`
        : `${indent}${key}: ${typeof item === "number" ? item : JSON.stringify(item)}`,
    )
    .join("\n");
}

export function designMd(tokens: Resolved): string {
  const { brand, system } = tokens;
  const colors: Record<string, string> = {};
  for (const [role, value] of Object.entries(tokens.colors.light)) colors[role] = value;
  for (const [role, value] of Object.entries(tokens.colors.dark)) colors[`dark-${role}`] = value;
  for (const [ramp, steps] of Object.entries(brand.palette)) {
    for (const [step, value] of Object.entries(steps)) colors[`${ramp}-${step}`] = value;
  }
  const family = (role: "text" | "heading" | "mono") =>
    [brand.fonts[role].family, ...brand.fonts[role].fallback].join(", ");
  const typography: Record<string, Yaml> = {};
  for (const [name, role] of Object.entries(system.type)) {
    typography[name] = {
      fontFamily: family(role.font),
      fontSize: role.size,
      fontWeight: Number(role.weight),
      lineHeight: Number(role.leading),
      ...(role.tracking === "0" ? {} : { letterSpacing: role.tracking }),
    };
  }
  const space = (key: string) => system.space[key] ?? "0px";
  const control = system.size["control-md"] ?? "40px";
  const pill = "{rounded.pill}";
  const components: Record<string, Yaml> = {
    "button-primary": {
      backgroundColor: "{colors.action}",
      textColor: "{colors.on-action}",
      typography: "{typography.label}",
      rounded: pill,
      padding: `0 ${space("20")}`,
      height: control,
    },
    "button-primary-hover": {
      backgroundColor: "{colors.action-hover}",
      textColor: "{colors.on-action}",
    },
    "button-secondary": {
      backgroundColor: "{colors.surface}",
      textColor: "{colors.ink}",
      typography: "{typography.label}",
      rounded: pill,
      padding: `0 ${space("20")}`,
      height: control,
    },
    "button-secondary-hover": {
      backgroundColor: "{colors.surface-hover}",
      textColor: "{colors.ink}",
    },
    "button-soft": {
      backgroundColor: "{colors.surface-muted}",
      textColor: "{colors.ink}",
      rounded: pill,
      height: control,
    },
    "button-danger": {
      backgroundColor: "{colors.danger-solid}",
      textColor: "{colors.on-danger}",
      rounded: pill,
      height: control,
    },
    input: {
      backgroundColor: "{colors.surface}",
      textColor: "{colors.ink}",
      typography: "{typography.body}",
      rounded: pill,
      padding: `0 ${space("16")}`,
      height: control,
    },
    textarea: {
      backgroundColor: "{colors.surface}",
      textColor: "{colors.ink}",
      typography: "{typography.body}",
      rounded: "{rounded.md}",
      padding: `${space("8")} ${space("16")}`,
    },
    card: {
      backgroundColor: "{colors.surface}",
      textColor: "{colors.ink}",
      rounded: "{rounded.md}",
      padding: space("24"),
    },
    dialog: {
      backgroundColor: "{colors.surface-raised}",
      textColor: "{colors.ink}",
      rounded: "{rounded.md}",
      padding: space("24"),
    },
    "nav-item-current": {
      backgroundColor: "{colors.surface-selected}",
      textColor: "{colors.ink}",
      rounded: "{rounded.sm}",
    },
    "tab-selected": { textColor: "{colors.ink}", typography: "{typography.label}" },
    badge: {
      backgroundColor: "{colors.surface-muted}",
      textColor: "{colors.ink-muted}",
      typography: "{typography.status}",
      rounded: pill,
      padding: `${space("2")} ${space("8")}`,
    },
    "badge-success": { backgroundColor: "{colors.success-soft}", textColor: "{colors.success}" },
    "badge-warning": { backgroundColor: "{colors.warning-soft}", textColor: "{colors.warning}" },
    "badge-danger": { backgroundColor: "{colors.danger-soft}", textColor: "{colors.danger}" },
    "badge-info": { backgroundColor: "{colors.info-soft}", textColor: "{colors.info}" },
    tag: {
      backgroundColor: "{colors.surface-muted}",
      textColor: "{colors.ink}",
      typography: "{typography.status}",
      rounded: "{rounded.xs}",
    },
    alert: {
      backgroundColor: "{colors.surface}",
      textColor: "{colors.ink}",
      rounded: "{rounded.md}",
      padding: space("16"),
    },
    toast: {
      backgroundColor: "{colors.surface-raised}",
      textColor: "{colors.ink}",
      rounded: "{rounded.md}",
      padding: space("16"),
    },
  };
  const frontmatter = {
    version: "alpha",
    name: brand.name,
    description: brand.summary.en,
    colors,
    typography,
    rounded: { ...brand.radius },
    spacing: { ...system.space },
    components,
  };
  const read = (path: string) => readFileSync(join(ROOT, path), "utf8").trim();
  const prose = read("tokens/design.md").replace("{{brand}}", read("brand/design.md"));
  return [
    "---",
    yaml(frontmatter),
    "---",
    "",
    "<!-- Generated by app/v1/scripts/tokens.ts from brand/brand.json, tokens/tokens.json, tokens/design.md and brand/design.md. Do not edit by hand: change a source and run `bun run tokens`. -->",
    "",
    prose,
    "",
  ].join("\n");
}
