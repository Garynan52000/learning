import { hyperfine, formatMarkdown, toJSON } from "./lib/hyperfine-js";
import { $, file } from "bun";
import { join } from "path";
import { existsSync, mkdirSync, rmSync, readdirSync } from "fs";

const PROJECT_ROOT = process.cwd();
const REPORT_DIR = join(PROJECT_ROOT, "reports");
const REPORT_MD = join(PROJECT_ROOT, "REPORT.md");

async function readTextWithBom(path: string): Promise<string> {
  if (!existsSync(path)) return "";
  try {
    const ab = await file(path).arrayBuffer();
    const bytes = new Uint8Array(ab);
    if (bytes.length >= 3 && bytes[0] === 0xef && bytes[1] === 0xbb && bytes[2] === 0xbf) {
      return new TextDecoder("utf-8").decode(bytes.subarray(3));
    }
    if (bytes.length >= 2 && bytes[0] === 0xff && bytes[1] === 0xfe) {
      return new TextDecoder("utf-16le").decode(bytes.subarray(2));
    }
    if (bytes.length >= 2 && bytes[0] === 0xfe && bytes[1] === 0xff) {
      return new TextDecoder("utf-16be").decode(bytes.subarray(2));
    }
    return new TextDecoder("utf-8").decode(bytes);
  } catch {
    return "";
  }
}

function ensureDirs() {
  if (!existsSync(REPORT_DIR)) {
    mkdirSync(REPORT_DIR, { recursive: true });
  }
}

async function removePath(p: string) {
  try {
    if (existsSync(p)) {
      rmSync(p, { recursive: true, force: true });
    }
  } catch (e) {
    console.warn(`Failed to remove ${p}:`, e);
  }
}

async function prepareWarm() {
  await removePath(join(PROJECT_ROOT, "node_modules"));
}

async function prepareCold() {
  await removePath(join(PROJECT_ROOT, "node_modules"));
  await removePath(join(PROJECT_ROOT, "bun.lock"));
  await removePath(join(PROJECT_ROOT, "bun.lockb"));
  await removePath(join(PROJECT_ROOT, "package-lock.json"));
  await removePath(join(PROJECT_ROOT, "yarn.lock"));
  await removePath(join(PROJECT_ROOT, "pnpm-lock.yaml"));
}

function buildMarkdownFromJson(j: any): string {
  const ts = j?.timestamp ? new Date(j.timestamp).toLocaleString() : new Date().toLocaleString();
  const warm = Array.isArray(j?.warm?.results) ? j.warm.results : [];
  const cold = Array.isArray(j?.cold?.results) ? j.cold.results : [];
  const warmMd = formatMarkdown(warm);
  const coldMd = formatMarkdown(cold);
  return `\n## 自动化基准测试（${ts}）\n\n### Warm 安装（保留 Lock 与缓存，清理 node_modules）\n${warmMd}### Cold 安装（清理 node_modules 与所有 Lock）\n${coldMd}`;
}

async function rebuildReportFromJsons(): Promise<string> {
  if (!existsSync(REPORT_DIR)) return "";
  const files = readdirSync(REPORT_DIR)
    .filter((f) => f.toLowerCase().endsWith(".json"))
    .map((f) => join(REPORT_DIR, f))
    .sort();
  let out = "";
  for (const fp of files) {
    try {
      const txt = await file(fp).text();
      const j = JSON.parse(txt);
      out += buildMarkdownFromJson(j);
    } catch {
      continue;
    }
  }
  return out;
}

async function isAvailable(cmd: string): Promise<boolean> {
  try {
    const res = await $`powershell -NoProfile -Command "Get-Command ${cmd} -ErrorAction SilentlyContinue | Select-Object -ExpandProperty Path"`.quiet();
    return (res.stdout?.toString()?.trim()?.length ?? 0) > 0;
  } catch {
    return false;
  }
}

