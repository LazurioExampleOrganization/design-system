// Inputs that both renderers get in the parity test (tests/build.test.ts): the
// Astro components render them on a page built only for the test
// (src/pages/[parity].astro, DS_PARITY=1), the React components render them
// with react-dom/server, and the two outputs must be the same HTML.

export type Fixture = {
  id: string;
  component: string;
  props?: Record<string, unknown>;
  /** Props only Astro takes (`value`, `checked`). */
  astro?: Record<string, unknown>;
  /** Props only React takes (`defaultValue`, `defaultChecked`, `open`). */
  react?: Record<string, unknown>;
  /** The default slot / children, as text. */
  text?: string;
  /** Named slots in Astro; footer, actions and tab panels as props in React. */
  slots?: Record<string, string>;
};

const currencies = [
  { value: "czk", label: "CZK" },
  { value: "eur", label: "EUR", disabled: true },
];

const items = [
  { href: "/a/", label: "Přehled", icon: "home-simple", current: true, badge: "3" },
  { href: "/b/", label: "Faktury" },
];

export const FIXTURES: Fixture[] = [
  { id: "icon", component: "Icon", props: { name: "check" } },
  { id: "icon-label", component: "Icon", props: { name: "bell", size: "lg", label: "Upozornění" } },
  { id: "logo", component: "Logo" },
  { id: "logo-symbol", component: "Logo", props: { wordmark: false, size: "sm" } },
  { id: "logo-link", component: "Logo", props: { href: "/", size: "lg" } },
  { id: "button-primary", component: "Button", props: { variant: "primary" }, text: "Uložit" },
  { id: "button-icon", component: "Button", props: { icon: "plus", size: "sm" }, text: "Přidat" },
  {
    id: "button-icon-only",
    component: "Button",
    props: { variant: "quiet", icon: "edit-pencil", iconOnly: true, label: "Upravit" },
  },
  {
    id: "button-busy",
    component: "Button",
    props: { variant: "primary", busy: true, locale: "en" },
    text: "Saving",
  },
  {
    id: "button-link",
    component: "Button",
    props: { href: "/x/", iconEnd: "arrow-right" },
    text: "Otevřít",
  },
  {
    id: "button-link-disabled",
    component: "Button",
    props: { href: "/x/", disabled: true },
    text: "Otevřít",
  },
  {
    id: "button-disabled",
    component: "Button",
    props: { disabled: true, type: "submit", size: "lg" },
    text: "Odeslat",
  },
  {
    id: "text-field",
    component: "TextField",
    props: { id: "f1", label: "Firma", hint: "Jak ve smlouvě.", optional: true, name: "company" },
    astro: { value: "Example s.r.o." },
    react: { defaultValue: "Example s.r.o." },
  },
  {
    id: "text-field-error",
    component: "TextField",
    props: {
      id: "f2",
      label: "E-mail",
      type: "email",
      error: "Doplňte e-mail.",
      required: true,
      locale: "en",
    },
  },
  {
    id: "text-area",
    component: "TextArea",
    props: { id: "f3", label: "Poznámka", rows: 3, hint: "Pro zákazníka." },
    astro: { value: "Text <i>" },
    react: { defaultValue: "Text <i>" },
  },
  {
    id: "select",
    component: "Select",
    props: { id: "f4", label: "Měna", options: currencies, placeholder: "Vyberte" },
  },
  {
    id: "select-value",
    component: "Select",
    props: { id: "f5", label: "Měna", options: currencies, error: "Vyberte měnu." },
    astro: { value: "czk" },
    react: { defaultValue: "czk" },
  },
  {
    id: "checkbox",
    component: "Checkbox",
    props: { id: "f6", label: "Souhlasím", hint: "Nutné.", error: "Zaškrtněte." },
    astro: { checked: true },
    react: { defaultChecked: true },
  },
  {
    id: "switch",
    component: "Switch",
    props: { id: "f7", label: "Připomínat", disabled: true },
    astro: { checked: true },
    react: { defaultChecked: true },
  },
  {
    id: "radio-group",
    component: "RadioGroup",
    props: {
      name: "pay",
      legend: "Platba",
      options: currencies,
      hint: "Jak zaplatíte.",
      required: true,
    },
    astro: { value: "czk" },
    react: { defaultValue: "czk" },
  },
  {
    id: "table",
    component: "Table",
    props: { id: "t1", caption: "Faktury", density: "compact", interactive: true },
  },
  {
    id: "table-hidden",
    component: "Table",
    props: { id: "t2", caption: "Faktury", hideCaption: true },
  },
  {
    id: "card",
    component: "Card",
    props: { title: "Nabídka", description: "Popis", headingLevel: 2 },
    text: "Obsah",
    slots: { footer: "Akce" },
  },
  { id: "card-muted", component: "Card", props: { tone: "muted", title: "Tip" } },
  {
    id: "card-link",
    component: "Card",
    props: { href: "/x/", title: "Ceník", description: "Ceny" },
  },
  {
    id: "dialog",
    component: "Dialog",
    props: {
      id: "d1",
      title: "Smazat?",
      description: "Nejde vrátit.",
      size: "sm",
      dismissable: true,
      locale: "en",
    },
    react: { open: false },
    text: "Tělo",
    slots: { footer: "Patička" },
  },
  {
    id: "dialog-plain",
    component: "Dialog",
    props: { id: "d2", title: "Přejmenovat" },
    react: { open: false },
    text: "Tělo",
  },
  { id: "nav", component: "Nav", props: { label: "Hlavní", items } },
  {
    id: "nav-title",
    component: "Nav",
    props: { id: "n2", title: "Prodej", orientation: "horizontal", items },
  },
  {
    id: "breadcrumbs",
    component: "Breadcrumbs",
    props: {
      items: [{ label: "Example", href: "/" }, { label: "Bez odkazu" }, { label: "Faktura" }],
      locale: "en",
    },
  },
  {
    id: "tabs",
    component: "Tabs",
    props: {
      label: "Části",
      items: [
        { id: "tab-a", label: "A" },
        { id: "tab-b", label: "B", badge: "2" },
      ],
      selected: "tab-b",
    },
    slots: { "tab-a": "Panel A", "tab-b": "Panel B" },
  },
  { id: "badge", component: "Badge", props: { tone: "success" }, text: "Zaplaceno" },
  { id: "badge-neutral", component: "Badge", text: "Koncept" },
  {
    id: "badge-no-icon",
    component: "Badge",
    props: { tone: "warning", icon: false },
    text: "Pozor",
  },
  { id: "badge-icon", component: "Badge", props: { tone: "accent", icon: "bell" }, text: "Nové" },
  { id: "tag", component: "Tag", text: "FV-2026-0142" },
  {
    id: "alert",
    component: "Alert",
    props: { tone: "warning", title: "Po splatnosti", live: "polite" },
    text: "Pošlete připomínku.",
    slots: { actions: "Akce" },
  },
  {
    id: "alert-no-title",
    component: "Alert",
    props: { tone: "danger", locale: "en", live: "assertive" },
    text: "Failed.",
  },
  { id: "alert-title-only", component: "Alert", props: { title: "Informace" } },
  {
    id: "toast",
    component: "Toast",
    props: { tone: "success", title: "Uloženo", body: "Najdete ho v Nabídkách." },
  },
  { id: "toast-neutral", component: "Toast", props: { title: "Hotovo" } },
  {
    id: "toast-escape",
    component: "Toast",
    props: { tone: "danger", title: "Chyba <b>\"x\"</b> & 'y'", locale: "en" },
  },
  { id: "toast-region", component: "ToastRegion", props: { locale: "en" } },
  {
    id: "empty",
    component: "EmptyState",
    props: { title: "Zatím nic", illustration: "empty" },
    text: "Vytvořte první.",
    slots: { actions: "Akce" },
  },
  {
    id: "empty-icon",
    component: "EmptyState",
    props: { title: "Nic nenalezeno", icon: "search", headingLevel: 3 },
  },
];
