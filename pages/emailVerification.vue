<script setup>
import { sendVerifyEmail } from "@/api/member";
// const btnText = ref("再寄一次");
const btnStatus = ref(false);
const time = ref(60);
let timeInterval = null;
function reSend() {
  btnStatus.value = true;
  // btnText.value = `<span class="text-main-black/20">再寄一次</span>(${time}S)`;
  timeInterval = setInterval(() => {
    time.value--;
    // btnText.value = `<span class="text-main-black/20">再寄一次</span>(${time}S)`;
    if (time.value <= 0) {
      clearInterval(timeInterval);
      // btnText.value = `再寄一次`;
      time.value = 60;
      btnStatus.value = false;
    }
  }, 1000);
}

const mail = ref("abcde10@gmail.com");

function changeMail() {
  mail.value = "abcde10@gmail.com";
}

const router = useRouter();

function onSubmit(values) {
  console.log("submit", values);
  router.push("/registrationSuccess");
}

onMounted(async () => {
  try {
    const result = await sendVerifyEmail();
    console.log(result);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  }
});
</script>

<template>
  <div class="max-w-[720px] mx-auto pt-[100px] pb-40 px-6">
    <div class="max-w-[460px] mx-auto">
      <h1 class="text-[28px] leading-10 font-medium mb-12 text-main-black/80">
        驗證電子郵件地址
      </h1>
      <p class="mb-12 text-xl text-main-black/80">
        驗證您的 電子郵件，代碼已寄送至 : {{ mail }}(<span
          class="cursor-pointer"
          @click="changeMail"
          >變更</span
        >)
      </p>
      <VeeForm class="max-w-[460px] mx-auto mb-12" @submit="onSubmit">
        <div class="mb-6 text-left">
          <label
            for="email"
            class="block mb-3 text-xl font-medium text-main-black/70 text-left"
            >輸入驗證碼
          </label>
          <VeeField
            type="text"
            name="verificationCode"
            class="bg-gray-50 border border-notice-gray placeholder:text-[#b3b3b3] text-lg rounded-[10px] block w-full p-2.5"
            placeholder="請輸驗證碼"
            rules="required"
          />
          <VeeErrorMessage
            name="verificationCode"
            class="text-error-msg text-sm"
          />
        </div>
        <button
          type="submit"
          class="text-white bg-main-black/80 hover:bg-main-black/70 font-bold rounded-[5px] text-lg w-full p-3 mb-6"
        >
          提交
        </button>
      </VeeForm>
      <button
        @click="reSend"
        class="border border-main-black/80 hover:border-main-black/70 flex justify-center items-center text-main-black/80 hover:text-main-black/70 text-lg font-bold max-w-[460px] w-full h-[52px] mx-auto rounded-[5px] disabled:border-main-black/20 mb-[30px]"
        :disabled="btnStatus"
      >
        <span :class="{ 'text-main-black/20': btnStatus }">再寄一次</span
        ><span v-if="btnStatus">({{ time }}S)</span>
      </button>
      <!-- {{ btnText }} -->
      <div class="flex flex-col items-center">
        <span class="text-main-black/70 text-lg font-normal mb-1.5">
          沒收到重設密碼連結?
        </span>
        <NuxtLink
          to="/contact"
          class="text-main-black/80 text-lg font-normal underline"
        >
          聯繫客服
        </NuxtLink>
      </div>
    </div>
    <div class="border-main-black border-b my-[60px]"></div>
    <div class="flex justify-center">
      <div class="text-xl text-main-black/70">
        <h3 class="mb-3">請注意，如果您沒有收到我們的驗證電子郵件：</h3>
        <ul class="list-disc list-inside">
          <li class="mb-3">確認您在上方輸入的電子郵件地址是否正確。</li>
          <li>檢查您的垃圾郵件或垃圾電子郵件資料夾。</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style></style>
