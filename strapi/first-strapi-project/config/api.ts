import type { Core } from '@strapi/strapi';

const config: Core.Config.Api = {
  rest: {
    prefix: '/api',
    defaultLimit: 25,
    maxLimit: 100,
    withCount: true,
  },
};

export default config;
