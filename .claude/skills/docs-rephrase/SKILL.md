---
name: docs-rephrase
description: Optional pass that rephrases Flow Launcher docs pages for clarity, concision, and a professional tone, without changing their meaning. Only run it when the user explicitly asks for a rephrasing pass; docs-audit and docs-review never run it.
argument-hint: "[files...]"
disable-model-invocation: true
---

# docs-rephrase

A separate, opt-in pass that rewrites prose to be clearer, more direct, and shorter while keeping exactly what it says. It deliberately does what the strict [docs-review](../docs-review/SKILL.md) wording pass forbids, so keep its changes apart from fact fixes. Reviewers can then judge them on their own.

## Arguments

- **Files**: the pages to rephrase. Ask the user if none are given; don't default to the whole site.

## Goals

- Clarity: one idea per sentence, the main point first, concrete wording.
- Concision: remove filler ("in order to", "simply", "it should be noted that"), redundancy, and hedging.
- Professional tone: plain, factual, third person or direct imperative. No chumminess or conversational framing. Follow [style.md](../docs-review/style.md).
- Obviousness: readers should be able to act on a sentence without reading it twice.

## Must not change

- Meaning. Every fact, condition, caveat, and instruction stays, with the same scope ("usually" stays "usually" unless the source proves otherwise).
- Point of view. Keep describing behavior the way the author did, e.g. in terms of what the user does ("When a user triggers your plugin"), not Flow's internals.
- Code blocks, inline code, keys, setting names, UI labels, file paths, URLs, and link targets.
- Headings, page structure, and the order of sections, unless the user asks.
- Facts. If something looks wrong, don't fix it here; record it for a facts pass.

## Process

1. Work one page at a time. Read the whole page first.
2. Rewrite paragraph by paragraph. Leave sentences that are already clear and short alone.
3. Self-check each changed paragraph against the original: list its facts, conditions, and links; confirm each one is still there; confirm nothing new was added.
4. Run `just lint`.
5. Show the user the diff page by page and let them accept or reject each change.
6. Commit rephrasing separately from fact and lint fixes (e.g. "Rephrase <page> for clarity"), ideally in its own PR.
