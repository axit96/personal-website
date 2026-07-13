# personal-website

Angular 21 standalone SPA — portfolio site with zero services, zero HTTP calls, no NgModules.

## Commands

| Command | What it runs |
|---|---|
| `npm start` | `ng serve` (dev at localhost:4200) |
| `npm run build` | `ng build` (production to `dist/`) |
| `npm test` | Vitest with coverage — `ng test --coverage --runner-config vitest.config.ts` |
| `npm run test:watch` | `ng test --runner-config vitest.config.ts` |
| `npm run deploy` | `npm run build && wrangler deploy` |
| `npm run preview` | `npm run build && wrangler dev` |

## Architecture

- **Routing**: `app.routes.ts` — `/` → redirect `/profile`, `/**` → redirect `/profile`. Only one route (`/profile`), lazy-loaded `ProfilePage`.
- **Data**: All content hardcoded in `src/app/profile/profile.data.ts`. No HTTP, no services, no state management.
- **Entrypoint**: `src/main.ts` → `bootstrapApplication(App, appConfig)` (no NgModule).
- **Contact form**: `mailto:` link — no backend.
- **Modals**: Certificate slug stored in query param `?cert=` via `history.replaceState`. Escape key closes modal via `@HostListener`.
- **Scroll**: Native `scrollIntoView({ behavior: 'smooth' })`, not Angular fragment routing. `withInMemoryScrolling()` enabled for anchor/position restoration.
- **Styling**: SCSS with CSS custom properties, light theme only.

## Testing quirks

- **Vitest 4 with jsdom** — NOT Karma/Jasmine despite `ng test` command. Tests use `vi.fn()`, `vi.spyOn()`.
- **Coverage threshold**: 90% statements, branches, functions, lines (configured in `vitest.config.ts`). HTML files excluded from coverage.
- **Test files**: `src/app/app.spec.ts` and `src/app/profile.page.spec.ts` — only two test files.
- **Test pattern**: async `setup()` helper via `TestBed.configureTestingModule({ imports: [ProfilePage], providers: [provideRouter([])] })`.
- **`profile.data.ts`** excluded from SonarCloud CPD (duplication detection).

## CI / quality

- GitHub Actions: `npm ci && npm run build && npm test` → SonarCloud.
- SonarCloud config in `sonar-project.properties` (project key: `axit96_personal-website`).
- Prettier: single quotes, 100 print width, `angular` parser for HTML.
- EditorConfig: 2-space indent, UTF-8, trailing newline.

## Deployment

- Cloudflare Pages via `wrangler`. SPA redirect in `public/_redirects`: `/* /index.html 200`.
- Only partial CI workflow — deploy step is commented out.

## Accessibility

- `prefers-reduced-motion` disables all animations.
- Semantic HTML, `aria-label` on nav, alt text on images.
