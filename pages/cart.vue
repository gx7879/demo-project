<script setup>
import { localize } from "@vee-validate/i18n";
import {
  Login,
  LoginForgetPassword,
  LoginForgetPasswordConfirm,
  LoginResetPassword,
  LoginResetPasswordSuccess,
  Register,
  RegisterEmailVerification,
  RegisterRegistrationSuccess,
} from "#components";

import { useCurrency } from "~/composables/useCurrency";

const { currency } = useCurrency();

const products = ref([
  {
    name: "ARK-002乾•淨•水循環空淨取水智慧機",
    stock: 1,
    num: 1,
    price: 89000,
    discount_price: 0,
  },
  {
    name: "ARKVO 超濾淨化耗材組",
    stock: 1,
    num: 1,
    price: 89000,
    discount_price: 8000,
  },
]);
const isLogin = ref(true);

const pages = {
  Login,
  ForgetPassword: LoginForgetPassword,
  ForgetPasswordConfirm: LoginForgetPasswordConfirm,
  ResetPassword: LoginResetPassword,
  ResetPasswordSuccess: LoginResetPasswordSuccess,
  Register,
  EmailVerification: RegisterEmailVerification,
  RegistrationSuccess: RegisterRegistrationSuccess,
};
const currentPage = shallowRef(pages.Login);
const changePage = function (page) {
  currentPage.value = pages[page];
};

function removeProduct() {
  console.log("remove");
}
localize("zh_TW", {
  fields: {
    agree: {
      required: "你必須同意細則和隱私條款",
    },
  },
  messages: {
    email: "電子郵件無效",
  },
});

function submit(values) {
  console.log(values);
}

const sameAsOrdererInfo = ref(false);
</script>

