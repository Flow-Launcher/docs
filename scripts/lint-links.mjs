// Link checks for the docsify site. No dependencies.
//
//   node scripts/lint-links.mjs local     broken links to pages, anchors, and assets
//   node scripts/lint-links.mjs orphans   pages unreachable from README.md / _sidebar.md
//   node scripts/lint-links.mjs sidebar   pages missing from _sidebar.md (API-Reference/ excluded)
//   node scripts/lint-links.mjs headings  pages that don't start with a heading
//   node scripts/lint-links.mjs external  broken http(s) links (slow, uses the network)
//
// Exits non-zero when problems are found.

import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, dirname, relative, posix, sep } from "node:path";

const root = join(dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, "$1")), "..");
const IGNORED_DIRS = new Set([".git", ".github", ".claude", "node_modules", "ci", "scripts", "Flow.Launcher.DocsGen"]);
const ENTRY_PAGES = ["README.md", "_sidebar.md", "_coverpage.md"];
// Stub pages kept so old links still work; they may be unlinked.
const LEGACY_PAGES = new Set(["plugins.md"]);
// Pages that aren't part of the site.
const NOT_SITE_PAGES = new Set(["CONTRIBUTING.md"]);

const toPosix = (p) => p.split(sep).join("/");

function listMarkdown(dir = root) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!IGNORED_DIRS.has(entry.name)) out.push(...listMarkdown(join(dir, entry.name)));
    } else if (entry.name.endsWith(".md")) {
      out.push(toPosix(relative(root, join(dir, entry.name))));
    }
  }
  return out.filter((p) => !NOT_SITE_PAGES.has(p));
}

// Returns [{ url, line }] for every link and image in a page, skipping code.
function extractLinks(text) {
  const links = [];
  let inFence = false;
  text.split(/\r?\n/).forEach((raw, i) => {
    if (/^\s*(```|~~~)/.test(raw)) {
      inFence = !inFence;
      return;
    }
    if (inFence) return;
    const line = raw.replace(/`[^`]*`/g, "");
    const patterns = [
      /\]\(\s*<?([^)\s>]+)>?(?:\s+["'][^"']*["'])?\s*\)/g, // [text](url "title")
      /^\s*\[[^\]]+\]:\s*<?(\S+?)>?(?:\s|$)/g, // [ref]: url
      /\b(?:href|src)\s*=\s*["']([^"']+)["']/g, // <a href> / <img src>
    ];
    for (const re of patterns) {
      for (const m of line.matchAll(re)) links.push({ url: m[1], line: i + 1 });
    }
  });
  return links;
}

