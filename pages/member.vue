<script setup>
definePageMeta({
  middleware: [
    function (to, from) {
      console.log(to, from);
    },
  ],
});
</script>

<template>
  <div class="2xl:grid 2xl:grid-cols-[300px,_1fr] max-w-[1200px] mx-auto">
    <div
      class="hidden 2xl:block border-r border-main-black pr-10 pt-[100px] pb-40"
    >
      <h2
        class="mb-3 text-main-black/70 text-[28px] leading-[140%] font-medium"
      >
        會員專區
      </h2>
      <ul
        class="border-t border-l border-main-black text-xl leading-[150%] text-main-black/70 space-y-6 px-4 py-6 mb-6"
      >
        <li><NuxtLink to="/member">會員資料</NuxtLink></li>
        <li>
          <NuxtLink to="/member/membershipAndDiscounts">
            會員身分與優惠
          </NuxtLink>
        </li>
        <li>訂單追蹤</li>
        <li>
          <NuxtLink to="/member/orderList">訂購紀錄</NuxtLink>
        </li>
        <li>變更密碼</li>
      </ul>
      <button
        class="border border-main-black/80 rounded-[5px] text-lg leading-none font-bold w-full h-[52px]"
      >
        登出
      </button>
    </div>
    <div class="2xl:pl-10 pt-[100px] pb-40">
      <NuxtPage></NuxtPage>
    </div>
  </div>
</template>

<style></style>
