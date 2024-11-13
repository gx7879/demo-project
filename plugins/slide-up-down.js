import { Vue3SlideUpDown } from "vue3-slide-up-down";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("Vue3SlideUpDown", Vue3SlideUpDown);
});
