import { ocr } from "./src/ocr";
import { normalizeText } from "./src/normalize";

const image = process.argv[2];
if (!image) {
  console.error("Usage: bun run alt.ts <image_url_or_path>");
  process.exit(1);
}

try {
  const textRaw = await ocr(image, ["eng", "chi_sim"]);
  const text = normalizeText(textRaw || "");
  if (text.length > 0) {
    console.log(`包含文字：${text}`);
  } else {
    console.log("网页截图或图片；未识别到明确文字内容。");
  }
} catch (err) {
  console.error("OCR 失败：", err instanceof Error ? err.message : String(err));
  process.exit(1);
}
