# FossCVTailor

A free, local-first workspace for building CVs, cover letters, and a job search pipeline. No account, subscription, analytics, or remote service is required.

## Run locally

Install Node.js 20+ and npm, then run `npm install`, `npm run dev`. Use `npm run build` for a production build and `npm test` for the unit suite.

## Current functionality

- Private browser storage using IndexedDB, with autosaving profile and document records.
- Master profile editing for contact details, summaries, experience and achievement libraries, education, skills, and languages.
- Multiple CV versions, template selection, preview, and browser print-to-PDF.
- Editable DOCX export for CVs and cover letter drafts.
- 50 distinct declarative template definitions across eight categories, with search and ATS classifications.
- Cover letter drafting, application tracking, and JSON backup/restore.
- Responsive, keyboard-friendly interface and light/dark workspace themes.

File import parsing, AI-assisted drafting, advanced pagination and richer tracker workflows are planned; these are not presented as complete features. PDF uses the browser's print dialog to preserve selectable document text; rendering can vary by browser.

## Architecture

`src/model` owns validated persisted data and template metadata. `src/storage` provides the IndexedDB repository and backup portability. `src/components` contains reusable editing, preview, and navigation pieces; `src/App.tsx` composes screens. CV content is structured independently of template design. Templates are declarative combinations of layout, typography, palette, density, and accent treatment.

## Development

- `npm run dev` starts the Vite development server.
- `npm run build` type-checks and creates a production bundle.
- `npm test` runs unit tests.
- See [AGENTS.md](./AGENTS.md) for repository guidance and architecture boundaries.

All user content stays in this browser by default. Clearing browser storage removes local content, so export a JSON backup regularly. AI is not currently connected and no data is sent externally.
