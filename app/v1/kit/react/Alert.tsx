import type { ReactNode } from "react";
import { cx, TONE_ICON } from "../core/classes";
import { messagesFor } from "../core/i18n";
import type { AlertTone, Locale } from "../core/types";
import { Icon } from "./Icon";

export type AlertProps = {
  tone?: AlertTone;
  title?: ReactNode;
  /**
   * Announce it when it appears after the page loaded: "polite" waits for the
   * reader, "assertive" interrupts (only for an error that blocks the work).
   */
  live?: "polite" | "assertive";
  locale?: Locale;
  actions?: ReactNode;
  children?: ReactNode;
};

export function Alert({ tone = "info", title, live, locale, actions, children }: AlertProps) {
  const toneWord = (
    <span className="ds-visually-hidden">{`${messagesFor(locale).tone[tone]}: `}</span>
  );
  const role = live === "assertive" ? "alert" : live === "polite" ? "status" : undefined;
  return (
    <div className={cx("ds-alert", tone !== "info" && `ds-alert--${tone}`)} role={role}>
      <Icon name={TONE_ICON[tone] ?? "info-circle"} className="ds-alert__icon" />
      <div className="ds-alert__content">
        {title ? (
          <p className="ds-alert__title">
            {toneWord}
            {title}
          </p>
        ) : null}
        {children != null || !title ? (
          <div className="ds-alert__body">
            {title ? null : toneWord}
            {children}
          </div>
        ) : null}
        {actions != null ? <div className="ds-alert__actions">{actions}</div> : null}
      </div>
    </div>
  );
}
