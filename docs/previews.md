# Preview artwork

The preview images under `public/skills/<slug>/` are the real result previews published for each
Skill on [skillry.dev](https://skillry.dev), downloaded locally so the demo renders them offline
without hotlinking.

Per Skill:

| File | Used by |
| --- | --- |
| `card.webp` | catalog cards, "similar skills" |
| `main.webp` | detail hero, run-result preview |
| `alt-1.webp`, `alt-2.webp` | extra gallery thumbnails (not every Skill has them) |

Source pattern: `https://skillry.dev/skills/<vendor-slug>/media/preview-<n>.webp?variant=card|detail`,
where `<vendor-slug>` is the Skill's slug prefixed with `bs-`.

If an image is ever missing, the UI falls back to a procedural SVG scene
(`src/components/lab/artifact-preview.tsx`) so a card never renders empty.
