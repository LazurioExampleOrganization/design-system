// The pages of the viewer, their groups and the viewer's own words, in both
// languages. Czech is at `/`, English at `/en/`; a page has the same slug in
// both.
import { DEFAULT_LOCALE, LOCALES } from "../../kit/core/i18n";
import type { Locale } from "../../kit/core/types";

export type { Locale };
export { LOCALES };

type Words = Record<Locale, string>;

export type GroupId = "start" | "guidelines" | "foundations" | "components" | "examples";

export const GROUPS: { id: GroupId; label: Words }[] = [
  { id: "start", label: { cs: "Začínáme", en: "Start" } },
  { id: "guidelines", label: { cs: "Zásady", en: "Guidelines" } },
  { id: "foundations", label: { cs: "Základy", en: "Foundations" } },
  { id: "components", label: { cs: "Komponenty", en: "Components" } },
  { id: "examples", label: { cs: "Ukázky", en: "Examples" } },
];

export type Page = {
  slug: string;
  group: GroupId;
  label: Words;
  /** Where its text lives: the template's content/ or the brand's brand/content/. */
  text: "docs" | "brand";
};

const page = (
  slug: string,
  group: GroupId,
  cs: string,
  en: string,
  text: Page["text"] = "docs",
): Page => ({
  slug,
  group,
  label: { cs, en },
  text,
});

export const PAGES: Page[] = [
  page("", "start", "Přehled", "Overview"),
  page("brand", "start", "Značka", "Brand", "brand"),
  page("using", "start", "Použití v modulech", "Using it in modules"),
  page("principles", "guidelines", "Principy", "Principles"),
  page("voice", "guidelines", "Hlas a texty", "Voice and writing"),
  page("accessibility", "guidelines", "Přístupnost", "Accessibility"),
  page("when-to-use", "guidelines", "Kdy co použít", "When to use what"),
  page("foundations/colors", "foundations", "Barvy", "Colour"),
  page("foundations/typography", "foundations", "Typografie", "Typography"),
  page("foundations/spacing", "foundations", "Rozestupy a tvary", "Space and shape"),
  page("foundations/motion", "foundations", "Pohyb", "Motion"),
  page("foundations/icons", "foundations", "Ikony", "Icons"),
  page("foundations/illustrations", "foundations", "Ilustrace", "Illustrations"),
  page("components", "components", "Všechny komponenty", "All components"),
  page("components/button", "components", "Tlačítko", "Button"),
  page("components/form", "components", "Formulářové prvky", "Form fields"),
  page("components/table", "components", "Tabulka", "Table"),
  page("components/card", "components", "Karta", "Card"),
  page("components/dialog", "components", "Dialog", "Dialog"),
  page("components/navigation", "components", "Navigace", "Navigation"),
  page("components/tabs", "components", "Záložky", "Tabs"),
  page("components/badge", "components", "Odznak a štítek", "Badge and tag"),
  page("components/alert", "components", "Upozornění", "Alert"),
  page("components/toast", "components", "Oznámení", "Toast"),
  page("components/empty-state", "components", "Prázdný stav", "Empty state"),
  page("examples/app", "examples", "Obrazovka aplikace", "An App screen"),
];

export const COMPONENT_PAGES = PAGES.filter((p) => p.slug.startsWith("components/"));

/** The address of a page in a language. */
export function href(locale: Locale, slug: string): string {
  const prefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`;
  return slug === "" ? `${prefix}/` : `${prefix}/${slug}/`;
}

export const WORDS = {
  skip: { cs: "Přeskočit na obsah", en: "Skip to content" },
  product: { cs: "Design system", en: "Design system" },
  menu: { cs: "Menu", en: "Menu" },
  navigation: { cs: "Stránky design systému", en: "Pages of the design system" },
  language: { cs: "Jazyk", en: "Language" },
  theme: { cs: "Režim", en: "Theme" },
  light: { cs: "Světlý", en: "Light" },
  dark: { cs: "Tmavý", en: "Dark" },
  system: { cs: "Podle zařízení", en: "Device" },
  example: { cs: "Ukázka", en: "Example" },
  states: { cs: "Stavy", en: "States" },
  do: { cs: "Dělejte", en: "Do" },
  dont: { cs: "Nedělejte", en: "Don't" },
  code: { cs: "Kód", en: "Code" },
  codeLabel: { cs: "Kód komponenty", en: "Component code" },
  source: { cs: "Zdroj stránky", en: "Source of this page" },
  inLight: { cs: "Ve světlém režimu", en: "In the light theme" },
  inDark: { cs: "V tmavém režimu", en: "In the dark theme" },
  notFound: { cs: "Stránka neexistuje", en: "Page not found" },
  notFoundText: {
    cs: "Tato adresa v design systému není. Pokračujte přehledem.",
    en: "This address is not part of the design system. Continue from the overview.",
  },
  backHome: { cs: "Na přehled", en: "To the overview" },
} satisfies Record<string, Words>;

export function word(key: keyof typeof WORDS, locale: Locale): string {
  return WORDS[key][locale];
}
