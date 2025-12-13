import { routes } from "./src/routes";
import { PORT } from "./src/config";

Bun.serve({
  port: PORT,
  routes,
  fetch() {
    return new Response("Unmatched route", { status: 404 });
  },
});
