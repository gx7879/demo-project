export const useProductStore = defineStore("product", () => {
  const products = ref([]);
  const setProduct = (newProduct) => {
    products.value = newProduct;
  };
  const productClear = () => {
    products.value = [];
  };
  return {
    products,
    setProduct,
    productClear,
  };
});
