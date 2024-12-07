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

import {
  deleteShoppingCart,
  updateShoppingCart,
  createOrder,
} from "@/api/order";

const product = useProductStore();
const { products } = storeToRefs(product);

const cart = useCartStore();
const { isSubmittingOrder } = storeToRefs(cart);

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

const isSameAsOrder = ref(false);

const handleCheckboxChange = (values, setFieldValue) => {
  if (isSameAsOrder.value) {
    setFieldValue("recipientLastName", values.lastName);
    setFieldValue("recipientFirstName", values.firstName);
    setFieldValue("recipientPhone", values.phone);
    setFieldValue("recipientCountry", values.country);
    setFieldValue("recipientPostalCode", values.postalCode);
    setFieldValue("recipientAddress", values.address);
  } else {
    setFieldValue("recipientLastName", "");
    setFieldValue("recipientFirstName", "");
    setFieldValue("recipientPhone", "");
    setFieldValue("recipientCountry", "");
    setFieldValue("recipientPostalCode", "");
    setFieldValue("recipientAddress", "");
  }
};

const { currency } = useCurrency();
const amountTotal = computed(() => {
  return products.value.reduce(
    (total, product) => total + product.CommodityInfo.price * product.amount,
    0
  );
});

const discountPrice = computed(() => {
  const discount = products.value
    .map((product) => product.discount_price)
    .filter(Boolean);
  // return 0;
  return discount.reduce((total, discountValue) => total + discountValue, 0);
});

const totalPrice = computed(() => amountTotal.value - discountPrice.value);
const router = useRouter();
async function submit(values) {
  console.log(values);
  try {
    const result = await createOrder({
      order_address: {
        delivery_type: "home",
        email: values.email,
        first_name: values.firstName,
        last_name: values.lastName,
        phone_number: values.phone,
        company_name: values.company,
        country: values.country,
        zip_code: values.postalCode,
        address: values.address,
      },
      receive_address: {
        is_same: isSameAsOrder.value,
        first_name: values.recipientFirstName,
        last_name: values.recipientLastName,
        phone_number: values.recipientPhone,
        country: values.recipientCountry,
        zip_code: values.recipientPostalCode,
        address: values.recipientAddress,
      },
      payment_method: "Credit",
      price: totalPrice.value,
      shopping_carts: [
        {
          shopping_cart_id: 0,
          commodity_info_id: products.value[0].commodity_info_id,
          price: products.value[0].CommodityInfo.price,
          amount: products.value[0].amount,
          subtotal: amountTotal.value,
          promotion_id: 0,
        },
      ],
    });
    console.log(result);
    router.push({ path: "/payment", query: { orderId: result.order.id } });
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  }
}

async function deleteProduct(product) {
  try {
    await deleteShoppingCart({ id: product.id });
    await getCart();
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  }
}

const isLoading = ref(false);
async function updateCart(product, value) {
  try {
    isLoading.value = true;
    const result = await updateShoppingCart({ id: product.id, amount: value });
    isLoading.value = false;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  }
}
// onMounted(() => {
//   useFlowbite(() => {
//     initFlowbite();
//   });
// });
</script>

