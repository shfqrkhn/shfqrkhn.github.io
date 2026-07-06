import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));
const fail = (message) => {
  throw new Error(message);
};
const assert = (condition, message) => {
  if (!condition) fail(message);
};

const index = read("index.html");
const script = read("script.js");
const readme = read("README.md");
const publicSurfacePolicy = read("docs/PUBLIC_SURFACE_POLICY.md");
const evidenceReceipt = read("docs/EVIDENCE_RECEIPT.md");
const handoff = read("docs/AI_MAINTAINER_HANDOFF.md");
const codeqlWorkflow = read(".github/workflows/codeql.yml");
const codeqlConfig = read(".github/codeql/codeql-config.yml");
const sitemap = read("sitemap.xml");
const robots = read("robots.txt");
const pkg = JSON.parse(read("package.json"));
const forbiddenTrackedPathPattern = /(^|\/)(node_modules|offline|linkedin-post-package|test-results|playwright-report|\.codex-remote-attachments)(\/|$)|^data\/(manual-overrides\.json|latest-simulation\.json|scoreboards)(\/|$)|(^|\/).*\.((env)|(pem)|(key)|(p12)|(pfx))$|(^|\/)(exports?|backups?|logs?|scratch)(\/|$)/i;
const trackedFiles = execFileSync("git", ["ls-files"], { cwd: root, encoding: "utf8" })
  .split(/\r?\n/)
  .filter(Boolean)
  .map((file) => file.replace(/\\/g, "/"));
const forbiddenTrackedFiles = trackedFiles.filter((file) => forbiddenTrackedPathPattern.test(file));
const removedStandalonePaths = ["AI-Studio-Cleaner", "TS-Dash", "PMQuiz", "Noodle-Nudge", "LedgerSuite", "Flexx-Files", "CommonGround", "C3Pedal"];

function gitArchiveEntries() {
  const archive = execFileSync("git", ["archive", "--format=tar", "HEAD"], {
    cwd: root,
    maxBuffer: 128 * 1024 * 1024,
  });
  const entries = [];
  for (let offset = 0; offset + 512 <= archive.length;) {
    const header = archive.subarray(offset, offset + 512);
    if (header.every((byte) => byte === 0)) break;
    const name = header.toString("utf8", 0, 100).replace(/\0.*$/, "");
    const prefix = header.toString("utf8", 345, 500).replace(/\0.*$/, "");
    const sizeRaw = header.toString("utf8", 124, 136).replace(/\0.*$/, "").trim();
    const size = sizeRaw ? parseInt(sizeRaw, 8) : 0;
    const fullName = [prefix, name].filter(Boolean).join("/");
    if (fullName) entries.push(fullName.replace(/\\/g, "/"));
    offset += 512 + Math.ceil(size / 512) * 512;
  }
  return entries;
}

const archiveEntries = gitArchiveEntries();
const forbiddenArchiveEntries = archiveEntries.filter((file) => forbiddenTrackedPathPattern.test(file));
const requiredArchiveEntries = [
  "index.html",
  "styles.css",
  "script.js",
  "README.md",
  "docs/PUBLIC_SURFACE_POLICY.md",
  "docs/EVIDENCE_RECEIPT.md",
  "sitemap.xml",
  "robots.txt",
  ".nojekyll",
  "screenshot.png",
  "media/modeltab.png",
  "media/nfire.png",
  "media/fifa-wc-sim.png",
  "tests/portfolio-static-regression.mjs",
];
const retiredArchiveEntries = archiveEntries.filter((entry) =>
  removedStandalonePaths.some((name) => entry === name || entry.startsWith(`${name}/`))
);

