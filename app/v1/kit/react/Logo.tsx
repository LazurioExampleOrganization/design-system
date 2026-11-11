import { brandName, logoSymbol } from "../brand";
import { cx } from "../core/classes";
import type { Size } from "../core/types";

export type LogoProps = {
  size?: Size;
  /** Shows the name beside the symbol (default); without it the symbol carries the name. */
  wordmark?: boolean;
  href?: string;
  className?: string;
};

export function Logo({ size = "md", wordmark = true, href, className }: LogoProps) {
  const classes = cx("ds-logo", size !== "md" && `ds-logo--${size}`, className);
  const naming = wordmark ? { "aria-hidden": true } : { role: "img", "aria-label": brandName };
  const content = (
    <>
      <svg
        className="ds-logo__symbol"
        viewBox={logoSymbol.viewBox}
        focusable="false"
        {...naming}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: the brand's own logo, generated from brand/logo
        dangerouslySetInnerHTML={{ __html: logoSymbol.markup }}
      />
      {wordmark ? <span className="ds-logo__wordmark">{brandName}</span> : null}
    </>
  );
  return href ? (
    <a className={classes} href={href}>
      {content}
    </a>
  ) : (
    <span className={classes}>{content}</span>
  );
}
