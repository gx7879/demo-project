<script setup>
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  OAuthProvider,
  reauthenticateWithPopup,
  linkWithPopup,
  unlink,
  GoogleAuthProvider,
} from "firebase/auth";
import { userProfiles, updateUserProfiles } from "@/api/member";
import dayjs from "dayjs";
import { DatePicker } from "ant-design-vue";
const dateFormat = "YYYY/MM/DD";
const cookie = useCookie("token");
const { data: userProfile } = await useAsyncData("userProfiles", () =>
  userProfiles()
);
const userInfo = computed(() => userProfile.value);

const now = dayjs();
const value1 = ref(null);
const info = ref({
  lastName: userInfo.value?.last_name,
  firstName: userInfo.value?.first_name,
  birthday: userInfo.value?.birthday,
  gender: userInfo.value?.gender,
  phone: userInfo.value?.phone,
  address: userInfo.value?.address,
});
const resetPassword = useResetPasswordStore();
const { resetPasswordAuth, currentMail } = storeToRefs(resetPassword);
const { setResetPasswordAuth, setMail } = resetPassword;

const modalStore = useModalStore();
const { showModal } = modalStore;

const userStore = useUserStore();
const { getUserInfo, provider } = storeToRefs(userStore);
const { setUserInfo, setToken, clearUserInfo, setProvider } = userStore;

const editInfoStatus = ref(false);
const auth = useFirebaseAuth();
const myForm = ref(null);

const isFbLogin = computed(() => {
  if (!provider.value.length) return false;
  return provider?.value?.includes("facebook.com") ?? false;
});
const isGoogleLogin = computed(() => {
  if (!provider.value.length) return false;
  return provider?.value?.includes("google.com") ?? false;
});
const isAppleLogin = computed(() => {
  if (!provider.value.length) return false;
  return provider?.value?.includes("apple.com") ?? false;
});

const passwordProvider = computed(() => {
  return (
    getUserInfo?.value?.providerData?.find(
      (provider) => provider.providerId === "password"
    ) ?? null
  );
});

