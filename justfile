set windows-shell := ["powershell.exe", "-NoLogo", "-NoProfile", "-Command"]

# Path to a local clone of https://github.com/Flow-Launcher/Flow.Launcher
flow_launcher := justfile_directory() / ".." / "Flow.Launcher"

# List recipes
default:
    @just --list

# Serve a live preview of the docs at http://localhost:3000
serve:
    npx --yes docsify-cli serve . --port 3000

# Regenerate API-Reference/ from Flow.Launcher.Plugin (same command as .github/workflows/regenerate-api-docs.yml)
api-docs:
    dotnet run --project Flow.Launcher.DocsGen -c Release -p:FlowLauncherRepo="{{flow_launcher}}" -- Flow.Launcher.Plugin API-Reference --clean

# Run every lint check
lint: lint-links lint-orphans lint-sidebar lint-headings lint-md lint-spell lint-links-external

# Broken links to pages, anchors, and assets
lint-links:
    node scripts/lint-links.mjs local

# Pages that can't be reached by following links from README.md or _sidebar.md
lint-orphans:
    node scripts/lint-links.mjs orphans

# Pages missing from _sidebar.md
lint-sidebar:
    node scripts/lint-links.mjs sidebar

# Pages that don't start with a heading (prose would render next to "Edit this Page")
lint-headings:
    node scripts/lint-links.mjs headings

# Broken http(s) links (uses the network)
lint-links-external:
    node scripts/lint-links.mjs external

# Markdown lint (config: .markdownlint-cli2.jsonc)
lint-md:
    npx --yes markdownlint-cli2 "**/*.md"

# Spell check (config: cspell.json)
lint-spell:
    npx --yes cspell --no-progress "**/*.md"