assert(pkg.name === "shfqrkhn-portfolio", "package name must identify the portfolio repo.");
assert(pkg.private === true, "portfolio package must stay private.");
assert(pkg.license === "MIT", "package license must match LICENSE.");
assert(pkg.scripts?.test === "node tests/portfolio-static-regression.mjs", "npm test must run the static regression gate.");
assert(pkg.scripts?.qa === "npm run build && npm test", "npm run qa must run build and static regression.");
assert(forbiddenTrackedFiles.length === 0, `Forbidden tracked paths: ${forbiddenTrackedFiles.join(", ")}`);
assert(forbiddenArchiveEntries.length === 0, `Forbidden generated archive paths: ${forbiddenArchiveEntries.join(", ")}`);
assert(retiredArchiveEntries.length === 0, `Retired standalone folders in generated archive: ${retiredArchiveEntries.join(", ")}`);
for (const file of requiredArchiveEntries) {
  assert(archiveEntries.includes(file), `Generated portfolio archive must include public path: ${file}`);
}
assert(readme.includes("npm run qa"), "README must document the full QA gate.");
assert(publicSurfacePolicy.includes("npm run qa"), "Public surface policy must include the full QA gate.");
assert(publicSurfacePolicy.includes("git archive"), "Public surface policy must tie archive safety to generated archive evidence.");
assert(evidenceReceipt.includes("npm run qa"), "Evidence receipt must include the full QA gate.");
assert(evidenceReceipt.includes("git archive"), "Evidence receipt must tie portfolio archive safety to generated archive evidence.");
assert(handoff.includes("npm run qa"), "Maintainer handoff must include the full QA gate.");

const version = pkg.version;
assert(index.includes(`styles.css?v=${version}`), "index stylesheet version must match package version.");
assert(index.includes(`script.js?v=${version}`), "index script version must match package version.");
assert(index.includes(`v${version}`), "footer version must match package version.");
assert(readme.includes(`**Version:** v${version}`), "README version must match package version.");
assert(publicSurfacePolicy.includes("Primary routing to ModelTab, nFIRE, and FIFA-WC-Sim"), "Public surface policy must define flagship routing.");
assert(publicSurfacePolicy.includes("Standalone folders or sitemap URLs"), "Public surface policy must block retired standalone surfaces.");
assert(publicSurfacePolicy.includes("ModelTab, nFIRE, FIFA-WC-Sim, then LocalFirstApps"), "Public surface policy must preserve route priority.");
assert(evidenceReceipt.includes("PASS_WITH_LIMITATIONS"), "Evidence receipt must define limited claims.");
assert(evidenceReceipt.includes("Flagship routing"), "Evidence receipt must cover flagship routing.");
assert(evidenceReceipt.includes("Retired standalone folders absent"), "Evidence receipt must cover retired folder absence.");
for (const phrase of ["Claim Firewall Invariant", "Claim Boundaries", "must map", "NOT_RUN", "BLOCKED", "current repo state"]) {
  assert(evidenceReceipt.includes(phrase), `Evidence receipt missing claim firewall term: ${phrase}`);
}
for (const phrase of ["Currentness Watchdog", "stale, missing, inaccessible", "downgrade the affected claim", "portfolio/repo/GitHub state"]) {
  assert(evidenceReceipt.includes(phrase), `Evidence receipt missing currentness watchdog term: ${phrase}`);
}
for (const phrase of ["Safe-To-Publish Receipt", "clean synced tree", "no GitHub Releases", "no protected tracked paths", "no open secret/dependabot/code-scanning alerts", "code-scanning not-applicable/no-analysis state", "remaining risks"]) {
  assert(evidenceReceipt.includes(phrase), `Evidence receipt missing safe-to-publish term: ${phrase}`);
}
assert(evidenceReceipt.includes("git rev-list --left-right --count 'HEAD...@{u}'"), "Evidence receipt must preserve the PowerShell-safe upstream delta command.");
assert(evidenceReceipt.includes("gh release list --limit 5"), "Evidence receipt must require a GitHub Releases absence check.");
for (const phrase of ["Runtime portfolio code scanning", ".github/workflows/codeql.yml", "CodeQL JavaScript analysis", "PASS_WITH_LIMITATIONS"]) {
  assert(evidenceReceipt.includes(phrase), `Evidence receipt missing code scanning term: ${phrase}`);
}
for (const phrase of ["github/codeql-action/init@v4", "github/codeql-action/analyze@v4", "languages: javascript-typescript", "security-events: write", "config-file: ./.github/codeql/codeql-config.yml"]) {
  assert(codeqlWorkflow.includes(phrase), `CodeQL workflow missing: ${phrase}`);
}
for (const phrase of ["paths-ignore:", "tests/**", "node_modules/**", "test-results/**", "playwright-report/**"]) {
  assert(codeqlConfig.includes(phrase), `CodeQL config missing: ${phrase}`);
}
for (const phrase of ["Input Accessibility Evidence", "keyboard only", "mouse/pointer only", "touch only", "platform-limited input only", "No critical workflow may require", "platform text-entry support", "Single input operation"]) {
  assert(evidenceReceipt.includes(phrase), `Evidence receipt missing input accessibility term: ${phrase}`);
}
for (const phrase of ["Design Language Evidence", "modern minimalist", "Uiverse", "Open Props", "Design language/UI safety", "browser JS popups", "component overlap"]) {
  assert(evidenceReceipt.includes(phrase), `Evidence receipt missing design language term: ${phrase}`);
}
for (const phrase of ["GitHub API Metadata Evidence", "localStorage cache data", "supporting repo cards only", "not proof that a project is flagship", "source-controlled in this repo", "rate-limited, unavailable, or contradicted"]) {
  assert(evidenceReceipt.includes(phrase), `Evidence receipt missing GitHub API metadata term: ${phrase}`);
}
for (const phrase of ["Mission-Critical Reliability Evidence", "self-checking", "crash-recoverable", "state-explicit", "TDD/SDD", "Autonomous AI-assisted development", "Mission-critical reliability"]) {
  assert(evidenceReceipt.includes(phrase), `Evidence receipt missing mission-critical reliability term: ${phrase}`);
}
for (const phrase of ["Legacy Pages API Residue Evidence", "branch-based GitHub Pages", "building", "errored", "HTTP 200", "Deployment failed, try again later.", "PASS_WITH_LIMITATIONS", "docs/tests", "real blocker"]) {
  assert(evidenceReceipt.includes(phrase), `Evidence receipt missing legacy Pages residue term: ${phrase}`);
}
for (const phrase of ["OmniOS Transfer Contract", "Product truth", "Execution truth", "Evidence truth", "Operations truth", "Transfer truth", "GitHub Releases stay absent"]) {
  assert(handoff.includes(phrase), `Handoff missing OmniOS transfer contract term: ${phrase}`);
}
for (const phrase of ["Reliability truth", "self-checking", "crash-recoverable", "state-explicit", "TDD/SDD-backed", "remove complexity"]) {
  assert(handoff.includes(phrase), `Handoff missing reliability truth term: ${phrase}`);
}
for (const phrase of ["Design truth", "Single input truth", "modern minimalist", "MIT UI libraries/resources", "browser JS popups", "arbitrary component copy-paste", "combined input-mode path"]) {
  assert(handoff.includes(phrase), `Handoff missing design truth term: ${phrase}`);
}
assert(handoff.includes("treat a contradictory API summary as stale residue"), "Handoff must preserve legacy Pages API residue handling.");
assert(handoff.includes("GitHub-side deploy failure after successful build/upload"), "Handoff must distinguish source failures from GitHub-side deploy residue.");
for (const phrase of ["Doctrine Delta Decision", "promote", "reject", "quarantine", "keep_local", "source-backed, reusable, non-secret", "explicitly approves publication"]) {
  assert(handoff.includes(phrase), `Handoff missing doctrine delta term: ${phrase}`);
}

