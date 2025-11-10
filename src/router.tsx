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
	if (process.env.LOG_DEBUG) {
		router.subscribe("onBeforeLoad", console.log);
		router.subscribe("onBeforeNavigate", console.log);
		router.subscribe("onBeforeRouteMount", console.log);
		router.subscribe("onLoad", console.log);
		router.subscribe("onRendered", console.log);
		router.subscribe("onResolved", console.log);
	}
	return router;
}
