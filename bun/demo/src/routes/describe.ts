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
      const model = body.model || "qwen2-vl";
      const prompt =
        '只返回 JSON {"summary":"...", "layout_overview":"...", "color_palette":["#..."], "typography":{"fonts":[],"sizes":[]}, "components":[{"name":"...","role":"...","approx_bbox":[0,0,0,0]}]}';
      const text = await visionGenerate(model, imageUrl, prompt, body.options);
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

