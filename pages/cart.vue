<script setup>
import {
  Login,
  LoginForgetPassword,
  LoginForgetPasswordConfirm,
  LoginResetPassword,
  LoginResetPasswordSuccess,
  Register,
} from "#components";

const product = ref([]);

const pages = {
  Login,
  ForgetPassword: LoginForgetPassword,
  ForgetPasswordConfirm: LoginForgetPasswordConfirm,
  ResetPassword: LoginResetPassword,
  ResetPasswordSuccess: LoginResetPasswordSuccess,
  Register,
};
const currentPage = shallowRef(pages.Login);
const changePage = function (page) {
  currentPage.value = pages[page];
};

function removeProduct() {
  console.log("remove");
}
</script>

<template>
  <div class="max-w-[1200px] mx-auto">
    <div class="2md:grid 2md:grid-cols-[1fr,_520px] justify-center">
      <div
        class="max-w-[740px] mx-auto border-r border-main-black lg:pr-4 w-full pb-40"
      >
        <div class="py-10 px-6">
          <Breadcrumb :items="['購物車', '訂購資訊', '訂單確認']"></Breadcrumb>
        </div>
        <component :is="currentPage" @changePage="changePage" />
      </div>
      <div class="hidden pl-10 max-w-[500px] w-full lg:block pt-[100px]">
        <h2
          class="text-[28px] leading-[140%] text-main-black/70 pb-3 border-b border-main-black mb-6"
        >
          購物車({{ product.length }})
        </h2>
        <div class="grid gap-y-6">
          <div class="grid grid-cols-[120px,_1fr] gap-x-3">
            <div>
              <NuxtImg class="w-full" src="/cart-product-img.png"></NuxtImg>
            </div>
            <div class="text-main-black/70 flex flex-col justify-between">
              <div>
                <div class="flex justify-between text-xl font-medium">
                  <div class="mr-5">
                    ARK-002乾•淨•水循環空淨取水智慧機家電
                    <span class="text-sm font-light mt-1 block">Black </span>
                  </div>
                  <div class="whitespace-nowrap">
                    <span>$ 89,000</span>
                  </div>
                </div>
              </div>
              <div class="flex justify-between items-center">
                <span>數量</span>
                <TouchSpin @remove="removeProduct"></TouchSpin>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-[120px,_1fr] gap-x-3">
            <div>
              <NuxtImg class="w-full" src="/cart-product-img.png"></NuxtImg>
            </div>
            <div class="text-main-black/70 flex flex-col justify-between">
              <div>
                <div class="flex justify-between text-xl font-medium">
                  <div class="mr-5">
                    ARKVO 超濾淨化耗材組
                    <span class="text-sm font-light mt-1 block">Black</span>
                  </div>
                  <div class="whitespace-nowrap grid text-right">
                    <span class="line-through">$ 89,000</span>
                    <span class="text-[#ff7700]">$ 8,800</span>
                  </div>
                </div>
              </div>
              <div class="flex justify-between items-center">
                <span>數量</span>
                <TouchSpin @remove="removeProduct"></TouchSpin>
              </div>
            </div>
          </div>
        </div>
        <div
          class="border-y border-main-black my-6 py-6 flex items-center gap-x-2"
        >
          <input
            type="text"
            class="flex-1 h-14 border border-notice-gray text-notice-gray placeholder:text-notice-gray rounded-[10px] focus:outline-0 focus:shadow-none focus:ring-0 focus:border-notice-gray"
            placeholder="輸入折扣碼"
          />
          <button
            class="text-lg leading-none text-white bg-main-black/20 w-40 h-14 py-3 rounded-[5px]"
            :disabled="true"
            :class="{
              'bg-main-black/20': true,
              'bg-main-black/80': false,
            }"
          >
            Apply
          </button>
        </div>
        <div
          class="border-b border-main-black text-main-black/70 font-bold space-y-3 pb-3"
        >
          <div class="flex justify-between">
            <span>小計</span>
            <span>$ 97,800</span>
          </div>
          <div class="flex justify-between">
            <span>運費</span>
            <span>$0</span>
          </div>
          <div class="flex justify-between">
            <span>折扣總金額</span>
            <span>-$ 1,000</span>
          </div>
        </div>
        <div class="flex justify-between mt-3 text-main-black/70 font-bold">
          <span>總計</span>
          <span>TWD $ 96,800</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
