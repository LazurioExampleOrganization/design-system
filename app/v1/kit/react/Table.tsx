import type { ReactNode } from "react";
import { cx } from "../core/classes";

export type TableProps = {
  id: string;
  /** Names the table; hide it only when a heading right above says the same. */
  caption: ReactNode;
  hideCaption?: boolean;
  density?: "default" | "compact";
  /** Rows react to the pointer, for tables whose rows open something. */
  interactive?: boolean;
  /** `<thead>` and `<tbody>` with `ds-table__num` on numeric cells. */
  children: ReactNode;
};

export function Table({
  id,
  caption,
  hideCaption,
  density = "default",
  interactive,
  children,
}: TableProps) {
  return (
    // biome-ignore lint/a11y/noNoninteractiveTabindex: a table that scrolls sideways must be reachable by keyboard
    <section className="ds-table-wrap" aria-labelledby={`${id}-caption`} tabIndex={0}>
      <table
        className={cx(
          "ds-table",
          density === "compact" && "ds-table--compact",
          interactive && "ds-table--interactive",
        )}
      >
        <caption
          id={`${id}-caption`}
          className={cx("ds-table__caption", hideCaption && "ds-visually-hidden")}
        >
          {caption}
        </caption>
        {children}
      </table>
    </section>
  );
}
