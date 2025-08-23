import { defineConfig, envField } from "astro/config"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"
import solidJs from "@astrojs/solid-js"
import node from "@astrojs/node"

// https://astro.build/config
export default defineConfig({
  site: "https://spaghet.io",
  integrations: [mdx(), sitemap(), solidJs(), tailwind({ applyBaseStyles: false })],
  output: "server",
  adapter: node({ mode: "ssr" }),
  env: {
    schema: {
      VITE_APPWRITE_ENDPOINT: envField.string({ context: "server", access: "public" }),
      VITE_APPWRITE_PROJECT_ID: envField.string({ context: "server", access: "public" }),
      VITE_APPWRITE_BUCKET_ID: envField.string({ context: "server", access: "public" }),
      VITE_APPWRITE_DATABASE_ID: envField.string({ context: "server", access: "public" }),
      VITE_APPWRITE_BLOG_COLLECTION_ID: envField.string({ context: "server", access: "public" }),
      VITE_APPWRITE_PROJECTS_COLLECTION_ID: envField.string({ context: "server", access: "public" }),
      VITE_APPWRITE_WORK_COLLECTION_ID: envField.string({ context: "server", access: "public" }),
      VITE_APPWRITE_LEGAL_COLLECTION_ID: envField.string({ context: "server", access: "public" }),
      PUBLIC_APPWRITE_ENDPOINT: envField.string({ context: "client", access: "public" }),
      PUBLIC_APPWRITE_PROJECT_ID: envField.string({ context: "client", access: "public" }),
      PUBLIC_APPWRITE_BUCKET_ID: envField.string({ context: "client", access: "public" }),
      PUBLIC_APPWRITE_DATABASE_ID: envField.string({ context: "client", access: "public" }),
      PUBLIC_APPWRITE_BLOG_COLLECTION_ID: envField.string({ context: "client", access: "public" }),
      PUBLIC_APPWRITE_PROJECTS_COLLECTION_ID: envField.string({ context: "client", access: "public" }),
      PUBLIC_APPWRITE_WORK_COLLECTION_ID: envField.string({ context: "client", access: "public" }),
      PUBLIC_APPWRITE_LEGAL_COLLECTION_ID: envField.string({ context: "client", access: "public" }),
    }
  }
})
