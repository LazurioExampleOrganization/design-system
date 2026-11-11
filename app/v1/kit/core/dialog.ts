// Opening and closing native dialogs from plain HTML (Astro): a button with
// `data-ds-dialog-open="<id>"` opens the dialog as modal; the close button is a
// `<form method="dialog">`; focus returns to the opener. A dialog with
// `data-ds-dismissable` also closes on a click on its backdrop.

const openers = new WeakMap<HTMLDialogElement, HTMLElement>();

export function openDialog(dialog: HTMLDialogElement, opener?: HTMLElement | null): void {
  if (opener) openers.set(dialog, opener);
  if (!dialog.open) dialog.showModal();
}

export function bindDialogs(root: Document = document): void {
  if (root.documentElement.dataset.dsDialogs !== undefined) return;
  root.documentElement.dataset.dsDialogs = "";
  root.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const opener = target?.closest<HTMLElement>("[data-ds-dialog-open]");
    if (opener) {
      const dialog = root.getElementById(opener.dataset.dsDialogOpen ?? "");
      if (dialog instanceof HTMLDialogElement) openDialog(dialog, opener);
      return;
    }
    if (
      target instanceof HTMLDialogElement &&
      target.open &&
      target.hasAttribute("data-ds-dismissable")
    ) {
      const box = target.getBoundingClientRect();
      const { clientX: x, clientY: y } = event as MouseEvent;
      if (x < box.left || x > box.right || y < box.top || y > box.bottom) target.close("dismiss");
    }
  });
  root.addEventListener(
    "close",
    (event) => {
      const dialog = event.target;
      if (!(dialog instanceof HTMLDialogElement)) return;
      const opener = openers.get(dialog);
      if (opener?.isConnected) opener.focus();
    },
    true,
  );
}
