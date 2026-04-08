# Ribbon Business — Take-Home Project

A multi-step business registration flow built with React and TypeScript. Users can register a sole proprietorship in Canada by entering their business details, completing payment, and reviewing before submission. The flow includes a simulated government rejection on the first submit, requiring the user to fix their business name before succeeding.

---

## Features

- 4-step onboarding flow with a visual progress bar
- Per-field validation with descriptive error messages and edge case handling
- Payment form with auto-formatting (card number groups, MM/YY expiry) and conditional card vs. wallet fields
- Simulated rejection flow — first submission triggers a rejection banner and returns the user to Step 1 with their payment preserved
- Masked card number on the review screen (last 4 digits only)
- Help & FAQ panel with accordion questions
- Responsive layout

---

## Tech Stack

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)

No external UI libraries — all styling is plain CSS via `App.css`.

---

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm

### Installation

```bash
# Clone the repo
git clone https://github.com/JasonYe914/Ribbon-Take-Home.git

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Other Scripts

```bash
npm run build      # Production build (output in /dist)
npm run preview    # Preview the production build locally
npm run lint       # Run ESLint
```

---

## Project Structure

```
src/
├── App.tsx                   # Root component — owns all shared state and step routing
├── App.css                   # All component styles and design tokens
├── index.css                 # Minimal base reset
│
├── accessory/                # Reusable UI components
│   ├── ProgressBar.tsx       # Step tracker with circles, connecting lines, and labels
│   ├── HelpButton.tsx        # Floating ? button that opens a FAQ overlay panel
│   ├── Input.tsx             # Labelled input wrapper with error state support
│   ├── Error.tsx             # Inline field error message with icon
│   └── ChatButton.tsx        # Reserved for future live chat integration
│
├── steps/                    # One component per step in the registration flow
│   ├── Step1.tsx             # Business info — name, owner, email, address
│   ├── Step2.tsx             # Payment — card/wallet selection, order summary
│   ├── Step3.tsx             # Review — masked card, business details, submit
│   └── Step4.tsx             # Success — confirmation, reference number
│
└── utils/
    └── validation.ts         # Pure validation functions for Step 1 and Step 2
```

### State Management

All state lives in `App.tsx` and is passed down as props. There is no global state library or context. This keeps the data flow explicit and easy to follow — each step receives only the values and setters it needs.

### Validation

`src/utils/validation.ts` exports two functions:

- `validateStep1(businessName, ownerName, email, address)` — checks for empty fields, numbers-only names, invalid email format, and disallowed special characters
- `validateStep2(paymentType, cardNumber, expiry, cvv, paymentConfirmed)` — checks for a selected payment method, 16-digit card number, valid non-expired MM/YY expiry, and 3–4 digit CVV (card fields are skipped for Google/Apple Pay)

Both return a `FormErrors` object keyed by field name. An empty object means all fields are valid.

### Rejection Flow

The first time the user submits on Step 3, `App.tsx` sets `isRejected = true` and sends them back to Step 1. A banner appears explaining the rejection and the business name field is highlighted. Payment state is preserved. The second submission succeeds and advances to Step 4.
