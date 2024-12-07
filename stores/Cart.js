export const useCartStore = defineStore("cart", () => {
  const cart = ref([]);
  const isSubmittingOrder = ref(false);
  const getCart = computed(() => cart.value);
  const setCart = (data) => {
    cart.value = data;
  };
  return {
    cart,
    getCart,
    setCart,
    isSubmittingOrder,
  };
});
