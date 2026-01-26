import { file } from "bun";
import { join } from "path";
import { existsSync, readdirSync } from "fs";
import { formatMarkdown } from "./lib/hyperfine-js";

const PROJECT_ROOT = process.cwd();
const REPORT_DIR = join(PROJECT_ROOT, "reports");
const REPORT_MD = join(PROJECT_ROOT, "REPORT.md");

function buildMarkdownFromJson(j: any): string {
  const ts = j?.timestamp ? new Date(j.timestamp).toLocaleString() : new Date().toLocaleString();
  const warm = Array.isArray(j?.warm?.results) ? j.warm.results : [];
  const cold = Array.isArray(j?.cold?.results) ? j.cold.results : [];
  const deepCold = Array.isArray(j?.deepCold?.results) ? j.deepCold.results : [];
  const warmMd = formatMarkdown(warm);
  const coldMd = formatMarkdown(cold);
  const deepMd = deepCold.length > 0 ? `### Deep Cold 安装（清理 node_modules、所有 Lock 与所有缓存）\n${formatMarkdown(deepCold)}` : "";
  return `\n## 自动化基准测试（${ts}）\n\n### Warm 安装（保留 Lock 与缓存，清理 node_modules）\n${warmMd}### Cold 安装（清理 node_modules 与所有 Lock）\n${coldMd}${deepMd}`;
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

async function main() {
  const md = await rebuildReportFromJsons();
  await file(REPORT_MD).write(md);
  console.log(`Markdown rebuilt: ${REPORT_MD}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
