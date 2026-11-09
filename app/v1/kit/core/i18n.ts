// The words the components say themselves (the close button, a state's name
// for screen readers), in Czech and English, and the language of a page.
//
// The language follows Lazurio's rule for its own interface (decision 0142):
// an explicit choice of the person first, then the language Lazurio gives,
// then Czech. Lazurio gives the language of the person's profile in the shell
// document `/.lazurio/shell.json` (`locale`) on the origins that serve it; an
// App served without it falls back to Czech. Never mix languages on a screen.
import type { Locale, Tone } from "./types";

export const LOCALES = ["cs", "en"] as const satisfies readonly Locale[];
export const DEFAULT_LOCALE: Locale = "cs";
export const LOCALE_STORAGE_KEY = "ds-locale";

export type Messages = {
  close: string;
  dismiss: string;
  loading: string;
  optional: string;
  notifications: string;
  breadcrumbs: string;
  tone: Record<Tone, string>;
};

export const messages: Record<Locale, Messages> = {
  cs: {
    close: "Zavřít",
    dismiss: "Zavřít oznámení",
    loading: "Načítá se",
    optional: "nepovinné",
    notifications: "Oznámení",
    breadcrumbs: "Drobečková navigace",
    tone: {
      neutral: "Stav",
      accent: "Stav",
      success: "Hotovo",
      warning: "Upozornění",
      danger: "Chyba",
      info: "Informace",
    },
  },
  en: {
    close: "Close",
    dismiss: "Dismiss notification",
    loading: "Loading",
    optional: "optional",
    notifications: "Notifications",
    breadcrumbs: "Breadcrumb",
    tone: {
      neutral: "Status",
      accent: "Status",
      success: "Done",
      warning: "Warning",
      danger: "Error",
      info: "Information",
    },
  },
};

export function isLocale(value: unknown): value is Locale {
  return value === "cs" || value === "en";
}

export function messagesFor(locale: Locale | undefined): Messages {
  return messages[locale ?? DEFAULT_LOCALE];
}

/** The tag for Intl (dates, numbers, plurals) of a page's language. */
export function intlLocale(locale: Locale): string {
  return locale === "cs" ? "cs-CZ" : "en-GB";
}

/** Explicit choice, then Lazurio's language, then Czech. */
export function resolveLocale(sources: { explicit?: unknown; lazurio?: unknown }): Locale {
  if (isLocale(sources.explicit)) return sources.explicit;
  if (isLocale(sources.lazurio)) return sources.lazurio;
  return DEFAULT_LOCALE;
}

/**
 * The language Lazurio gives on this origin: `locale` of its shell document
 * (`lazurio.shell.v1`), or null where the origin does not serve it.
 */
export async function readLazurioLocale(
  fetcher: typeof fetch = fetch,
  signal?: AbortSignal,
): Promise<Locale | null> {
  try {
    const response = await fetcher("/.lazurio/shell.json", {
      credentials: "same-origin",
      headers: { accept: "application/json" },
      ...(signal ? { signal } : {}),
    });
    if (!response.ok) return null;
    const document: unknown = await response.json();
    const locale = (document as { locale?: unknown } | null)?.locale;
    return isLocale(locale) ? locale : null;
  } catch {
    return null;
  }
}
