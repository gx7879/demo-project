export function useModal() {
  const isVisible = ref(false);
  const modalState = ref({});
  const showModal = (props = {}) => {
    // modalState.value = {
    //   title,
    //   text,
    //   icon,
    //   onConfirm: onConfirm || null,
    //   onCancel: onCancel || null,
    // };
    modalState.value = props;
    isVisible.value = true;
    console.log(isVisible.value);
  };
  const closeModal = () => {
    isVisible.value = false;
  };

  const confirm = () => {
    closeModal();
    // if (modalState.value.onConfirm) modalState.value.onConfirm();
  };

  const cancel = () => {
    closeModal();
    // if (modalState.value.onCancel) modalState.value.onCancel();
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
