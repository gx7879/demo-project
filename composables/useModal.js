export function useModal() {
  const isVisible = ref(false);
  const modalState = ref({
    title: "",
    text: "",
    icon: "",
    onConfirm: null,
    onCancel: null,
  });
  const showModal = (title, text, icon, onConfirm, onCancel) => {
    modalState.value = {
      title,
      text,
      icon,
      onConfirm: onConfirm || null,
      onCancel: onCancel || null,
    };
    isVisible.value = true;
    console.log(isVisible.value);
  };
  const closeModal = () => {
    isVisible.value = false;
  };

  const confirm = () => {
    closeModal();
    if (modalState.value.onConfirm) modalState.value.onConfirm();
  };

  const cancel = () => {
    closeModal();
    if (modalState.value.onCancel) modalState.value.onCancel();
  };

  return {
    isVisible,
    modalState,
    showModal,
    closeModal,
    confirm,
    cancel,
  };
}
