<script setup>
import { useClipboard } from "@vueuse/core";

definePageMeta({
  middleware: [
    function () {
      console.log("payComplete");
    },
  ],
});

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
</script>

<template>
  <div class="max-w-[720px] mx-auto pt-[100px] pb-40 px-6">
    <div class="max-w-[460px] mx-auto text-center">
      <h1 class="text-[28px] leading-10 font-medium mb-3 text-main-black/70">
        付款成功!感謝您的訂購
      </h1>
      <NuxtImg class="mx-auto mb-3" src="/order-icon.png"></NuxtImg>
      <p class="mb-3 text-xl text-main-black/70">訂單編號:</p>
      <div class="flex justify-center items-center">
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
    </div>
    <div class="border-main-black border-b my-[60px]"></div>
    <div class="flex flex-col items-center">
      <NuxtLink to="/login" custom v-slot="{ navigate }">
        <button
          class="text-white bg-main-black/80 hover:bg-main-black/70 font-bold rounded-[5px] text-lg max-w-[460px] mx-auto w-full p-3 mb-9"
          @click="navigate"
        >
          會員登入
        </button>
      </NuxtLink>
      <NuxtLink to="/orderDetail" custom v-slot="{ navigate }">
        <button
          class="text-main-black/80 border border-main-black/80 font-bold rounded-[5px] text-lg max-w-[460px] mx-auto w-full p-3"
          @click="navigate"
        >
          查看訂單詳情
        </button>
      </NuxtLink>
    </div>
  </div>
</template>

<style></style>
