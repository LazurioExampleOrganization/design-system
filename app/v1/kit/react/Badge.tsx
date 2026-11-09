import type { ReactNode } from "react";
import { cx, TONE_ICON } from "../core/classes";
import type { IconName } from "../core/icons";
import type { Tone } from "../core/types";
import { Icon } from "./Icon";

export type BadgeProps = {
  tone?: Tone;
  /** The tone's icon by default; another icon, or false for none (neutral and accent have none). */
  icon?: IconName | false;
  children: ReactNode;
  className?: string;
};

/** A state: colour, icon and word together. */
export function Badge({ tone = "neutral", icon, children, className }: BadgeProps) {
  const name = icon === false ? null : (icon ?? TONE_ICON[tone]);
  return (
    <span className={cx("ds-badge", tone !== "neutral" && `ds-badge--${tone}`, className)}>
      {name ? <Icon name={name} size="sm" /> : null}
      {children}
    </span>
  );
}

/** A label of data (a code, a category); square, so it is not read as a state. */
export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cx("ds-tag", className)}>{children}</span>;
}
