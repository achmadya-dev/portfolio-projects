/// <reference types="vite/client" />
/** biome-ignore-all lint/style/noHeadElement: needed to author <head> content */

import type { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import type * as React from "react";
import { lazy } from "react";

const TanStackDevtools = import.meta.env.DEV
  ? lazy(() =>
      import("@tanstack/react-devtools").then((m) => ({
        default: m.TanStackDevtools,
      }))
    )
  : () => null;

const ReactQueryDevtoolsPanel = import.meta.env.DEV
  ? lazy(() =>
      import("@tanstack/react-query-devtools").then((m) => ({
        default: m.ReactQueryDevtoolsPanel,
      }))
    )
  : () => null;

const TanStackRouterDevtoolsPanel = import.meta.env.DEV
  ? lazy(() =>
      import("@tanstack/react-router-devtools").then((m) => ({
        default: m.TanStackRouterDevtoolsPanel,
      }))
    )
  : () => null;

import appCss from "@/app.css?url";
import { DefaultCatchBoundary } from "@/components/error-boundary";
import { NotFound } from "@/components/not-found";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { DEFAULT_SITE_NAME, seo } from "@/utils/seo";

type RootContext = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RootContext>()({
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
        title: DEFAULT_SITE_NAME,
        description:
          "Personal portfolio — projects, skills, and ways to get in touch.",
      }).meta,
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: () => <NotFound />,
  shellComponent: RootDocument,
  wrapInSuspense: true,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          {import.meta.env.DEV && (
            <TanStackDevtools
              config={{ defaultOpen: false }}
              eventBusConfig={{ connectToServerBus: true }}
              plugins={[
                {
                  name: "Tanstack Query",
                  render: <ReactQueryDevtoolsPanel />,
                },
                {
                  name: "Tanstack Router",
                  render: <TanStackRouterDevtoolsPanel />,
                },
              ]}
            />
          )}

          <Scripts />
        </ThemeProvider>
      </body>
    </html>
  );
}
