# Run these commands with just: `winget install Casey.Just`
[windows]
set shell := ["cmd.exe", "/c"]

@list:
  just --list --unsorted

# Regenerate API-Reference from Flow.Launcher.Plugin doc comments
generate-api-docs:
    dotnet run --project Flow.Launcher.DocsGen -c Release -- \
        Flow.Launcher.Plugin \
        API-Reference \
        --clean
