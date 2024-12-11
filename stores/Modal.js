import { defineStore } from "pinia";

export const useModalStore = defineStore("modal", () => {
  const isVisible = ref(false);
  const modalState = ref({});
  const showModal = (props = {}) => {
    setIsVisible(true);
    console.log(props);
    modalState.value = props;
  };
  const confirm = (password) => {
    console.log(password);
    setIsVisible(false);
  };
  const cancel = () => {
    setIsVisible(false);
  };
  const setIsVisible = (data) => {
    isVisible.value = data;
  };
  return {
    isVisible,
    modalState,
    showModal,
    setIsVisible,
    confirm,
    cancel,
  };
});
