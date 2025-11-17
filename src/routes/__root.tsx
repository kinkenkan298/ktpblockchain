import {
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { lazy, Suspense } from "react";
import { DefaultCatchBoundry } from "@/components/DefaultCatchBoundry";
import { NotFound } from "@/components/not-found";
import { seo } from "@/utils/seo";

import appCss from "@/global.css?url";
import { Toaster } from "sonner";
import { QueryClient } from "@tanstack/react-query";
import { authQueryOptions } from "@/lib/auth/queries";

const TanStackDevtools = lazy(() =>
  import("@tanstack/react-devtools").then((mod) => ({
    default: mod.TanStackDevtools,
  }))
);

let FormDevtoolsPlugin:
  | (() => {
      name: string;
      render: (el: HTMLElement, theme: "light" | "dark") => React.JSX.Element;
    })
  | null = null;

if (import.meta.env.DEV) {
  import("@tanstack/react-form-devtools").then((mod) => {
    FormDevtoolsPlugin = mod.FormDevtoolsPlugin as typeof FormDevtoolsPlugin;
  });
}

const isDevelopment = import.meta.env.DEV;

const getHeadMetadata = () => ({
  meta: [
    {
      charSet: "utf-8",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
    ...seo({
      title: "E - KTP Blockchain",
      description: "E - KTP with security of blockchain",
    }),
  ],
  links: [
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicon-16x16.png",
    },
    { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
    { rel: "icon", href: "/favicon.ico" },
    {
      rel: "stylesheet",
      href: appCss,
    },
  ],
});

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  beforeLoad: async ({ context }) => {
    const userSession = await context.queryClient.fetchQuery(
      authQueryOptions.user()
    );
    return { userSession };
  },
  head: getHeadMetadata,
  shellComponent: RootDocument,
  errorComponent: DefaultCatchBoundry,
  notFoundComponent: () => <NotFound />,
});

function DevTools() {
  if (!isDevelopment) return null;

  const plugins = FormDevtoolsPlugin ? [FormDevtoolsPlugin()] : [];

  return (
    <Suspense fallback={null}>
      <TanStackDevtools config={{ hideUntilHover: false }} plugins={plugins} />
    </Suspense>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <Toaster position="top-center" richColors />
        {children}
        <DevTools />
        <Scripts />
      </body>
    </html>
  );
}
