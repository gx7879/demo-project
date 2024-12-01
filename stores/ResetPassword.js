export const useResetPasswordStore = defineStore("resetPassword", () => {
  const resetPasswordAuth = ref(false);
  const isVisible = ref(false);
  const resetPasswordState = ref({
    title: "變更密碼",
    text: "為確保您的個人安全,請輸入您的密碼,並進行身分認證。",
    password: "",
    onConfirm: null,
    onCancel: null,
  });
  const showResetPasswordModal = ({ confirm = null, cancel = null }) => {
    setIsVisible(true);
    resetPasswordState.value = {
      onConfirm: confirm,
      onCancel: cancel,
    };
  };
  const confirm = (password) => {
    console.log(password);
    setIsVisible(false);
    setResetPasswordAuth(true);
    if (resetPasswordState.value.onConfirm) {
      resetPasswordState.value.onConfirm();
    }
    const router = useRouter();
    router.push("/member/resetPassword");
  };
  const cancel = () => {
    setIsVisible(false);
    if (resetPasswordState.value.onCancel) {
      resetPasswordState.value.onCancel();
    }
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
