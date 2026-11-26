# FossCVTailor

A free, local-first workspace for building CVs, cover letters, and a job search pipeline. No account, subscription, analytics, or remote service is required.

## View online

FossCVTailor is available on [GitHub Pages](https://cryptoumit.github.io/FossCVTailor/).

## Run locally

Install Node.js 20+ and npm, then run `npm install`, `npm run dev`. Use `npm run build` for a production build and `npm test` for the unit suite.

## Current functionality

- Private browser storage using IndexedDB, with autosaving profile and document records.
- Master profile editing for contact details, summaries, experience and achievement libraries, education, skills, languages, certifications, projects, publications, awards, and custom sections.
- Multiple CV versions, template selection, preview, and browser print-to-PDF.
- Editable DOCX export for CVs and cover letter drafts.
- 50 distinct declarative template definitions across eight categories, with search and ATS classifications.
- Single-column and editorial CV layouts use the full page width; side-rail layouts reserve a separate details column.
- Cover letter drafting, application tracking, and JSON backup/restore.
- Responsive, keyboard-friendly interface with dark mode by default and a light/dark workspace toggle.

PDF/DOCX file parsing, AI-assisted drafting, manual page-break controls, and richer tracker workflows are planned; these are not presented as complete features. PDF uses the browser's print dialog to preserve selectable document text; rendering can vary by browser.

## Architecture

`src/model` owns validated persisted data and template metadata. `src/storage` provides the IndexedDB repository and backup portability. `src/components` contains reusable editing, preview, and navigation pieces; `src/App.tsx` composes screens. CV content is structured independently of template design. Templates are declarative combinations of layout, typography, palette, density, and accent treatment.

## Development

- `npm run dev` starts the Vite development server.
- `npm run build` type-checks and creates a production bundle.
- `npm test` runs unit tests.
- See [AGENTS.md](./AGENTS.md) for repository guidance and architecture boundaries.

All user content stays in this browser by default. Clearing browser storage removes local content, so export a JSON backup regularly. AI is not currently connected and no data is sent externally.


### Editing and imports
The profile editor edits the selected CV version when one is active, and changes autosave locally. Use **Back to CV** to return to its preview. Skills and languages accept comma-separated input. A validated FossCVTailor JSON backup can also be imported from the profile editor; restoring replaces the current local workspace after confirmation.

CV versions can customize section visibility and order, accent color, typeface, and spacing. Named snapshots save and restore a version’s profile and document settings. Undo and redo are available for edits during the current session.

The CV preview supports A4 and US Letter page sizes and adjustable zoom. To run the browser-based preview and pagination checks, install Chromium with `npm run test:render:install`, then run `npm run test:render`.
