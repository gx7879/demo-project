// import { useHttp } from "~/composables/useHttp";

const Api = {
  shoppingCarts: "/api/order/shopping_carts",
  addShoppingCart: "/api/order/add_shopping_cart",
  deleteShoppingCart: "/api/order/delete_shopping_cart",
  updateShoppingCart: "/api/order/update_shopping_cart",
};

export function shoppingCarts(data) {
  return useHttp.get(Api.shoppingCarts, data);
}

export function addShoppingCart(data) {
  return useHttp.post(Api.addShoppingCart, data);
}

export function deleteShoppingCart(data) {
  return useHttp.delete(`${Api.deleteShoppingCart}/${data.id}`);
}

export function updateShoppingCart(data) {
  return useHttp.post(Api.updateShoppingCart, data);
}
