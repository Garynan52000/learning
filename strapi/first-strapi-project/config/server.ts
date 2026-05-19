import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Server => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  http: {
    serverOptions: {
      requestTimeout: 10 * 60 * 1000, // 10 minutes timeout
    }
  }
});

export default config;
