// A busy or disabled button must not act again. `aria-disabled` keeps it in
// the focus order (focus does not jump away while an action runs), but ARIA
// does not stop activation: a click, Enter, Space and a form's implicit
// submission all arrive as a click on the button. `guardBusy` cancels that
// click for every `.ds-button` with `aria-busy="true"` or
// `aria-disabled="true"` (plain HTML and Astro); the React Button cancels it in
// its own handler. A busy or disabled link has no `href` at all.

export const BUSY_SELECTOR = '.ds-button[aria-busy="true"], .ds-button[aria-disabled="true"]';

export function guardBusy(root: Document = document): void {
  if (root.documentElement.dataset.dsBusyGuard !== undefined) return;
  root.documentElement.dataset.dsBusyGuard = "";
  root.addEventListener(
    "click",
    (event) => {
      const target = event.target instanceof Element ? event.target.closest(BUSY_SELECTOR) : null;
      if (!target) return;
      event.preventDefault();
      event.stopImmediatePropagation();
    },
    true,
  );
}
