import { defineStore } from "pinia";

export const useResetPasswordStore = defineStore(
  "resetPassword",
  () => {
    const userStore = useUserStore();
    const { userInfo } = storeToRefs(userStore);
    const currentMail = ref("");
    const resetPasswordAuth = ref(false);
    const isVisible = ref(false);
    const resetPasswordState = ref({});
    const showResetPasswordModal = (props = {}) => {
      setIsVisible(true);
      console.log(props);
      resetPasswordState.value = props;
    };
    const confirm = (password) => {
      console.log(password);
      setIsVisible(false);
      setResetPasswordAuth(true);
      // if (resetPasswordState.value.onConfirm) {
      //   resetPasswordState.value.onConfirm();
      // }
    };
    const cancel = () => {
      setIsVisible(false);
      // if (resetPasswordState.value.onCancel) {
      //   resetPasswordState.value.onCancel();
      // }
    };
    const getResetPasswordState = computed(() => resetPasswordState.value);
    const setResetPasswordState = (data) => {
      resetPasswordState.value = data;
    };
    const setResetPasswordAuth = (data) => {
      resetPasswordAuth.value = data;
    };
    const setIsVisible = (data) => {
      isVisible.value = data;
    };
    const setMail = (data) => {
      currentMail.value = data;
    };
    const passwordClear = () => {
      currentMail.value = "";
    };
    return {
      currentMail,
      isVisible,
      resetPasswordAuth,
      resetPasswordState,
      getResetPasswordState,
      showResetPasswordModal,
      setResetPasswordState,
      setResetPasswordAuth,
      setIsVisible,
      confirm,
      cancel,
      setMail,
      passwordClear,
    };
  },
  {
    persist: true,
  }
);
