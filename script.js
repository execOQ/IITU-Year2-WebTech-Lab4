// Event information is kept in an array, separate from the page elements.
const events = [
  { id: "design", name: "Web Design Workshop", date: "Oct 15, 14:00" },
  { id: "javascript", name: "JavaScript Quiz", date: "Oct 17, 12:30" },
  { id: "career", name: "IT Career Talk", date: "Oct 20, 16:00" }
];

// Successful registrations are stored while the page is open.
const registrations = [];

const form = document.querySelector("#registration-form");
const themeButton = document.querySelector("#theme-button");
const eventCards = document.querySelectorAll(".event-card");
const selectedEventInput = document.querySelector("#selected-event");
const selectedEventLabel = document.querySelector("#selected-event-label");
const nameInput = document.querySelector("#full-name");
const emailInput = document.querySelector("#email");
const groupInput = document.querySelector("#student-group");
const agreementInput = document.querySelector("#agreement");
let attemptedSubmit = false;

// Select exactly one event and update the form without reloading the page.
function selectEvent(eventId) {
  const chosenEvent = events.find((item) => item.id === eventId);
  if (!chosenEvent) return;

  eventCards.forEach((card) => {
    const isSelected = card.dataset.eventId === eventId;
    card.classList.toggle("selected-event", isSelected);
    const button = card.querySelector(".select-button");
    button.textContent = isSelected ? "Selected ✓" : "Select event";
    button.setAttribute("aria-pressed", String(isSelected));
  });

  selectedEventInput.value = chosenEvent.id;
  selectedEventLabel.textContent = `${chosenEvent.name} · ${chosenEvent.date}`;
  showError(selectedEventInput, "selected-event-field", "selected-event-error", "");
}

// Add or remove a field-specific error; invalid styling disappears when valid.
function showError(input, containerId, errorId, message) {
  const target = containerId ? document.querySelector(`#${containerId}`) : input;
  target.classList.toggle("invalid", Boolean(message));
  input.setAttribute("aria-invalid", String(Boolean(message)));
  document.querySelector(`#${errorId}`).textContent = message;
}

// Validate every required field, rather than stopping at the first error.
function validateForm() {
  const nameValid = nameInput.value.trim().length >= 3;
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
  const groupValid = groupInput.value.trim().length > 0;
  const eventValid = selectedEventInput.value !== "";
  const agreementValid = agreementInput.checked;

  showError(nameInput, null, "name-error", nameValid ? "" : "Enter a full name with at least 3 characters.");
  showError(emailInput, null, "email-error", emailValid ? "" : "Enter a valid email address.");
  showError(groupInput, null, "group-error", groupValid ? "" : "Enter your student group.");
  showError(selectedEventInput, "selected-event-field", "selected-event-error", eventValid ? "" : "Please choose an event above.");
  showError(agreementInput, "agreement-field", "agreement-error", agreementValid ? "" : "You must agree to the rules.");

  return nameValid && emailValid && groupValid && eventValid && agreementValid;
}

// Create the new result using DOM methods and user-safe textContent.
function addRegistration(registration) {
  const list = document.querySelector("#registration-list");
  const item = document.createElement("li");
  item.className = "registration-item";

  const details = document.createElement("div");
  const title = document.createElement("h3");
  title.textContent = registration.name;
  const meta = document.createElement("p");
  meta.textContent = `${registration.group} · ${registration.email}`;
  details.append(title, meta);

  const eventTag = document.createElement("span");
  eventTag.className = "registration-tag";
  eventTag.textContent = registration.eventName;
  item.append(details, eventTag);
  list.appendChild(item);

  document.querySelector("#registration-count").textContent = registrations.length;
  document.querySelector("#success-text").textContent =
    `Thank you, ${registration.name}! Your registration for ${registration.eventName} is confirmed.`;
  document.querySelector("#success-banner").hidden = false;
}

// Click listeners for event selection and theme switching.
eventCards.forEach((card) => {
  card.querySelector(".select-button").addEventListener("click", () => {
    selectEvent(card.dataset.eventId);
  });
});

themeButton.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-theme");
  themeButton.textContent = isDark ? "Light mode" : "Dark mode";
  themeButton.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
});

// input and change listeners provide live feedback and re-check corrected fields.
nameInput.addEventListener("input", () => {
  const count = nameInput.value.length;
  document.querySelector("#name-counter").textContent = `${count} character${count === 1 ? "" : "s"}`;
  if (attemptedSubmit) showError(nameInput, null, "name-error", nameInput.value.trim().length >= 3 ? "" : "Enter a full name with at least 3 characters.");
});
emailInput.addEventListener("input", () => {
  if (attemptedSubmit) showError(emailInput, null, "email-error", /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim()) ? "" : "Enter a valid email address.");
});
groupInput.addEventListener("input", () => {
  if (attemptedSubmit) showError(groupInput, null, "group-error", groupInput.value.trim() ? "" : "Enter your student group.");
});
agreementInput.addEventListener("change", () => {
  if (attemptedSubmit) showError(agreementInput, "agreement-field", "agreement-error", agreementInput.checked ? "" : "You must agree to the rules.");
});

form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent browser navigation and keep the results on this page.
  attemptedSubmit = true;
  if (!validateForm()) return;

  const chosenEvent = events.find((item) => item.id === selectedEventInput.value);
  const registration = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    group: groupInput.value.trim(),
    eventName: chosenEvent.name
  };
  registrations.push(registration);
  addRegistration(registration);

  // Keep the selected event for another participant, but clear personal details.
  nameInput.value = "";
  emailInput.value = "";
  groupInput.value = "";
  agreementInput.checked = false;
  document.querySelector("#name-counter").textContent = "0 characters";
  attemptedSubmit = false;
});
