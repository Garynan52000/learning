import { describe, it, expect } from "bun:test";
import { hyperfine, toJSON, formatMarkdown } from "../src/lib/hyperfine-js";

describe("hyperfine-js 基本功能", () => {
  it("能够运行命令并生成统计结果", async () => {
    const results = await hyperfine([{ cmd: "ping 127.0.0.1 -n 2 > nul", label: "ping1s" }], {
      shell: "cmd",
      runs: 3,
      warmup: 1
    });
    expect(results.length).toBe(1);
    const stat = results[0].stat;
    expect(stat.runs).toBe(3);
    expect(stat.successRuns).toBe(3);
    expect(stat.meanMs).toBeGreaterThan(800);
    const json = toJSON(results);
    expect(json.results[0].command).toContain("ping");
    const md = formatMarkdown(results);
    expect(md).toContain("| 命令 | 次数 |");
  });
});
