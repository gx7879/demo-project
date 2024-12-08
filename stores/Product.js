import { shoppingCarts } from "@/api/order";

export const useProductStore = defineStore("product", () => {
  const cookie = useCookie("token");
  const products = ref([]);
  const setProduct = (newProduct) => {
    products.value = newProduct;
  };
  const productClear = () => {
    products.value = [];
  };
  const getCart = async () => {
    try {
      const result = await shoppingCarts();
      setProduct(result);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };
  return {
    products,
    setProduct,
    productClear,
    getCart,
  };
});
