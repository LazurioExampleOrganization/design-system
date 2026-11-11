import { type KeyboardEvent, type ReactNode, useRef, useState } from "react";
import { nextTab } from "../core/tabs";
import type { TabItem } from "../core/types";

export type TabsProps = {
  /** Names the tab list for screen readers. */
  label: string;
  items: TabItem[];
  /** The content of each tab, by its id. */
  panels: Record<string, ReactNode>;
  /** The selected tab (controlled); without it the tabs keep their own state. */
  selected?: string;
  defaultSelected?: string;
  onSelect?: (id: string) => void;
};

export function Tabs({ label, items, panels, selected, defaultSelected, onSelect }: TabsProps) {
  const [own, setOwn] = useState(defaultSelected ?? items[0]?.id);
  const current = selected ?? own;
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const select = (id: string) => {
    setOwn(id);
    onSelect?.(id);
  };
  const keydown = (index: number) => (event: KeyboardEvent<HTMLButtonElement>) => {
    const next = nextTab(index, event.key, items.length);
    const item = next === null ? undefined : items[next];
    if (next === null || !item) return;
    event.preventDefault();
    select(item.id);
    refs.current[next]?.focus();
  };
  return (
    <div className="ds-tabs" data-ds-tabs="">
      <div className="ds-tabs__list" role="tablist" aria-label={label}>
        {items.map((item, index) => {
          const isSelected = item.id === current;
          return (
            <button
              key={item.id}
              ref={(element) => {
                refs.current[index] = element;
              }}
              type="button"
              className="ds-tabs__tab"
              role="tab"
              id={`${item.id}-tab`}
              aria-controls={`${item.id}-panel`}
              aria-selected={isSelected ? "true" : "false"}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => select(item.id)}
              onKeyDown={keydown(index)}
            >
              {item.label}
              {item.badge ? <span className="ds-badge">{item.badge}</span> : null}
            </button>
          );
        })}
      </div>
      {items.map((item) => (
        <div
          key={item.id}
          className="ds-tabs__panel"
          role="tabpanel"
          id={`${item.id}-panel`}
          aria-labelledby={`${item.id}-tab`}
          // biome-ignore lint/a11y/noNoninteractiveTabindex: a tab panel takes focus so its content is reachable (WAI-ARIA tabs)
          tabIndex={0}
          hidden={item.id !== current}
        >
          {panels[item.id]}
        </div>
      ))}
    </div>
  );
}
