# PR draft

Write the PR title and body to `<notes>/prs/<branch>.md`. The user edits it and submits the PR themselves. Never create the PR without their explicit go-ahead.

Audience: the docs maintainers reviewing the PR. Keep it short; they'll read the diff and the self-review comments for details.

## Template

```markdown
<!-- DRAFT. Target: Flow-Launcher/docs `<target branch>`, from <user>:<branch> -->

# Title

<What the PR does, ≤ 70 characters, e.g. "Review fixes for #101: facts, code samples, and lint tooling">

# Body

<One sentence of context, e.g. "Follow-up to my review of #101.">. Three commits, which can be taken separately:

1. **Fixes to text added by #N**: …
2. **The same kind of fixes for pages #N didn't touch.**
3. **Tooling**: …

Prose is left as written apart from typos, grammar, and sentences called out in review.

## Notable changes

<One bullet per EXPLAIN item: what was wrong and what's true now, in one or two sentences.>

## Questions

<One bullet per ASK item: the context in one sentence, a link if useful, then the question.>
```

Update the draft after each review round. The title and body go to `gh pr create --title … --body-file <file>` without the `# Title` / `# Body` scaffolding; strip those headings when passing the file.
