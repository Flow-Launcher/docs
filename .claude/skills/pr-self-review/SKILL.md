---
name: pr-self-review
description: Post a self-review on your own docs PR, with one terse inline justification comment, plus a source link, for every change. Use after a docs PR from a docs-audit is submitted, or when asked to justify a PR's changes with review comments. Posting is outward-facing; only do it when the user asks.
argument-hint: "<PR number>"
---

# pr-self-review

Human reviewers need to understand every change without asking. Post one inline comment per change on the PR, saying why it was made.

## 1. List every change

From a local clone with the PR head fetched:

```sh
gh pr view <N> -R Flow-Launcher/docs --json headRefOid,baseRefOid
git diff -U0 <base>...<head> -- '*.md' '*.html'
```

Every hunk needs a comment, except new tooling files (skills, `scripts/`, configs), which the PR body covers. One comment can cover a block of related lines (use `start_line`) or say "Same below." for repeats of the same fix on one page.

## 2. Write the justifications

Take the reasons from the audit's findings.md. Each comment is **one sentence or less**: terse, direct, a fragment if possible. Examples:

- `` `IPublicI18n` doesn't exist; `IPluginI18n` does: https://github.com/Flow-Launcher/Flow.Launcher/blob/<sha>/Flow.Launcher.Plugin/Interfaces/IPluginI18n.cs#L8 ``
- `Any stderr output throws and the response is discarded: <permalink>`
- `Descriptive link text instead of "here" (markdownlint MD059).`
- `Linked page was deleted in #101; that section is now on this page.`
- `Typo.` / `Grammar: singular.` / `Tightened per review: wordy.`

Rules:

- Factual fixes link the source that proves them: a permalink pinned to a commit SHA, with line numbers.
- Lint fixes name the rule.
- Wording changes say why (filler, hedging, broken grammar, or "per review" when the PR author asked for them).
- Comments on deleted lines use `"side": "LEFT"` and the old line number.

Write them to `<notes>/review-comments.json`:

```json
[
  { "path": "develop-dotnet-plugins.md", "line": 61, "body": "`IPublicI18n` doesn't exist; …" },
  { "path": "keyboard-shortcuts.md", "start_line": 23, "line": 25, "body": "…" },
  { "path": "develop-executable-plugins.md", "line": 54, "side": "LEFT", "body": "v1 never sends `initialize` …" }
]
```

Build it with a small script if there are many; it's easier to review and fix than hand-written JSON.

## 3. Check, then post

```sh
node .claude/skills/pr-self-review/post-review.mjs --repo Flow-Launcher/docs --pr <N> --comments <notes>/review-comments.json --dry-run
```

The dry run checks every line against the PR diff. Show the user the comment count and a few samples, and **post only after they confirm**. Then run the same command without `--dry-run`, in the background (it can take a while).

## Rate limits

GitHub's secondary rate limit on content creation is strict. In a past run, 80 comments (4 reviews of 20, 75 s apart) went through, then the account was blocked for several minutes, without a `retry-after` header. The script:

- posts batches of 20, at least 75 s apart;
- waits per `retry-after` / `x-ratelimit-reset`, falling back to exponential backoff;
- records posted batches in `<comments>.posted.json`, so it can be rerun safely;
- stops if the PR head changes. Don't push to the PR branch while it runs.

Never retry blindly in a loop: requests made while blocked can extend the block. For 100+ comments, expect it to take a while; consider `--batch 10`.
