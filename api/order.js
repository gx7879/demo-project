// import { useHttp } from "~/composables/useHttp";

const Api = {
  shoppingCarts: "/api/order/shopping_carts",
  addShoppingCart: "/api/order/add_shopping_cart",
  deleteShoppingCart: "/api/order/delete_shopping_cart",
  updateShoppingCart: "/api/order/update_shopping_cart",
  createOrder: "/api/order/create_order",
  orderDetail: "/api/order/orders",
  updateOrder: "/api/order/update_order",
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

export function createOrder(data) {
  return useHttp.post(Api.createOrder, data);
}

export function orderDetail(data) {
  return useHttp.get(`${Api.orderDetail}/${data.id}`);
}

export function updateOrder(data) {
  return useHttp.post(Api.updateOrder, data);
}
