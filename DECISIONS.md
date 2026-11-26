# Architecture decisions

## React, TypeScript, Vite
Use a small static frontend suitable for local use and hosting. No server is needed for the core product. TypeScript helps keep profile and document transformations explicit.

## IndexedDB for local persistence
Profiles, versions, letters and applications are private local records. IndexedDB avoids localStorage's small synchronous storage limit. A portable versioned JSON format is provided so browser storage is not the only copy.

## Zod schema validation
Validate both persisted records and backup files at boundaries. Do not trust imported JSON. Add explicit schema version migrations before changing persisted structures.

## Declarative template catalog
Templates share a single structured document renderer, but each configuration defines a genuinely different header, layout, hierarchy, density, typography, and accent. ATS classification is descriptive, not a universal compatibility promise.

## Browser print for PDF in the first iteration
Print keeps text selectable and avoids screenshot rasterization or a server-side PDF service. Browser pagination and appearance vary; the automated Chromium check covers page dimensions and a representative long CV, with full template/profile visual review tracked separately.

## No default AI provider
The app has no AI dependency and sends no CV data out of the browser. Any future provider must have explicit user consent and must return suggestions that are reviewed before applying.

## Additive profile sections
Certifications, projects, publications, awards, and custom sections are optional arrays with empty defaults. Existing schema-version-1 profile records remain valid without a data migration. Add migration logic only if a future incompatible data-format change requires it.


## Additive CV editor settings
CV versions now store section order and visibility, optional design overrides, page size, and named snapshots. These fields are additive and default when missing, so existing schema-version-1 workspaces and backups remain valid without a format migration. Undo/redo history is session-local and is not included in backups.

## Template column behavior
Single-column and editorial templates use the full document width. Templates that place profile details in a side rail reserve a second column. Keep these layout rules in the shared document renderer so all templates continue to use the same content structure.
