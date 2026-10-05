[windows]
set shell := ["cmd.exe", "/c"]

# Serve the docs locally with live reload.
serve:
    npx --yes docsify-cli serve . --port 3000
