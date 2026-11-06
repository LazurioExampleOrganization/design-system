---
title: "When to use what"
description: "Which component fits which situation when more than one seems possible."
---

## Report a result

| Situation | Use |
| --- | --- |
| An action worked and the person moves on | A [toast](../components/toast/), it leaves by itself |
| Something failed and the person must act | An [alert](../components/alert/) in the page; a toast with an error does not leave by itself |
| The state of one item (an invoice, a task) | A [badge](../components/badge/) with an icon and a word |
| A form field is wrong | The error under the field in the [form](../components/form/) |
| Nothing is on the page yet | An [empty state](../components/empty-state/) with the next step |

## Ask or confirm

| Situation | Use |
| --- | --- |
| An irreversible action (delete, send, pay) | A [dialog](../components/dialog/) whose button names the action |
| A short task that interrupts the work (rename) | A dialog with a form |
| A longer edit | A page of its own, not a dialog |

Sending, publishing, paying and deleting are steps that cannot easily be undone. Prepare them as a draft, show what will happen, and do them only after an explicit confirmation.

## Choose

| Situation | Use |
| --- | --- |
| One of two to five options, all visible | Radio buttons |
| One of many options | A select |
| Turn on or off with immediate effect | A switch |
| Agreement or a choice saved with the form | A checkbox |

## Switch the view

| Situation | Use |
| --- | --- |
| Views of one thing (overview, invoices, notes) | [Tabs](../components/tabs/) |
| Different places of an App | [Navigation](../components/navigation/) |
| Where in the hierarchy a page sits | Breadcrumbs |
