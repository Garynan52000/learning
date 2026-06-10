export default (plugin) => {
  // Your customizations here
  const contentAPI = plugin.routes['content-api'];
  const routes = contentAPI.routes;
  return plugin;
};