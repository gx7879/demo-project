<script setup>
import { localize } from "@vee-validate/i18n";
localize("zh_TW", {
  messages: {
    required: "輸入電子郵件 是必須的",
    email: "電子郵件無效",
  },
});
function onSubmit(values) {
  console.log("submit", values);
}

const emit = defineEmits(["changePage"]);
function changePage(page) {
  emit("changePage", page);
}
</script>

<template>
  <div class="max-w-[720px] mx-auto pt-[100px] pb-40 px-6">
    <div class="max-w-[460px] mx-auto">
      <h1 class="text-[32px] leading-8 font-bold mb-12">忘記密碼?</h1>
      <p class="mb-12">
        請輸入您建立帳戶時所使用的電子郵件地址，我們會向您傳送一個重設密碼的連結。
      </p>
      <VeeForm class="max-w-[460px] mx-auto mb-[60px]" @submit="onSubmit">
        <div class="mb-12 text-left">
          <label
            for="email"
            class="block mb-3 text-xl font-medium text-main-black/70 text-left"
            >電子郵件
          </label>
          <VeeField
            type="email"
            name="email"
            class="bg-gray-50 border border-notice-gray placeholder:text-[#b3b3b3] text-lg rounded-[10px] block w-full p-2.5"
            placeholder="請輸入註冊時的電子郵件"
            rules="required|email"
          />
          <VeeErrorMessage name="email" class="text-error-msg text-sm" />
        </div>
        <button
          type="submit"
          class="text-white bg-main-black/80 hover:bg-main-black/70 font-bold rounded-[5px] text-lg w-full p-3 mb-6"
        >
          提交
        </button>
      </VeeForm>
    </div>
    <div class="border-main-black border-b mb-[60px]"></div>
    <div class="flex flex-col items-center">
      <!-- <NuxtLink
        to="/login"
        class="text-[#4b4240] text-lg font-normal underline mb-6"
      >
        會員登入
      </NuxtLink> -->
      <span
        class="text-[#4b4240] text-lg font-normal underline mb-6 cursor-pointer"
        @click="changePage('login')"
        >會員登入</span
      >
      <NuxtLink
        to="/register"
        class="text-[#4b4240] text-lg font-normal underline"
      >
        新用戶註冊
      </NuxtLink>
    </div>
  </div>
</template>

<style></style>
