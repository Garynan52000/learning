import { normalizeText } from "../normalize";
import { ocr } from "../ocr";
import type { AltRequestBody } from "../types";
import { cacheGet, cacheSet } from "../store/cache";

export const altRoute = {
  POST: async (req: Request) => {
    try {
      const body = (await req.json()) as AltRequestBody;
      const imageUrl = body?.imageUrl;
      if (!imageUrl || typeof imageUrl !== "string") {
        return Response.json({ error: "imageUrl required" }, { status: 400 });
      }
      const cached = cacheGet(imageUrl);
      if (cached) return Response.json({ alt: cached });
      const textRaw = await ocr(imageUrl, ["eng", "chi_sim"]);
      const text = normalizeText(textRaw || "");
      const alt = text || "";
      cacheSet(imageUrl, alt, 60_000);
      return Response.json({ alt });
    } catch (err) {
      return Response.json(
        { error: err instanceof Error ? err.message : String(err) },
        { status: 500 }
      );
    }
  },
};
