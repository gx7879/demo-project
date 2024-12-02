export const useResetPasswordStore = defineStore("resetPassword", () => {
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
  return {
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
  };
});
