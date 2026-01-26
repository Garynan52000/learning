import { hyperfine, formatMarkdown, toJSON } from "./lib/hyperfine-js";
import { $, file } from "bun";
import { join } from "path";
import { existsSync, mkdirSync } from "fs";

const PROJECT_ROOT = process.cwd();
const REPORT_DIR = join(PROJECT_ROOT, "reports");
const REPORT_MD = join(PROJECT_ROOT, "REPORT.md");

function ensureDirs() {
  if (!existsSync(REPORT_DIR)) {
    mkdirSync(REPORT_DIR, { recursive: true });
  }
}

async function removePath(p: string) {
  await $`powershell -NoProfile -Command "Remove-Item -Recurse -Force -ErrorAction SilentlyContinue '${p}'"`.quiet();
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

async function isAvailable(cmd: string): Promise<boolean> {
  try {
    const res = await $`powershell -NoProfile -Command "Get-Command ${cmd} -ErrorAction SilentlyContinue | Select-Object -ExpandProperty Path"`.quiet();
    return (res.stdout?.toString()?.trim()?.length ?? 0) > 0;
  } catch {
    return false;
  }
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

  const warmResults = await hyperfine(cmdsWarm, { runs: 5, warmup: 1, shell: "powershell", prepare: prepareWarm, cwd: PROJECT_ROOT });
  const coldResults = await hyperfine(cmdsCold, { runs: 3, warmup: 0, shell: "powershell", prepare: prepareCold, cwd: PROJECT_ROOT });

  const json = {
    timestamp: new Date().toISOString(),
    warm: toJSON(warmResults),
    cold: toJSON(coldResults)
  };
  const jsonPath = join(REPORT_DIR, `benchmark-${Date.now()}.json`);
  await file(jsonPath).write(JSON.stringify(json, null, 2));

  const md = `\n## 自动化基准测试（${new Date().toLocaleString()}）\n\n### Warm 安装（保留 Lock 与缓存，清理 node_modules）\n${formatMarkdown(warmResults)}\n### Cold 安装（清理 node_modules 与所有 Lock）\n${formatMarkdown(coldResults)}\n`;
  const existing = existsSync(REPORT_MD) ? await $`powershell -NoProfile -Command "Get-Content -Raw '${REPORT_MD}'"` .text() : "";
  await file(REPORT_MD).write(`${existing}${md}`);

  console.log(`JSON report: ${jsonPath}`);
  console.log(`Markdown appended: ${REPORT_MD}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
