# Gnome Defenders ??

A demo front-end Angular application showcasing a simple online shop experience. Gnome Defenders lets users browse and purchase garden gnomes — each one a unique guardian for your flower beds and vegetable patches.

This project is used as a standalone front-end demo app to demonstrate Angular tooling, component architecture, signal-based state management, and Tailwind CSS styling.

---

## Features

### Shop
Browse a catalogue of 8 garden gnome defenders displayed as shop tiles. Each tile shows:
- Gnome name, description, and placeholder image
- Ability stats (Strength, Defence, Appearance) visualised as pip bars
- Price and **Add to Cart** button

### Cart
A table-based view of all items added to the cart, including:
- Quantity controls per item
- Per-item subtotal and overall total
- Remove individual items
- Checkout action

### Admin
Manage gnome data through a dedicated admin panel:
- **List view** — table of all gnomes with key stats
- **Detail view** — full read-only display of a selected gnome
- **Edit view** — form to update name, description, price, and ability sliders (Strength, Defence, Appearance — each 1–10), with Save and Cancel actions

---

## Tech Stack

| Technology | Version |
|---|---|
| Angular | 21 |
| TypeScript | ~5.9 |
| Tailwind CSS | 4 |
| RxJS | ~7.8 |

- Standalone components (no NgModules)
- Signal-based state (`signal`, `computed`) for reactive data
- Lazy-loaded routes via `loadComponent`

---

## Getting Started

### Prerequisites
- Node.js 20+
- npm 11+

### Install dependencies
```bash
npm install
```

### Run development server
```bash
npm start
```

Open your browser at [http://localhost:4200](http://localhost:4200).

### Build for production
```bash
npm run build
```

---

## Project Structure

```
src/
  app/
    models/         # Gnome data interfaces
    services/       # GnomeService and CartService (signal-based)
    components/
      nav/          # Top navigation bar
    pages/
      shop/         # Shop page with gnome tiles
      cart/         # Cart page with order table
      admin/        # Admin list, detail, and edit views
```
