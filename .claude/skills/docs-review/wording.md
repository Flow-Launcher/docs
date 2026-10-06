# Pass: wording

**Be stringent.** Human reviewers reject prose changes they didn't need. Most sentences should be left exactly as written, even if you would phrase them differently. When in doubt, don't edit.

Allowed edits, and only these:

- Typos and grammar, including inconsistent singular/plural within a sentence or list ("a plugin ... their results").
- Removing extraneous words, without rewording the rest of the sentence. Example: "When you are ready to release your plugin for people to enjoy, head over to Flow's [plugin repo](…) and follow the instructions there in the readme." → "To release your plugin, follow the instructions in Flow's [plugin repo](…)."
- Making a hedged sentence confident: "can help", "you may want to", "it is possible to", "should get you started" → state it directly.
- Clunky product or vendor references. Replace them with a direct link. Example: "a popular third party tool called Everything from the company Voidtools" → "a popular third-party tool called [Everything](https://www.voidtools.com/)".
- Link text "here" → descriptive link text, keeping the rest of the sentence.

Not allowed:

- Rephrasing a correct sentence, restructuring paragraphs or lists, changing tone, or swapping in synonyms.
- Rewording that changes the point of view. Example: keep "When a user triggers your plugin, Flow:" (it describes usage). Don't change it to "Each time Flow needs something from your plugin" (internal behavior).
- Terminology sweeps (e.g. "query window" → "search bar") unless the old term is wrong.
- Adding content: new sentences, new links, extra detail.
- Facts (keywords, hotkeys, versions, paths) and code blocks. Those belong to the facts and code passes; if a fact looks wrong, record it as a finding.
- Page structure and headings, unless a lint rule requires it.
