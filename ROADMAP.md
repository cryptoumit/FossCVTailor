# Roadmap

## Phase 0 — Inspection and planning
- [x] Inspect repository; it contained only LICENSE and a short README.
- [x] Establish architecture, data model direction, risk notes, and build plan.

## Phase 1 — Foundation (in progress)
- [x] React + TypeScript + Vite application shell and design system.
- [x] GitHub Pages base path and Actions deployment workflow.
- [x] Validated data model and IndexedDB autosave repository.
- [x] Portable JSON export/import and local data reset.
- [ ] Add migration and broader validation tests.

## Phase 2 — Master profile (foundation delivered)
- [x] Contact details, summary, roles with reusable achievements, education, skills, languages.
- [ ] Add certifications, projects, publications, awards, and custom sections.

## Phase 3 — CV editor (in progress)
- [x] Multiple CV versions, template selection, live document preview, print export.
- [ ] Section visibility/order, version snapshots, undo/redo, design controls.

## Phase 4 — Document engine
- [x] Print stylesheet, A4/Letter page sizing and selectable text.
- [x] Editable DOCX generation for CVs and letters.
- [ ] Page-level preview controls, rendering automation and pagination QA.

## Phase 5–6 — Template library
- [x] 50 template configurations across the requested eight categories.
- [ ] Review every template/profile pairing visually and refine templates based on renders.

## Phase 7 — Job tailoring
- [x] Application records and job description capture.
- [ ] Requirement extraction, evidence matching, reviewable suggestions and tailored snapshots.

## Phase 8 — Cover letters
- [x] Editable local drafts and print preview.
- [ ] Multiple cover-letter layouts, reusable paragraphs and DOCX export.

## Phase 9 — Job tracker
- [x] Status, company, role, date, URL, notes, search, status filtering.
- [ ] Kanban, follow-ups, interview history, contacts and dashboard statistics.

## Phase 10 — QA and polish
- [x] Responsive layout and basic data-model tests.
- [ ] E2E coverage, import parsers, 600 visual/profile combinations, accessibility audit, browser-based export tests.

## Risks / limits
- Print-to-PDF depends on browser print behavior and fonts; no browser/runtime is installed in the current implementation environment, so build and visual verification are pending.
- PDF pagination fidelity requires browser-based regression work; DOCX styling is currently a semantic, single-column document and does not mirror every template layout.
- Job matching is intentionally not represented as AI; external AI must be opt-in with a review-before-send flow.
