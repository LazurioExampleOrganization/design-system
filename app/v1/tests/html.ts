// A canonical form of HTML for comparing two renderers: element by element
// with sorted attributes, text trimmed and decoded, scripts dropped. Bun's
// HTMLRewriter tokenizes it, so no DOM is needed.

const ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
};

export function decode(value: string): string {
  return value.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, code: string) => {
    if (code.startsWith("#x") || code.startsWith("#X"))
      return String.fromCodePoint(Number.parseInt(code.slice(2), 16));
    if (code.startsWith("#")) return String.fromCodePoint(Number.parseInt(code.slice(1), 10));
    return ENTITIES[code.toLowerCase()] ?? match;
  });
}

export async function canonical(html: string): Promise<string[]> {
  const tokens: string[] = [];
  let text = "";
  const flush = () => {
    const value = decode(text).replace(/\s+/g, " ").trim();
    if (value) tokens.push(`#${value}`);
    text = "";
  };
  const markup = html.replace(/<script\b[\s\S]*?<\/script>/g, "");
  await new HTMLRewriter()
    .on("*", {
      element(element) {
        flush();
        const attributes = [...element.attributes]
          .map(([name, value]) => {
            let clean = decode(value);
            if (name === "style") clean = clean.replace(/\s*([:;])\s*/g, "$1").replace(/;$/, "");
            return `${name}=${JSON.stringify(clean)}`;
          })
          .sort();
        tokens.push(`<${element.tagName} ${attributes.join(" ")}>`);
        if (!element.selfClosing && element.canHaveContent) {
          element.onEndTag((end) => {
            flush();
            tokens.push(`</${end.name}>`);
          });
        }
      },
      text(chunk) {
        text += chunk.text;
      },
    })
    .transform(new Response(markup))
    .text();
  flush();
  return tokens;
}