<template>
  <div class="max-w-[1200px] mx-auto">
    <VeeForm @submit="submit">
      <div class="grid lg:grid-cols-[1fr,_520px] lg:justify-center">
        <div
          class="lg:max-w-[740px] mx-auto border-main-black lg:border-r lg:pr-4 w-full pb-30 lg:pb-40"
        >
          <div class="py-10 px-6">
            <Breadcrumb
              :items="['購物車', '訂購資訊', '訂單確認']"
            ></Breadcrumb>
          </div>
          <template v-if="!isLogin">
            <component :is="currentPage" @changePage="changePage" />
          </template>
          <template v-else>
            <div class="px-6">
              <h1 class="text-[28px] leading-[140%] text-main-black/70 mb-6">
                訂購人資訊
              </h1>
              <div class="mb-6">
                <label
                  for="email"
                  class="block text-xl text-main-black/70 font-normal mb-3"
                >
                  電子郵件(訂單通知、電子發票寄送)
                </label>
                <VeeField
                  type="email"
                  name="email"
                  class="bg-gray-50 border border-notice-gray placeholder:text-[#b3b3b3] text-lg leading-[26px] rounded-[10px] block w-full px-4 py-[15px]"
                  placeholder="1230548@gmail.com"
                  rules="required|email"
                />
                <VeeErrorMessage name="email" class="text-error-msg text-sm" />
              </div>
              <div class="grid sm:grid-cols-[1fr,_2fr] sm:gap-x-3">
                <div class="mb-6">
                  <label
                    for="lastName"
                    class="block text-xl text-main-black/70 font-normal mb-3"
                  >
                    姓氏
                  </label>
                  <VeeField
                    type="text"
                    name="lastName"
                    class="bg-gray-50 border border-notice-gray placeholder:text-[#b3b3b3] text-lg leading-[26px] rounded-[10px] block w-full px-4 py-[15px]"
                    placeholder=""
                    rules="required"
                  />
                  <VeeErrorMessage
                    name="lastName"
                    class="text-error-msg text-sm"
                  />
                </div>
                <div>
                  <label
                    for="firstName"
                    class="block text-xl text-main-black/70 font-normal mb-3"
                  >
                    名字
                  </label>
                  <VeeField
                    type="text"
                    name="firstName"
                    class="bg-gray-50 border border-notice-gray placeholder:text-[#b3b3b3] text-lg leading-[26px] rounded-[10px] block w-full px-4 py-[15px]"
                    placeholder=""
                    rules="required"
                  />
                  <VeeErrorMessage
                    name="firstName"
                    class="text-error-msg text-sm"
                  />
                </div>
              </div>
              <div class="grid sm:grid-cols-[1fr,_2fr] sm:gap-x-3">
                <div class="mb-6">
                  <label
                    for="phone"
                    class="block text-xl text-main-black/70 font-normal mb-3"
                  >
                    連絡電話
                  </label>
                  <VeeField
                    type="text"
                    name="phone"
                    class="bg-gray-50 border border-notice-gray placeholder:text-[#b3b3b3] text-lg leading-[26px] rounded-[10px] block w-full px-4 py-[15px]"
                    placeholder="0912345678"
                    rules="required"
                  />
                  <VeeErrorMessage
                    name="phone"
                    class="text-error-msg text-sm"
                  />
                </div>
                <div>
                  <label
                    for="company"
                    class="block text-xl text-main-black/70 font-normal mb-3"
                  >
                    公司(填選)
                  </label>
                  <VeeField
                    type="text"
                    name="company"
                    class="bg-gray-50 border border-notice-gray placeholder:text-[#b3b3b3] text-lg leading-[26px] rounded-[10px] block w-full px-4 py-[15px]"
                    placeholder=""
                  />
                  <VeeErrorMessage
                    name="company"
                    class="text-error-msg text-sm"
                  />
                </div>
              </div>
              <div class="grid sm:grid-cols-[2fr,_1fr] sm:gap-x-3">
                <div class="mb-6">
                  <label
                    for="phone"
                    class="block text-xl text-main-black/70 font-normal mb-3"
                  >
                    所在國家與地區
                  </label>
                  <VeeField
                    type="text"
                    name="phone"
                    class="bg-gray-50 border border-notice-gray placeholder:text-[#b3b3b3] text-lg leading-[26px] rounded-[10px] block w-full px-4 py-[15px]"
                    placeholder="台灣"
                    rules="required"
                  />
                  <VeeErrorMessage
                    name="phone"
                    class="text-error-msg text-sm"
                  />
                </div>
                <div>
                  <label
                    for="company"
                    class="block text-xl text-main-black/70 font-normal mb-3"
                  >
                    郵遞區號
                  </label>
                  <VeeField
                    type="text"
                    name="company"
                    class="bg-gray-50 border border-notice-gray placeholder:text-[#b3b3b3] text-lg leading-[26px] rounded-[10px] block w-full px-4 py-[15px]"
                    placeholder="112"
                    rules="required"
                  />
                  <VeeErrorMessage
                    name="company"
                    class="text-error-msg text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  for="email"
                  class="block text-xl text-main-black/70 font-normal mb-3"
                >
                  地址
                </label>
                <VeeField
                  type="email"
                  name="email"
                  class="bg-gray-50 border border-notice-gray placeholder:text-[#b3b3b3] text-lg leading-[26px] rounded-[10px] block w-full px-4 py-[15px]"
                  placeholder="台北市中正區中正路123號"
                  rules="required|email"
                />
                <VeeErrorMessage name="email" class="text-error-msg text-sm" />
              </div>
              <div class="border-main-black border-b my-12"></div>
              <h2 class="text-[28px] leading-[140%] text-main-black/70 mb-6">
                收貨資訊確認
              </h2>
              <div class="flex items-center mb-6">
                <div class="flex items-center h-6">
                  <input
                    id="sameAsOrdererInfo"
                    type="checkbox"
                    v-model="sameAsOrdererInfo"
                    class="w-6 h-6 border border-main-black/80 rounded bg-white focus:ring-3 focus:ring-blue-300 checked:bg-main-black/80"
                  />
                </div>
                <label
                  for="sameAsOrdererInfo"
                  class="flex gap-x-1 ms-2 text-xl text-main-black/80"
                >
                  同訂購人資訊
                </label>
              </div>
              <div class="grid sm:grid-cols-[1fr,_2fr] sm:gap-x-3">
                <div class="mb-6">
                  <label
                    for="lastName"
                    class="block text-xl text-main-black/70 font-normal mb-3"
                  >
                    姓氏
                  </label>
                  <VeeField
                    type="text"
                    name="lastName"
                    class="bg-gray-50 border border-notice-gray placeholder:text-[#b3b3b3] text-lg leading-[26px] rounded-[10px] block w-full px-4 py-[15px]"
                    placeholder=""
                    rules="required"
                  />
                  <VeeErrorMessage
                    name="lastName"
                    class="text-error-msg text-sm"
                  />
                </div>
                <div>
                  <label
                    for="firstName"
                    class="block text-xl text-main-black/70 font-normal mb-3"
                  >
                    名字
                  </label>
                  <VeeField
                    type="text"
                    name="firstName"
                    class="bg-gray-50 border border-notice-gray placeholder:text-[#b3b3b3] text-lg leading-[26px] rounded-[10px] block w-full px-4 py-[15px]"
                    placeholder=""
                    rules="required"
                  />
                  <VeeErrorMessage
                    name="firstName"
                    class="text-error-msg text-sm"
                  />
                </div>
              </div>
              <div class="grid sm:grid-cols-[1fr,_2fr] sm:gap-x-3">
                <div class="mb-6">
                  <label
                    for="phone"
                    class="block text-xl text-main-black/70 font-normal mb-3"
                  >
                    連絡電話
                  </label>
                  <VeeField
                    type="text"
                    name="phone"
                    class="bg-gray-50 border border-notice-gray placeholder:text-[#b3b3b3] text-lg leading-[26px] rounded-[10px] block w-full px-4 py-[15px]"
                    placeholder="0912345678"
                    rules="required"
                  />
                  <VeeErrorMessage
                    name="phone"
                    class="text-error-msg text-sm"
                  />
                </div>
              </div>
              <div class="grid sm:grid-cols-[2fr,_1fr] sm:gap-x-3">
                <div class="mb-6">
                  <label
                    for="phone"
                    class="block text-xl text-main-black/70 font-normal mb-3"
                  >
                    所在國家與地區
                  </label>
                  <VeeField
                    type="text"
                    name="phone"
                    class="bg-gray-50 border border-notice-gray placeholder:text-[#b3b3b3] text-lg leading-[26px] rounded-[10px] block w-full px-4 py-[15px]"
                    placeholder="台灣"
                    rules="required"
                  />
                  <VeeErrorMessage
                    name="phone"
                    class="text-error-msg text-sm"
                  />
                </div>
                <div>
                  <label
                    for="company"
                    class="block text-xl text-main-black/70 font-normal mb-3"
                  >
                    郵遞區號
                  </label>
                  <VeeField
                    type="text"
                    name="company"
                    class="bg-gray-50 border border-notice-gray placeholder:text-[#b3b3b3] text-lg leading-[26px] rounded-[10px] block w-full px-4 py-[15px]"
                    placeholder="112"
                    rules="required"
                  />
                  <VeeErrorMessage
                    name="company"
                    class="text-error-msg text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  for="email"
                  class="block text-xl text-main-black/70 font-normal mb-3"
                >
                  地址
                </label>
                <VeeField
                  type="email"
                  name="email"
                  class="bg-gray-50 border border-notice-gray placeholder:text-[#b3b3b3] text-lg leading-[26px] rounded-[10px] block w-full px-4 py-[15px]"
                  placeholder="台北市中正區中正路123號"
                  rules="required|email"
                />
                <VeeErrorMessage name="email" class="text-error-msg text-sm" />
              </div>

              <div class="border-main-black border-b my-12"></div>
              <h2 class="text-[28px] leading-[140%] text-main-black/70 mb-6">
                付款資訊
              </h2>
              <p class="text-xl text-main-black/70 font-light lg:mb-[120px]">
                付費方式:信用卡
              </p>
              <div class="hidden justify-center lg:flex">
                <div>
                  <button
                    type="submit"
                    class="bg-main-black/80 max-w-[460px] w-full h-[52px] text-white rounded-[5px] mb-6"
                  >
                    提交訂單
                  </button>
                  <div class="text-left">
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
                          <NuxtLink
                            to="/serviceTerms"
                            class="underline underline-offset-2"
                          >
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
                    <VeeErrorMessage
                      name="agree"
                      class="text-error-msg text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
        <div
          class="lg:pl-10 lg:max-w-[500px] w-full pt-[100px] px-6 mb-40 lg:mb-0"
          :class="{ 'hidden lg:block': !isLogin }"
        >
          <h2
            class="text-[28px] leading-[140%] text-main-black/70 pb-3 border-b border-main-black mb-6"
          >
            購物車({{ products.length }})
          </h2>
          <div class="grid gap-y-6">
            <div
              v-for="(product, index) of products"
              :key="index"
              class="grid grid-cols-[120px,_1fr] gap-x-3"
            >
              <div>
                <NuxtImg class="w-full" src="/cart-product-img.png"></NuxtImg>
              </div>
              <div class="text-main-black/70 flex flex-col justify-between">
                <div>
                  <div class="flex justify-between text-xl font-medium">
                    <div class="sm:mr-5">
                      {{ product.name }}
                      <span class="text-sm font-light mt-1 block">Black </span>
                    </div>
                    <div
                      class="whitespace-nowrap auto-rows-max text-right hidden sm:grid"
                    >
                      <span
                        :class="{ 'line-through': product.discount_price > 0 }"
                      >
                        $ {{ currency(product.price) }}
                      </span>
                      <span
                        v-if="product.discount_price > 0"
                        class="text-[#ff7700]"
                      >
                        $ {{ currency(product.discount_price) }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="flex justify-between items-end sm:items-center">
                  <span class="hidden sm:block">數量</span>
                  <TouchSpin
                    v-model="product.num"
                    @remove="removeProduct"
                  ></TouchSpin>
                  <div
                    class="whitespace-nowrap grid auto-rows-max text-right sm:hidden"
                  >
                    <span
                      :class="{ 'line-through': product.discount_price > 0 }"
                    >
                      $ {{ currency(product.price) }}
                    </span>
                    <span
                      v-if="product.discount_price > 0"
                      class="text-[#ff7700]"
                    >
                      $ {{ currency(product.discount_price) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <!-- <div class="grid grid-cols-[120px,_1fr] gap-x-3">
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
            </div> -->
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
            class="border-b border-main-black text-xl text-main-black/70 font-bold space-y-3 pb-3"
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
          <div
            class="flex justify-between mt-3 text-xl text-main-black/70 font-bold mb-[120px]"
          >
            <span>總計</span>
            <span>TWD $ 96,800</span>
          </div>

          <div class="flex justify-center lg:hidden">
            <div>
              <button
                type="submit"
                class="bg-main-black/80 max-w-[460px] w-full h-[52px] text-white rounded-[5px] mb-6"
              >
                提交訂單
              </button>
              <div class="text-left">
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
                      <NuxtLink
                        to="/serviceTerms"
                        class="underline underline-offset-2"
                      >
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
            </div>
          </div>
        </div>
      </div>
    </VeeForm>
  </div>
</template>

<style></style>
