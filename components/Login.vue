<script setup>
import { localize } from "@vee-validate/i18n";
localize("zh_TW", {
  messages: {
    required: "錯誤的電子郵件地址或密碼，請再試一次。",
    email: "電子郵件無效",
  },
});

function onSubmit(values) {
  console.log("submit", values);
}
</script>

<template>
  <div class="max-w-[720px] mx-auto py-[100px] text-center">
    <h1 class="text-[32px] leading-8 font-bold mb-12">立即登入</h1>
    <div class="text-sm mb-6">使用第三方帳號登入</div>
    <div class="flex justify-center items-center gap-12 mb-12">
      <NuxtImg width="36" src="/facebook-login-icon.png"></NuxtImg>
      <NuxtImg width="36" src="/google-login-icon.png"></NuxtImg>
      <NuxtImg width="36" src="/apple-login-icon.png"></NuxtImg>
      <!-- <img src="assets/images/facebook-login-icon.png" alt="" />
      <img src="assets/images/google-login-icon.png" alt="" />
      <img src="assets/images/apple-login-icon.png" alt="" /> -->
    </div>
    <div
      class="flex items-center text-center before:flex-1 before:border-b before:border-main-black after:flex-1 after:border-b after:border-main-black [&:not(:empty):before]:mr-2 [&:not(:empty):after]:ml-2 mb-12"
    >
      or
    </div>
    <VeeForm class="max-w-[460px] mx-auto mb-[60px]" @submit="onSubmit">
      <div class="mb-5 text-left">
        <label
          for="email"
          class="block mb-2 text-xl font-light text-main-black text-left"
          >電子郵件
        </label>
        <VeeField
          type="email"
          name="email"
          class="bg-gray-50 border border-[#b1b1b1] placeholder:text-[#b3b3b3] text-lg rounded-[10px] block w-full p-2.5"
          placeholder="請輸入註冊時的電子郵件"
          rules="required|email"
        />
        <VeeErrorMessage name="email" class="text-error-msg text-sm" />
      </div>
      <div class="mb-5 text-left">
        <label
          for="password"
          class="block mb-2 text-xl font-light text-main-black text-left"
          >密碼
        </label>
        <VeeField
          type="password"
          name="password"
          label="密碼"
          class="bg-gray-50 border border-[#b1b1b1] placeholder:text-[#b3b3b3] text-lg rounded-[10px] block w-full p-2.5"
          placeholder="請輸入註冊密碼"
          :rules="{
            required: true,
            min: 6,
            regex: /^(?=.*[a-zA-Z])(?=.*\d).+$/,
          }"
        />
        <VeeErrorMessage name="password" class="text-error-msg text-sm" />
      </div>
      <button
        type="submit"
        class="text-white bg-[#4c4341] font-bold rounded-[5px] text-lg w-full p-3 mb-6"
      >
        登入
      </button>
      <NuxtLink
        class="text-[#4b4240] text-lg font-normal underline"
        to="/forgetPassword"
        >忘記密碼?
      </NuxtLink>
    </VeeForm>
    <div class="border-main-black border-b mb-[60px]"></div>

    <h2 class="font-semibold text-[28px] text-main-black/80 leading-10 mb-12">
      還不是會員?
    </h2>
    <NuxtLink
      to="/"
      class="border border-[#423A3C] flex justify-center items-center text-[#423A3C] text-lg font-bold max-w-[460px] w-full h-[52px] mx-auto rounded-[5px]"
    >
      新用戶註冊
    </NuxtLink>
  </div>
</template>

<style></style>
