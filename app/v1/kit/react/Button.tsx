import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  MouseEvent,
  MouseEventHandler,
  ReactNode,
} from "react";
import { buttonClass } from "../core/classes";
import { messagesFor } from "../core/i18n";
import type { IconName } from "../core/icons";
import type { ButtonVariant, Locale, Size } from "../core/types";
import { Icon } from "./Icon";

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "onClick"> & {
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
  /** Runs on activation of the button, or of the link with `href`; never while busy or disabled. */
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  /**
   * The action is running: a spinner replaces the icon and the button does not
   * act again (click, Enter, Space, form submission), yet keeps focus.
   */
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
  onClick,
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
  const inactive = disabled || busy;
  if (href !== undefined) {
    // A link that must not act has no address and runs no handler.
    return (
      <a
        className={classes}
        href={inactive ? undefined : href}
        aria-disabled={inactive ? "true" : undefined}
        aria-busy={busy ? "true" : undefined}
        aria-label={iconOnly ? label : undefined}
        onClick={inactive ? stopActivation : onClick}
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
      onClick={busy ? stopActivation : onClick}
      {...rest}
    >
      {start}
      {text}
      {end}
    </button>
  );
}

/** A busy button stays focusable, so its activation is cancelled here; so is a click on an inactive link. */
function stopActivation(event: MouseEvent<HTMLElement>) {
  event.preventDefault();
  event.stopPropagation();
}
