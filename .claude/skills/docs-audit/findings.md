# findings.md

`<notes>/findings.md` lists every change you made and every open question, so the user can categorize each one and the PR body and self-review can be built from it.

## Rules

- **One item per change or question.** Group by page, then by commit (A: the audited PR's text, B: the rest, C: tooling).
- **Cite the source for every fact-check.** Use a GitHub permalink pinned to a commit SHA, with line numbers (see setup.md). Use reference-style links (`[Settings.cs][settings-hotkey]`) with the definitions at the bottom, so the items stay readable.
- **Say what you checked** when you couldn't confirm something, and don't edit the page.
- Mention test programs you ran, and anything not tested inside Flow.
- Keep a short header: the categories, the source SHA, and the editing policy.

## Categories

The user decides each item's category. Until they do, add a suggestion at the end of the item: `_(suggest: FIX)_`. Once decided, prefix the item: `- [FIX] …`. An item can have several, e.g. `[WONTFIX] [UPSTREAM]`.

| Category | Meaning | What happens |
|---|---|---|
| ASK | A question for the PR's reviewers | Goes in the PR body's Questions section |
| WONTFIX | No action | Nothing |
| FIX | Change the docs; obvious from the diff | In the PR; not called out in the PR body |
| EXPLAIN | Change the docs; worth calling out | In the PR; listed under Notable changes in the PR body |
| PR-TO-EXAMPLE | The problem is in a sample repo | Separate PR to that repo, later |
| VERIFY | Needs manual testing before submitting (e.g. in Flow, or in a browser with `just serve`) | The user or agent tests it |
| FOLLOWUP | Worth doing in a separate docs PR | Listed for later |
| UPSTREAM | A Flow.Launcher bug or limitation | Issue or PR on Flow.Launcher, later |

If an item's category means a change you haven't made yet (e.g. it became FIX), make it in the right commit.

## Item format

```markdown
- [EXPLAIN] **stderr**: v1 throws when stderr is non-empty ([JsonRPCPlugin.cs][v1-stderr]), so "debug output must go to stderr" was wrong. Now it says to use a log file.
- `context_menu` receives `[ContextData]`, not the result object ([JsonRPCPlugin.cs][v1-contextmenu]). _(suggest: FIX)_

[v1-stderr]: https://github.com/Flow-Launcher/Flow.Launcher/blob/<sha>/Flow.Launcher.Core/Plugin/JsonRPCPlugin.cs#L213-L221
```
