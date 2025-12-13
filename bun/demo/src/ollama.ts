const HOST = process.env.OLLAMA_HOST || "http://localhost:11434";

export async function ollamaAvailable(): Promise<boolean> {
  try {
    const res = await fetch(`${HOST}/api/tags`, { method: "GET" });
    return res.ok;
  } catch {
    return false;
  }
}

export async function visionGenerate(model: string, imageUrl: string, prompt: string, options?: Record<string, any>) {
  const body = {
    model,
    prompt,
    images: [imageUrl],
    stream: false,
    options: {
      num_predict: 256,
      num_ctx: 2048,
      temperature: 0.2,
      ...(options || {}),
    },
  };
  const res = await fetch(`${HOST}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(txt || `status ${res.status}`);
  }
  const data: any = await res.json();
  return String(data.response || "");
}

