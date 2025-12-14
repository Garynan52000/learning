import type { AltResponse } from "../types";
import { ollamaAvailable, visionGenerate } from "../ollama";

type DescribeRequestBody = {
  imageUrl: string;
  model?: string;
  options?: Record<string, any>;
};

export const describeRoute = {
  POST: async (req: Request) => {
    try {
      const body = (await req.json()) as DescribeRequestBody;
      const imageUrl = body?.imageUrl;
      if (!imageUrl || typeof imageUrl !== "string") {
        return Response.json({ error: "imageUrl required" }, { status: 400 });
      }
      const ok = await ollamaAvailable();
      if (!ok) {
        return Response.json(
          { error: "ollama_not_available" },
          { status: 503 }
        );
      }
      const model = body.model || process.env.OLLAMA_VISION_MODEL || "llava-phi3";
      const prompt = [
        '只返回 JSON，且不能包含任何其他文本。',
        'JSON 格式为 {"summary":"...", "layout_overview":"...", "color_palette":["#..."], "typography":{"fonts":[],"sizes":[]}, "components":[{"name":"...","role":"...","approx_bbox":[0,0,0,0}]}。',
        '描述性的文案如 summary、layout_overview 等，请使用中文。如果是英文的专业名词，请使用英文。',
        '将所有编码（如 \\uXXXX、HTML 实体、URL 编码、转义字符）转换为对应的可读字符，不要保留编码形式。'
      ].join('');
      const opts = { num_predict: 512, ...(body.options || {}) };
      const text = await visionGenerate(model, imageUrl, prompt, opts);
      try {
        const json = JSON.parse(text);
        return Response.json(json);
      } catch {
        return Response.json({ raw: text });
      }
    } catch (err) {
      return Response.json(
        { error: err instanceof Error ? err.message : String(err) },
        { status: 500 }
      );
    }
  },
};

