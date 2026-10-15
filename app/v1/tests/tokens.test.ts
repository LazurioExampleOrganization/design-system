import { describe, expect, test } from "bun:test";
import { parseTokens, tokens } from "../src/tokens";

describe("design tokens", () => {
  test("the committed tokens name the Organization and declare colours", () => {
    expect(tokens.name.length).toBeGreaterThan(0);
    expect(Object.keys(tokens.colors).length).toBeGreaterThan(0);
  });

  test("rejects a colour that is not #rrggbb", () => {
    expect(() =>
      parseTokens({
        name: "x",
        status: "draft",
        source: "BASELINE.md",
        colors: { accent: "blue" },
      }),
    ).toThrow("tokens.colors.accent");
  });

  test("rejects tokens without colours", () => {
    expect(() =>
      parseTokens({ name: "x", status: "draft", source: "BASELINE.md", tokens: {} }),
    ).toThrow("tokens.colors");
  });
});
