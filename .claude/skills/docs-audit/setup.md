# Setup

## Repositories

Clone these as **siblings** of the docs repo (same parent directory). Other tooling expects that layout: the `justfile`'s `api-docs` recipe and `Directory.Build.props` look for `../Flow.Launcher`.

| Directory | Repository | Used for |
|---|---|---|
| `../Flow.Launcher` | https://github.com/Flow-Launcher/Flow.Launcher | Source of truth for facts and code samples; `just api-docs` |
| `../Flow.Launcher.Plugin.HelloWorldPython` | https://github.com/Flow-Launcher/Flow.Launcher.Plugin.HelloWorldPython | Sample referenced by develop-python-plugins.md |
| `../Flow.Launcher.Plugin.HelloWorldNodeJS` | https://github.com/Flow-Launcher/Flow.Launcher.Plugin.HelloWorldNodeJS | Sample referenced by develop-nodejs-plugins.md |
| `../plugin-samples` | https://github.com/Flow-Launcher/plugin-samples | C# samples referenced by develop-dotnet-plugins.md |
| `../dotnet-template` | https://github.com/Flow-Launcher/dotnet-template | `dotnet new flow-plugin` template |
| `../flow-launcher-helper` | https://github.com/gabrielcarloto/flow-launcher-helper | Community TypeScript helper (its types can drift from Flow's) |

Add any other repo the docs link to as a sample or reference, and add it to this table.

```sh
cd ..   # the parent of the docs repo
git clone https://github.com/Flow-Launcher/Flow.Launcher.git          # if missing
git -C Flow.Launcher fetch origin                                     # if present
# …same for the others
```

Remotes: `origin` is the upstream repo. To send a PR to a sample repo, the user needs a fork. Ask before creating one (it changes their GitHub account), then run `gh repo fork --remote --remote-name me` in that clone. In the docs repo, the user's fork is usually the `origin` or `me` remote; check `git remote -v`.

## Source of truth

The docs describe the released app, so read Flow.Launcher from `origin/master`, not the working tree (which may be on a feature branch):

```sh
git -C ../Flow.Launcher show origin/master:<path>
git -C ../Flow.Launcher grep -n <pattern> origin/master -- <paths>
SHA=$(git -C ../Flow.Launcher rev-parse origin/master)   # pin source links to this
```

Source links: `https://github.com/Flow-Launcher/Flow.Launcher/blob/$SHA/<path>#L<start>-L<end>`. Spot-check the line ranges before using them.

Sample repos: read their default branch and pin links to its commit SHA in the same way.

Release notes (for version claims): `gh release view <tag> -R Flow-Launcher/Flow.Launcher`.

## Tools

`just`, Node.js (for `npx` lint tools and `scripts/lint-links.mjs`), `gh` (authenticated), and `dotnet` for `just api-docs`. To compile code samples: Go, Rust (`cargo`), Python, as needed.

## Testing behavior

When the source isn't conclusive, write a small throwaway program in `<notes>/` (gitignored), not elsewhere in the docs repo. Examples from past audits:

- A .NET program calling `Type.GetMethod` showed that JSON-RPC v1 `Flow.Launcher.*` actions need every parameter.
- A StreamJsonRpc harness (same package version as Flow) captured the real v2 wire format.

Compile and run every code sample you change. Say plainly when something was not tested inside Flow itself.
