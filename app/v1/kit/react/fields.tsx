import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { fieldIds } from "../core/classes";
import { messagesFor } from "../core/i18n";
import type { Locale, Option } from "../core/types";
import { Icon } from "./Icon";

type FieldText = {
  id: string;
  label: ReactNode;
  /** Shown before the control: what to enter, in which format. */
  hint?: ReactNode;
  /** Shown after the control; marks it invalid. Say what to do, not what went wrong. */
  error?: ReactNode;
  /** Marks the field "(optional)"; required fields carry no mark. */
  optional?: boolean;
  locale?: Locale;
};

function Label({
  id,
  label,
  optional,
  locale,
}: Pick<FieldText, "id" | "label" | "optional" | "locale">) {
  return (
    <label className="ds-field__label" htmlFor={id}>
      {label}
      {optional ? (
        <span className="ds-field__optional">{`(${messagesFor(locale).optional})`}</span>
      ) : null}
    </label>
  );
}

function Hint({ id, children }: { id: string | undefined; children: ReactNode }) {
  return id ? (
    <p className="ds-field__hint" id={id}>
      {children}
    </p>
  ) : null;
}

function ErrorText({ id, children }: { id: string | undefined; children: ReactNode }) {
  return id ? (
    <p className="ds-field__error" id={id}>
      <Icon name="warning-circle" size="sm" />
      {children}
    </p>
  ) : null;
}

export type TextFieldProps = FieldText & Omit<InputHTMLAttributes<HTMLInputElement>, "id">;

export function TextField({
  id,
  label,
  hint,
  error,
  optional,
  locale,
  type = "text",
  ...rest
}: TextFieldProps) {
  const ids = fieldIds(id, hint, error);
  return (
    <div className="ds-field">
      <Label id={id} label={label} optional={optional} locale={locale} />
      <Hint id={ids.hintId}>{hint}</Hint>
      <input
        className="ds-input"
        id={id}
        type={type}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={ids.describedBy}
        {...rest}
      />
      <ErrorText id={ids.errorId}>{error}</ErrorText>
    </div>
  );
}

export type TextAreaProps = FieldText & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id">;

export function TextArea({
  id,
  label,
  hint,
  error,
  optional,
  locale,
  rows = 4,
  ...rest
}: TextAreaProps) {
  const ids = fieldIds(id, hint, error);
  return (
    <div className="ds-field">
      <Label id={id} label={label} optional={optional} locale={locale} />
      <Hint id={ids.hintId}>{hint}</Hint>
      <textarea
        className="ds-textarea"
        id={id}
        rows={rows}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={ids.describedBy}
        {...rest}
      />
      <ErrorText id={ids.errorId}>{error}</ErrorText>
    </div>
  );
}

export type SelectProps = FieldText &
  Omit<SelectHTMLAttributes<HTMLSelectElement>, "id"> & {
    options: Option[];
    /** A first, empty choice that asks for a selection. */
    placeholder?: string;
  };

export function Select({
  id,
  label,
  hint,
  error,
  optional,
  locale,
  options,
  placeholder,
  value,
  defaultValue,
  ...rest
}: SelectProps) {
  const ids = fieldIds(id, hint, error);
  // A disabled placeholder is never chosen by the browser itself: select it.
  const initial =
    value === undefined
      ? (defaultValue ?? (placeholder !== undefined ? "" : undefined))
      : undefined;
  return (
    <div className="ds-field">
      <Label id={id} label={label} optional={optional} locale={locale} />
      <Hint id={ids.hintId}>{hint}</Hint>
      <div className="ds-select-wrap">
        <select
          className="ds-select"
          id={id}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={ids.describedBy}
          value={value}
          defaultValue={initial}
          {...rest}
        >
          {placeholder !== undefined ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
        <Icon name="nav-arrow-down" className="ds-select__chevron" />
      </div>
      <ErrorText id={ids.errorId}>{error}</ErrorText>
    </div>
  );
}

export type CheckboxProps = Omit<FieldText, "optional"> &
  Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "type">;

export function Checkbox({ id, label, hint, error, locale: _locale, ...rest }: CheckboxProps) {
  const ids = fieldIds(id, hint, error);
  return (
    <div className="ds-check">
      <input
        className="ds-check__input"
        type="checkbox"
        id={id}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={ids.describedBy}
        {...rest}
      />
      <label className="ds-check__label" htmlFor={id}>
        {label}
      </label>
      <Hint id={ids.hintId}>{hint}</Hint>
      <ErrorText id={ids.errorId}>{error}</ErrorText>
    </div>
  );
}

export type SwitchProps = { id: string; label: ReactNode } & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "id" | "type" | "role"
>;

export function Switch({ id, label, ...rest }: SwitchProps) {
  return (
    <div className="ds-switch">
      {/* biome-ignore lint/a11y/useAriaPropsForRole: a native checkbox exposes its checked state to the switch role itself */}
      <input className="ds-switch__input" type="checkbox" role="switch" id={id} {...rest} />
      <label className="ds-switch__label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
}

export type RadioGroupProps = {
  name: string;
  legend: ReactNode;
  options: Option[];
  /** The selected value (uncontrolled; use `onChange` to follow it). */
  defaultValue?: string;
  hint?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  disabled?: boolean;
  onChange?: (value: string) => void;
};

export function RadioGroup({
  name,
  legend,
  options,
  defaultValue,
  hint,
  error,
  required,
  disabled,
  onChange,
}: RadioGroupProps) {
  const ids = fieldIds(name, hint, error);
  return (
    <fieldset className="ds-fieldset" aria-describedby={ids.describedBy} disabled={disabled}>
      <legend className="ds-field__label">{legend}</legend>
      <Hint id={ids.hintId}>{hint}</Hint>
      <div className="ds-fieldset__options">
        {options.map((option) => (
          <div className="ds-check" key={option.value}>
            <input
              className="ds-check__input"
              type="radio"
              id={`${name}-${option.value}`}
              name={name}
              value={option.value}
              defaultChecked={option.value === defaultValue}
              disabled={option.disabled}
              required={required}
              aria-invalid={error ? "true" : undefined}
              onChange={onChange ? () => onChange(option.value) : undefined}
            />
            <label className="ds-check__label" htmlFor={`${name}-${option.value}`}>
              {option.label}
            </label>
          </div>
        ))}
      </div>
      <ErrorText id={ids.errorId}>{error}</ErrorText>
    </fieldset>
  );
}