<template>
  <div class="max-w-[1200px] mx-auto">
    <VeeForm v-slot="{ values, setFieldValue }" @submit="submit">
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
              <h1 class="text-[28px] leading-[1.4] text-main-black/70 mb-6">
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
                    for="country"
                    class="block text-xl text-main-black/70 font-normal mb-3"
                  >
                    所在國家與地區
                  </label>
                  <VeeField
                    type="text"
                    name="country"
                    class="bg-gray-50 border border-notice-gray placeholder:text-[#b3b3b3] text-lg leading-[26px] rounded-[10px] block w-full px-4 py-[15px]"
                    placeholder="台灣"
                    rules="required"
                  />
                  <VeeErrorMessage
                    name="country"
                    class="text-error-msg text-sm"
                  />
                </div>
                <div>
                  <label
                    for="postalCode"
                    class="block text-xl text-main-black/70 font-normal mb-3"
                  >
                    郵遞區號
                  </label>
                  <VeeField
                    type="text"
                    name="postalCode"
                    class="bg-gray-50 border border-notice-gray placeholder:text-[#b3b3b3] text-lg leading-[26px] rounded-[10px] block w-full px-4 py-[15px]"
                    placeholder="112"
                    rules="required"
                  />
                  <VeeErrorMessage
                    name="postalCode"
                    class="text-error-msg text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  for="address"
                  class="block text-xl text-main-black/70 font-normal mb-3"
                >
                  地址
                </label>
                <VeeField
                  type="text"
                  name="address"
                  class="bg-gray-50 border border-notice-gray placeholder:text-[#b3b3b3] text-lg leading-[26px] rounded-[10px] block w-full px-4 py-[15px]"
                  placeholder="台北市中正區中正路123號"
                  rules="required"
                />
                <VeeErrorMessage
                  name="address"
                  class="text-error-msg text-sm"
                />
              </div>
              <div class="border-main-black border-b my-12"></div>
              <h2 class="text-[28px] leading-[1.4] text-main-black/70 mb-6">
                收貨資訊確認
              </h2>
              <div class="flex items-center mb-6">
                <div class="flex items-center h-6">
                  <input
                    id="isSameAsOrder"
                    type="checkbox"
                    v-model="isSameAsOrder"
                    class="w-6 h-6 border border-main-black/80 rounded bg-white focus:ring-3 focus:ring-blue-300 checked:bg-main-black/80"
                    @change="handleCheckboxChange(values, setFieldValue)"
                  />
                </div>
                <label
                  for="isSameAsOrder"
                  class="flex gap-x-1 ms-2 text-xl text-main-black/80"
                >
                  同訂購人資訊
                </label>
              </div>
              <div class="grid sm:grid-cols-[1fr,_2fr] sm:gap-x-3">
                <div class="mb-6">
                  <label
                    for="recipientLastName"
                    class="block text-xl text-main-black/70 font-normal mb-3"
                  >
                    姓氏
                  </label>
                  <VeeField
                    type="text"
                    name="recipientLastName"
                    class="bg-gray-50 border border-notice-gray placeholder:text-[#b3b3b3] text-lg leading-[26px] rounded-[10px] block w-full px-4 py-[15px]"
                    placeholder=""
                    rules="required"
                  />
                  <VeeErrorMessage
                    name="recipientLastName"
                    class="text-error-msg text-sm"
                  />
                </div>
                <div>
                  <label
                    for="recipientFirstName"
                    class="block text-xl text-main-black/70 font-normal mb-3"
                  >
                    名字
                  </label>
                  <VeeField
                    type="text"
                    name="recipientFirstName"
                    class="bg-gray-50 border border-notice-gray placeholder:text-[#b3b3b3] text-lg leading-[26px] rounded-[10px] block w-full px-4 py-[15px]"
                    placeholder=""
                    rules="required"
                  />
                  <VeeErrorMessage
                    name="recipientFirstName"
                    class="text-error-msg text-sm"
                  />
                </div>
              </div>
              <div class="grid sm:grid-cols-[1fr,_2fr] sm:gap-x-3">
                <div class="mb-6">
                  <label
                    for="recipientPhone"
                    class="block text-xl text-main-black/70 font-normal mb-3"
                  >
                    連絡電話
                  </label>
                  <VeeField
                    type="text"
                    name="recipientPhone"
                    class="bg-gray-50 border border-notice-gray placeholder:text-[#b3b3b3] text-lg leading-[26px] rounded-[10px] block w-full px-4 py-[15px]"
                    placeholder="0912345678"
                    rules="required"
                  />
                  <VeeErrorMessage
                    name="recipientPhone"
                    class="text-error-msg text-sm"
                  />
                </div>
              </div>
              <div class="grid sm:grid-cols-[2fr,_1fr] sm:gap-x-3">
                <div class="mb-6">
                  <label
                    for="recipientCountry"
                    class="block text-xl text-main-black/70 font-normal mb-3"
                  >
                    所在國家與地區
                  </label>
                  <VeeField
                    type="text"
                    name="recipientCountry"
                    class="bg-gray-50 border border-notice-gray placeholder:text-[#b3b3b3] text-lg leading-[26px] rounded-[10px] block w-full px-4 py-[15px]"
                    placeholder="台灣"
                    rules="required"
                  />
                  <VeeErrorMessage
                    name="recipientCountry"
                    class="text-error-msg text-sm"
                  />
                </div>
                <div>
                  <label
                    for="recipientPostalCode"
                    class="block text-xl text-main-black/70 font-normal mb-3"
                  >
                    郵遞區號
                  </label>
                  <VeeField
                    type="text"
                    name="recipientPostalCode"
                    class="bg-gray-50 border border-notice-gray placeholder:text-[#b3b3b3] text-lg leading-[26px] rounded-[10px] block w-full px-4 py-[15px]"
                    placeholder="112"
                    rules="required"
                  />
                  <VeeErrorMessage
                    name="recipientPostalCode"
                    class="text-error-msg text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  for="recipientAddress"
                  class="block text-xl text-main-black/70 font-normal mb-3"
                >
                  地址
                </label>
                <VeeField
                  type="text"
                  name="recipientAddress"
                  class="bg-gray-50 border border-notice-gray placeholder:text-[#b3b3b3] text-lg leading-[26px] rounded-[10px] block w-full px-4 py-[15px]"
                  placeholder="台北市中正區中正路123號"
                  rules="required"
                />
                <VeeErrorMessage
                  name="recipientAddress"
                  class="text-error-msg text-sm"
                />
              </div>

              <div class="border-main-black border-b my-12"></div>
              <h2 class="text-[28px] leading-[1.4] text-main-black/70 mb-6">
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
            class="text-[28px] leading-[1.4] text-main-black/70 pb-3 border-b border-main-black mb-6"
          >
            購物車({{ products.length }})
          </h2>
          <div class="grid gap-y-6 border-b border-main-black mb-6 pb-6">
            <!-- <Product
              v-for="(product, index) of products"
              :product="product"
              :key="index"
            /> -->
            <Product
              v-for="(product, index) of products"
              :key="index"
              :product="product"
              :disabled="isLoading"
              @remove="deleteProduct(product)"
              @valueUpdate="updateCart(product, $event)"
            ></Product>
          </div>
          <div
            v-if="!isSubmittingOrder"
            class="border-b border-main-black mb-6 pb-6 flex items-center gap-x-2"
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
              <span>$ {{ currency(amountTotal) }}</span>
            </div>
            <div class="flex justify-between">
              <span>運費</span>
              <span>$0</span>
            </div>
            <div class="flex justify-between">
              <span class="flex items-center">
                折扣總金額
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 -960 960 960"
                  width="20"
                  fill="none"
                  class="text-main-black/70 fill-current ml-2 cursor-pointer"
                  data-tooltip-target="tooltip-hover"
                  data-tooltip-trigger="hover"
                >
                  <path
                    d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
                  />
                </svg>
                <div
                  id="tooltip-hover"
                  role="tooltip"
                  class="absolute z-10 invisible inline-block px-[15px] py-4 text-xl font-light text-white bg-main-black rounded-[5px] shadow-sm opacity-0 tooltip dark:bg-gray-700"
                >
                  此為VIP會員以及特別活動優惠，在這筆訂單中所計算的折扣總金額
                  <div class="tooltip-arrow" data-popper-arrow></div>
                </div>
              </span>
              <span>-$ {{ currency(discountPrice) }}</span>
            </div>
          </div>
          <div
            class="flex justify-between mt-3 text-xl text-main-black/70 font-bold mb-[120px]"
          >
            <span>總計</span>
            <span>TWD $ {{ currency(totalPrice) }}</span>
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
