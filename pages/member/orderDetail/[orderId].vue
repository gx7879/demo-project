<script setup>
import { useClipboard } from "@vueuse/core";

const orderId = ref("20241030043700389");

const { copy, isSupported } = useClipboard();

function handleCopy() {
  if (!isSupported) {
    // message.error("您的浏览器不支持Clipboard API");
    console.log("您的浏览器不支持Clipboard API");
    return;
  }
  copy(orderId.value);
}
const route = useRoute();

const steps = ref([
  {
    id: 1,
    name: "訂單成立",
  },
  {
    id: 2,
    name: "待出貨",
  },
  {
    id: 3,
    name: "已出貨",
  },
  {
    id: 4,
    name: "已完成",
  },
]);

const currentActive = ref(2);
console.log(route.params.orderId);
function cancelOrder() {
  console.log("取消訂單");
}
</script>

<template>
  <div class="px-6 2xl:px-0">
    <div class="mb-[60px] text-center">
      <h2 class="text-[28px] leading-[1.4] font-medium text-main-black/70 mb-3">
        訂單編號
      </h2>
      <div class="flex justify-center items-center mb-3">
        <span
          class="font-medium text-[28px] leading-[1.4] text-main-black/70 mr-1"
        >
          {{ orderId }}
        </span>
        <NuxtImg
          class="w-[22px] cursor-pointer"
          src="/copy-icon.png"
          @click="handleCopy"
        ></NuxtImg>
      </div>
      <div class="text-4xl leading-[1.4] font-medium text-main-black/70">
        已出貨
      </div>
      <span class="text-[#fa0e0e] mt-[5px] block">貨品轉址運送中...</span>
    </div>
    <ol
      class="grid grid-cols-[1fr_1fr_1fr_auto] w-full mb-[120px] px-3 2xl:px-5"
    >
      <li
        v-for="step of steps"
        :key="step.id"
        class="flex w-full items-center group after:border-[#C0C6D8] has-[~.active]:text-blue-600 [&:not(:last-child)]:after:w-full [&:not(:last-child)]:after:h-1 [&:not(:last-child)]:after:border-b-[3px] [&:not(:last-child)]:has-[~.active]:after:border-[#68759F] [&:not(:last-child)]:after:inline-block"
        :class="{
          active: step.id === currentActive,
        }"
      >
        <span
          class="relative flex items-center justify-center w-10 h-10 rounded-full shrink-0 border-2 group-has-[~.active]:border-[#68759F] group-[.active]:border-[#68759F] group-[.active]:bg-[#68769F] after:absolute after:content-[attr(data-step-name)] after:left-1/2 after:-translate-x-1/2 after:top-[calc(100%_+_7px)] 2xl:after:top-[calc(100%_+_9px)] after:whitespace-nowrap 2xl:after:text-xl after:leading-normal after:group-[.active]:font-bold after:text-main-black/70"
          :class="{
            'border-[#C0C6D8] bg-white': step.id > currentActive,
          }"
          :data-step-name="step.name"
        >
          <svg
            class="size-6 text-[#68759F]"
            :class="{
              hidden: step.id >= currentActive,
            }"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m4.5 12.75 6 6 9-13.5"
            />
          </svg>
          <!-- <p
            class="absolute left-1/2 -translate-x-1/2 top-[calc(100%_+_9px)] whitespace-nowrap text-xl leading-normal group-[.active]:font-bold text-main-black/70"
          >
            {{ step.name }}
          </p> -->
        </span>
      </li>
    </ol>
    <h2 class="mb-9 text-main-black/70 text-[28px] leading-[1.4] font-medium">
      訂單資訊
    </h2>
    <div class="text-main-black/70">
      <div
        class="grid 2md:grid-cols-[2fr_repeat(4,1fr)] border-b border-main-black"
      >
        <div class="font-medium">商品資料</div>
        <div class="font-medium hidden 2md:block">優惠</div>
        <div class="font-medium hidden 2md:block">單件價格</div>
        <div class="font-medium hidden 2md:block text-center">數量</div>
        <div class="font-medium hidden 2md:block text-right">小計</div>
      </div>
      <div
        class="grid 2md:grid-cols-[2fr_repeat(4,1fr)] border-b border-main-black py-6"
      >
        <div class="flex">
          <div class="w-[100px] rounded-[5px] overflow-hidden mr-5">
            <NuxtImg class="w-full" src="/cart-product-img.jpg"></NuxtImg>
          </div>

          <div class="text-main-black/70 flex flex-col flex-1 2md:block">
            <div>
              <div class="leading-[1.4] font-bold">ARK-002</div>
              <span class="leading-[1.4] font-light">Black</span>
            </div>
            <span class="text-right mt-auto self-end 2md:hidden">
              TWD 89,000*1
            </span>
          </div>
        </div>
        <div class="hidden 2md:block"></div>
        <div class="hidden 2md:block">TWD 89,000</div>
        <div class="hidden 2md:block text-center">1</div>
        <div class="hidden 2md:block text-right">TWD 89,000</div>
      </div>
      <div class="flex flex-col items-end space-y-4 mt-3">
        <div class="text-main-black/70 max-w-80 w-full flex justify-between">
          <div class="text-sm font-medium">小計:</div>
          <div>TWD 89,000</div>
        </div>
        <div class="text-main-black/70 max-w-80 w-full flex justify-between">
          <div class="text-sm font-medium">運費:</div>
          <div>TWD 0</div>
        </div>
        <div class="text-main-black/70 max-w-80 w-full flex justify-between">
          <div class="text-sm font-bold">總計:</div>
          <div class="font-bold">TWD 89,000</div>
        </div>
      </div>
    </div>
    <div class="border-b border-main-black my-11 2md:my-12"></div>
    <h2 class="text-[28px] leading-[1.4] font-medium text-main-black/70 mb-9">
      訂購人資訊
    </h2>
    <div class="space-y-6 text-xl font-medium text-main-black/70">
      <div>電子郵件 : abcde10@gmail.com</div>
      <div>訂購人 : 陳大仁</div>
      <div class="flex flex-wrap gap-y-[21px]">
        <div class="mr-[21px]">連絡電話 : 0912345678</div>
        <div class="whitespace-nowrap">公司 : 無</div>
      </div>
      <div class="flex flex-wrap gap-y-[21px]">
        <div class="mr-[21px]">所在國家與地區 : 台灣</div>
        <div class="whitespace-nowrap">郵遞區號 : 123</div>
      </div>
      <div>地址 : 台北市中正區忠孝東路1段100號5樓-3</div>
    </div>
    <div class="border-b border-main-black my-11 2md:my-12"></div>
    <h2
      class="text-[28px] leading-[1.4] font-medium text-main-black/70 mb-9 flex flex-wrap"
    >
      收貨資訊<span class="text-xl whitespace-nowrap"
        >(詳細運送資料將由專人與您聯繫)</span
      >
    </h2>
    <div class="space-y-6 text-xl font-medium text-main-black/70">
      <div>電子郵件 : abcde10@gmail.com</div>
      <div>訂購人 : 陳大仁</div>
      <div class="flex flex-wrap gap-y-[21px]">
        <div class="mr-[21px]">連絡電話 : 0912345678</div>
        <div class="whitespace-nowrap">公司 : 無</div>
      </div>
      <div class="flex flex-wrap gap-y-[21px]">
        <div class="mr-[21px]">所在國家與地區 : 台灣</div>
        <div class="whitespace-nowrap">郵遞區號 : 123</div>
      </div>
      <div>地址 : 台北市中正區忠孝東路1段100號5樓-3</div>
    </div>
    <div class="border-b border-main-black my-11 2md:my-12"></div>
    <h2 class="text-[28px] leading-[1.4] font-medium text-main-black/70 mb-9">
      付款資訊
    </h2>
    <div class="space-y-6 text-xl font-medium text-main-black/70">
      <div>付款方式 : 信用卡</div>
    </div>
    <div class="border-b border-main-black my-11 2md:my-12"></div>
    <template v-if="currentActive < 3">
      <div class="flex gap-6 flex-col 2md:flex-row">
        <button
          @click="cancelOrder"
          class="h-[52px] text-lg font-bold rounded-[5px] border border-main-black/80 text-main-black/80 2md:flex-1"
        >
          取消訂單
        </button>
        <button
          class="h-[52px] text-lg font-bold rounded-[5px] bg-main-black/80 text-white 2md:flex-1"
        >
          編輯訂購資訊
        </button>
      </div>
    </template>
    <template v-else>
      <div class="flex gap-6 flex-col 2md:flex-row">
        <button
          class="h-[52px] text-lg font-bold rounded-[5px] border border-main-black/80 text-main-black/80 2md:flex-1"
        >
          我要退貨
        </button>
        <button
          class="h-[52px] text-lg font-bold rounded-[5px] bg-main-black/80 text-white 2md:flex-1"
        >
          連絡客服
        </button>
      </div>
    </template>
  </div>
</template>

<style></style>
