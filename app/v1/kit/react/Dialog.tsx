import { type MouseEvent, type ReactNode, useEffect, useRef } from "react";
import { cx } from "../core/classes";
import { messagesFor } from "../core/i18n";
import type { Locale } from "../core/types";
import { Icon } from "./Icon";

export type DialogProps = {
  id: string;
  title: ReactNode;
  description?: ReactNode;
  size?: "sm" | "md" | "lg";
  open: boolean;
  /** Called when the dialog closed: its close button, Escape, a form with method="dialog". */
  onClose?: (returnValue: string) => void;
  /** A click on the backdrop closes it. Never for a dialog with unsaved input. */
  dismissable?: boolean;
  locale?: Locale;
  /** The actions, primary last. */
  footer?: ReactNode;
  children?: ReactNode;
};

export function Dialog({
  id,
  title,
  description,
  size = "md",
  open,
  onClose,
  dismissable,
  locale,
  footer,
  children,
}: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog || !onClose) return;
    const closed = () => onClose(dialog.returnValue);
    dialog.addEventListener("close", closed);
    return () => dialog.removeEventListener("close", closed);
  }, [onClose]);
  const backdrop = (event: MouseEvent<HTMLDialogElement>) => {
    const dialog = event.currentTarget;
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    const outside =
      event.clientX < box.left ||
      event.clientX > box.right ||
      event.clientY < box.top ||
      event.clientY > box.bottom;
    if (outside) dialog.close("dismiss");
  };
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: the backdrop click repeats Escape, which the dialog handles natively
    <dialog
      ref={ref}
      className={cx("ds-dialog", size !== "md" && `ds-dialog--${size}`)}
      id={id}
      aria-labelledby={`${id}-title`}
      aria-describedby={description ? `${id}-description` : undefined}
      data-ds-dismissable={dismissable ? "" : undefined}
      onClick={dismissable ? backdrop : undefined}
    >
      <header className="ds-dialog__header">
        <h2 className="ds-dialog__title" id={`${id}-title`}>
          {title}
        </h2>
        <form method="dialog">
          <button
            type="submit"
            value="cancel"
            className="ds-button ds-button--quiet ds-button--sm ds-button--icon ds-dialog__close"
            aria-label={messagesFor(locale).close}
          >
            <Icon name="xmark" />
          </button>
        </form>
      </header>
      {description ? (
        <p className="ds-dialog__description" id={`${id}-description`}>
          {description}
        </p>
      ) : null}
      <div className="ds-dialog__body">{children}</div>
      {footer != null ? <footer className="ds-dialog__footer">{footer}</footer> : null}
    </dialog>
  );
}
