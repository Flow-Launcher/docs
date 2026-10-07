---
name: docs-audit
description: End-to-end audit of the Flow Launcher docs, or of a docs PR. Covers setup (cloning Flow.Launcher and the sample repos), fact/code/wording passes, findings.md, review rounds with the user, categorizing every change, drafting the PR title and body, and posting a justification comment for every change after the PR is submitted. Use when asked to audit, review, or fact-check the docs or a docs PR end to end.
argument-hint: "[PR number or branch to audit]"
---

# docs-audit

The full workflow. Phases run in order; most phases end with the user reviewing your work. Keep a checklist of the phases in the notes directory and tick items off as you go.

The editing passes themselves are in the [docs-review](../docs-review/SKILL.md) skill. The final self-review is in the [pr-self-review](../pr-self-review/SKILL.md) skill.

## 0. Scope

Ask the user:

- What to audit: a docs PR (e.g. `#101`), or the whole site.
- The notes directory: findings and the PR draft live **outside** the docs repo, so they're never committed. Default: `../tasks/<audit-name>/`.

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

The editing policy is strict (see docs-review's wording.md). Only factual fixes, typos and grammar, removing extraneous words, more confident phrasing, lint fixes, broken links, and changes the user asked for. Human reviewers reject unneeded rephrasing.

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
