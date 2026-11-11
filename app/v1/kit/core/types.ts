import type { IconName } from "./icons";

// The shared vocabulary of the components. Astro and React components take
// the same props with these types and render the same markup.

export type Locale = "cs" | "en";
export type Tone = "neutral" | "accent" | "success" | "warning" | "danger" | "info";
export type AlertTone = "info" | "success" | "warning" | "danger";
export type ButtonVariant = "primary" | "secondary" | "soft" | "quiet" | "danger";
export type Size = "sm" | "md" | "lg";
export type HeadingLevel = 2 | 3 | 4;

export type Option = { value: string; label: string; disabled?: boolean };
export type NavItem = {
  href: string;
  label: string;
  icon?: IconName;
  current?: boolean;
  badge?: string;
};
export type Crumb = { label: string; href?: string };
export type TabItem = { id: string; label: string; badge?: string };
export type ToastTone = "neutral" | "success" | "warning" | "danger" | "info";
export type ToastSpec = { tone?: ToastTone; title: string; body?: string };
