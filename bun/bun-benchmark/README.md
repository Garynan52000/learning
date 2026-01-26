# Bun Benchmark Project

这是一个用于对比 **Bun**、**npm**、**Yarn**、**pnpm** 包管理器安装速度的基准测试工具。

## 📋 前置要求

- **操作系统**: Windows (本项目针对 Windows 进行了适配), macOS, 或 Linux。
- **Bun**: 需要安装 Bun 运行时 (v1.0+)。
- **Node.js**: 需要安装 Node.js 以对比 npm。
- (可选) **Yarn** / **pnpm**: 如果需要对比这些工具，请确保全局安装了它们。

## 🚀 快速开始

### 1. 安装项目依赖

首先，使用 Bun 安装本项目自身的依赖（用于运行测试脚本）：

```bash
bun install
```

### 2. 运行基准测试

使用以下命令启动自动化基准测试：

```bash
bun run benchmark
```

**该命令会自动执行以下操作：**
1.  **环境检查**：检查系统中可用的包管理器 (bun, npm, yarn, pnpm)。
2.  **Warm Install 测试**：
    *   保留 Lock 文件和缓存。
    *   清理 `node_modules`。
    *   测试安装速度（模拟日常开发中的依赖安装）。
3.  **Cold Install 测试**：
    *   清理 `node_modules`。
    *   清理所有 Lock 文件 (`bun.lock`, `package-lock.json` 等)。
    *   测试安装速度（模拟新项目或 CI 环境下的首次安装）。
4.  **生成报告**：
    *   控制台输出简要结果。
    *   详细 Markdown 报告追加到 `REPORT.md`。
    *   原始 JSON 数据保存到 `reports/` 目录。

## 📊 查看报告

- **Markdown 报告**: 查看 [REPORT.md](./REPORT.md) 文件获取格式化的对比表格。
- **JSON 数据**: 详细的测试统计数据保存在 `reports/` 目录下，文件名包含时间戳。

## 🛠️ 项目结构

- `src/benchmark.ts`: 基准测试的主逻辑脚本。
- `src/lib/hyperfine-js.ts`: 封装的性能测试工具（类似 hyperfine）。
- `REPORT.md`: 测试结果汇总文档。

## ⚠️ 注意事项

- **Windows 用户**: 脚本已适配 Windows 环境，使用 `powershell` 进行文件操作。
- **Lock 文件冲突**: 在混合测试不同包管理器时，可能会遇到 Lock 文件版本冲突（如 npm 提示升级 lockfile），这在基准测试中是正常现象，脚本会记录这些情况。
- **网络问题**: 如果 npm 安装缓慢，建议配置国内镜像源（本项目已包含 `.npmrc` 配置）。
