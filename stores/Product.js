export const useProductStore = defineStore("product", () => {
  const products = ref([
    {
      name: "ARK-002乾•淨•水循環空淨取水智慧機",
      stock: 1,
      num: 1,
      price: 89000,
      discount_price: 0,
    },
    {
      name: "ARKVO 超濾淨化耗材組",
      stock: 1,
      num: 1,
      price: 89000,
      discount_price: 8000,
    },
  ]);
  const setProduct = (newProduct) => {
    products.value = newProduct;
  };
  return {
    products,
    setProduct,
  };
});
