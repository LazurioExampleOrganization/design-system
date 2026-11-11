---
title: "Form fields"
description: "Text field, text area, select, checkbox, radio buttons and switch. The label above the field, the hint before it, the error after it."
do:
  - "Give every field a visible label."
  - "Mark optional fields (`optional`) and leave required ones without a mark."
  - "Show an error at the field only after the person leaves it or submits the form."
  - "Set `type`, `autocomplete` and `inputmode` so a phone offers the right keyboard."
dont:
  - "Do not replace the label with placeholder text."
  - "Do not disable the Submit button only because the form is not filled in yet."
  - "Do not clear what the person typed when the field is wrong."
---

## Anatomy of a field

The label is above the field, the hint under the label and before the field, the error after the field with an icon. Hint and error are connected to the field through `aria-describedby`, so a screen reader reads them with it. A wrong field has `aria-invalid` and a red boundary.

## Which element

- **Text field** for short text, a number, an e-mail or a date.
- **Text area** for notes; it grows vertically.
- **Select** for one of many options; with a prompt (`placeholder`) when the choice must be deliberate.
- **Radio buttons** for one of two to five options that should be visible.
- **Checkbox** for agreement or a choice saved with the form.
- **Switch** for a setting that applies at once.

## States

Default, with a hint, optional, invalid, disabled and read-only. A read-only field has a dashed boundary and its text can be copied; a disabled one cannot.

## Type size

Text in a field is at least 16 px, so a phone does not zoom in while typing.
