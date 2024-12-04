// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "@vee-validate/nuxt",
    '@pinia/nuxt',
    "@nuxtjs/google-fonts",
    '@vueuse/nuxt',
    "dayjs-nuxt"
  ],
  image: {
    dir: "assets/images",
  },
  runtimeConfig: {
    // Public keys that are exposed to the client
    public: {
      apiBase: ''
    }
  },
  veeValidate: {
    // 啟用 auto imports
    autoImports: true,
    // 更換 components 名稱
    componentNames: {
      Form: "VeeForm",
      Field: "VeeField",
      FieldArray: "VeeFieldArray",
      ErrorMessage: "VeeErrorMessage",
    },
  },
  googleFonts: {
    families: {
      "Noto Sans TC": [300, 400, 500, 700],
      "Space Grotesk": [300]
    }
  }
});