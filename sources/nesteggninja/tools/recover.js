// One-off recovery of NestEggNinja source from the built page (see sources/nesteggninja/README.md).
// usage: node recover.js <embedded.html> <outdir>
const fs = require("fs"), path = require("path");
const parser = require("@babel/parser"), traverse = require("@babel/traverse").default, generate = require("@babel/generator").default;
const prettier = require("prettier");

const [, , IN, OUT] = process.argv;
const lead = s => s.match(/^\s*/)[0], trail = s => s.match(/\s*$/)[0];
const html = fs.readFileSync(IN, "utf8");

// inline blocks of the built page, in order, with the file each becomes ("" drops the block)
const NAMES = ["src/look.js", "src/reset.js", "src/kit.css", "src/content-meta.json", "src/nf-data.json", "src/loader.js",
  "bundle", "src/app.css", "src/console-quiet.js", "src/svg-aria.js", "", "src/lab.js"];
// statement boundaries in the module bundle (UTF-16 offsets from an acorn parse), and what each part holds
const CUTS = [0, 1269, 8820, 144177, 155543, 205267, 246341, 334314, 349658, 384461, 385077, 386854, 387805, 463135, 463399,
  495861, 508919, 511516, 518373, 630225, 631097, 635197, 665072, 1052031];
const PARTS = ["vite-runtime", "react-18.3.1", "react-dom-18.3.1", "react-remove-scroll", "mantine-core-1", "floating-ui",
  "mantine-core-2", "react-number-format", "mantine-core-3", "zustand-vanilla", "use-sync-external-store", "zustand-react",
  "dexie-3.2.7", "app-globals", "decimal-js", "app-engine", "file-saver", "app-store", "framer-motion-11.18.2", "app-loading",
  "lucide-react", "app-ui", "recharts", "app-main"];
// names restored where the code makes them clear (minified -> readable); a name already used anywhere is skipped
const RENAME = {
  T: "jsxRuntime", j: "React", Z: "ReactDefault", qz: "ReactDOMClient", hL: "MantineProvider", Nr: "Modal", Ln: "Tabs", Xi: "Button",
  Wc: "motion", Ze: "Decimal", rs: "Dexie", WS: "nfireDb", qY: "createStore", Da: "defaultProfile", vu: "useFireStore",
  Ui: "taxPolicy", Up: "oasThreshold", Hp: "calculateTax", XB: "grossUpWithdrawal", ZB: "calculatePension", V0: "testSolvency", z0: "simulate",
  ine: "LoadingScreen", one: "HydrationGate", xne: "GuideModal", Sne: "Header", Pne: "ResultPanel", Ane: "AssumptionsForm",
  r0e: "ChartTooltip", o0e: "SavingsAreaChart", a0e: "SavingsChartSection", s0e: "WelcomeModal", l0e: "Page", u0e: "App",
};

(async () => {
  const rx = /<(script|style)\b([^>]*)>([\s\S]*?)<\/\1>/g;
  const blocks = [...html.matchAll(rx)];
  if (blocks.length !== NAMES.length) throw new Error("expected " + NAMES.length + " blocks, found " + blocks.length);
  if (!/#back-to-hub\{display:none!important\}/.test(blocks[10][3])) throw new Error("block 11 is not the hub-hiding style");
  let shell = "", last = 0;
  const report = { files: {}, renamed: {}, skipped: {} };
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i], name = NAMES[i], open = b[0].slice(0, b[0].indexOf(">") + 1), close = "</" + b[1] + ">";
    shell += html.slice(last, b.index);
    last = b.index + b[0].length;
    if (!name) continue;
    let body = b[3];
    if (name === "bundle") { await bundle(body, report); shell += open + lead(body) + "@@NEN src/bundle@@" + trail(body) + close; continue; }
    if (name === "src/app.css") body = await prettier.format(body, { parser: "css" });
    write(name, body); report.files[name] = body.length;
    shell += open + "@@NEN " + name + "@@" + close;
  }
  shell += html.slice(last);
  write("NEN-Planner-v10.4.5.html", shell);
  fs.writeFileSync(path.join(OUT, "recover-report.json"), JSON.stringify(report, null, 1));
  console.log(JSON.stringify(report.renamed), "\nskipped", JSON.stringify(report.skipped));
})().catch(e => { console.error(e); process.exit(1); });

function write(rel, text) { const f = path.join(OUT, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, text); }

async function bundle(raw, report) {
  const code = raw;  // the acorn offsets count from the first character inside <script>
  if (code.length !== 1057958) throw new Error("bundle length " + code.length);
  let marked = "";
  for (let k = 0; k < CUTS.length; k++) marked += "/*@@NEN-CUT " + k + "@@*/" + code.slice(CUTS[k], CUTS[k + 1]);
  const ast = parser.parse(marked, { sourceType: "module" });
  const used = new Set();
  traverse(ast, {
    Scope(p) { for (const n of Object.keys(p.scope.bindings)) used.add(n); },
    ReferencedIdentifier(p) { used.add(p.node.name); },
  });
  let progScope;
  traverse(ast, { Program(p) { progScope = p.scope; p.stop(); } });
  for (const [from, to] of Object.entries(RENAME)) {
    if (!progScope.hasOwnBinding(from)) { report.skipped[from] = "not a top-level binding"; continue; }
    if (used.has(to)) { report.skipped[from] = to + " already used"; continue; }
    progScope.rename(from, to); used.add(to); report.renamed[from] = to;
  }
  const out = generate(ast, { comments: true, jsescOption: { minimal: true } }).code;
  const pieces = out.split(/\/\*@@NEN-CUT (\d+)@@\*\/\n?/);
  if (pieces.length !== CUTS.length * 2 + 1 || pieces[0].trim()) throw new Error("cut markers lost: " + pieces.length);
  for (let k = 0; k < CUTS.length; k++) {
    if (Number(pieces[1 + 2 * k]) !== k) throw new Error("cut order");
    // the generator unescapes "<\/script>"; put the escape back so the part can sit inside a <script> block
    const pretty = (await prettier.format(pieces[2 + 2 * k], { parser: "babel", printWidth: 120 })).replace(/<\/(script)/gi, "<\\/$1");
    const rel = "src/bundle/" + String(k).padStart(2, "0") + "-" + PARTS[k] + ".js";
    write(rel, pretty); report.files[rel] = pretty.length;
  }
}
