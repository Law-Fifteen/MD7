# MD7 Sales Academy

React + Tailwind training platform for the MD7 Sales Framework.

## Product Direction

This is designed as a premium commercial academy and knowledge system, not a traditional LMS or document viewer. The first build emphasizes:

- Calm executive UI with glass-inspired surfaces.
- Object-driven content architecture.
- Guided chapter learning plus searchable knowledge objects.
- Local-first progress and reflection state for the MVP.
- Content generated from `Resources/MD7 Sales Framework.docx`.

## Source Content

Run this after updating the DOCX:

```bash
pnpm extract:content
```

The extractor writes `src/content/generatedContent.ts` and currently creates:

- Chapters from DOCX headings that match `Chapter <number> -/— <title>`.
- Chapter sections from heading structure.
- Reusable knowledge objects for chapters and sections.
- Objectives, summaries, AE signals, mistakes, and coaching questions when those sections are present.

## Known Source Notes

- The DOCX heading flow jumps from Chapter 5 to Chapter 7.
- Several later subsections use `Heading 1`, so chapter detection is title-pattern based rather than style-only.
- The MVP preserves source numbering instead of inventing missing chapters.

## Run

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```

## Architecture

- `src/App.tsx` controls view state and local progress.
- `src/components` contains reusable UI surfaces.
- `src/content/generatedContent.ts` is generated from the DOCX.
- `src/content/platform.ts` contains product-level navigation and MVP notes.
- `tools/extract_docx_content.py` is the DOCX-to-content pipeline.
