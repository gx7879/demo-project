<script setup>
const emit = defineEmits(["changePage"]);
function changePage(page) {
  emit("changePage", page);
}

function onSubmit(values) {
  console.log("submit", values);
  changePage("ResetPasswordSuccess");
}
</script>

<template>
  <div class="max-w-[720px] mx-auto px-6">
    <div class="max-w-[460px] mx-auto">
      <h1 class="text-[28px] leading-10 text-main-black/80 font-bold mb-12">
        設定新的密碼
      </h1>
      <VeeForm class="max-w-[460px] mx-auto mb-[60px]" @submit="onSubmit">
        <div class="mb-5 text-left">
          <label
            for="email"
            class="block mb-3 text-xl font-medium text-main-black/70 text-left"
            >設定新密碼
          </label>
          <VeeField
            type="password"
            name="password"
            label="密碼"
            class="bg-gray-50 border border-notice-gray placeholder:text-[#b3b3b3] text-lg rounded-[10px] block w-full p-2.5"
            placeholder="6~20個字且须包含至少一個英文字母和一個數字"
            :rules="{
              required: true,
              min: 6,
              max: 20,
              regex: /^(?=.*[a-zA-Z])(?=.*\d).+$/,
            }"
          />
          <VeeErrorMessage name="password" class="text-error-msg text-sm" />
        </div>
        <div class="mb-5 text-left">
          <label
            for="password"
            class="block mb-3 text-xl font-medium text-main-black/70 text-left"
            >確認新密碼
          </label>
          <VeeField
            type="password"
            name="confirmPassword"
            label="密碼"
            class="bg-gray-50 border border-notice-gray placeholder:text-[#b3b3b3] text-lg rounded-[10px] block w-full p-2.5"
            placeholder="再次輸入新密碼"
            rules="required|confirmed:@password"
          />
          <VeeErrorMessage
            name="confirmPassword"
            class="text-error-msg text-sm"
          />
        </div>
        <button
          type="submit"
          class="text-white bg-main-black/80 hover:bg-main-black/70 font-bold rounded-[5px] text-lg w-full p-3 mb-6"
        >
          更改密碼
        </button>
      </VeeForm>
    </div>
    <div class="border-main-black border-b my-[60px]"></div>
    <div class="flex flex-col items-center">
      <span
        class="text-main-black/80 text-lg font-normal underline mb-6 cursor-pointer"
        @click="changePage('Login')"
      >
        會員登入
      </span>
      <span
        class="text-main-black/80 text-lg font-normal underline mb-6 cursor-pointer"
        @click="changePage('Register')"
      >
        新用戶註冊
      </span>
    </div>
  </div>
</template>

<style></style>
