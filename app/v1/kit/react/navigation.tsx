import { cx } from "../core/classes";
import { messagesFor } from "../core/i18n";
import type { Crumb, Locale, NavItem } from "../core/types";
import { Icon } from "./Icon";

export type NavProps = {
  items: NavItem[];
  /** A visible title of the group; needs `id`. Without it give `label`. */
  title?: string;
  id?: string;
  /** The accessible name when there is no visible title. */
  label?: string;
  orientation?: "vertical" | "horizontal";
  className?: string;
};

export function Nav({ items, title, id, label, orientation = "vertical", className }: NavProps) {
  const titleId = title && id ? `${id}-title` : undefined;
  return (
    <nav
      className={cx("ds-nav", `ds-nav--${orientation}`, className)}
      id={id}
      aria-labelledby={titleId}
      aria-label={titleId ? undefined : label}
    >
      {titleId ? (
        <p className="ds-nav__title" id={titleId}>
          {title}
        </p>
      ) : null}
      <ul className="ds-nav__list">
        {items.map((item) => (
          <li key={`${item.href} ${item.label}`}>
            <a
              className="ds-nav__link"
              href={item.href}
              aria-current={item.current ? "page" : undefined}
            >
              {item.icon ? <Icon name={item.icon} /> : null}
              <span className="ds-nav__label">{item.label}</span>
              {item.badge ? <span className="ds-nav__badge">{item.badge}</span> : null}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export type BreadcrumbsProps = { items: Crumb[]; locale?: Locale };

/** The last item is the current page. */
export function Breadcrumbs({ items, locale }: BreadcrumbsProps) {
  return (
    <nav className="ds-breadcrumbs" aria-label={messagesFor(locale).breadcrumbs}>
      <ol className="ds-breadcrumbs__list">
        {items.map((item, index) =>
          index === items.length - 1 ? (
            <li className="ds-breadcrumbs__item" key={`${item.href ?? ""}#${item.label}`}>
              <span className="ds-breadcrumbs__current" aria-current="page">
                {item.label}
              </span>
            </li>
          ) : (
            <li className="ds-breadcrumbs__item" key={`${item.href ?? ""}#${item.label}`}>
              {item.href ? (
                <a className="ds-breadcrumbs__link" href={item.href}>
                  {item.label}
                </a>
              ) : (
                <span className="ds-breadcrumbs__link">{item.label}</span>
              )}
              <Icon name="nav-arrow-right" size="sm" className="ds-breadcrumbs__separator" />
            </li>
          ),
        )}
      </ol>
    </nav>
  );
}
