# Campus Events | Laboratory Work 4

A one-page event registration application created for **Web Technologies, Laboratory Work 4: Interactive Web Page with JavaScript and DOM**.

## Run locally

Open `index.html` in any modern browser. No packages, build process, or server are required.

## Features

- Choose one of three event cards (only one is highlighted at a time).
- Toggle between light and dark themes.
- View a live character counter in the full-name field.
- Validate the name, email, student group, selected event, and agreement with inline error messages.
- Submit without reloading, show a personalized confirmation, and append a new registration to the visible list.
- Use a responsive layout for phones and desktops.

## JavaScript defense notes

1. `querySelector` / `querySelectorAll` select DOM nodes.
2. `addEventListener` handles `click`, `input`, `change`, and `submit`.
3. `selectEvent()` changes the chosen card with `classList` and updates text using `textContent`.
4. `validateForm()` checks five rules and calls `showError()` to display or clear messages.
5. `event.preventDefault()` stops the browser from refreshing on submit.
6. `addRegistration()` uses `createElement`, `textContent`, and `appendChild` to add list entries without `innerHTML`.
7. `events` and `registrations` are JavaScript arrays holding application data.

Registrations are stored **only in memory**. Refreshing the page clears them; server-side persistence was not required for this lab.
