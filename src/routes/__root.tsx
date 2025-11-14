import {
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { FormDevtoolsPlugin } from "@tanstack/react-form-devtools";
import type { ReactNode } from "react";
import { DefaultCatchBoundry } from "@/components/DefaultCatchBoundry";
import { NotFound } from "@/components/not-found";
import { seo } from "@/utils/seo";

import appCss from "@/global.css?url";
import { Toaster } from "sonner";
import { QueryClient } from "@tanstack/react-query";
import { authQueryOptions } from "@/lib/auth/queries";
import { WagmiProvider } from "wagmi";
import { configWagmi } from "@/wagmi";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  beforeLoad: async ({ context }) => {
    const userSession = await context.queryClient.fetchQuery(
      authQueryOptions.user()
    );

    return { userSession };
  },
  head: () => ({
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
  }),
  shellComponent: RootDocument,
  errorComponent: DefaultCatchBoundry,
  notFoundComponent: () => <NotFound />,
});

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <WagmiProvider config={configWagmi}>
          <Toaster position="top-center" richColors />
          {children}
          <TanStackDevtools
            config={{ hideUntilHover: false }}
            plugins={[FormDevtoolsPlugin()]}
          />
          <Scripts />
        </WagmiProvider>
      </body>
    </html>
  );
}
