import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { messagesFor } from "../core/i18n";
import { dismissTimer, TOAST_ICON, TOAST_MS, toastClass } from "../core/toast";
import type { Locale, ToastSpec } from "../core/types";
import { Icon } from "./Icon";

export type ToastProps = ToastSpec & {
  locale?: Locale;
  /** Removes the toast: its close button, or the timer. */
  onDismiss?: () => void;
  /** Milliseconds before it leaves by itself; null keeps it. Errors stay by default. */
  ms?: number | null;
};

export function Toast({ tone = "neutral", title, body, locale, onDismiss, ms }: ToastProps) {
  const words = messagesFor(locale);
  const timer = useRef<ReturnType<typeof dismissTimer> | null>(null);
  const wait = ms === undefined ? (tone === "danger" ? null : TOAST_MS) : ms;
  useEffect(() => {
    if (wait === null || !onDismiss) return;
    timer.current = dismissTimer(wait, onDismiss, {
      set: (run, delay) => window.setTimeout(run, delay),
      clear: (id) => window.clearTimeout(id),
    });
    return () => timer.current?.stop();
  }, [wait, onDismiss]);
  return (
    <li
      className={toastClass(tone)}
      data-ds-toast=""
      onPointerEnter={() => timer.current?.hover(true)}
      onPointerLeave={() => timer.current?.hover(false)}
      onFocus={() => timer.current?.focus(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null))
          timer.current?.focus(false);
      }}
    >
      <Icon name={TOAST_ICON[tone]} className="ds-toast__icon" />
      <div className="ds-toast__content">
        <p className="ds-toast__title">
          <span className="ds-visually-hidden">{`${words.tone[tone]}: `}</span>
          {title}
        </p>
        {body ? <p className="ds-toast__body">{body}</p> : null}
      </div>
      <button
        type="button"
        className="ds-button ds-button--quiet ds-button--sm ds-button--icon ds-toast__close"
        aria-label={words.dismiss}
        data-ds-toast-close=""
        onClick={onDismiss}
      >
        <Icon name="xmark" />
      </button>
    </li>
  );
}

/** The live region toasts appear in; put it once at the end of the App. */
export function ToastRegion({ locale, children }: { locale?: Locale; children?: ReactNode }) {
  return (
    <ol
      className="ds-toast-region"
      aria-live="polite"
      aria-label={messagesFor(locale).notifications}
      data-ds-toast-region=""
    >
      {children}
    </ol>
  );
}

type Shown = ToastSpec & { key: number };

/** State for toasts: `show` one, render `toasts` in a ToastRegion, `dismiss` by key. */
export function useToasts() {
  const [toasts, setToasts] = useState<Shown[]>([]);
  const next = useRef(0);
  const show = useCallback((spec: ToastSpec) => {
    next.current += 1;
    const key = next.current;
    setToasts((list) => [...list, { ...spec, key }]);
    return key;
  }, []);
  const dismiss = useCallback((key: number) => {
    setToasts((list) => list.filter((toast) => toast.key !== key));
  }, []);
  return { toasts, show, dismiss };
}
