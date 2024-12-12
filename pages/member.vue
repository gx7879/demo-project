<script setup>
const route = useRoute();

// const { isVisible, modalState, showModal, closeModal, confirm, cancel } = useModal();

const store = useModalStore();
const { showModal } = store;

const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);

const resetPasswordStore = useResetPasswordStore();
const { setResetPasswordAuth } = resetPasswordStore;

const activePage = function (name) {
  if (route.path) return route.path.includes(name);
  return "";
};

function resetPassword() {
  showModal({
    title: "變更密碼",
    text: "為確保您的個人安全,請輸入您的密碼,並進行身分認證。",
    password: true,
    onCancel: () => {
      console.log("cancel");
    },
    onSuccess: () => {
      setResetPasswordAuth(true);
      const router = useRouter();
      router.push("/member/resetPassword");
    },
  });
}
const passwordProvider = computed(() => {
  return (
    userInfo.value.providerData.find(
      (provider) => provider.providerId === "password"
    ) ?? null
  );
});
</script>

<template>
  <div class="2xl:grid 2xl:grid-cols-[300px,_1fr] max-w-[1200px] mx-auto">
    <div
      class="hidden 2xl:block border-r border-main-black pr-10 pt-[100px] pb-40"
    >
      <h2 class="mb-3 text-main-black/70 text-[28px] leading-[1.4] font-medium">
        會員專區
      </h2>
      <ul
        class="border-t border-l border-[#777] text-xl leading-normal text-main-black/70 space-y-6 px-4 py-6 mb-6"
      >
        <li class="flex items-center">
          <NuxtLink class="peer" to="/member">會員資料</NuxtLink>
          <svg
            class="ml-1 hidden peer-[.router-link-exact-active]:block"
            width="9"
            height="12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m9 6-9 5.196V.804L9 6Z" fill="#4B4240" />
          </svg>
        </li>
        <li class="flex items-center">
          <NuxtLink class="peer" to="/member/membershipAndDiscounts">
            會員身分與優惠
          </NuxtLink>
          <svg
            class="ml-1 hidden peer-[.router-link-exact-active]:block"
            width="9"
            height="12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m9 6-9 5.196V.804L9 6Z" fill="#4B4240" />
          </svg>
        </li>
        <li class="flex items-center">
          <NuxtLink
            class="peer"
            to="/member/orderTracking"
            :class="{
              'router-link-exact-active': activePage('orderTracking'),
            }"
          >
            訂單追蹤
          </NuxtLink>
          <svg
            class="ml-1 hidden peer-[.router-link-exact-active]:block"
            width="9"
            height="12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m9 6-9 5.196V.804L9 6Z" fill="#4B4240" />
          </svg>
        </li>
        <li class="flex items-center">
          <NuxtLink
            class="peer"
            to="/member/orderList"
            :class="{
              'router-link-exact-active': activePage('orderList'),
            }"
          >
            訂購紀錄
          </NuxtLink>
          <svg
            class="ml-1 hidden peer-[.router-link-exact-active]:block"
            width="9"
            height="12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m9 6-9 5.196V.804L9 6Z" fill="#4B4240" />
          </svg>
        </li>
        <li v-if="passwordProvider" class="flex items-center">
          <button
            class="peer cursor-pointer"
            :class="{
              'router-link-exact-active': activePage('resetPassword'),
            }"
            @click="resetPassword"
          >
            變更密碼
          </button>
          <svg
            class="ml-1 hidden peer-[.router-link-exact-active]:block"
            width="9"
            height="12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m9 6-9 5.196V.804L9 6Z" fill="#4B4240" />
          </svg>
        </li>
      </ul>
      <button
        class="border border-main-black/80 rounded-[5px] text-lg leading-none font-bold w-full h-[52px]"
      >
        登出
      </button>
    </div>
    <div class="2xl:pl-10 pt-[100px] pb-40">
      <NuxtPage></NuxtPage>
    </div>
  </div>
</template>

<style></style>
