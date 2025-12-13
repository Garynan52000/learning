import { healthRoute } from "./health";
import { altRoute } from "./alt";
import { describeRoute } from "./describe";

export const routes = {
  "/health": healthRoute,
  "/alt": altRoute,
  "/describe": describeRoute,
};
