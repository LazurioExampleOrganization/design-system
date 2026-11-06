import type { ReactNode } from "react";
import { cx } from "../core/classes";
import type { HeadingLevel } from "../core/types";
import { Icon } from "./Icon";

export type CardProps = {
  title?: ReactNode;
  description?: ReactNode;
  /** The whole card is one link; then it holds no other control. */
  href?: string;
  tone?: "default" | "muted";
  headingLevel?: HeadingLevel;
  footer?: ReactNode;
  children?: ReactNode;
  className?: string;
};

export function Card({
  title,
  description,
  href,
  tone = "default",
  headingLevel = 3,
  footer,
  children,
  className,
}: CardProps) {
  const Heading = `h${headingLevel}` as const;
  const classes = cx(
    "ds-card",
    tone === "muted" && "ds-card--muted",
    href !== undefined && "ds-card--link",
    className,
  );
  const heading = title ? <Heading className="ds-card__title">{title}</Heading> : null;
  const text = description ? <p className="ds-card__description">{description}</p> : null;
  if (href !== undefined) {
    return (
      <a className={classes} href={href}>
        {heading}
        {text}
        <Icon name="arrow-right" className="ds-card__arrow" />
      </a>
    );
  }
  return (
    <article className={classes}>
      {heading}
      {text}
      {children != null ? <div className="ds-card__body">{children}</div> : null}
      {footer != null ? <div className="ds-card__footer">{footer}</div> : null}
    </article>
  );
}