assert(index.includes("https://github.com/sponsors/shfqrkhn?o=esb"), "Sponsor link must be present.");
assert(index.includes("https://shfqrkhn.github.io/ModelTab/"), "ModelTab live link must be present.");
assert(index.includes("https://github.com/shfqrkhn/ModelTab"), "ModelTab repo link must be present.");
assert(index.includes("media/modeltab.png"), "ModelTab screenshot must be present.");
assert(index.includes('alt="ModelTab browser AI chat workspace"'), "ModelTab screenshot must have useful alt text.");
assert(index.includes("https://shfqrkhn.github.io/nFIRE/"), "nFIRE live link must be present.");
assert(index.includes("https://github.com/shfqrkhn/nFIRE"), "nFIRE repo link must be present.");
assert(index.includes("media/nfire.png"), "nFIRE screenshot must be present.");
assert(index.includes('alt="nFIRE financial independence dashboard"'), "nFIRE screenshot must have useful alt text.");
assert(index.includes("https://shfqrkhn.github.io/FIFA-WC-Sim/"), "FIFA-WC-Sim live link must be present.");
assert(index.includes("https://github.com/shfqrkhn/FIFA-WC-Sim"), "FIFA-WC-Sim repo link must be present.");
assert(index.includes("media/fifa-wc-sim.png"), "FIFA-WC-Sim screenshot must be present.");
assert(index.includes('alt="FIFA-WC-Sim tournament simulator dashboard"'), "FIFA-WC-Sim screenshot must have useful alt text.");
assert(index.includes("Primary Apps"), "primary app section must be visible without GitHub API data.");
assert(index.includes('aria-labelledby="primary-apps-title"'), "primary section must be labelled.");
assert(index.includes('aria-labelledby="supporting-projects-title"'), "supporting section must be labelled.");

