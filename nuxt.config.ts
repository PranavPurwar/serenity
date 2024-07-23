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

  modules: ["@nuxtjs/tailwindcss", "@nuxt/image"],
  compatibilityDate: "2024-07-22",
});