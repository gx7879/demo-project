const Api = {
  gateway: "/api/payment/gateway",
  createPayment: "/api/payment/create_payment",
};

export function gateway({ id, ChoosePaymentList, OrderResultURL }) {
  return useHttp.get(`${Api.gateway}/${id}`, {
    ChoosePaymentList,
    OrderResultURL,
  });
}

export function createPayment(data) {
  return useHttp.post(Api.createPayment, data);
}