assert(!/<meta[^>]+http-equiv="Content-Security-Policy"[^>]+frame-ancestors/.test(index), "frame-ancestors must not be placed in meta CSP.");
assert(index.includes("connect-src https://api.github.com"), "CSP must allow only the GitHub API for fetches.");
assert(index.includes("img-src 'self' https://avatars.githubusercontent.com data:"), "CSP must allow self-hosted screenshots and GitHub avatars.");

for (const name of ["ModelTab", "nFIRE", "FIFA-WC-Sim"]) {
  assert(script.includes(`'${name}': true`), `${name} must be declared as a primary repository.`);
}
assert(!script.includes("'FIFA-WC-Sim': { rank:"), "FIFA-WC-Sim must not regress to a dynamic supporting card.");
assert(script.includes("'LocalFirstApps': true"), "LocalFirstApps must remain in the focused supporting set.");
for (const name of ["FIFA-WC-Sim", "LocalFirstApps"]) {
  assert(sitemap.includes(`https://shfqrkhn.github.io/${name}/`), `${name} must remain in sitemap.`);
}
assert(script.includes("!repo.archived"), "archived repos must be filtered out.");
assert(readme.includes("former standalone apps"), "README must describe absorbed standalone apps accurately.");
assert(!readme.includes("separate archived repos"), "README must not imply deleted standalone app repos still exist as archives.");
assert(!script.includes("AI-Studio-Cleaner"), "absorbed AI Studio Cleaner name must not remain in runtime portfolio code.");
for (const repo of removedStandalonePaths) {
  assert(!exists(repo), `${repo} standalone redirect folder must stay removed.`);
  assert(!sitemap.includes(`https://shfqrkhn.github.io/${repo}/`), `${repo} standalone URL must not be in sitemap.`);
}
for (const appPath of ["ts-dash", "pmquiz", "noodle-nudge", "ledgersuite", "flexx-files", "commonground"]) {
  assert(sitemap.includes(`https://shfqrkhn.github.io/LocalFirstApps/apps/${appPath}/`), `${appPath} must be represented through LocalFirstApps.`);
}
for (const archivedRepo of ["TS-Dash", "PMQuiz", "Noodle-Nudge", "LedgerSuite", "Flexx-Files", "CommonGround"]) {
  assert(!script.includes(`'${archivedRepo}': true`), `${archivedRepo} must not be in the runtime showcase list.`);
  assert(!sitemap.includes(`https://shfqrkhn.github.io/${archivedRepo}/`), `${archivedRepo} standalone URL must not be in sitemap.`);
}
for (const noisy of ["PMQuiz", "Noodle-Nudge", "Flexx-Files"]) {
  assert(!script.includes(noisy), `${noisy} must not be in the runtime showcase list.`);
}

assert(robots.includes("Sitemap: https://shfqrkhn.github.io/sitemap.xml"), "robots.txt must point to sitemap.");
assert(sitemap.includes("https://shfqrkhn.github.io/ModelTab/"), "sitemap must include ModelTab.");
assert(sitemap.includes("https://shfqrkhn.github.io/nFIRE/"), "sitemap must include nFIRE.");
assert(exists("screenshot.png"), "portfolio screenshot must exist.");
assert(exists("media/modeltab.png"), "local ModelTab media must exist.");
assert(exists("media/nfire.png"), "local nFIRE media must exist.");
assert(exists("media/fifa-wc-sim.png"), "local FIFA-WC-Sim media must exist.");
assert(exists(".nojekyll"), "GitHub Pages must stay in plain static mode.");

console.log(`OK: portfolio static regression checks passed for v${version}.`);
