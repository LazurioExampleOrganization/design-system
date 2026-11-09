// Light, dark or the device's choice. The choice is an attribute on <html>
// (`data-theme`), so tokens.css switches every colour role at once; without
// it the page follows `prefers-color-scheme`.

export type ThemeChoice = "light" | "dark" | "system";
export const THEME_STORAGE_KEY = "ds-theme";

export function isThemeChoice(value: unknown): value is ThemeChoice {
  return value === "light" || value === "dark" || value === "system";
}

export function storedTheme(storage: Pick<Storage, "getItem"> | null = safeStorage()): ThemeChoice {
  const value = storage?.getItem(THEME_STORAGE_KEY);
  return isThemeChoice(value) ? value : "system";
}

export function applyTheme(
  choice: ThemeChoice,
  root: HTMLElement = document.documentElement,
): void {
  if (choice === "system") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", choice);
  try {
    if (choice === "system") localStorage.removeItem(THEME_STORAGE_KEY);
    else localStorage.setItem(THEME_STORAGE_KEY, choice);
  } catch {
    // Storage may be blocked; the choice then holds for this page only.
  }
}

function safeStorage(): Storage | null {
  try {
    return localStorage;
  } catch {
    return null;
  }
}

/** A script for <head>: applies the stored choice before the first paint. */
export const THEME_HEAD_SCRIPT = `try{var t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}`;
