import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { DefaultCatchBoundry } from "./components/DefaultCatchBoundry";
import { NotFound } from "./components/NotFound";

export function getRouter() {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultErrorComponent: DefaultCatchBoundry,
    defaultNotFoundComponent: () => <NotFound />,
  });
  return router;
}
