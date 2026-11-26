# Roadmap

## Phase 0 — Inspection and planning
- [x] Inspect repository; it contained only LICENSE and a short README.
- [x] Establish architecture, data model direction, risk notes, and build plan.

## Phase 1 — Foundation (complete)
- [x] React + TypeScript + Vite application shell and design system.
- [x] GitHub Pages base path and Actions deployment workflow.
- [x] Validated data model and IndexedDB autosave repository.
- [x] Portable JSON export/import and local data reset.
- Migration support is deferred; new profile collections default to empty in the current schema version.

## Phase 2 — Master profile (foundation delivered)
- [x] Contact details, summary, roles with reusable achievements, education, skills, languages.
- [x] Add certifications, projects, publications, awards, and custom sections.

## Phase 3 — CV editor (complete)
- [x] Multiple CV versions, template selection, live document preview, print export.
- [x] Edit the selected CV version from the profile editor, with autosave, stable achievement state, and comma-friendly list fields.
- [x] Import a validated JSON backup directly from the profile editor.
- [x] Per-version section visibility and ordering, named snapshots, session undo/redo, and design controls.

## Phase 4 — Document engine (complete)
- [x] Print stylesheet, A4/Letter page sizing and selectable text.
- [x] Editable DOCX generation for CVs and letters.
- [x] Page-size and zoom controls with matching PDF and DOCX page dimensions.
- [x] Automated Chromium preview and multipage print checks.

## Phase 5–6 — Template library
- [x] 50 template configurations across the requested eight categories.
- [x] Render all 50 configurations against one populated representative profile and fix the single-column width issue found in that pass.
- [ ] Review the broader template/profile combinations visually and refine templates based on those renders.

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
- [x] Improve workspace helper text size and dark-theme contrast.
- [ ] E2E coverage, import parsers, 600 visual/profile combinations, accessibility audit, browser-based export tests.

## Risks / limits
- Print-to-PDF depends on browser print behavior and fonts; the browser suite checks page sizing and a long multipage CV, while full visual review across all templates remains pending.
- Pagination can still vary across browsers and fonts; DOCX styling is a semantic, single-column document and does not mirror every template layout.
- Job matching is intentionally not represented as AI; external AI must be opt-in with a review-before-send flow.
