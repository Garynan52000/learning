export default {
  type: 'content-api',
  routes: [
    {
      method: 'POST',
      path: '/email/send',
      handler: 'email.send',
      config: {
        policies: [],
      },
    },
    {
      method: 'POST',
      path: '/email/test',
      handler: 'email.test',
      config: {
        policies: [],
      },
    },
  ],
};

