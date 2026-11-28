## CV editor controls
- Added per-version section visibility and ordering, with the same settings applied to preview, print/PDF, and DOCX exports.
- Added named profile/template/section snapshots and session-local undo/redo for CV edits.
- Added per-version accent color, font, and spacing controls.

## Document preview and pagination
- Added persisted A4 and US Letter page-size controls plus adjustable preview zoom.
- Kept print/PDF and DOCX exports aligned with the selected page size.
- Added Playwright Chromium checks for preview scale and multipage print output.

## Readable workspace typography
- Applied the readable UI type scale and muted-text contrast to the rest of the workspace (navigation, headings, CV builder side panel, templates, applications tracker, inputs and footer); CV document and print typography are unchanged.

## Profile editing target
- My profile shows whether you are editing the master profile or a CV version, with a selector to switch between them, so the master profile stays reachable after a CV has been created.

## Editor bug fixes
- Profile edits now target the selected CV version consistently; the editor offers a direct return to that CV and reflects the selected profile’s experience and completeness.
- Skills and languages accept comma-separated typing without removing the in-progress comma; achievement edits preserve IDs and selection state.
- Added a validated JSON backup import action to the profile editor with replacement confirmation.
- Increased workspace helper text sizing and improved contrast in dark mode while leaving document preview typography compact.

# Changelog

## Template visual review
- Reviewed all 50 template configurations against a populated sample CV and corrected single-column and editorial layouts that were leaving a narrow unused column.
- Broader profile-combination review remains in progress.

## GitHub issue templates
- Added structured bug report and feature request forms with reminders not to post private CV or workspace data.

## Theme defaults
- Set dark mode as the default for new workspaces and replaced the top-right letter avatar with a moon/sun theme toggle.

## Master profile sections
- Added structured certifications, projects, publications, awards, and custom sections.
- Included these sections in the live CV document and editable DOCX export.
- Kept the current data version; missing additive collections default to empty.

## 0.1.0 — Initial foundation
- Added local-first CVTailor shell, structured profile and versions, 50-template catalog, document preview, print flow, cover letter drafts, application tracker, and JSON portability.
- Added editable DOCX export for CVs and cover letters.
- Documented architecture and phased delivery limits.
