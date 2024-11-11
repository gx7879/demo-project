<script setup>
import { localize } from "@vee-validate/i18n";
// import { login } from "@/api/member";

const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);
const { setToken } = userStore;
// const { $auth, $signInWithEmailAndPassword } = useNuxtApp();
const router = useRouter();
const email = ref(null);
localize("zh_TW", {
  fields: {
    agree: {
      required: "你必須同意細則和隱私條款",
    },
  },
  messages: {
    required: "錯誤的電子郵件地址或密碼，請再試一次。",
    email: "電子郵件無效",
  },
});

async function loginWithFirebase(values, { resetForm }) {
  console.log("submit", values);
  try {
    // if (res) {
    router.push("/emailVerification");
    // }
    // if (userCredential.user) {
    // }
    // .then((userCredential) => {
    //   console.log(userCredential);
    // })
    // .catch((error) => {
    //   resetForm();
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    // });
  } catch (error) {
    resetForm();
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  }
}
</script>

<template>
  <div class="max-w-[720px] mx-auto pt-[100px] pb-40 text-center px-6">
    <h1 class="text-4xl text-main-black/70 font-bold mb-12">註冊會員</h1>
    <div class="text-sm mb-6">使用第三方帳號註冊</div>
    <div class="flex justify-center items-center gap-12 mb-12">
      <NuxtImg width="36" src="/facebook-login-icon.png"></NuxtImg>
      <NuxtImg width="36" src="/google-login-icon.png"></NuxtImg>
      <NuxtImg width="36" src="/apple-login-icon.png"></NuxtImg>
      <!-- <img src="assets/images/facebook-login-icon.png" alt="" />
      <img src="assets/images/google-login-icon.png" alt="" />
      <img src="assets/images/apple-login-icon.png" alt="" /> -->
    </div>
    <div
      class="flex items-center text-lg text-center before:flex-1 before:border-b before:border-main-black after:flex-1 after:border-b after:border-main-black [&:not(:empty):before]:mr-2 [&:not(:empty):after]:ml-2 mb-12"
    >
      or
    </div>
    <VeeForm
      class="max-w-[460px] mx-auto mb-[60px]"
      @submit="loginWithFirebase"
    >
      <div class="mb-6 text-left">
        <label
          for="email"
          class="block mb-3 text-xl font-medium text-main-black/70 text-left"
          >電子郵件
        </label>
        <VeeField
          ref="email"
          type="email"
          name="email"
          class="bg-gray-50 border border-notice-gray placeholder:text-[#b3b3b3] text-lg leading-[26px] rounded-[10px] block w-full px-4 py-[15px]"
          placeholder="請輸入註冊時的電子郵件"
          rules="required|email"
        />
        <VeeErrorMessage name="email" class="text-error-msg text-sm" />
      </div>
      <div class="mb-6 text-left">
        <label
          for="password"
          class="block mb-3 text-xl font-medium text-main-black/70 text-left"
          >密碼
        </label>
        <VeeField
          type="password"
          name="password"
          label="密碼"
          class="bg-gray-50 border border-notice-gray placeholder:text-[#b3b3b3] text-lg leading-[26px] rounded-[10px] block w-full px-4 py-[15px]"
          placeholder="6-20字符，須包含英文與數字"
          :rules="{
            required: true,
            min: 6,
            regex: /^(?=.*[a-zA-Z])(?=.*\d).+$/,
          }"
        />
        <VeeErrorMessage name="password" class="text-error-msg text-sm" />
      </div>
      <div class="mb-12 text-left">
        <label
          for="password"
          class="block mb-3 text-xl font-medium text-main-black/70 text-left"
          >確認密碼
        </label>
        <VeeField
          type="password"
          name="confirmPassword"
          label="密碼"
          class="bg-gray-50 border border-notice-gray placeholder:text-[#b3b3b3] text-lg rounded-[10px] block w-full p-2.5"
          placeholder="6-20字符，須包含英文與數字"
          rules="required|confirmed:@password"
        />
        <VeeErrorMessage
          name="confirmPassword"
          class="text-error-msg text-sm"
        />
      </div>
      <button
        type="submit"
        class="text-white bg-main-black/80 hover:bg-main-black/70 disabled:bg-main-black/20 font-bold rounded-[5px] text-lg w-full p-3 mb-6"
        :disabled="!email?.meta.valid"
      >
        驗證電子郵件
      </button>
      <div class="mb-5 text-left">
        <div class="flex items-center">
          <VeeField
            v-slot="{ field }"
            name="agree"
            type="checkbox"
            :value="true"
            :unchecked-value="false"
            rules="required"
          >
            <div class="flex items-center h-6">
              <input
                id="agree"
                type="checkbox"
                v-bind="field"
                :value="true"
                class="w-6 h-6 border border-main-black/80 rounded bg-white focus:ring-3 focus:ring-blue-300"
              />
            </div>
            <label
              for="agree"
              class="flex gap-x-1 ms-2 text-lg text-main-black/80"
              >我同意網站
              <NuxtLink to="/serviceTerms" class="underline underline-offset-2">
                服務條款
              </NuxtLink>
              與
              <NuxtLink
                to="/privacyPolicy"
                class="underline underline-offset-2"
              >
                隱私權政策
              </NuxtLink>
              。
            </label>
          </VeeField>
        </div>
        <VeeErrorMessage name="agree" class="text-error-msg text-sm" />
      </div>
    </VeeForm>
    <div class="border-main-black border-b mb-[60px]"></div>

    <h2 class="font-semibold text-[26px] text-main-black/80 leading-10 mb-12">
      已經有帳號?
    </h2>
    <NuxtLink
      to="/login"
      class="border border-main-black/80 hover:border-main-black/70 flex justify-center items-center text-main-black/80 hover:text-main-black/70 text-lg font-bold max-w-[460px] w-full h-[52px] mx-auto rounded-[5px]"
    >
      登入
    </NuxtLink>
  </div>
</template>

<style></style>
