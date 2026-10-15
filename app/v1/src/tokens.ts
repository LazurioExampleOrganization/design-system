import raw from "../../../content/brand/colors/tokens.json";

// The design tokens the viewer renders. content/brand/colors/tokens.json is
// the source of truth; the viewer only reads it.
export type DesignTokens = {
  name: string;
  status: string;
  source: string;
  colors: Record<string, string>;
};

const HEX_COLOR = /^#[0-9a-f]{6}$/i;

export function parseTokens(value: unknown): DesignTokens {
  if (typeof value !== "object" || value === null) throw new Error("tokens must be an object");
  const { name, status, source, colors } = value as Record<string, unknown>;
  for (const [field, text] of Object.entries({ name, status, source })) {
    if (typeof text !== "string" || text.length === 0) {
      throw new Error(`tokens.${field} must be a non-empty string`);
    }
  }
  if (typeof colors !== "object" || colors === null || Array.isArray(colors)) {
    throw new Error("tokens.colors must be an object of named colours");
  }
  const entries = Object.entries(colors);
  for (const [colour, hex] of entries) {
    if (typeof hex !== "string" || !HEX_COLOR.test(hex)) {
      throw new Error(`tokens.colors.${colour} must be a #rrggbb colour`);
    }
  }
  return {
    name: name as string,
    status: status as string,
    source: source as string,
    colors: Object.fromEntries(entries) as Record<string, string>,
  };
}

export const tokens = parseTokens(raw);