function editInfo() {
  if (passwordProvider.value) {
    showModal({
      title: "修改基本資料",
      text: "為確保您的個人安全,請輸入您的密碼,並進行身分認證。",
      password: true,
      onCancel: () => {
        console.log("cancel");
      },
      onSuccess: (password) => {
        console.log(auth.currentUser.email, password);
        let credential = EmailAuthProvider.credential(
          auth.currentUser.email,
          password
        );
        reauthenticateWithCredential(auth.currentUser, credential)
          .then(() => {
            editInfoStatus.value = true;
            setResetPasswordAuth(true);
            nextTick(() => {
              myForm.value.setValues(info.value);
            });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            showModal({
              title: "驗證失敗",
              text: "請確認您的密碼是否正確",
            });
          });
      },
    });
  } else {
    const providerObj = getUserInfo.value.providerData.find(
      (provider) => provider.providerId !== "password"
    );
    const provider = new OAuthProvider(providerObj.providerId);
    reauthenticateWithPopup(auth.currentUser, provider)
      .then((result) => {
        editInfoStatus.value = true;
        setResetPasswordAuth(true);
        nextTick(() => {
          myForm.value.setValues(info.value);
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        showModal({
          title: "驗證失敗",
          text: "請確認您的第三方帳號選擇是否正確",
        });
      });
  }
}

async function onSubmit(values) {
  console.log("submit", values);
  info.value = values;
  try {
    const result = await updateUserProfiles({
      first_name: info.value.firstName,
      last_name: info.value.lastName,
      phone: info.value.phone,
      address: info.value.address,
      gender: info.value.gender,
      birthday: info.value.birthday,
    });
    editInfoStatus.value = false;
    setResetPasswordAuth(false);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  }
}

const genderFormat = (gender) => {
  const type = {
    0: null,
    1: "男",
    2: "女",
    3: "其他",
  };
  return type[gender] ?? null;
};

const checkLinkedProviders = async () => {
  const user = auth.currentUser;
  if (user) {
    const currentMail = user?.providerData[0]?.email;
    const provider = user?.providerData?.map((provider) => provider.providerId);
    setUserInfo(user);
    cookie.value = user.stsTokenManager.accessToken;
    setToken(user.stsTokenManager.accessToken);
    setMail(currentMail);
    setProvider(provider);
  } else {
    setUserInfo(null);
    cookie.value = null;
    setToken(null);
    productClear();
    clearUserInfo();
  }
};

function facebookLinkAndunLink() {}

async function googleLinkAndunLink() {
  if (!isGoogleLogin.value) {
    const provider = new GoogleAuthProvider();
    linkWithPopup(auth.currentUser, provider)
      .then(async () => {
        await checkLinkedProviders();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  } else {
    unlink(auth.currentUser, "google.com")
      .then(async () => {
        await checkLinkedProviders();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }
}

function appleLinkAndunLink() {}
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
        電子郵件 : {{ currentMail }}
      </div>
      <!-- <ClientOnly> -->
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
          @click="facebookLinkAndunLink"
        >
          {{ !isFbLogin ? "綁定" : "解除綁定" }}
        </button>
      </div>
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <NuxtImg class="mr-3 w-9" src="/google-login-icon.png"></NuxtImg>
          <div class="text-xl font-medium text-main-black/70">與google綁定</div>
        </div>
        <button
          class="w-[98px] text-lg leading-none font-bold px-3 py-[9px] rounded-[5px]"
          :class="{
            'border border-main-black/80 text-main-black/80': isGoogleLogin,
            'bg-main-black/80 text-white': !isGoogleLogin,
          }"
          @click="googleLinkAndunLink"
        >
          {{ !isGoogleLogin ? "綁定" : "解除綁定" }}
        </button>
      </div>
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <NuxtImg class="mr-3 w-9" src="/apple-login-icon.png"></NuxtImg>
          <div class="text-xl font-medium text-main-black/70">與apple綁定</div>
        </div>
        <button
          class="w-[98px] text-lg leading-none font-bold px-3 py-[9px] rounded-[5px]"
          :class="{
            'border border-main-black/80 text-main-black/80': isAppleLogin,
            'bg-main-black/80 text-white': !isAppleLogin,
          }"
          @click="appleLinkAndunLink"
        >
          {{ !isAppleLogin ? "綁定" : "解除綁定" }}
        </button>
      </div>
      <!-- </ClientOnly> -->
    </div>
    <h2
      class="mb-3 text-main-black/80 text-[28px] leading-[1.4] font-medium pb-3 flex justify-between items-center"
    >
      基本資料
      <button
        v-if="!(editInfoStatus && resetPasswordAuth)"
        @click="editInfo"
        class="w-[98px] text-lg leading-none font-bold px-3 py-[9px] rounded-[5px] bg-main-black/80 text-white"
      >
        變更
      </button>
    </h2>
    <template v-if="editInfoStatus && resetPasswordAuth">
      <VeeForm ref="myForm" class="space-y-6 max-w-[660px" @submit="onSubmit">
        <div class="grid sm:grid-cols-[1fr,_2fr] sm:gap-x-3">
          <div>
            <label
              for="firstName"
              class="block text-xl text-main-black/70 font-normal mb-3"
            >
              姓氏
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
          <div>
            <label
              for="lastName"
              class="block text-xl text-main-black/70 font-normal mb-3"
            >
              名字
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
        </div>
        <div class="grid sm:grid-cols-[1fr,_2fr] sm:gap-x-3">
          <div>
            <label
              for="birthday"
              class="block text-xl text-main-black/70 font-normal mb-3"
            >
              生日
            </label>
            <!-- eslint-disable vue/no-v-model-argument -->
            <VeeField
              v-model:value="value1"
              type="text"
              name="birthday"
              v-slot="{ field }"
              rules="required"
            >
              <DatePicker
                id="birthday"
                v-bind="field"
                placeholder="年/月/日"
                popupClassName="datepicker-modal"
                :valueFormat="dateFormat"
              ></DatePicker>
            </VeeField>
            <VeeErrorMessage name="birthday" class="text-error-msg text-sm" />
          </div>
        </div>
        <div>
          <label
            for="gender"
            class="block text-xl text-main-black/70 font-normal mb-3"
            >性別
          </label>

          <ul
            class="grid w-full gap-x-3 sm:grid-cols-3 text-lg leading-none font-bold text-main-black/80"
          >
            <li>
              <VeeField
                id="female"
                name="gender"
                type="radio"
                :value="2"
                class="hidden peer"
                rules="required"
              />
              <label
                for="female"
                class="inline-flex items-center justify-center w-full p-4 bg-white border border-main-black/80 rounded-lg cursor-pointer peer-checked:text-white peer-checked:bg-main-black/80 hover:text-gray-600 hover:bg-gray-100"
              >
                女
              </label>
            </li>
            <li>
              <VeeField
                type="radio"
                id="male"
                name="gender"
                :value="1"
                class="hidden peer"
                rules="required"
              />
              <label
                for="male"
                class="inline-flex items-center justify-center w-full p-4 bg-white border border-main-black/80 rounded-lg cursor-pointer peer-checked:text-white peer-checked:bg-main-black/80 hover:text-gray-600 hover:bg-gray-100"
              >
                男
              </label>
            </li>
            <li>
              <VeeField
                type="radio"
                id="other"
                name="gender"
                :value="3"
                class="hidden peer"
                rules="required"
              />
              <label
                for="other"
                class="inline-flex items-center justify-center w-full p-4 bg-white border border-main-black/80 rounded-lg cursor-pointer peer-checked:text-white peer-checked:bg-main-black/80 hover:text-gray-600 hover:bg-gray-100"
              >
                其他
              </label>
            </li>
          </ul>
          <VeeErrorMessage name="gender" class="text-error-msg text-sm" />
        </div>
        <div>
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
            placeholder="請輸入連絡電話"
            rules="required"
          />
          <VeeErrorMessage name="phone" class="text-error-msg text-sm" />
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
          <VeeErrorMessage name="address" class="text-error-msg text-sm" />
        </div>
        <button
          class="w-full bg-main-black/80 rounded-[5px] h-[52px] text-white text-lg leading-none font-bold"
        >
          儲存
        </button>
      </VeeForm>
    </template>
    <template v-else>
      <div class="pt-6 space-y-6 border-t border-main-black">
        <div class="text-xl font-medium text-main-black/70">
          姓氏 : {{ info?.firstName ?? "未填寫" }}
        </div>
        <div class="text-xl font-medium text-main-black/70">
          名字 : {{ info?.lastName ?? "未填寫" }}
        </div>
        <div class="text-xl font-medium text-main-black/70">
          生日 : {{ info?.birthday ?? "未填寫" }}
        </div>
        <div class="text-xl font-medium text-main-black/70">
          性別 : {{ genderFormat(info?.gender) ?? "未填寫" }}
        </div>
        <div class="text-xl font-medium text-main-black/70">
          連絡電話 : {{ info?.phone ?? "未填寫" }}
        </div>
        <div class="text-xl font-medium text-main-black/70">
          地址 : {{ info?.address ?? "未填寫" }}
        </div>
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
