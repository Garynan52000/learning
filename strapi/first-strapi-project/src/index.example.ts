export default {
  async register({ strapi }) {
    strapi.log.info('Async register finished after a short delay');
    await new Promise((resolve) => setTimeout(resolve, 1000));
  },
  async bootstrap({ strapi }) {
    strapi.log.info('Async bootstrap finished after a short delay');
    await new Promise((resolve) => setTimeout(resolve, 1000));
  },
  async destroy({ strapi }) {
    strapi.log.info('Async destroy finished after a short delay');
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
};