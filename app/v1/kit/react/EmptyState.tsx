import type { ReactNode } from "react";
import { type IllustrationName, illustrations } from "../brand";
import type { IconName } from "../core/icons";
import type { HeadingLevel } from "../core/types";
import { Icon } from "./Icon";

export type EmptyStateProps = {
  title: ReactNode;
  /** One of the brand's illustrations, for a first empty start. */
  illustration?: IllustrationName;
  /** An icon instead, for empty results inside a page. */
  icon?: IconName;
  headingLevel?: HeadingLevel;
  actions?: ReactNode;
  children?: ReactNode;
};

export function EmptyState({
  title,
  illustration,
  icon,
  headingLevel = 2,
  actions,
  children,
}: EmptyStateProps) {
  const Heading = `h${headingLevel}` as const;
  const art = illustration ? illustrations[illustration] : null;
  return (
    <div className="ds-empty">
      {art ? (
        <svg
          className="ds-empty__art"
          viewBox={art.viewBox}
          aria-hidden="true"
          focusable="false"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: the brand's own illustration, generated from brand/illustrations
          dangerouslySetInnerHTML={{ __html: art.markup }}
        />
      ) : null}
      {!art && icon ? (
        <span className="ds-empty__icon">
          <Icon name={icon} size="lg" />
        </span>
      ) : null}
      <Heading className="ds-empty__title">{title}</Heading>
      {children != null ? <div className="ds-empty__body">{children}</div> : null}
      {actions != null ? <div className="ds-empty__actions">{actions}</div> : null}
    </div>
  );
}
