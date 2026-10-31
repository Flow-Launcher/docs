# Quick Start Guide

**New to Flow Launcher?** This page gets you productive in 5 minutes.

Flow Launcher is a keyboard-driven launcher for Windows. Press a hotkey, type something, press Enter. That's the core loop — but there's a lot of power underneath once you know where to look.

## Step 1 — Open Flow

By default, Flow is triggered with `Alt + Space`. You can change this under **Settings → Hotkeys → Open Flow Launcher**.

> **Tip:** If Flow doesn't open, check your system tray — look for the Flow icon. Right-click it to access Settings.

## Step 2 — Search for anything

Just start typing. Flow searches across:

- **Applications** — type `chr` to search for Chrome, `vs` for Visual Studio Code, etc.
- **Files and folders** — type part of a filename and Flow finds it
- **Calculator** — type `14 * 3` and see the result immediately
- **Web searches** — type `cats` and select the Google result to search Google for "cats"
- **System commands** — type `shutdown`, `lock`, `restart`, or `sleep`

## Step 3 — Understand action keywords

Some plugins only activate when you type a specific **action keyword** first. This keeps results focused and prevents clutter.

For example:
- `wiki <query>` → Wikipedia search
- `> <command>` → run a shell command
- `doc: <text>` → search inside file contents

To see all currently active keywords, type **`?`** in the search bar. Refine by typing the first letter or two of the keyword you're looking for.

> **Global vs. dedicated keywords:** Plugins set to the `*` keyword respond to every query. Plugins with a dedicated keyword (like `wiki`) only respond when you type that prefix. You can customise keywords per-plugin in **Settings → Plugins**.

## Step 4 — Use the context menu

Every result has a **context menu** with additional actions specific to that plugin.

To open it:
- Press **→** (right arrow) on a highlighted result, or
- **Right-click** a result with your mouse

For example, a file result might offer: *Open containing folder*, *Copy path*, *Run as administrator*.

## Step 5 — Customise your settings

Open Settings by:
- Typing `settings` in Flow, or
- Pressing `Ctrl + I` while Flow is open, or
- Right-clicking the Flow icon in the system tray and choosing **Settings**

Key things to configure early:

| Setting | Where to find it |
|---|---|
| Change the hotkey | Hotkeys → Open Flow Launcher |
| Change the theme | Appearance → Theme |
| Add or remove plugins | Plugin Store tab |
| Set a plugin's action keyword | Plugins → [plugin name] → Action Keyword |
| Prioritise a plugin's results | Plugins → [plugin name] → Priority |

## Useful things you might not discover on your own

See [Usage Tips](/usage-tips.md#searching) for matching tips, [Plugin Manager commands](/usage-tips.md#plugins), and [portable mode and settings](/usage-tips.md#settings). For keyboard shortcuts, see [Keyboard Shortcuts](/keyboard-shortcuts.md).

## Next steps

- Browse the [Plugin Store](https://www.flowlauncher.com/plugins/) to extend Flow
- Read [Usage Tips](/usage-tips.md) for power-user tricks
- Explore [Settings](/settings.md)
- Build your own plugin → [Plugin Development](/plugin-dev.md)
