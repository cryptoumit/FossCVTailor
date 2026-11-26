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
Print keeps text selectable and avoids screenshot rasterization or a server-side PDF service. Browser pagination and appearance vary; automated print QA remains a required later phase.

## No default AI provider
The app has no AI dependency and sends no CV data out of the browser. Any future provider must have explicit user consent and must return suggestions that are reviewed before applying.

## Additive profile sections
Certifications, projects, publications, awards, and custom sections are optional arrays with empty defaults. Existing schema-version-1 profile records remain valid without a data migration. Add migration logic only if a future incompatible data-format change requires it.
