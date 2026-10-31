# Review rounds

After each round of changes, the user reviews:

- the diff of each commit (`git diff <base> A`, `git diff A B`, …);
- findings.md.

They leave comments in their editor (if a review-comment tool is available, read and reply to comments with it), in chat, or as answers to your questions. Repeat until the user is satisfied and every findings item has a category they decided.

## Each round

1. Read every comment. Act on each one or answer it, and say which.
2. Answer questions with evidence: source permalinks, release notes, or the GitHub issue or discussion where something was decided. Search the Flow-Launcher repos' issues and discussions (`gh search issues --repo Flow-Launcher/<repo> --commenter <user> <terms>`) when the user remembers asking about something.
3. Apply category decisions to findings.md. Only prefix items the user decided; leave your suggestions as `_(suggest: X)_`.
4. Make the resulting doc changes in the right commit. Keep commits A, B, and C separate:
   - Small change: commit it, then fold it in with `git commit --fixup=<commit>` and `GIT_SEQUENCE_EDITOR=: git rebase -i --autosquash <base>` (non-interactive).
   - Policy change (e.g. "make far fewer edits"): rebuild the commits. Keep a backup branch first (`git branch <branch>-v1`). Reset to the base, reapply only the approved edits from the base's text, and commit A, then B, then cherry-pick C.
5. Run `just lint`. Update the checklist, findings.md, and the PR draft.
6. Summarize briefly what changed and what needs the user's decision.

## Lessons from past audits

- **Rephrasing is the most common reason edits get rejected.** Keep the author's wording and point of view. Example: keep "When a user triggers your plugin" (it describes usage), even if a rewrite would be more precise about internals. Only edit what the policy allows.
- Check CodeRabbit or other bot suggestions against the source before applying them. Several past ones were wrong (e.g. bumping a Node version Flow pins on purpose).
- Uncommitted changes in the working tree that you didn't make belong to the user. Leave them alone and keep them out of your commits.
