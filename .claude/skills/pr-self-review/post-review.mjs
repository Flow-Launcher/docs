// Post inline review comments on a GitHub PR, in batches, honoring rate limits.
//
//   node post-review.mjs --repo Flow-Launcher/docs --pr 108 --comments review-comments.json [--batch 20] [--dry-run]
//
// review-comments.json: [{ "path": "faq.md", "line": 12, "body": "…", "start_line": 10?, "side": "RIGHT"|"LEFT"? }]
// Lines are new-file line numbers (side RIGHT, the default) or old-file line numbers for deleted lines (side LEFT).
//
// Run from a local clone of the PR's repo, with the PR head commit fetched. The script:
//   - checks every comment's line(s) against `git diff <base>...<head>` and refuses to post if any is invalid;
//   - posts one review per batch, pinned to the PR head commit, at least 75 s apart;
//   - on 403/429, waits per `retry-after`, else until `x-ratelimit-reset` when remaining is 0, else exponential backoff from 60 s;
//   - stops if the PR head changes;
//   - records posted batches in <comments>.posted.json, so a rerun never posts a batch twice.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { spawnSync } from "node:child_process";

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, all) => {
    if (a.startsWith("--")) acc.push([a.slice(2), all[i + 1] && !all[i + 1].startsWith("--") ? all[i + 1] : true]);
    return acc;
  }, [])
);
const { repo, pr, comments: commentsPath } = args;
const batchSize = Number(args.batch ?? 20);
if (!repo || !pr || !commentsPath) {
  console.error("usage: node post-review.mjs --repo <owner/name> --pr <n> --comments <file.json> [--batch 20] [--dry-run]");
  process.exit(2);
}

const run = (cmd, cmdArgs, input) => {
  const r = spawnSync(cmd, cmdArgs, { input, encoding: "utf8", maxBuffer: 1e8 });
  if (r.error) throw r.error;
  return r;
};
const ghJson = (cmdArgs) => JSON.parse(run("gh", cmdArgs).stdout);
const sleep = (s) => new Promise((r) => setTimeout(r, s * 1000));
const log = (m) => console.log(`${new Date().toISOString().slice(11, 19)} ${m}`);

const prInfo = () => ghJson(["pr", "view", String(pr), "-R", repo, "--json", "headRefOid,baseRefOid"]);
const { headRefOid: head, baseRefOid: base } = prInfo();
const comments = JSON.parse(readFileSync(commentsPath, "utf8"));

// Commentable lines per file and side, from the PR diff (three-dot, like GitHub).
const diff = run("git", ["diff", `${base}...${head}`]);
if (diff.status !== 0) {
  console.error(`git diff failed; fetch the PR first (git fetch origin pull/${pr}/head):\n${diff.stderr}`);
  process.exit(2);
}
const lines = {};
let file, oldLine, newLine;
for (const l of diff.stdout.split("\n")) {
  if (l.startsWith("+++ ")) { file = l.slice(6); lines[file] = { RIGHT: new Set(), LEFT: new Set() }; continue; }
  const h = l.match(/^@@ -(\d+)(?:,\d+)? \+(\d+)/);
  if (h) { oldLine = +h[1]; newLine = +h[2]; continue; }
  if (!file || l.startsWith("--- ") || l.startsWith("diff ") || l.startsWith("index ")) continue;
  if (l.startsWith("+")) lines[file].RIGHT.add(newLine++);
  else if (l.startsWith("-")) lines[file].LEFT.add(oldLine++);
  else if (l.startsWith(" ")) { lines[file].RIGHT.add(newLine++); lines[file].LEFT.add(oldLine++); }
}
const invalid = comments.filter((c) => {
  const set = lines[c.path]?.[c.side ?? "RIGHT"];
  return !set || !set.has(c.line) || (c.start_line && !set.has(c.start_line));
});
if (invalid.length) {
  for (const c of invalid) console.error(`not in diff: ${c.path} ${c.side ?? "RIGHT"} ${c.start_line ?? ""}${c.start_line ? "-" : ""}${c.line}`);
  process.exit(1);
}
log(`${comments.length} comments, all on lines in the diff ${base.slice(0, 7)}...${head.slice(0, 7)}`);
if (args["dry-run"]) process.exit(0);

const statePath = commentsPath.replace(/\.json$/, "") + ".posted.json";
const state = existsSync(statePath) ? JSON.parse(readFileSync(statePath, "utf8")) : { head, batches: [] };
if (state.head !== head) {
  console.error(`${statePath} was for head ${state.head}; the PR head is now ${head}. Check what was posted before rerunning.`);
  process.exit(1);
}

const batches = [];
for (let i = 0; i < comments.length; i += batchSize) batches.push(comments.slice(i, i + batchSize));

for (let b = 0; b < batches.length; b++) {
  if (state.batches.includes(b)) { log(`batch ${b + 1}/${batches.length} already posted`); continue; }
  const payload = JSON.stringify({
    commit_id: head,
    event: "COMMENT",
    body: `Justification for each change (${b + 1}/${batches.length}).`,
    comments: batches[b].map((c) => ({ ...c, side: c.side ?? "RIGHT", ...(c.start_line ? { start_side: c.side ?? "RIGHT" } : {}) })),
  });
  let backoff = 60;
  for (let attempt = 1; ; attempt++) {
    if (prInfo().headRefOid !== head) { log("PR head changed; stopping"); process.exit(2); }
    const r = run("gh", ["api", "-i", "-X", "POST", `repos/${repo}/pulls/${pr}/reviews`, "--input", "-"], payload);
    const [rawHeaders, ...rest] = r.stdout.split(/\r?\n\r?\n/);
    const status = Number(rawHeaders.split(/\r?\n/)[0].split(" ")[1]);
    const header = (name) => rawHeaders.match(new RegExp(`^${name}:\\s*(.+)$`, "im"))?.[1].trim();
    if (status === 200) {
      let url = "?";
      try { url = JSON.parse(rest.join("\n\n")).html_url; } catch {}
      state.batches.push(b);
      writeFileSync(statePath, JSON.stringify(state));
      log(`batch ${b + 1}/${batches.length} posted: ${url}`);
      break;
    }
    if (status !== 403 && status !== 429) { log(`HTTP ${status}; stopping\n${r.stdout}${r.stderr}`); process.exit(3); }
    if (attempt >= 8) { log("too many attempts; stopping"); process.exit(1); }
    let wait, why;
    if (header("retry-after")) { wait = Number(header("retry-after")); why = "retry-after"; }
    else if (header("x-ratelimit-remaining") === "0" && header("x-ratelimit-reset")) {
      wait = Number(header("x-ratelimit-reset")) - Math.floor(Date.now() / 1000) + 5; why = "x-ratelimit-reset";
    } else { wait = backoff; backoff *= 2; why = "no retry-after; exponential backoff"; }
    wait = Math.max(wait, 60);
    log(`batch ${b + 1}: HTTP ${status}; waiting ${wait}s (${why})`);
    await sleep(wait);
  }
  if (b < batches.length - 1) await sleep(75);
}
log("done");
