import type { Modules } from '@strapi/strapi';
import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Modules.Features.FeaturesConfig => ({
});

export default config;
