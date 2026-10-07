---
name: docs-audit
description: End-to-end audit of the Flow Launcher docs, or of a docs PR. Covers setup (cloning Flow.Launcher and the sample repos), fact/code/wording passes, findings.md, review rounds with the user, categorizing every change, drafting the PR title and body, and posting a justification comment for every change after the PR is submitted. Use when asked to audit, review, or fact-check the docs or a docs PR end to end.
argument-hint: "[PR number or branch to audit]"
---

# docs-audit

The full workflow. Phases run in order; most phases end with the user reviewing your work. Keep a checklist of the phases in `<notes>/phases.md` and tick items off as you go.

The editing passes themselves are in the [docs-review](../docs-review/SKILL.md) skill. The final self-review is in the [pr-self-review](../pr-self-review/SKILL.md) skill.

## 0. Scope

Ask the user:

- What to audit: a docs PR (e.g. `#101`), or the whole site.
- A name for the audit. Notes (findings, PR draft, review comments, test programs) go in `.audit/<audit-name>/` in the docs repo, referred to below as `<notes>`. `.audit/` is gitignored and excluded from `just lint`, so notes are never committed.

## 1. Setup

Follow [setup.md](setup.md): clone or update Flow.Launcher and the sample repos as siblings of the docs repo, and record the Flow.Launcher `master` SHA used for source links.

Create a branch for the fixes:

- Auditing PR `#N` on branch `X`: `git switch -c X-ai-pass <X's head>`. The fixes become a PR targeting `X`.
- Auditing the whole site: branch off `upstream/main`.

Run `just lint` and note what fails.

## 2. Passes and commits

Run `/docs-review all` (see that skill). The changes go into separate commits, so reviewers can take them separately:

- **Commit A**: fixes to the audited PR's text, `/docs-review all --since <PR base>`. Include fixes for things the PR broke on other lines (e.g. links to pages it deleted).
- **Commit B**: fixes to everything else.
- **Commit C**: tooling changes (skills, `justfile`, `scripts/`, lint configs), if any.

The editing policy is strict (see docs-review's wording.md). Only factual fixes, typos and grammar, removing extraneous words, more confident phrasing, lint fixes, broken links, and changes the user asked for. Human reviewers reject unneeded rephrasing. For a rephrasing pass (clarity, concision, tone), the user can run the separate, opt-in [docs-rephrase](../docs-rephrase/SKILL.md) skill. Never run it as part of this workflow unless asked, and keep its changes in their own commit or PR.

Run `just lint` before each commit. Don't push or open anything on GitHub yet.

## 3. findings.md

Write `<notes>/findings.md` following [findings.md](findings.md). Every change and every unresolved question gets an item with a source link.

## 4. Review rounds

Follow [review-rounds.md](review-rounds.md). The user reviews the diff and findings.md; you answer, change the docs, and update findings.md until every item has a category the user decided.

## 5. PR draft

Write `<notes>/prs/<branch>.md` following [pr-draft.md](pr-draft.md).

## 6. Submit

**Never create, open, or post anything on GitHub without the user's explicit go-ahead for that specific action.**

1. Offer to push the branch to the user's fork (`git push me <branch>`; see setup.md for remotes).
2. Offer to open the PR with `gh pr create --web --repo Flow-Launcher/docs --base <target> --head <user>:<branch> --title … --body-file …`. `--web` only opens the browser with the title and body filled in; the user reviews and submits.
3. Once the PR exists, offer to post the self-review: a terse justification comment on every change, using the [pr-self-review](../pr-self-review/SKILL.md) skill.
