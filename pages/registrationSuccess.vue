<script setup></script>

<template>
  <div class="max-w-[720px] mx-auto pt-[100px] pb-40 px-6">
    <div class="max-w-[460px] mx-auto">
      <h1 class="text-[28px] leading-10 font-medium mb-12 text-main-black/80">
        感謝您的註冊
      </h1>
      <p class="mb-12 text-xl text-main-black/80">註冊成功，請重新登入</p>
      <NuxtLink to="/login" custom v-slot="{ navigate }">
        <button
          class="text-white bg-main-black/80 hover:bg-main-black/70 font-bold rounded-[5px] text-lg w-full p-3 mb-[55px]"
          @click="navigate"
        >
          確定
        </button>
      </NuxtLink>
    </div>
    <div class="border-main-black border-b my-[60px]"></div>
  </div>
</template>

<style></style>
