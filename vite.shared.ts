import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

type RuntimeOptions = {
  runtime: "node" | "bun";
};

export function createViteConfig({ runtime }: RuntimeOptions) {
  const isBun = runtime === "bun";

  return defineConfig({
    optimizeDeps: {
      entries: ["src/**/*.{js,jsx,ts,tsx}"],
      exclude: ["bun"],
    },
    server: {
      port: 3000,
    },
    ...(isBun ? { preview: { host: "127.0.0.1" } } : {}),
    ssr: {
      external: ["bun"],
    },
    build: {
      chunkSizeWarningLimit: isBun ? 300 : 500,
      rollupOptions: {
        external: ["bun"],
      },
    },
    resolve: {
      tsconfigPaths: true,
    },
    plugins: [
      devtools(),
      tailwindcss(),
      tanstackStart({
        importProtection: {
          enabled: false,
        },
        srcDirectory: "src",
        router: {
          routeToken: "layout",
        },
        ...(isBun
          ? {
              spa: {
                enabled: true,
                prerender: {
                  enabled: true,
                  crawlLinks: true,
                },
              },
              pages: [
                {
                  path: "/",
                },
              ],
            }
          : {}),
      }),
      ...(isBun
        ? []
        : [
            nitro({
              vercel: {
                functions: {
                  runtime: "bun1.x",
                },
              },
            }),
          ]),
      viteReact(),
    ],
  });
}
