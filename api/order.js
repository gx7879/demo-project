// import { useHttp } from "~/composables/useHttp";

const Api = {
  shoppingCarts: "/api/order/shopping_carts",
  addShoppingCart: "/api/order/add_shopping_cart",
  sendResetPassword: "/api/auth/send_reset_password",
  getCustomToken: "/api/auth/get_custom_token",
};

export function shoppingCarts(data) {
  return useHttp.get(Api.shoppingCarts, data);
}

export function addShoppingCart(data) {
  return useHttp.post(Api.addShoppingCart, data);
}

export function sendResetPassword(data) {
  console.log(data);
  return useHttp.post(Api.sendResetPassword, data);
}

export function getCustomToken(data) {
  return useHttp.get(Api.getCustomToken, data);
}
