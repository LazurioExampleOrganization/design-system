// Class names and the attributes both renderers share, so an Astro component
// and its React twin cannot drift apart. The parity test checks their output.
import { size as sizes } from "../tokens";
import type { IconName } from "./icons";
import type { ButtonVariant, Size, Tone } from "./types";

type Part = string | false | null | undefined;

/** Joins class names, skipping empty parts. */
export function cx(...parts: Part[]): string {
  return parts.filter(Boolean).join(" ");
}

export function buttonClass(options: {
  variant?: ButtonVariant | undefined;
  size?: Size | undefined;
  iconOnly?: boolean | undefined;
  block?: boolean | undefined;
  className?: string | undefined;
}): string {
  const { variant = "secondary", size = "md", iconOnly = false, block = false } = options;
  return cx(
    "ds-button",
    `ds-button--${variant}`,
    size !== "md" && `ds-button--${size}`,
    iconOnly && "ds-button--icon",
    block && "ds-button--block",
    options.className,
  );
}

/** Icon sizes in pixels, from the size tokens (icon-sm, icon-md, icon-lg). */
export const ICON_PX: Record<Size, number> = {
  sm: Number.parseFloat(sizes["icon-sm"]),
  md: Number.parseFloat(sizes["icon-md"]),
  lg: Number.parseFloat(sizes["icon-lg"]),
};

export function iconClass(size: Size = "md", className?: string): string {
  return cx("ds-icon", size !== "md" && `ds-icon--${size}`, className);
}

/** The icon that goes with a state; a state is never colour alone. */
export const TONE_ICON: Record<Tone, IconName | null> = {
  neutral: null,
  accent: null,
  success: "check-circle",
  warning: "warning-triangle",
  danger: "warning-circle",
  info: "info-circle",
};

/** Ids of the parts of a field, so label, hint and error point at the control. */
export function fieldIds(id: string, hint: unknown, error: unknown) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  return { hintId, errorId, describedBy };
}
