export default (plugin) => {
  const {
    controllers,
    routes,
  } = plugin;
  const contentRoutes = routes['content-api'].routes;

  // Add a new controller action
  controllers.user.deactivate = async (ctx) => {
    const id = ctx.params?.id ?? ctx.state?.user?.id;

    if (!id) {
      ctx.status = 400;
      ctx.body = { message: 'User id is required' };
      return;
    }

    const user = await strapi
      .plugin('users-permissions')
      .service('user')
      .edit(id, { blocked: true });

    ctx.body = { message: `User ${user.username} has been deactivated` };
  };

  // Register the route
  contentRoutes.push({
    method: 'POST',
    path: '/users/me/deactivate',
    handler: 'user.deactivate',
    config: {
      prefix: '',
      policies: ['global::is-own-user'],
    },
  });
  
  const routeHandlers = ['user.update', 'user.destroy'];
  let routeHandlersCount = 0;
  for (const contentRoute of contentRoutes) {
    if (routeHandlersCount === routeHandlers.length) break;
    
    if (routeHandlers.slice(0, 2).includes(contentRoute.handler)) {
      // Add the same policy to the user routes that should be self-only
      routeHandlersCount++;
      contentRoute.config = contentRoute.config || {};
      contentRoute.config.policies = contentRoute.config.policies || [];
      contentRoute.config.policies.push('global::is-own-user');
    }
  }

  return plugin;
};
