import { recognize } from "tesseract.js";
import type { OcrLang } from "./types";
import { TESSDATA_PATH } from "./config";

export async function ocr(image: string, languages: OcrLang[] = ["eng", "chi_sim"]) {
  const opts: any = { logger: () => {} };
  if (TESSDATA_PATH) opts.langPath = TESSDATA_PATH;
  const { data } = await recognize(image, languages.join("+"), opts);
  return data.text || "";
}
