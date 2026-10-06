---
name: docs-review
description: Review and fix Flow Launcher documentation pages for wording, factual accuracy against the Flow Launcher source, and correctness of code samples. Use when asked to review, proofread, tighten, or fact-check pages in this docs repo.
argument-hint: "<wording|facts|code|all> [files...] [--since <ref>] [--findings <path>]"
---

# docs-review

Reviews pages in this docs repo and edits them in place.

## Arguments

- **Pass**: `wording` ([wording.md](wording.md)), `facts` ([facts.md](facts.md)), `code` ([code-samples.md](code-samples.md)), or `all`. `all` runs `code`, then `facts`, then `wording`, so the wording pass polishes text that is already correct.
- **Files**: the pages to review. The default is every `*.md` page except `API-Reference/` (generated), `_sidebar.md`, `_coverpage.md`, and `CONTRIBUTING.md`.
- **`--since <ref>`**: edit only the lines that `git diff <ref>...HEAD` adds, which is how to review only a PR's text. Leave all other lines unchanged, even when they have problems.
- **`--findings <path>`**: append findings to this file. Without it, list findings in the final reply.

## Rules

- Follow [style.md](style.md).
- Make the smallest edit that fixes each problem. Don't restructure pages, add new content, or remove content, except text that is factually wrong. When fixing a fact, change only the wrong words and keep the author's phrasing.
- Every finding about Flow's behavior must cite the source: a GitHub permalink with line numbers (pin to a commit SHA, e.g. `https://github.com/Flow-Launcher/Flow.Launcher/blob/<sha>/Flow.Launcher.Core/Plugin/ExecutablePlugin.cs#L28-L33`).
- When you're unsure, don't edit. Record a finding instead: `- file.md:LINE — problem — what you checked`.
- Work one page at a time. Read the whole page before editing it.
- Don't commit. The user reviews the diff.
