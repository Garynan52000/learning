const HOST = process.env.OLLAMA_HOST || "http://localhost:11434";
const TIMEOUT_MS = Number(process.env.OLLAMA_TIMEOUT_MS || 15000);
const DEF_NUM_PREDICT = Number(process.env.OLLAMA_VISION_NUM_PREDICT || 128);
const DEF_NUM_CTX = Number(process.env.OLLAMA_VISION_NUM_CTX || 1024);
const DEF_TEMPERATURE = Number(process.env.OLLAMA_VISION_TEMPERATURE || 0.2);
const KEEP_ALIVE = process.env.OLLAMA_KEEP_ALIVE || "5m";

export async function ollamaAvailable(): Promise<boolean> {
  try {
    const res = await fetch(`${HOST}/api/tags`, { method: "GET" });
    return res.ok;
  } catch {
    return false;
  }
}

export async function visionGenerate(model: string, imageUrl: string, prompt: string, options?: Record<string, any>) {
  async function normalizeImageInput(image: string): Promise<string> {
    const lower = image.toLowerCase();
    if (lower.startsWith("data:")) {
      const i = image.indexOf(",");
      if (i >= 0) return image.slice(i + 1);
      return image;
    }
    if (lower.startsWith("http://") || lower.startsWith("https://")) {
      const r = await fetch(image);
      if (!r.ok) throw new Error(`fetch_image_failed_${r.status}`);
      const buf = Buffer.from(await r.arrayBuffer()).toString("base64");
      return buf;
    }
    try {
      const f = await Bun.file(image).arrayBuffer();
      const buf = Buffer.from(f).toString("base64");
      return buf;
    } catch {
      return image;
    }
  }
  const encodedImage = await normalizeImageInput(imageUrl);
  const body: any = {
    model,
    prompt,
    images: [encodedImage],
    stream: false,
    format: "json",
    keep_alive: KEEP_ALIVE,
    options: {
      num_predict: DEF_NUM_PREDICT,
      num_ctx: DEF_NUM_CTX,
      temperature: DEF_TEMPERATURE,
      ...(options || {}),
    },
  };
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  const res = await fetch(`${HOST}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
    signal: ctrl.signal,
  });
  clearTimeout(t);
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(txt || `status ${res.status}`);
  }
  const data: any = await res.json();
  return String(data.response || "");
}