// Approximates docsify's heading slugs.
function slugify(heading) {
  return heading
    .replace(/<[^>]+>/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .trim()
    .toLowerCase()
    .replace(/[\s]+/g, "-")
    .replace(/[^\p{L}\p{N}_-]/gu, "");
}

const anchorCache = new Map();
function anchorsOf(page) {
  if (!anchorCache.has(page)) {
    const text = readFileSync(join(root, page), "utf8");
    const slugs = new Set();
    for (const m of text.matchAll(/^#{1,6}\s+(.+?)\s*#*\s*$/gm)) slugs.add(slugify(m[1]));
    for (const m of text.matchAll(/\bid\s*=\s*["']([^"']+)["']/g)) slugs.add(m[1]);
    anchorCache.set(page, slugs);
  }
  return anchorCache.get(page);
}

// Resolves a local link to { file, anchor } (file relative to root), or null if not local.
function resolveLocal(fromPage, url) {
  // Absolute links to the published docs site are checked as local pages.
  const site = url.match(/^https?:\/\/(?:flow-launcher\.github\.io|(?:www\.)?flowlauncher\.com)\/docs\/#(\/[^?#]*)(.*)$/i);
  if (site) url = (site[1] === "/" ? "/README" : site[1]) + site[2];
  if (/^(?:[a-z]+:|\/\/)/i.test(url)) return null;
  let [path, hash] = url.split("#");
  let anchor = hash ? decodeURIComponent(hash) : undefined;
  const query = path.match(/\?id=([^&]+)/);
  if (query) anchor = decodeURIComponent(query[1]);
  path = decodeURIComponent(path.replace(/\?.*$/, ""));
  // Bare anchors in _sidebar / _coverpage point into the page being shown, README.md on the cover.
  if (path === "") return { file: fromPage.startsWith("_") ? "README.md" : fromPage, anchor };
  let file = path.startsWith("/") ? path.slice(1) : posix.join(posix.dirname(fromPage), path);
  file = posix.normalize(file);
  if (file === "." || file === "" || file.endsWith("/")) file = posix.join(file, "README.md");
  const abs = join(root, file);
  if (!existsSync(abs) && existsSync(abs + ".md")) file += ".md";
  else if (existsSync(abs) && statSync(abs).isDirectory()) file = posix.join(file, "README.md");
  return { file, anchor };
}

function checkLocal(pages) {
  const problems = [];
  for (const page of pages) {
    for (const { url, line } of extractLinks(readFileSync(join(root, page), "utf8"))) {
      const target = resolveLocal(page, url);
      if (!target) continue;
      if (!existsSync(join(root, target.file))) {
        problems.push(`${page}:${line}  missing target  ${url}`);
      } else if (target.anchor && target.file.endsWith(".md") && !anchorsOf(target.file).has(target.anchor.toLowerCase())) {
        problems.push(`${page}:${line}  missing anchor  ${url}`);
      }
    }
  }
  return problems;
}

function checkOrphans(pages) {
  const reached = new Set();
  const queue = ENTRY_PAGES.filter((p) => existsSync(join(root, p)));
  while (queue.length) {
    const page = queue.pop();
    if (reached.has(page)) continue;
    reached.add(page);
    for (const { url } of extractLinks(readFileSync(join(root, page), "utf8"))) {
      const target = resolveLocal(page, url);
      if (target?.file.endsWith(".md") && existsSync(join(root, target.file))) queue.push(target.file);
    }
  }
  return pages.filter((p) => !reached.has(p) && !LEGACY_PAGES.has(p)).map((p) => `${p}  not reachable from ${ENTRY_PAGES.join(" / ")}`);
}

function checkSidebar(pages) {
  const listed = new Set();
  for (const { url } of extractLinks(readFileSync(join(root, "_sidebar.md"), "utf8"))) {
    const target = resolveLocal("_sidebar.md", url);
    if (target) listed.add(target.file);
  }
  return pages
    .filter((p) => !p.startsWith("_") && !p.startsWith("API-Reference/") && !LEGACY_PAGES.has(p) && !listed.has(p))
    .map((p) => `${p}  not in _sidebar.md`);
}

// Prose above the first heading renders next to the "Edit this Page" link that index.html adds.
function checkHeadings(pages) {
  return pages
    .filter((p) => !p.startsWith("_"))
    .filter((p) => {
      const first = readFileSync(join(root, p), "utf8").replace(/^﻿/, "").split(/\r?\n/).find((l) => l.trim() !== "");
      return first !== undefined && !/^#{1,6}\s/.test(first);
    })
    .map((p) => `${p}  does not start with a heading`);
}

async function checkExternal(pages) {
  const byUrl = new Map();
  for (const page of pages) {
    for (const { url, line } of extractLinks(readFileSync(join(root, page), "utf8"))) {
      const full = url.startsWith("//") ? "https:" + url : url;
      if (!/^https?:/i.test(full) || resolveLocal(page, full)) continue;
      if (!byUrl.has(full)) byUrl.set(full, []);
      byUrl.get(full).push(`${page}:${line}`);
    }
  }
  const problems = [];
  const urls = [...byUrl.keys()];
  const check = async (url) => {
    const attempt = async (method) => {
      const res = await fetch(url, {
        method,
        redirect: "follow",
        signal: AbortSignal.timeout(20000),
        headers: { "user-agent": "Mozilla/5.0 (flow-launcher-docs link check)" },
      });
      return res.status;
    };
    try {
      let status = await attempt("HEAD");
      if (status >= 400) status = await attempt("GET");
      // 401/403/429: the site refuses bots; not necessarily broken.
      if (status >= 400 && ![401, 403, 429].includes(status)) problems.push(`${status}  ${url}  (${byUrl.get(url).join(", ")})`);
    } catch (e) {
      problems.push(`ERR ${e.cause?.code ?? e.name}  ${url}  (${byUrl.get(url).join(", ")})`);
    }
  };
  for (let i = 0; i < urls.length; i += 8) await Promise.all(urls.slice(i, i + 8).map(check));
  return problems;
}

const mode = process.argv[2];
const pages = listMarkdown();
const checks = { local: checkLocal, orphans: checkOrphans, sidebar: checkSidebar, headings: checkHeadings, external: checkExternal };
if (!checks[mode]) {
  console.error("usage: node scripts/lint-links.mjs <local|orphans|sidebar|headings|external>");
  process.exit(2);
}
const problems = await checks[mode](pages);
for (const p of problems) console.log(p);
console.log(problems.length ? `\n${problems.length} problem(s)` : `${mode}: OK`);
process.exit(problems.length ? 1 : 0);
