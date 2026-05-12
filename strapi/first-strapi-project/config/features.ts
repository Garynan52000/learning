import type { Modules } from '@strapi/strapi';
import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Modules.Features.FeaturesConfig => ({
  future: {
    adminTokens: env.bool('STRAPI_FUTURE_ADMIN_TOKENS', false),
  },
});

export default config;
