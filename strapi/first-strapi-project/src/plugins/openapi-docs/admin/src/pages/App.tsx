import { useFetchClient } from '@strapi/strapi/admin';
import { useEffect, useMemo, useRef, useState } from 'react';

declare global {
  interface Window {
    SwaggerUIBundle?: any;
    SwaggerUIStandalonePreset?: any;
  }
}

const ensureLink = (id: string, href: string) => {
  if (document.getElementById(id)) return;
  const link = document.createElement('link');
  link.id = id;
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = href;
  document.head.appendChild(link);
};

const loadScript = (id: string, src: string) =>
  new Promise<void>((resolve, reject) => {
    const existing = document.getElementById(id) as HTMLScriptElement | null;
    if (existing) {
      if (existing.dataset.loaded === 'true') resolve();
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(new Error(`加载失败: ${src}`)), {
        once: true,
      });
      return;
    }

    const script = document.createElement('script');
    script.id = id;
    script.src = src;
    script.async = true;
    script.addEventListener('load', () => {
      script.dataset.loaded = 'true';
      resolve();
    });
    script.addEventListener('error', () => reject(new Error(`加载失败: ${src}`)));
    document.body.appendChild(script);
  });

const loadSwaggerUiAssets = async () => {
  ensureLink(
    'swagger-ui-css',
    'https://unpkg.com/swagger-ui-dist@5.0.0/swagger-ui.css'
  );
  (() => {
    if (document.getElementById('swagger-ui-css-override')) {
      return;
    }
    const _style = document.createElement('style');
    _style.id = 'swagger-ui-css-override';
    _style.innerHTML = `
      .swagger-ui.swagger-container .topbar {
        display: none !important;
      }
    `;
    document.getElementsByTagName('head')?.[0]?.appendChild(_style);
  })();
  await loadScript(
    'swagger-ui-bundle',
    'https://unpkg.com/swagger-ui-dist@5.0.0/swagger-ui-bundle.js'
  );
  await loadScript(
    'swagger-ui-standalone-preset',
    'https://unpkg.com/swagger-ui-dist@5.0.0/swagger-ui-standalone-preset.js'
  );
};

export default function App() {
  const { get } = useFetchClient();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const uiRef = useRef<any>(null);

  const [spec, setSpec] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const res = await get('/openapi-docs/spec');
        const nextSpec = (res as any)?.data?.data;
        if (!nextSpec) throw new Error('返回数据为空');
        if (mounted) setSpec(nextSpec);
      } catch (err) {
        const message = err instanceof Error ? err.message : '加载 OpenAPI spec 失败';
        if (mounted) setError(message);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [get]);

  useEffect(() => {
    if (!spec) return;
    if (!containerRef.current) return;

    let cancelled = false;

    (async () => {
      try {
        await loadSwaggerUiAssets();
        if (cancelled) return;
        if (!window.SwaggerUIBundle) throw new Error('Swagger UI 未加载');

        containerRef.current!.innerHTML = '';
        uiRef.current = window.SwaggerUIBundle({
          spec,
          domNode: containerRef.current,
          presets: [
            window.SwaggerUIBundle.presets.apis,
            window.SwaggerUIStandalonePreset,
          ],
          layout: 'StandaloneLayout',
        });
      } catch (err) {
        const message = err instanceof Error ? err.message : '初始化 Swagger UI 失败';
        if (!cancelled) setError(message);
      }
    })();

    return () => {
      cancelled = true;
      uiRef.current = null;
    };
  }, [spec]);

  return (
    <div style={{ padding: 24 }}>
      {error ? (
        <div style={{ color: 'var(--danger600)' }}>{error}</div>
      ) : (
        <div ref={containerRef} />
      )}
    </div>
  );
}

