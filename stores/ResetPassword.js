import { defineStore } from "pinia";

export const useResetPasswordStore = defineStore(
  "resetPassword",
  () => {
    const currentMail = ref("");
    const resetPasswordAuth = ref(false);

    const setResetPasswordAuth = (data) => {
      resetPasswordAuth.value = data;
    };
    const setMail = (data) => {
      currentMail.value = data;
    };
    const passwordClear = () => {
      currentMail.value = "";
    };
    return {
      currentMail,
      resetPasswordAuth,
      setResetPasswordAuth,
      setMail,
      passwordClear,
    };
  },
  {
    persist: true,
  }
);
