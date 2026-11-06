import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { buttonClass } from "../core/classes";
import { messagesFor } from "../core/i18n";
import type { IconName } from "../core/icons";
import type { ButtonVariant, Locale, Size } from "../core/types";
import { Icon } from "./Icon";

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> & {
  variant?: ButtonVariant;
  size?: Size;
  /** An icon before the label. */
  icon?: IconName;
  /** An icon after the label. */
  iconEnd?: IconName;
  /** Only the icon shows; `label` names the button. */
  iconOnly?: boolean;
  /** The accessible name of an icon-only button. */
  label?: string;
  /** Renders a link that looks like a button. */
  href?: string;
  type?: "button" | "submit" | "reset";
  /** The action is running: a spinner replaces the icon, the button ignores presses. */
  busy?: boolean;
  block?: boolean;
  locale?: Locale;
  children?: ReactNode;
};

export function Button({
  variant,
  size = "md",
  icon,
  iconEnd,
  iconOnly = false,
  label,
  href,
  type = "button",
  disabled = false,
  busy = false,
  block,
  locale,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = buttonClass({ variant, size, iconOnly, block, className });
  const iconSize = size === "sm" ? "sm" : "md";
  const start = busy ? (
    <span className="ds-spinner" aria-hidden="true" />
  ) : icon ? (
    <Icon name={icon} size={iconSize} />
  ) : null;
  const text = iconOnly ? null : (
    <span className="ds-button__label">
      {children}
      {busy ? (
        <span className="ds-visually-hidden">{`, ${messagesFor(locale).loading}`}</span>
      ) : null}
    </span>
  );
  const end = iconEnd ? <Icon name={iconEnd} size={iconSize} /> : null;
  if (href !== undefined) {
    return (
      <a
        className={classes}
        href={disabled ? undefined : href}
        aria-disabled={disabled ? "true" : undefined}
        aria-label={iconOnly ? label : undefined}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {start}
        {text}
        {end}
      </a>
    );
  }
  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      aria-disabled={busy ? "true" : undefined}
      aria-busy={busy ? "true" : undefined}
      aria-label={iconOnly ? label : undefined}
      {...rest}
    >
      {start}
      {text}
      {end}
    </button>
  );
}
