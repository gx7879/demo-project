<script setup>
import { localize } from "@vee-validate/i18n";
import { login } from "@/api/member";

const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);
const { setToken } = userStore;
const { $auth, $signInWithEmailAndPassword } = useNuxtApp();
const router = useRouter();
localize("zh_TW", {
  messages: {
    required: "錯誤的電子郵件地址或密碼，請再試一次。",
    email: "電子郵件無效",
  },
});
async function loginWithFirebase(values, { resetForm }) {
  console.log("submit", values);
  try {
    const userCredential = await $signInWithEmailAndPassword(
      $auth,
      values.email,
      values.password
    );
    console.log(userCredential);
    setToken(userCredential.user.accessToken);
    userInfo.value = userCredential.user;
    const res = await login();
    console.log(res);
    if (res) {
      router.push("/");
    }
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
  <div class="max-w-[720px] mx-auto text-center pt-[100px] pb-40 px-6">
    <h1 class="text-4xl text-main-black/70 font-bold mb-12">立即登入</h1>
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
          type="email"
          name="email"
          class="bg-gray-50 border border-notice-gray placeholder:text-[#b3b3b3] text-lg leading-[26px] rounded-[10px] block w-full px-4 py-[15px]"
          placeholder="請輸入註冊時的電子郵件"
          rules="required|email"
        />
        <VeeErrorMessage name="email" class="text-error-msg text-sm" />
      </div>
      <div class="mb-12 text-left">
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
          placeholder="請輸入註冊密碼"
          :rules="{
            required: true,
            min: 6,
          }"
        />
        <!-- regex: /^(?=.*[a-zA-Z])(?=.*\d).+$/, -->
        <VeeErrorMessage name="password" class="text-error-msg text-sm" />
      </div>
      <button
        type="submit"
        class="text-white bg-main-black/80 hover:bg-main-black/70 font-bold rounded-[5px] text-lg w-full p-3 mb-6"
      >
        登入
      </button>
      <NuxtLink
        class="text-main-black/80 text-lg font-normal underline"
        to="/forgetPassword"
        >忘記密碼?
      </NuxtLink>
    </VeeForm>
    <div class="border-main-black border-b mb-[60px]"></div>

    <h2 class="font-semibold text-[26px] text-main-black/80 leading-10 mb-12">
      還不是會員?
    </h2>
    <NuxtLink
      to="/register"
      class="border border-main-black/80 hover:border-main-black/70 flex justify-center items-center text-main-black/80 hover:text-main-black/70 text-lg font-bold max-w-[460px] w-full h-[52px] mx-auto rounded-[5px]"
    >
      新用戶註冊
    </NuxtLink>
  </div>
</template>

<style></style>
