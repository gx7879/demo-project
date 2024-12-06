export const useProductStore = defineStore("product", () => {
  const products = ref([]);
  const setProduct = (newProduct) => {
    products.value = newProduct;
  };
  return {
    products,
    setProduct,
  };
});
