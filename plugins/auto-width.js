import { directive as VueInputAutowidth } from "vue-input-autowidth";
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("autoWidth", VueInputAutowidth);
});
