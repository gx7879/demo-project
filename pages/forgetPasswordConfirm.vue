<script setup>
const btnText = ref("再寄一次");
const btnStatus = ref(false);
let time = 60;
let timeInterval = null;
function reSend() {
  btnStatus.value = true;
  btnText.value = `再寄一次(${time}S)`;
  timeInterval = setInterval(() => {
    time--;
    btnText.value = `再寄一次(${time}S)`;
    if (time <= 0) {
      clearInterval(timeInterval);
      btnText.value = `再寄一次`;
      time = 60;
      btnStatus.value = false;
    }
  }, 1000);
}
</script>

<template>
  <div class="max-w-[720px] mx-auto pt-[100px] pb-40 px-6">
    <div class="max-w-[460px] mx-auto">
      <h1 class="text-[28px] leading-10 font-medium mb-12 text-main-black/80">
        電子郵件已發送
      </h1>
      <p class="mb-12 text-xl text-main-black/80">
        您將在幾分鐘後收到一封電子郵件，內有重新設定密碼的步驟說明。
      </p>
      <button
        @click="reSend"
        class="text-white bg-main-black/80 font-bold rounded-[5px] text-lg w-full p-3 mb-[55px] disabled:border-main-black/80 disabled:border disabled:text-main-black/80 disabled:bg-transparent"
        :disabled="btnStatus"
      >
        {{ btnText }}
      </button>
      <div class="flex flex-col items-center">
        <span class="text-main-black/70 text-lg font-normal mb-1.5">
          沒收到重設密碼連結?
        </span>
        <NuxtLink to="/" class="text-[#4b4240] text-lg font-normal underline">
          聯繫客服
        </NuxtLink>
      </div>
    </div>
    <div class="border-main-black border-b my-[60px]"></div>
    <div class="flex flex-col items-center">
      <NuxtLink
        to="/login"
        class="text-[#4b4240] text-lg font-normal underline mb-6"
      >
        會員登入
      </NuxtLink>
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
