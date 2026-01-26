import { $ } from "bun";

type Stat = {
  meanMs: number;
  stddevMs: number;
  minMs: number;
  maxMs: number;
  runs: number;
  successRuns: number;
};

type RunResult = {
  command: string;
  label?: string;
  stat: Stat;
  errors: string[];
};

type Options = {
  runs?: number;
  warmup?: number;
  cwd?: string;
  env?: Record<string, string>;
  shell?: string;
  timeoutMs?: number;
  prepare?: () => Promise<void> | void;
};

function nowMs(): number {
  return Number(Bun.nanoseconds()) / 1e6;
}

async function execOnce(cmd: string, opts: Options): Promise<{ ms: number; ok: boolean; err?: string }> {
  const start = nowMs();
  try {
    const shell = opts.shell ?? "powershell";
    const p =
      shell.toLowerCase() === "powershell"
        ? $`powershell -NoProfile -Command ${cmd}`
        : shell.toLowerCase() === "cmd"
        ? $`cmd /C ${cmd}`
        : shell.toLowerCase() === "bash"
        ? $`bash -lc ${cmd}`
        : $`${shell} ${cmd}`;
    if (opts.cwd) p.cwd(opts.cwd);
    if (opts.env) p.env(opts.env);
    const timeout = opts.timeoutMs ?? 0;
    const res = timeout > 0 ? await p.withTimeout(timeout).quiet() : await p.quiet();
    const end = nowMs();
    // bun $ returns an object with exitCode
    const ok = res.exitCode === 0;
    return { ms: end - start, ok, err: ok ? undefined : `exit ${res.exitCode}` };
  } catch (e: any) {
    const end = nowMs();
    return { ms: end - start, ok: false, err: String(e?.message ?? e) };
  }
}

function computeStat(samples: number[]): Stat {
  if (samples.length === 0) {
    return { meanMs: NaN, stddevMs: NaN, minMs: NaN, maxMs: NaN, runs: 0, successRuns: 0 };
  }
  const runs = samples.length;
  const mean = samples.reduce((a, b) => a + b, 0) / runs;
  const min = Math.min(...samples);
  const max = Math.max(...samples);
  const variance = samples.reduce((a, b) => a + (b - mean) * (b - mean), 0) / runs;
  const stddev = Math.sqrt(variance);
  return { meanMs: mean, stddevMs: stddev, minMs: min, maxMs: max, runs, successRuns: runs };
}

export async function hyperfine(commands: Array<{ cmd: string; label?: string }>, options: Options = {}): Promise<RunResult[]> {
  const runs = Math.max(1, options.runs ?? 10);
  const warmup = Math.max(0, options.warmup ?? 2);
  const results: RunResult[] = [];

  for (const c of commands) {
    const errors: string[] = [];
    // warmup
    for (let i = 0; i < warmup; i++) {
      const r = await execOnce(c.cmd, options);
      if (!r.ok && r.err) errors.push(`[warmup ${i + 1}] ${r.err}`);
    }
    const samples: number[] = [];
    let successRuns = 0;
    for (let i = 0; i < runs; i++) {
      if (options.prepare) {
        await options.prepare();
      }
      const r = await execOnce(c.cmd, options);
      if (r.ok) {
        samples.push(r.ms);
        successRuns++;
      } else {
        if (r.err) errors.push(`[run ${i + 1}] ${r.err}`);
      }
    }
    const stat = computeStat(samples);
    stat.successRuns = successRuns;
    results.push({ command: c.cmd, label: c.label, stat, errors });
  }
  return results;
}

export function formatMarkdown(results: RunResult[]): string {
  const header = "| 命令 | 次数 | 成功 | 平均(ms) | 标准差(ms) | 最小(ms) | 最大(ms) |\n| :--- | ---: | ---: | ---: | ---: | ---: | ---: |\n";
  const rows = results
    .map((r) => {
      const name = r.label ? `${r.label} (${r.command})` : r.command;
      const s = r.stat;
      return `| ${name} | ${s.runs} | ${s.successRuns} | ${s.meanMs.toFixed(2)} | ${s.stddevMs.toFixed(2)} | ${s.minMs.toFixed(2)} | ${s.maxMs.toFixed(2)} |`;
    })
    .join("\n");
  return `${header}${rows}\n`;
}

export function toJSON(results: RunResult[]): any {
  return {
    timestamp: new Date().toISOString(),
    environment: {
      platform: process.platform,
      arch: process.arch,
      bunVersion: Bun.version,
      nodeVersion: process.version
    },
    results
  };
}
