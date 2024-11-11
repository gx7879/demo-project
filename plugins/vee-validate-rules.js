import { defineRule, configure } from "vee-validate";
import { all } from "@vee-validate/rules";
import { localize, setLocale } from "@vee-validate/i18n";
import zhTW from "@vee-validate/i18n/dist/locale/zh_TW.json";

// 必須定義，用來封裝 plugin
export default defineNuxtPlugin((_nuxtApp) => {
  Object.entries(all).forEach(([name, rule]) => {
    defineRule(name, rule);
  });

  // configure({
  //   generateMessage: localize({
  //     zh_TW: {
  //       ...zhTW,
  //       messages: {
  //         ...zhTW.messages,
  //         email: "電子郵件無效",
  //       },
  //     },
  //   }),
  // });
  configure({
    generateMessage: localize({
      zh_TW: zhTW,
    }),
    validateOnBlur: false,
  });
  // localize("zh_TW", {
  //   messages: {
  //     email: "電子郵件無效",
  //   },
  // });
  setLocale("zh_TW");
});
