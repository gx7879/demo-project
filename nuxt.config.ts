// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  app: {
    head: {
      script: [{ src: "https://code.jquery.com/jquery-3.5.1.min.js" }]
    }
  },
  modules: [
    "@pinia/nuxt",
    "nuxt-vuefire",
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "@vee-validate/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "@vueuse/nuxt",
    "dayjs-nuxt",
    "nuxt-lodash",
    "@nuxtjs/google-fonts"
  ],
  // image: {
  //   dir: "assets/images",
  // },
  imports: {
    dirs: ["stores"],
  },
  runtimeConfig: {
    public: {
      apiBase: "",
    },
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
  vuefire: {
    auth: true,
    config: {
      apiKey: "AIzaSyC1V-QOXomHb-pvcyBr04oVIAX4MJeTUJo",
      authDomain: "air-water-f48d6.firebaseapp.com",
      projectId: "air-water-f48d6",
      storageBucket: "air-water-f48d6.firebasestorage.app",
      messagingSenderId: "543311698134",
      appId: "1:543311698134:web:27d8166f4abf5f5b111177",
      measurementId: "G-6V0DT2Z8Z7",
    },
  },
  googleFonts: {
    families: {
      "Noto Sans TC": [300, 400, 500, 700],
      "Space Grotesk": [300]
    }
  }
});