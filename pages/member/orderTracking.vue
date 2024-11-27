<script setup>
const orders = ref([
  {
    discount: {
      vip: 0,
      other: 0,
      coupon: 0,
      promotion: null,
      data: {},
    },
    id: 4,
    trade_no: "#0000000004",
    user_id: 1,
    order_status_id: 1,
    is_paid: false,
    is_refund: false,
    status_update_date: "2024-11-22T03:54:58.000Z",
    status_expired_date: null,
    price: 1000,
    note: null,
    payment_method: "Credit",
    created_at: "2024-11-22T03:54:58.000Z",
    updated_at: "2024-11-22T03:54:58.000Z",
    deleted_at: null,
    User: {
      id: 1,
      uuid: "896025702748",
      name: null,
      email: null,
      created_at: "2024-10-24T03:37:24.000Z",
    },
    UserProfile: {
      user_id: 1,
      name: "string",
    },
    PaidUpdate: null,
    OrderStatus: null,
    TransportingUpdate: null,
    CompletedUpdate: null,
    CancelUpdate: null,
    OrderAddress: {
      detail: null,
      id: 7,
      type: "order",
      order_id: 4,
      delivery_type: "home",
      is_same: false,
      first_name: "名字",
      last_name: "姓氏",
      email: "123456@gmail.com",
      phone_number: "0912345678",
      company_name: "",
      place_name: null,
      country: "台灣",
      address: "台北市中正區中正路123號",
      zip_code: "112",
      note: null,
      created_at: "2024-11-22T03:54:58.000Z",
      updated_at: "2024-11-22T03:54:58.000Z",
      deleted_at: null,
    },
    ReceiveAddress: {
      detail: null,
      id: 8,
      type: "receive",
      order_id: 4,
      delivery_type: "home",
      is_same: false,
      first_name: "收件人名字",
      last_name: "收件人姓氏",
      email: null,
      phone_number: "0910100100",
      company_name: null,
      place_name: null,
      country: "台灣",
      address: "台北市大同區承德路一段1號",
      zip_code: "103",
      note: null,
      created_at: "2024-11-22T03:54:58.000Z",
      updated_at: "2024-11-22T03:54:58.000Z",
      deleted_at: null,
    },
    OrderCommodities: [
      {
        discount: {
          vip: 0,
          coupon: 0,
          other: 0,
        },
        id: 4,
        status: "normal",
        user_id: 1,
        order_id: 4,
        commodity_info_id: 4,
        amount: 1,
        commodity_type: "normal",
        price: 1000,
        created_at: "2024-11-22T03:54:58.000Z",
        updated_at: "2024-11-22T03:54:58.000Z",
        deleted_at: null,
        CommodityPropertyInfo: {
          id: 4,
          type: "main",
          commodity_id: 1,
          price: 1000,
          discount_price: null,
          stock: 92,
          original_stock: 100,
          created_at: "2024-11-01T09:29:07.000Z",
          updated_at: "2024-11-22T03:54:58.000Z",
          Commodity: {
            id: 1,
            is_active: true,
            start_date: "2024-11-01T09:01:08.000Z",
            end_date: null,
            name: "測試",
            order: 1,
            created_at: "2024-11-01T09:01:08.000Z",
            updated_at: "2024-11-07T10:57:06.000Z",
            deleted_at: null,
            Covers: [],
            CategoryList: [],
            LabelList: [],
            CommodityProperties: [],
            CommodityPropertyInfos: [],
            discount_price: null,
            price: 1000,
            stock: 92,
            original_stock: 100,
            commodity_info_id: 4,
          },
          CommodityPropertyValues: [],
          is_calculated: true,
        },
      },
    ],
  },
]);

const { currency } = useCurrency();

function orderStatusTransfer(id) {
  const orderStatus = {
    1: "待付款",
    2: "已付款",
    3: "運輸中",
    4: "已完成",
  };
  return orderStatus[id];
}
</script>

