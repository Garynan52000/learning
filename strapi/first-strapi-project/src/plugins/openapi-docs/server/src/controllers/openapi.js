'use strict';

const fs = require('fs/promises');
const path = require('path');

const readJsonFile = async (filePath) => {
  const raw = await fs.readFile(filePath, 'utf8');
  return JSON.parse(raw);
};

const normalizePrefix = (prefix) => {
  if (!prefix) return '/api';
  const withLeadingSlash = prefix.startsWith('/') ? prefix : `/${prefix}`;
  if (withLeadingSlash.length > 1 && withLeadingSlash.endsWith('/')) {
    return withLeadingSlash.slice(0, -1);
  }
  return withLeadingSlash;
};

const hasOwn = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

const joinUrl = (a, b) => {
  const left = a === '/' ? '' : normalizePrefix(a);
  const right = b.startsWith('/') ? b : `/${b}`;
  const joined = `${left}${right}`;
  return joined === '' ? '/' : joined;
};

const toOpenApiPath = (routePath) => {
  if (typeof routePath !== 'string') return routePath;
  return routePath.replace(/:([A-Za-z0-9_]+)[?*]?/g, '{$1}');
};

const flattenRoutes = (routes) => {
  if (!routes) return [];
  const groups = Array.isArray(routes) ? routes : Object.values(routes);
  const flat = [];

  for (const group of groups) {
    if (!group) continue;
    if (Array.isArray(group.routes)) {
      flat.push(...group.routes);
      continue;
    }
    if (Array.isArray(group)) {
      flat.push(...group);
      continue;
    }
    flat.push(group);
  }

  return flat;
};

const getContentApiPathsThatNeedPrefix = (strapi, apiPrefix) => {
  const normalizedPrefix = normalizePrefix(apiPrefix);
  const paths = new Set();

  const collect = (container) => {
    for (const item of Object.values(container || {})) {
      const routes = flattenRoutes(item.routes);
      for (const route of routes) {
        if (!route?.info || route.info.type !== 'content-api') continue;
        if (route?.config && hasOwn(route.config, 'prefix')) continue;

        const openApiPath = toOpenApiPath(route.path);
        if (
          openApiPath === normalizedPrefix ||
          openApiPath.startsWith(`${normalizedPrefix}/`)
        ) {
          continue;
        }

        paths.add(openApiPath);
      }
    }
  };

  collect(strapi.apis);
  collect(strapi.plugins);

  return paths;
};

const withContentApiPrefixedPaths = (spec, strapi, apiPrefix) => {
  if (!spec || typeof spec !== 'object' || !spec.paths || typeof spec.paths !== 'object') {
    return spec;
  }

  const normalizedPrefix = normalizePrefix(apiPrefix);
  const shouldPrefix = getContentApiPathsThatNeedPrefix(strapi, normalizedPrefix);

  if (shouldPrefix.size === 0) {
    return spec;
  }

  const nextPaths = { ...spec.paths };

  for (const originalKey of Object.keys(spec.paths)) {
    if (!shouldPrefix.has(originalKey)) continue;

    const nextKey = joinUrl(normalizedPrefix, originalKey);
    if (nextKey === originalKey) continue;

    if (nextPaths[nextKey] && typeof nextPaths[nextKey] === 'object') {
      nextPaths[nextKey] = { ...nextPaths[nextKey], ...nextPaths[originalKey] };
      delete nextPaths[originalKey];
      continue;
    }

    nextPaths[nextKey] = nextPaths[originalKey];
    delete nextPaths[originalKey];
  }

  return { ...spec, paths: nextPaths };
};

module.exports = ({ strapi }) => ({
  async spec(ctx) {
    const specPath = path.resolve(strapi.dirs.app.root, 'docs', 'swagger-spec.json');

    try {
      const data = await readJsonFile(specPath);
      const apiPrefix = normalizePrefix(strapi.config.get('api.rest.prefix'));
      ctx.body = { data: withContentApiPrefixedPaths(data, strapi, apiPrefix) };
    } catch (err) {
      const message = err instanceof Error ? err.message : '无法读取 OpenAPI spec 文件';
      ctx.throw(
        404,
        `${message}。请先执行 npm run doc:openapi 生成 ./docs/swagger-spec.json`
      );
    }
  },
});
