import type { StrapiApp } from '@strapi/strapi/admin';
import PluginIcon from './components/PluginIcon';
import pluginId from './pluginId';

export default {
  register(app: StrapiApp) {
    app.addMenuLink({
      to: `/plugins/${pluginId}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: 'OpenAPI Docs',
      },
      Component: () => import('./pages/App'),
      permissions: [],
    });

    app.registerPlugin({
      id: pluginId,
      name: 'OpenAPI Docs',
    });
  },
};