<template>
  <div class="px-6 2xl:px-0">
    <h2 class="mb-3 text-main-black/70 text-[28px] leading-[1.4] font-medium">
      訂單追蹤
    </h2>
    <template v-if="orders.length !== 0">
      <div
        class="overflow-x-auto max-w-full mb-6 border-b-[6px] border-b-main-black/20"
      >
        <table class="table text-main-black/70 border-t border-main-black h-px">
          <thead>
            <tr class="font-medium">
              <td
                class="after:absolute after:w-full after:h-px after:bg-main-black after:left-0 after:scale-y-50 after:bottom-0 relative min-w-60 py-6 pb-3 whitespace-nowrap"
              >
                訂單編號
              </td>
              <td
                class="after:absolute after:w-full after:h-px after:bg-main-black after:left-0 after:scale-y-50 after:bottom-0 relative min-w-40 py-6 pb-3 whitespace-nowrap"
              >
                訂單日期
              </td>
              <td
                class="after:absolute after:w-full after:h-px after:bg-main-black after:left-0 after:scale-y-50 after:bottom-0 relative min-w-[200px] py-6 pb-3 whitespace-nowrap"
              >
                合計
              </td>
              <td
                class="after:absolute after:w-full after:h-px after:bg-main-black after:left-0 after:scale-y-50 after:bottom-0 relative min-w-[100px] py-6 pb-3 whitespace-nowrap"
              >
                狀態
              </td>
              <td
                class="min-w-40 sticky right-0 z-10 drop-shadow-[-4px_0px_4px_rgba(0,_0,_0,_0.25)] bg-bg-gray font-medium after:absolute after:w-full after:h-px after:bg-main-black after:left-0 after:scale-y-50 after:bottom-0"
              ></td>
            </tr>
          </thead>
          <tbody>
            <!-- eslint-disable-next-line vue/no-v-for-template-key -->
            <template v-for="order in orders" :key="order.trade_no">
              <tr class="">
                <td
                  class="after:absolute after:w-full after:h-px after:bg-main-black after:left-0 after:scale-y-50 after:bottom-0 relative h-14 whitespace-nowrap"
                >
                  {{ order.trade_no }}
                </td>
                <td
                  class="after:absolute after:w-full after:h-px after:bg-main-black after:left-0 after:scale-y-50 after:bottom-0 relative h-14 whitespace-nowrap"
                >
                  {{ $dayjs(order.created_at).format("YYYY-MM-DD") }}
                </td>
                <td
                  class="after:absolute after:w-full after:h-px after:bg-main-black after:left-0 after:scale-y-50 after:bottom-0 relative h-14 whitespace-nowrap"
                >
                  TWD {{ currency(order.price) }}
                </td>
                <td
                  class="after:absolute after:w-full after:h-px after:bg-main-black after:left-0 after:scale-y-50 after:bottom-0 relative h-14 whitespace-nowrap"
                >
                  {{ orderStatusTransfer(order.order_status_id) }}
                </td>
                <td
                  class="h-14 sticky right-0 z-10 pl-4 2xl:pl-11 drop-shadow-[-4px_0px_4px_rgba(0,_0,_0,_0.25)] bg-bg-gray font-medium after:left-0 after:right-0 after:bottom-0 after:bg-main-black after:h-px after:block after:absolute after:scale-y-50"
                >
                  <NuxtLink
                    custom
                    v-slot="{ navigate }"
                    :to="{
                      name: 'member-orderDetail-orderId',
                      params: { orderId: 1 },
                    }"
                  >
                    <button
                      class="rounded-[5px] bg-main-black/80 text-white py-[7px] px-3 text-lg leading-none font-bold"
                      @click="navigate"
                    >
                      詳情
                    </button>
                  </NuxtLink>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <div class="text-center text-main-black/70">僅顯示 2 年內訂單</div>
    </template>
    <template v-else>
      <div class="flex justify-center items-center mt-12">
        <div>
          <NuxtImg
            width="72"
            class="mx-auto mb-9"
            src="/emptyOrder.png"
            densities="x1 x2"
          ></NuxtImg>
          <p class="text-main-black/70">目前沒有訂購紀錄</p>
        </div>
      </div>
    </template>
  </div>
</template>

<style>
.table {
  width: 100%;
  border-collapse: collapse;
}
</style>
