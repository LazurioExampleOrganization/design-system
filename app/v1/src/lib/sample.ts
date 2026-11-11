// Invented sample data of the invented company Example, in both languages.
import type { Tone } from "../../kit/core/types";
import type { Locale } from "./site";

export type Invoice = {
  number: string;
  customer: string;
  due: string;
  amount: number;
  state: "paid" | "due" | "overdue" | "draft";
};

export const INVOICES: Invoice[] = [
  {
    number: "2026-0142",
    customer: "Pekárna U Mlýna",
    due: "2026-11-02",
    amount: 18450,
    state: "overdue",
  },
  { number: "2026-0143", customer: "Studio Lípa", due: "2026-11-14", amount: 42900, state: "due" },
  {
    number: "2026-0144",
    customer: "Truhlářství Novák",
    due: "2026-11-20",
    amount: 7260,
    state: "paid",
  },
  {
    number: "2026-0145",
    customer: "Vinařství Na Kopci",
    due: "2026-11-28",
    amount: 125000,
    state: "due",
  },
  {
    number: "2026-0146",
    customer: "Kavárna Rohová",
    due: "2026-12-01",
    amount: 3980,
    state: "draft",
  },
];

export const STATE: Record<Invoice["state"], { tone: Tone; label: Record<Locale, string> }> = {
  paid: { tone: "success", label: { cs: "Zaplaceno", en: "Paid" } },
  due: { tone: "info", label: { cs: "Čeká na platbu", en: "Awaiting payment" } },
  overdue: { tone: "warning", label: { cs: "Po splatnosti", en: "Overdue" } },
  draft: { tone: "neutral", label: { cs: "Koncept", en: "Draft" } },
};

const intl = (locale: Locale) => (locale === "cs" ? "cs-CZ" : "en-GB");

export function money(amount: number, locale: Locale): string {
  return new Intl.NumberFormat(intl(locale), {
    style: "currency",
    currency: "CZK",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function date(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(intl(locale), {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${iso}T12:00:00Z`));
}