async function getVersion(cmd: string): Promise<string | null> {
  try {
    const res = await $`powershell -NoProfile -Command "${cmd} --version"`.quiet();
    const out = res.stdout?.toString()?.trim();
    return out && out.length > 0 ? out : null;
  } catch {
    return null;
  }
}

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

async function main() {
  ensureDirs();
  const canBun = await isAvailable("bun");
  const canNpm = await isAvailable("npm");
  const canYarn = await isAvailable("yarn");
  const canPnpm = await isAvailable("pnpm");

  const cmdsWarm = [];
  const cmdsCold = [];
  if (canBun) cmdsWarm.push({ cmd: "bun install", label: "Bun Warm" }), cmdsCold.push({ cmd: "bun install", label: "Bun Cold" });
  if (canPnpm) cmdsWarm.push({ cmd: "pnpm install", label: "pnpm Warm" }), cmdsCold.push({ cmd: "pnpm install", label: "pnpm Cold" });
  if (canYarn) cmdsWarm.push({ cmd: "yarn install", label: "Yarn Warm" }), cmdsCold.push({ cmd: "yarn install", label: "Yarn Cold" });
  if (canNpm) cmdsWarm.push({ cmd: "npm install", label: "npm Warm" }), cmdsCold.push({ cmd: "npm install", label: "npm Cold" });

  const versions = {
    bun: canBun ? await getVersion("bun") : null,
    npm: canNpm ? await getVersion("npm") : null,
    yarn: canYarn ? await getVersion("yarn") : null,
    pnpm: canPnpm ? await getVersion("pnpm") : null,
    node: process.version,
    bunRuntime: Bun.version
  };

  const coldResults = await hyperfine(shuffle(cmdsCold), { runs: 5, warmup: 0, shell: "powershell", prepare: prepareCold, cwd: PROJECT_ROOT });
  const warmResults = await hyperfine(shuffle(cmdsWarm), { runs: 5, warmup: 0, shell: "powershell", prepare: prepareWarm, cwd: PROJECT_ROOT });
  const deepColdPrepare = async () => {
    await prepareCold();
    try {
      if (canNpm) {
        await $`powershell -NoProfile -Command "npm cache clean --force"`.quiet();
      }
    } catch {}
    try {
      if (canPnpm) {
        const r = await $`powershell -NoProfile -Command "pnpm store path"`.quiet();
        const p = r.stdout?.toString()?.trim();
        if (p && p.length > 0) {
          await removePath(p);
        }
      }
    } catch {}
    try {
      if (canYarn) {
        const r = await $`powershell -NoProfile -Command "yarn cache dir"`.quiet();
        const p = r.stdout?.toString()?.trim();
        if (p && p.length > 0) {
          await removePath(p);
        }
      }
    } catch {}
    try {
      if (canBun) {
        const localApp = process.env.LOCALAPPDATA || "";
        const home = process.env.HOME || process.env.USERPROFILE || "";
        const paths = [
          join(localApp, "bun", "install", "cache"),
          join(home, ".bun", "install", "cache")
        ].filter(Boolean);
        for (const p of paths) {
          await removePath(p);
        }
      }
    } catch {}
  };
  const deepColdResults = await hyperfine(shuffle(cmdsCold), { runs: 3, warmup: 0, shell: "powershell", prepare: deepColdPrepare, cwd: PROJECT_ROOT });

  const json = {
    timestamp: new Date().toISOString(),
    toolVersions: versions,
    warm: toJSON(warmResults),
    cold: toJSON(coldResults),
    deepCold: toJSON(deepColdResults)
  };
  const jsonPath = join(REPORT_DIR, `benchmark-${Date.now()}.json`);
  await file(jsonPath).write(JSON.stringify(json, null, 2));

  const fullMd = await rebuildReportFromJsons();
  await file(REPORT_MD).write(fullMd);

  console.log(`JSON report: ${jsonPath}`);
  console.log(`Markdown appended: ${REPORT_MD}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
