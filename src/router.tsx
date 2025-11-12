import { MutationCache, QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";
import { routeTree } from "./routeTree.gen";
import { DefaultCatchBoundry } from "./components/DefaultCatchBoundry";
import { NotFound } from "./components/NotFound";
import { ZodError } from "zod";
import { fromError } from "zod-validation-error";
import { toast } from "sonner";

function parseZod(error: Error) {
  try {
    return new ZodError(JSON.parse(error.message));
  } catch {}
}

export function getRouter() {
  const queryClient: QueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        retry: 0,
        refetchOnWindowFocus: false,
      },
    },
    mutationCache: new MutationCache({
      onError: (error: unknown, _1, _2, mutation) => {
        if (mutation?.meta?.disableGlobalErrorHandling) return;
        if (error instanceof ZodError) {
          const zodError = parseZod(error);
          if (zodError) {
            toast.error(fromError(zodError, { maxIssuesInMessage: 2 }).message);
            return;
          }
          toast.error(error.message);
        } else if (typeof error === "string") {
          toast.error(error);
        } else if (
          typeof error === "object" &&
          error !== null &&
          "message" in error
        ) {
          toast.error((error as { message: string }).message);
        }
      },
    }),
  });

  const router = routerWithQueryClient(
    createRouter({
      routeTree,
      defaultPreload: "intent",
      defaultPreloadStaleTime: 0,
      defaultStructuralSharing: true,
      scrollRestoration: true,
      defaultErrorComponent: DefaultCatchBoundry,
      defaultNotFoundComponent: () => <NotFound />,
      context: { queryClient },
    }),
    queryClient
  );

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
declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
