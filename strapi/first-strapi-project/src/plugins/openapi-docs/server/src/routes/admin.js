'use strict';

module.exports = {
  type: 'admin',
  routes: [
    {
      method: 'GET',
      path: '/spec',
      handler: 'openapi.spec',
      config: {
        policies: ['admin::isAuthenticatedAdmin'],
      },
    },
  ],
};

