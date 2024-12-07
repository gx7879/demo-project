<script setup>
import { orders } from "@/api/member";
const { data: orderList } = await useAsyncData("orderList", () => orders());
console.log(orderList.value);
// const orders = ref([]);

// 管理展開行的 ID 列表
const expandedRows = ref([]);

const toggleRow = (id) => {
  console.log(id, expandedRows.value, expandedRows.value.includes(id));
  if (expandedRows.value.includes(id)) {
    expandedRows.value = expandedRows.value.filter((rowId) => rowId !== id);
  } else {
    expandedRows.value.push(id);
  }
};

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
      訂購紀錄
    </h2>
    <template v-if="orderList.length !== 0">
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
            <template v-for="order in orderList" :key="order.trade_no">
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
                  <div class="flex justify-between items-center">
                    <NuxtLink
                      custom
                      v-slot="{ navigate }"
                      :to="{
                        name: 'member-orderList-orderId',
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
                    <svg
                      @click="toggleRow(order.trade_no)"
                      class="w-6 h-6 text-gray-800 dark:text-white transition-transform cursor-pointer"
                      :class="{
                        'rotate-180': expandedRows.includes(order.trade_no),
                      }"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18.425 10.271C19.499 8.967 18.57 7 16.88 7H7.12c-1.69 0-2.618 1.967-1.544 3.271l4.881 5.927a2 2 0 0 0 3.088 0l4.88-5.927Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                </td>
              </tr>
              <tr
                v-if="expandedRows.includes(order.trade_no)"
                :key="`detail-${order.id}`"
              >
                <td colspan="2">
                  <div class="flex py-6">
                    <div class="w-[100px] rounded-[5px] overflow-hidden mr-3">
                      <NuxtImg
                        class="w-full"
                        src="/cart-product-img.jpg"
                      ></NuxtImg>
                    </div>
                    <div class="text-xl font-medium flex flex-col">
                      <div class="sm:mr-5">
                        {{
                          order.OrderCommodities[0].CommodityPropertyInfo
                            .Commodity.name
                        }}
                        <span class="text-sm font-light mt-1 block">Black</span>
                      </div>
                      <span class="text-sm text-main-black/70 mt-auto"
                        >數量
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="flex flex-col py-6 h-full">
                    <div>
                      <span
                        :class="{
                          'line-through':
                            order.OrderCommodities[0].CommodityPropertyInfo
                              .Commodity.discount_price > 0,
                        }"
                      >
                        $
                        {{
                          currency(
                            order.OrderCommodities[0].CommodityPropertyInfo
                              .Commodity.price
                          )
                        }}
                      </span>
                      <span
                        v-if="
                          order.OrderCommodities[0].CommodityPropertyInfo
                            .Commodity.discount_price > 0
                        "
                        class="text-[#ff7700]"
                      >
                        $
                        {{
                          currency(
                            order.OrderCommodities[0].CommodityPropertyInfo
                              .Commodity.discount_price
                          )
                        }}
                      </span>
                    </div>
                    <span class="mt-auto w-12 text-center">{{
                      order.OrderCommodities[0].amount
                    }}</span>
                  </div>
                </td>
                <td></td>
                <td
                  class="h-14 sticky right-0 z-10 pl-4 2xl:pl-11 drop-shadow-[-4px_0px_4px_rgba(0,_0,_0,_0.25)] bg-bg-gray"
                ></td>
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
