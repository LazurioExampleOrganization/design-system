// Toasts from plain JavaScript (Astro, plain HTML). `toastHtml` gives the same
// markup as the Toast component of both renderers; `showToast` puts it into
// the region and removes it after a while, but never while the pointer is on
// it or focus is inside it. An error stays until it is closed.
import { cx, ICON_PX, iconClass } from "./classes";
import { escapeHtml } from "./html";
import { messagesFor } from "./i18n";
import { icons } from "./icons";
import type { Locale, ToastSpec, ToastTone } from "./types";

/** How long a toast stays, unless it reports an error. */
export const TOAST_MS = 6000;

export const TOAST_ICON: Record<ToastTone, keyof typeof icons> = {
  neutral: "bell",
  success: "check-circle",
  warning: "warning-triangle",
  danger: "warning-circle",
  info: "info-circle",
};

export function toastClass(tone: ToastTone): string {
  return cx("ds-toast", tone !== "neutral" && `ds-toast--${tone}`);
}

function svg(name: keyof typeof icons, className: string): string {
  return `<svg class="${className}" viewBox="0 0 24 24" width="${ICON_PX.md}" height="${ICON_PX.md}" fill="none" stroke-width="1.5" aria-hidden="true" focusable="false">${icons[name]}</svg>`;
}

export function toastHtml(spec: ToastSpec, locale?: Locale): string {
  const tone = spec.tone ?? "neutral";
  const words = messagesFor(locale);
  const body = spec.body ? `<p class="ds-toast__body">${escapeHtml(spec.body)}</p>` : "";
  return [
    `<li class="${toastClass(tone)}" data-ds-toast="">`,
    svg(TOAST_ICON[tone], iconClass("md", "ds-toast__icon")),
    '<div class="ds-toast__content">',
    `<p class="ds-toast__title"><span class="ds-visually-hidden">${escapeHtml(words.tone[tone])}: </span>${escapeHtml(spec.title)}</p>`,
    body,
    "</div>",
    `<button type="button" class="ds-button ds-button--quiet ds-button--sm ds-button--icon ds-toast__close" aria-label="${escapeHtml(words.dismiss)}" data-ds-toast-close="">`,
    svg("xmark", iconClass("md")),
    "</button>",
    "</li>",
  ].join("");
}

export type Scheduler = { set(run: () => void, ms: number): number; clear(id: number): void };

/** A timer that waits while the pointer is on the toast or focus is inside it. */
export function dismissTimer(ms: number, close: () => void, scheduler: Scheduler) {
  let hovered = false;
  let focused = false;
  let pending: number | undefined;
  const update = () => {
    if (pending !== undefined) scheduler.clear(pending);
    pending = hovered || focused ? undefined : scheduler.set(close, ms);
  };
  update();
  return {
    hover(on: boolean) {
      hovered = on;
      update();
    },
    focus(on: boolean) {
      focused = on;
      update();
    },
    stop() {
      if (pending !== undefined) scheduler.clear(pending);
      pending = undefined;
    },
  };
}

const browserScheduler: Scheduler = {
  set: (run, ms) => window.setTimeout(run, ms),
  clear: (id) => window.clearTimeout(id),
};

/** Removes a toast; focus inside it goes back to the page's main region. */
export function closeToast(toast: HTMLElement): void {
  const hadFocus = toast.contains(document.activeElement);
  toast.dataset.leaving = "";
  const remove = () => toast.remove();
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) remove();
  else toast.addEventListener("transitionend", remove, { once: true });
  window.setTimeout(remove, 400);
  if (hadFocus) document.querySelector<HTMLElement>("main, [role='main']")?.focus();
}

export function showToast(
  spec: ToastSpec,
  options: { region?: HTMLElement | null; locale?: Locale; ms?: number | null } = {},
): HTMLElement | null {
  const region = options.region ?? document.querySelector<HTMLElement>("[data-ds-toast-region]");
  if (!region) return null;
  region.insertAdjacentHTML("beforeend", toastHtml(spec, options.locale));
  const toast = region.lastElementChild as HTMLElement;
  const ms = options.ms === undefined ? (spec.tone === "danger" ? null : TOAST_MS) : options.ms;
  if (ms !== null) {
    const timer = dismissTimer(ms, () => closeToast(toast), browserScheduler);
    toast.addEventListener("pointerenter", () => timer.hover(true));
    toast.addEventListener("pointerleave", () => timer.hover(false));
    toast.addEventListener("focusin", () => timer.focus(true));
    toast.addEventListener("focusout", (event) => {
      if (!toast.contains(event.relatedTarget as Node | null)) timer.focus(false);
    });
  }
  return toast;
}

/** Wires close buttons, and buttons with `data-ds-toast-show='{"title": …}'` (JSON). */
export function bindToasts(root: Document = document): void {
  if (root.documentElement.dataset.dsToasts !== undefined) return;
  root.documentElement.dataset.dsToasts = "";
  root.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const close = target?.closest<HTMLElement>("[data-ds-toast-close]");
    const toast = close?.closest<HTMLElement>("[data-ds-toast]");
    if (toast) {
      closeToast(toast);
      return;
    }
    const trigger = target?.closest<HTMLElement>("[data-ds-toast-show]");
    if (!trigger) return;
    const spec = JSON.parse(trigger.dataset.dsToastShow ?? "{}") as ToastSpec;
    const locale = root.documentElement.lang === "en" ? "en" : "cs";
    showToast(spec, { locale });
  });
}
