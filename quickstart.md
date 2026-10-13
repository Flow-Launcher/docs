# Quick Start Guide

**New to Flow Launcher?** This page gets you productive in 5 minutes.

Flow Launcher is a keyboard-driven launcher for Windows. Press a hotkey, type something, press Enter. That's the core loop — but there's a lot of power underneath once you know where to look.

## Step 1 — Open Flow

By default, Flow is triggered with `Alt + Space`. You can change this under **Settings → General → Hotkey**.

> **Tip:** If Flow doesn't open, check your system tray — look for the Flow icon. Right-click it to access Settings.

## Step 2 — Search for anything

Just start typing. Flow searches across:

- **Applications** — type `chr` to launch Chrome, `vs` for Visual Studio Code, etc.
- **Files and folders** — type part of a filename and Flow finds it
- **Calculator** — type `14 * 3` and see the result immediately
- **Web searches** — type `g cats` to search Google for "cats" (or whichever search engine you've configured)
- **System commands** — type `shutdown`, `lock`, `restart`, or `sleep`

## Step 3 — Understand action keywords

Some plugins only activate when you type a specific **action keyword** first. This keeps results focused and prevents clutter.

For example:
- `g <query>` → Google search
- `wt` → open Windows Terminal
- `fd <filename>` → file search via Everything

To see all currently active keywords, type **`?`** in the search bar. Refine by typing the first letter or two of the keyword you're looking for.

> **Global vs. dedicated keywords:** Plugins set to the `*` keyword respond to every query. Plugins with a dedicated keyword (like `g`) only respond when you type that prefix. You can customise keywords per-plugin in **Settings → Plugins**.

## Step 4 — Use the context menu

Every result has a **context menu** with additional actions specific to that plugin.

To open it:
- Press **→** (right arrow) on a highlighted result, or
- **Right-click** a result with your mouse

For example, a file result might offer: *Open containing folder*, *Copy path*, *Run as administrator*.

## Step 5 — Customise your settings

Open Settings by:
- Typing `settings` in Flow, or
- Typing **`flow user data`** to open your config folder directly

Key things to configure early:

| Setting | Where to find it |
|---|---|
| Change the hotkey | General → Hotkey |
| Change the theme | Appearance → Theme |
| Add or remove plugins | Plugin Store tab |
| Set a plugin's action keyword | Plugins → [plugin name] → Action Keyword |
| Prioritise a plugin's results | Plugins → [plugin name] → Priority |

## Useful things you might not discover on your own

**Fuzzy and acronym matching** — You don't need to type the full name of an app. `gkp` matches *GitKraken Preview*, `acr` matches *Acrobat Reader DC*, and `code` or `visual` both match *Visual Studio Code*.

**Run as administrator** — Highlight any result and press `Ctrl + Shift + Enter` to run it as admin.

**Open folder instead of navigating into it** — In Explorer results, press `Ctrl + Enter` to open the folder directly in File Explorer.

**Reload plugins** — Press `F5` in the query window, or type `reload plugin data`, to refresh all plugin data (useful after installing new apps or bookmarks).

**Plugin Manager** — Install, uninstall, or update plugins without leaving Flow. Type:
- `pm install <plugin name>`
- `pm uninstall <plugin name>`
- `pm update <plugin name>`

**Portable mode** — Flow is self-contained and can run from a USB drive or cloud folder (like Dropbox). Type `Flow Launcher UserData Folder` to see where your settings are stored.

**Back up your settings** — Copy the `UserData` folder (found via `Flow Launcher UserData Folder`) to back up everything: settings, plugins, themes, and history.

## Next steps

- Browse the [Plugin Store](plugins.md) to extend Flow
- Read [Usage Tips](usage-tips.md) for power-user tricks
- Explore [Settings](settings.md)
- Build your own plugin → [Plugin Development](plugin-dev.md)
