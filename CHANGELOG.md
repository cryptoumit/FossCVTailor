## Editor bug fixes
- Profile edits now target the selected CV version consistently; the editor offers a direct return to that CV and reflects the selected profile’s experience and completeness.
- Skills and languages accept comma-separated typing without removing the in-progress comma; achievement edits preserve IDs and selection state.
- Added a validated JSON backup import action to the profile editor with replacement confirmation.
- Increased workspace helper text sizing and improved contrast in dark mode while leaving document preview typography compact.

# Changelog

## GitHub issue templates
- Added structured bug report and feature request forms with reminders not to post private CV or workspace data.

## Theme defaults
- Set dark mode as the default for new workspaces and replaced the top-right letter avatar with a moon/sun theme toggle.

## Master profile sections
- Added structured certifications, projects, publications, awards, and custom sections.
- Included these sections in the live CV document and editable DOCX export.
- Kept the current data version; missing additive collections default to empty.

## 0.1.0 — Initial foundation
- Added local-first FossCVTailor shell, structured profile and versions, 50-template catalog, document preview, print flow, cover letter drafts, application tracker, and JSON portability.
- Added editable DOCX export for CVs and cover letters.
- Documented architecture and phased delivery limits.
