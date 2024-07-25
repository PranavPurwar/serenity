// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  experimental: {
    viewTransition: true,
    typedPages: true
  },
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

  modules: ["@nuxtjs/tailwindcss", "@nuxt/image"],
  compatibilityDate: "2024-07-22",
});