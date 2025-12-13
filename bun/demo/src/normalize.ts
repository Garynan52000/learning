export function normalizeText(s: string, maxLen = 180) {
  const t = s.replace(/\s+/g, " ").trim();
  return t.length > maxLen ? t.slice(0, maxLen) + "…" : t;
}

