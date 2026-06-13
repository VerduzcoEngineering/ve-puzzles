# ve-puzzles

**Verduzco Engineering — "Find the Mistake" puzzle catalog.**

A growing public library of small hardware / firmware engineering brain-teasers.
Each puzzle shows a buggy snippet (code, schematic, or spec), a few choices, and
then the diagnosis plus the lesson. No sign-up, no pitch — just the kind of fault
we catch in a design review.

The website at [verduzcoengineering.com](https://verduzcoengineering.com) pulls one
puzzle per day from this repo. The same records are reused for social posts.

## Layout

```
puzzles/VE-PUZ-0001.json   # one card per puzzle (machine-readable)
puzzles/VE-PUZ-0001.md     # OPTIONAL rich "full breakdown" (prose, equations, diagrams)
index.json                 # generated manifest of every card — consumers read this
scripts/build-index.mjs    # regenerates index.json from puzzles/*.json
SCHEMA.md                  # field reference
```

## Card schema (summary)

| field | meaning |
|-------|---------|
| `id` | stable ID, e.g. `VE-PUZ-0007` — cited in URLs + posts |
| `kind` | `code` \| `schematic` \| `spec` |
| `topic` | tags (also used as social hashtags) |
| `difficulty` | `intro` \| `journeyman` \| `gnarly` |
| `prompt` | the scenario / question |
| `snippet` | code or ASCII schematic (monospace) |
| `lang` | snippet language (optional) |
| `choices` | multiple-choice options |
| `answerIndex` | index of the correct choice |
| `reveal` | the diagnosis |
| `lesson` | the takeaway |
| `hasBreakdown` | whether a matching `.md` rich breakdown exists |

See [SCHEMA.md](SCHEMA.md) for the full reference.

## Adding a puzzle

1. Copy an existing `puzzles/VE-PUZ-XXXX.json`, bump the ID.
2. Fill in the fields. Keep the engineering airtight — these are public.
3. (Optional) add `puzzles/VE-PUZ-XXXX.md` for a deep breakdown and set `hasBreakdown: true`.
4. Run `node scripts/build-index.mjs` to refresh `index.json`.
5. Open a PR.

## License

Puzzle content (prompts, diagnoses, lessons): **CC BY 4.0** — share and adapt with
attribution to Verduzco Engineering. Code snippets are illustrative and unrestricted.
