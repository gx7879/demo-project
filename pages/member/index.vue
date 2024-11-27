<script setup>
const isFbLogin = ref(true);
const isGoogleLogin = ref(false);
const isAppleLogin = ref(false);
</script>

<template>
  <div class="px-6 2xl:px-0">
    <h2
      class="mb-3 text-main-black/70 text-[28px] leading-[1.4] font-medium border-b border-main-black pb-3"
    >
      會員資料
    </h2>
    <div class="pt-6 mb-12 space-y-6">
      <div class="text-xl font-medium text-main-black/70">
        電子郵件 : abcde10@gmail.com
      </div>
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <NuxtImg class="mr-3 w-9" src="/facebook-login-icon.png"></NuxtImg>
          <div class="text-xl font-medium text-main-black/70">
            與facebook綁定
          </div>
        </div>
        <button
          class="w-[98px] text-lg leading-none font-bold px-3 py-[9px] rounded-[5px]"
          :class="{
            'border border-main-black/80 text-main-black/80': isFbLogin,
            'bg-main-black/80 text-white': !isFbLogin,
          }"
        >
          {{ !isFbLogin ? "綁定" : "解除綁定" }}
        </button>
      </div>
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <NuxtImg class="mr-3 w-9" src="/google-login-icon.png"></NuxtImg>
          <div class="text-xl font-medium text-main-black/70">未綁定</div>
        </div>
        <button
          class="w-[98px] text-lg leading-none font-bold px-3 py-[9px] rounded-[5px]"
          :class="{
            'border border-main-black/80 text-main-black/80': isGoogleLogin,
            'bg-main-black/80 text-white': !isGoogleLogin,
          }"
        >
          {{ !isGoogleLogin ? "綁定" : "解除綁定" }}
        </button>
      </div>
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <NuxtImg class="mr-3 w-9" src="/apple-login-icon.png"></NuxtImg>
          <div class="text-xl font-medium text-main-black/70">未綁定</div>
        </div>
        <button
          class="w-[98px] text-lg leading-none font-bold px-3 py-[9px] rounded-[5px]"
          :class="{
            'border border-main-black/80 text-main-black/80': isAppleLogin,
            'bg-main-black/80 text-white': !isAppleLogin,
          }"
        >
          {{ !isAppleLogin ? "綁定" : "解除綁定" }}
        </button>
      </div>
    </div>
    <h2
      class="mb-3 text-main-black/80 text-[28px] leading-[1.4] font-medium border-b border-main-black pb-3 flex justify-between items-center"
    >
      基本資料
      <button
        class="w-[98px] text-lg leading-none font-bold px-3 py-[9px] rounded-[5px] bg-main-black/80 text-white"
      >
        變更
      </button>
    </h2>
    <div class="pt-6 space-y-6">
      <div class="text-xl font-medium text-main-black/70">姓氏 : 未填寫</div>
      <div class="text-xl font-medium text-main-black/70">名字 : 未填寫</div>
      <div class="text-xl font-medium text-main-black/70">性別 : 未填寫</div>
      <div class="text-xl font-medium text-main-black/70">
        連絡電話 : 未填寫
      </div>
      <div class="text-xl font-medium text-main-black/70">地址 : 未填寫</div>
    </div>
  </div>
</template>

<style></style>
