# Personal Website — Akshit Vaishnav

> Portfolio and resume website built with **Angular 21** (standalone), showcasing experience, projects, certifications, skills, and a contact form.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Features](#features)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Testing](#testing)
- [Deployment](#deployment)
- [CI / CD](#ci--cd)

---

## Overview

A single-page, client-side portfolio application presenting Akshit Vaishnav's professional profile. It replaces a traditional PDF resume with an interactive digital experience — featuring animated skill cards, certificate previews with download, project detail modals, and a validated contact form.

---

## Tech Stack

| Category            | Technology                                                         |
| ------------------- | ------------------------------------------------------------------ |
| **Framework**       | Angular 21 (standalone, no NgModules)                              |
| **Language**        | TypeScript 5.9                                                     |
| **Styling**         | SCSS with CSS custom properties (light theme)                      |
| **Build System**    | Angular CLI via `@angular/build` (application builder)             |
| **Unit Testing**    | Vitest 4 with `@vitest/coverage-v8`, jsdom                         |
| **Formatting**      | Prettier                                                           |
| **Static Analysis** | SonarCloud                                                         |
| **Hosting**         | Cloudflare Pages (SPA with redirect rule)                          |
| **CI**              | GitHub Actions                                                     |

### Key Dependencies

- `@angular/core`, `@angular/common`, `@angular/forms`, `@angular/router` — Angular framework
- `rxjs` — Reactive extensions
- `wrangler` — Cloudflare Pages CLI for deployment

---

## Architecture

### Component Tree

```
App (app-root)
├── Fixed Header (brand logo + nav links)
└── <router-outlet>
    └── ProfilePage (lazy-loaded)
        ├── Hero Section (avatar, name, headline, summary)
        ├── Grid Section (experience, projects, education cards)
        ├── Skills Section (4 category cards with 3D tilt)
        ├── Certificates Section (8 certificate cards)
        ├── Contact Form Section (reactive form → mailto)
        ├── Footer (social links + copyright)
        ├── Certificate Modal (image preview + PDF download)
        └── Project Modal (description, technologies, highlights)
```

### Routing

Defined in `app.routes.ts`:

| Path       | Component               | Behavior                     |
| ---------- | ----------------------- | ---------------------------- |
| `/`        | —                       | Redirects to `/profile`      |
| `/profile` | `ProfilePage` (lazy)    | Main profile page            |
| `/**`      | —                       | Redirects to `/profile`      |

Anchor scrolling on the profile page is handled via native `document.getElementById().scrollIntoView()` (not Angular fragment routing). In-memory scrolling with anchor restoration is enabled globally via `withInMemoryScrolling()`.

### Data Flow

The application has **zero services, HTTP calls, or external data sources**. All content — experience, projects, certificates, skills, education, contact info — is hardcoded as component class properties. The contact form uses a `mailto:` link with a `subject`/`body` constructed from form values; no backend is involved.

---

## Project Structure

```
src/
├── index.html                         # Entry HTML (inline SVG favicon)
├── main.ts                            # App bootstrap (bootstrapApplication)
├── styles.scss                        # Global styles, CSS variables, fonts
└── app/
    ├── app.config.ts                  # App configuration (providers, routing)
    ├── app.routes.ts                  # Route definitions
    ├── app.ts                         # Root component class
    ├── app.html                       # Root template (header + router-outlet)
    ├── app.scss                       # Root styles (animated header, nav)
    ├── app.spec.ts                    # Root component tests
    └── profile/
        ├── profile.page.ts            # Profile page component class
        ├── profile.page.html          # Profile page template (~298 lines)
        ├── profile.page.scss          # Profile page styles (~1084 lines)
        └── profile.page.spec.ts       # Profile page tests (~29 test cases)

public/
├── 1.JPG                              # Profile photo
├── akshit_vaishnav_logos_v3_unique.svg  # Animated SVG brand logo
├── _redirects                         # Cloudflare SPA redirect rule
└── certificates/                      # 8 certificates (PDF + PNG each)
```

---

## Features

### Hero Section
- Profile photo with animated reveal
- Dynamic experience duration (computed from start date to present)
- Scroll-down indicator that fades on first scroll

### Experience, Projects & Education
- Three-card grid layout with staggered reveal animations
- 4 detailed project entries with role, duration, technologies, and key highlights
- Full-screen modal for each project with detailed description, tech tags, and highlights list

### Skills
- 4 category cards (Programming Languages, Frameworks & Libraries, Databases, DevOps & Testing)
- 3D perspective tilt effect on mouse move
- Each skill tagged with the category color
- Staggered entrance animations

### Certificates
- 8 certificates displayed in a responsive grid (4 → 2 → 1 columns)
- Each shows icon, title, issuer, and date
- Click opens a modal with full-resolution PNG preview and PDF download link
- Sorted latest-first

### Contact Form
- Reactive form with validation (required fields, email pattern, 10-digit phone, min-length)
- On submit: constructs a `mailto:` link and opens default email client
- Form resets after submission
- Touch-based error display

### Accessibility
- `prefers-reduced-motion` respected — all animations disabled for users who prefer reduced motion
- Semantic HTML sections, `aria-label` on nav, alt text on images
- Escape key closes active modal
- `@HostListener` for keyboard and scroll events

### Responsive Design
- Breakpoints at 480px, 600px, and 900px
- Grid layouts collapse from 4 → 2 → 1 columns
- Padding, font sizes, and spacing scale down on smaller screens

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone <repo-url>
cd personal-website
npm install
```

### Development Server

```bash
npm start
# or
ng serve
```

Navigate to `http://localhost:4200/`. Hot-reload is enabled.

---

## Available Scripts

| Script     | Command                                      | Description                            |
| ---------- | -------------------------------------------- | -------------------------------------- |
| `start`    | `ng serve`                                   | Start development server               |
| `build`    | `ng build`                                   | Production build into `dist/`          |
| `watch`    | `ng build --watch --configuration development` | Dev build with watch mode           |
| `test`     | `ng test --coverage`                         | Run unit tests with coverage report    |
| `test:watch` | `ng test`                                 | Run unit tests in watch mode           |
| `deploy`   | `npm run build && wrangler deploy`           | Build and deploy to Cloudflare Pages   |
| `preview`  | `npm run build && wrangler dev`              | Build and preview locally via Wrangler |

---

## Testing

### Framework

Tests are written with **Vitest** (v4), configured via `vitest.config.ts` and executed through the Angular CLI test builder (`@angular/build:unit-test`). DOM emulation uses **jsdom**.

### Coverage Requirements

All code must maintain minimum **90% coverage** across:

| Metric     | Threshold |
| ---------- | --------- |
| Statements | 90%       |
| Branches   | 90%       |
| Functions  | 90%       |
| Lines      | 90%       |

### Current Coverage

| Metric     | Coverage |
| ---------- | -------- |
| Statements | 97.26%   |
| Branches   | 100%     |
| Functions  | 95%      |
| Lines      | 100%     |

### Running Tests

```bash
# Full test suite with coverage
npm test

# Watch mode
npm run test:watch
```

### Test Suites

- **`app.spec.ts`** — 3 tests covering component creation, nav items rendering, and `scrollTo()` behavior.
- **`profile.page.spec.ts`** — ~29 tests covering component lifecycle, modals (open/close/Escape), certificate grid, contact form validation and submission, mouse tilt effects, computed properties (`yearsOfExperience`, `summary`), and template rendering.

---

## Deployment

The site is deployed to **Cloudflare Pages** using the `wrangler` CLI.

```bash
npm run deploy      # builds + deploys
npm run preview     # builds + serves locally via wrangler
```

A `public/_redirects` file handles SPA routing: all paths serve `/index.html` with a 200 status.

---

## CI / CD

GitHub Actions workflow (`.github/workflows/project.yml`) runs on every push:

1. **Build** — `npm install && npm run build`
2. **Test** — `npm test` (generates coverage report)
3. **SonarCloud Analysis** — Static code analysis with quality gate enforcement

---

## License

&copy; 2026 Akshit Vaishnav. All rights reserved.
