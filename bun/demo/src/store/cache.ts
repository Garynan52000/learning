type Entry = { value: string; expires: number };
const store = new Map<string, Entry>();

export function cacheGet(key: string): string | undefined {
  const e = store.get(key);
  if (!e) return undefined;
  if (e.expires <= Date.now()) {
    store.delete(key);
    return undefined;
  }
  return e.value;
}

export function cacheSet(key: string, value: string, ttlMs = 60_000): void {
  store.set(key, { value, expires: Date.now() + ttlMs });
}

