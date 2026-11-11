import { ICON_PX, iconClass } from "../core/classes";
import { type IconName, icons } from "../core/icons";
import type { Size } from "../core/types";

export type IconProps = {
  name: IconName;
  size?: Size;
  /** Names the icon for screen readers; without it the icon is decoration. */
  label?: string;
  className?: string;
};

export function Icon({ name, size = "md", label, className }: IconProps) {
  const px = ICON_PX[size];
  const naming = label ? { role: "img", "aria-label": label } : { "aria-hidden": true };
  return (
    <svg
      className={iconClass(size, className)}
      viewBox="0 0 24 24"
      width={px}
      height={px}
      fill="none"
      strokeWidth="1.5"
      focusable="false"
      {...naming}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: the icon set is generated from Iconoir, never from input
      dangerouslySetInnerHTML={{ __html: icons[name] }}
    />
  );
}
