// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  css: [
    "~/assets/css/main.css",
    "~/assets/css/tailwind.css",
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  experimental: {
    viewTransition: true,
  },
  nitro: {
    esbuild: {
      options: {
        target: "esnext"
      }
    }
  },
  vite: {
    build: {
      target: "esnext"
    }
  },
  routeRules: {
    '/watch/:id': {
      ssr: false
    }
  },

  modules: ["@nuxtjs/tailwindcss"],
});
