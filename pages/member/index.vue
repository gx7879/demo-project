<script setup>
import dayjs from "dayjs";
import { DatePicker } from "ant-design-vue";
const dateFormat = "YYYY/MM/DD";

const now = dayjs();
const value1 = ref(null);
const store = useResetPasswordStore();
const { showResetPasswordModal } = store;
const { resetPasswordAuth } = storeToRefs(store);

const editInfoStatus = ref(false);

function editInfo() {
  showResetPasswordModal({
    title: "修改基本資料",
    text: "為確保您的個人安全,請輸入您的密碼,並進行身分認證。",
    password: true,
    onCancel: () => {
      console.log("cancel");
    },
    onSuccess: () => {
      editInfoStatus.value = true;
    },
  });
}

const isFbLogin = ref(true);
const isGoogleLogin = ref(false);
const isAppleLogin = ref(false);
</script>

<template>
  <div class="px-6 2xl:px-0">
    <h2
      class="mb-3 text-main-black/70 text-[28px] leading-[1.4] font-medium border-b border-main-black pb-3"
    >
      會員資料
    </h2>
    <div class="pt-6 mb-12 space-y-6">
      <div class="text-xl font-medium text-main-black/70">
        電子郵件 : abcde10@gmail.com
      </div>
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <NuxtImg class="mr-3 w-9" src="/facebook-login-icon.png"></NuxtImg>
          <div class="text-xl font-medium text-main-black/70">
            與facebook綁定
          </div>
        </div>
        <button
          class="w-[98px] text-lg leading-none font-bold px-3 py-[9px] rounded-[5px]"
          :class="{
            'border border-main-black/80 text-main-black/80': isFbLogin,
            'bg-main-black/80 text-white': !isFbLogin,
          }"
        >
          {{ !isFbLogin ? "綁定" : "解除綁定" }}
        </button>
      </div>
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <NuxtImg class="mr-3 w-9" src="/google-login-icon.png"></NuxtImg>
          <div class="text-xl font-medium text-main-black/70">未綁定</div>
        </div>
        <button
          class="w-[98px] text-lg leading-none font-bold px-3 py-[9px] rounded-[5px]"
          :class="{
            'border border-main-black/80 text-main-black/80': isGoogleLogin,
            'bg-main-black/80 text-white': !isGoogleLogin,
          }"
        >
          {{ !isGoogleLogin ? "綁定" : "解除綁定" }}
        </button>
      </div>
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <NuxtImg class="mr-3 w-9" src="/apple-login-icon.png"></NuxtImg>
          <div class="text-xl font-medium text-main-black/70">未綁定</div>
        </div>
        <button
          class="w-[98px] text-lg leading-none font-bold px-3 py-[9px] rounded-[5px]"
          :class="{
            'border border-main-black/80 text-main-black/80': isAppleLogin,
            'bg-main-black/80 text-white': !isAppleLogin,
          }"
        >
          {{ !isAppleLogin ? "綁定" : "解除綁定" }}
        </button>
      </div>
    </div>
    <h2
      class="mb-3 text-main-black/80 text-[28px] leading-[1.4] font-medium pb-3 flex justify-between items-center"
    >
      基本資料
      <button
        @click="editInfo"
        class="w-[98px] text-lg leading-none font-bold px-3 py-[9px] rounded-[5px] bg-main-black/80 text-white"
      >
        變更
      </button>
    </h2>
    <template v-if="editInfoStatus && resetPasswordAuth">
      <div class="space-y-6 max-w-[660px]">
        <div class="grid sm:grid-cols-[1fr,_2fr] sm:gap-x-3">
          <div>
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
            <VeeErrorMessage name="lastName" class="text-error-msg text-sm" />
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
            <VeeErrorMessage name="firstName" class="text-error-msg text-sm" />
          </div>
        </div>
        <div class="grid sm:grid-cols-[1fr,_2fr] sm:gap-x-3">
          <div>
            <label
              for="recipientPhone"
              class="block text-xl text-main-black/70 font-normal mb-3"
            >
              生日
            </label>
            <!-- eslint-disable vue/no-v-model-argument -->
            <DatePicker
              v-model:value="value1"
              placeholder="年/月/日"
              popupClassName="datepicker-modal"
            ></DatePicker>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="pt-6 space-y-6 border-t border-main-black">
        <div class="text-xl font-medium text-main-black/70">姓氏 : 未填寫</div>
        <div class="text-xl font-medium text-main-black/70">名字 : 未填寫</div>
        <div class="text-xl font-medium text-main-black/70">性別 : 未填寫</div>
        <div class="text-xl font-medium text-main-black/70">
          連絡電話 : 未填寫
        </div>
        <div class="text-xl font-medium text-main-black/70">地址 : 未填寫</div>
      </div>
    </template>
  </div>
</template>

<style>
.ant-picker {
  @apply px-4 py-[15px] rounded-[10px] w-full h-[58px] border-notice-gray;
}
.ant-picker .ant-picker-input input {
  @apply placeholder:text-main-black/70 text-xl leading-[1.4] font-medium;
}

.datepicker-modal .ant-picker-cell {
  @apply text-main-black/20;
}

.datepicker-modal .ant-picker-cell-in-view {
  @apply text-main-black/70;
}

.datepicker-modal .ant-picker-cell-inner::before {
  @apply !border-main-black/80;
}
.datepicker-modal .ant-picker-today-btn {
  @apply text-main-black/80;
}
</style>
