// Keyboard behaviour of tabs (WAI-ARIA tabs pattern, automatic activation):
// arrows move and select, Home and End jump, and only the selected tab is in
// the tab order. `nextTab` is pure so both renderers share it.

export function nextTab(current: number, key: string, count: number): number | null {
  if (count <= 0) return null;
  switch (key) {
    case "ArrowRight":
      return (current + 1) % count;
    case "ArrowLeft":
      return (current - 1 + count) % count;
    case "Home":
      return 0;
    case "End":
      return count - 1;
    default:
      return null;
  }
}

/** Wires every `[data-ds-tabs]` under `root` that is not wired yet (Astro, plain HTML). */
export function bindTabs(root: ParentNode = document): void {
  for (const element of root.querySelectorAll<HTMLElement>("[data-ds-tabs]:not([data-ds-bound])")) {
    element.dataset.dsBound = "";
    const tabs = [
      ...element.querySelectorAll<HTMLButtonElement>(":scope > [role='tablist'] > [role='tab']"),
    ];
    const select = (index: number, focus: boolean) => {
      tabs.forEach((tab, i) => {
        const selected = i === index;
        tab.setAttribute("aria-selected", String(selected));
        tab.tabIndex = selected ? 0 : -1;
        const panel = document.getElementById(tab.getAttribute("aria-controls") ?? "");
        if (panel) panel.hidden = !selected;
      });
      if (focus) tabs[index]?.focus();
    };
    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => select(index, false));
      tab.addEventListener("keydown", (event) => {
        const next = nextTab(index, event.key, tabs.length);
        if (next === null) return;
        event.preventDefault();
        select(next, true);
      });
    });
  }
}
