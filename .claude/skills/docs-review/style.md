# Documentation style

Match the existing tone: plain, factual, third-person. State what a feature does and how to use it directly, without conversational framing ("Say you're...", "Let's say...") or addressing the reader's hypothetical situation before getting to the point.

Good examples to follow:

- [installation.md](../../../installation.md) — states facts plainly ("Flow Launcher can be installed several ways...", "This appears as Flow Launcher has not been downloaded enough times...").
- [settings.md](../../../settings.md) — short declarative sentences, numbered steps with screenshots, no filler.
- [README.md](../../../README.md) — direct "Welcome" intro, one sentence, no chumminess.

Headings use `###` for the page title and `####` for subsections (see usage-tips.md, installation.md).

Every page must start with a heading; no prose may come before it. docsify puts an "Edit this Page" link at the top of each page, and prose above the first heading renders right next to that link. `just lint-headings` checks this.

## Terminology

- **Action keyword**: the prefix that triggers a plugin (e.g. `>` for Shell). Not the plugin's name.
- **Flow** or **Flow Launcher**: both are fine.
- **Search bar**: Flow's text input (as in settings.md). Prefer it over "query window" or "query box".
- **Right-click**, **third-party**, **community-created**: hyphenate compound modifiers.
- Link to other doc pages with root-relative paths: `[Settings](/settings.md)`.
- Link descriptive text, not "here".
