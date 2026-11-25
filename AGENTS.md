# Agent guidance

## Project

FossCVTailor is a local-first CV and cover letter workspace. The browser is the default trust boundary: user content must stay local unless a future feature explicitly asks for informed consent before sending it elsewhere.

## Setup and checks

- Install Node.js and dependencies with `npm install`.
- Start the app with `npm run dev`.
- Run `npm test` for unit tests, `npm run lint` for linting, and `npm run build` for type-checking and the production build.
- Update `ROADMAP.md` when meaningful product work is completed, and keep `README.md`, `DECISIONS.md`, and `CHANGELOG.md` consistent with implemented behavior.

## Architecture boundaries

- `src/model/` owns validated data structures and declarative template metadata.
- `src/storage/` owns IndexedDB persistence and import/export boundaries. Validate data with the schemas in `src/model/schema.ts` before persisting or accepting backups.
- `src/components/` contains reusable UI and document rendering. Keep document styles independent of workspace theme styles.
- `src/App.tsx` composes application screens. Move reusable or substantial workflows into their own components as the app grows.
- Keep template content and visual configuration separate. Avoid implementing each template as an independent renderer.

## Product requirements

- Do not add account requirements, paid services, telemetry, or network calls to core workflows.
- Never add secrets or API keys to frontend code. AI must remain optional, consent-based, and suggestion-only until users review its output.
- Never invent candidate facts, metrics, qualifications, or employment history.
- Keep backup and restore portable and validate imported data before replacing the user's current workspace.
- Describe ATS compatibility as a tradeoff, not as a guarantee.
- Keep buttons functional and make unfinished capabilities explicit in the UI and documentation.
- Preserve keyboard access, visible focus, semantic controls, and responsive behavior.

## Change practices

- Prefer small, typed modules and reusable components over large screens with embedded business logic.
- Use stable record IDs, not array positions, when updating persisted records.
- Update tests when changing schemas, storage, templates, or export behavior.
- Do not claim build, test, or visual verification unless those checks were actually run.
- Record schema changes and any required migrations in `DECISIONS.md` and implement migration logic before changing persisted formats.
