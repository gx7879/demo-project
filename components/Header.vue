<script setup>
import { onClickOutside } from "@vueuse/core";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  signOut,
} from "firebase/auth";
import {
  shoppingCarts,
  deleteShoppingCart,
  updateShoppingCart,
} from "@/api/order";
const route = useRoute();
const store = useProductStore();
const { products } = storeToRefs(store);
const { setProduct, productClear } = store;
const userStore = useUserStore();
const { isLogin, userInfo } = storeToRefs(userStore);
const { clearUserInfo } = userStore;
const cartStore = useCartStore();
const { cartClear } = cartStore;
const { currency } = useCurrency();

const useResetPassword = useResetPasswordStore();
const { setResetPasswordAuth, passwordClear } = useResetPassword;
const modalStore = useModalStore();
const { showModal } = modalStore;

const openMenu = ref(false);
const isModalOpen = ref(false);
const toggleMenu = () => {
  openMenu.value = !openMenu.value;
};

const toggleCart = async function () {
  isModalOpen.value = true;
};

const closeCart = function () {
  isModalOpen.value = false;
};

const auth = useFirebaseAuth();

function resetPassword() {
  showModal({
    title: "變更密碼",
    text: "為確保您的個人安全,請輸入您的密碼,並進行身分認證。",
    password: true,
    onCancel: () => {
      console.log("cancel");
    },
    onSuccess: (password) => {
      let credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        password
      );
      reauthenticateWithCredential(auth.currentUser, credential)
        .then(() => {
          setResetPasswordAuth(true);
          const router = useRouter();
          router.push("/member/resetPassword");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          // An error ocurred
          // ...
        });
    },
  });
  openMenu.value = false;
}

const user = useCurrentUser();
// const router = useRouter();

function handleSignOut() {
  signOut(auth).then(() => {
    clearUserInfo();
    passwordClear();
    productClear();
    cartClear();
    openMenu.value = false;
    navigateTo("/login");
  });
}

function handleLogin() {
  // const router = useRouter();
  // router.push("/login");
  openMenu.value = false;
  navigateTo("/login");
}

const amountTotal = computed(() => {
  return products.value.reduce(
    (total, product) => total + product.CommodityInfo.price * product.amount,
    0
  );
});

async function getCart() {
  try {
    const result = await shoppingCarts();
    setProduct(result);
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

function goToOrder(navigate) {
  closeCart();
  navigate();
}

async function navigateToIndex() {
  await navigateTo("/", {
    external: true,
  });
}
const menu = ref(null);
onClickOutside(menu, () => {
  openMenu.value = false;
});

const passwordProvider = computed(() => {
  return (
    userInfo?.value?.providerData?.find(
      (provider) => provider.providerId === "password"
    ) ?? null
  );
});
</script>

<template>
  <header
    ref="menu"
    class="relative z-50"
    :class="{
      'h-[337px] md:h-[401px] bg-[url(@/assets/images/banner.png)] bg-cover bg-center':
        route.name !== 'index',
    }"
  >
    <div class="bg-bg-gray/30 px-6 lg:px-[50px] h-20 backdrop-blur-[10px]">
      <div
        class="flex justify-between items-center border-b border-white h-full"
        :class="{ 'border-white': !openMenu, 'border-main-black/70': openMenu }"
      >
        <svg
          class="2md:hidden fill-current stroke-current text-main-black/70 cursor-pointer"
          width="36"
          height="36"
          viewBox="0 0 36 36"
          xmlns="http://www.w3.org/2000/svg"
          @click="toggleMenu"
        >
          <g id="solar:hamburger-menu-linear">
            <path
              id="Vector"
              d="M30 10.5H6M30 18H6M30 25.5H6"
              stroke-width="3.125"
              stroke-linecap="round"
            />
          </g>
        </svg>

        <div class="h-5 lg:h-7 aspect-[23/4]">
          <NuxtImg
            @click="navigateToIndex"
            class="w-full cursor-pointer"
            src="/header-logo.svg"
          ></NuxtImg>
        </div>
        <div class="flex items-center">
          <!-- <NuxtLink
            class="text-xl text-main-black/70 hidden 2md:inline-block mr-[85px]"
            to="/"
            @click="isOpen = !isOpen"
            >會員
          </NuxtLink> -->
          <div
            class="text-xl text-main-black/70 hidden 2md:inline-block mr-[85px] cursor-pointer"
            @click="toggleMenu"
          >
            會員
          </div>
          <!-- <div class="flex items-center"> -->
          <!-- <NuxtLink to="/" class="flex items-center"> -->
          <div class="flex items-center cursor-pointer" @click="toggleCart">
            <div
              class="text-xl text-main-black/70 mr-2 hidden 2md:inline-block"
            >
              購物車
            </div>
            <div
              class="border w-[38px] h-[38px] rounded-full flex justify-center items-center text-lg text-main-black/70 border-main-black/70"
            >
              <!-- :class="{
                'text-white border-white': !openMenu,
                'text-main-black/70 border-main-black/70': openMenu,
              }" -->
              {{ products.length }}
            </div>
          </div>
          <!-- </NuxtLink> -->
          <!-- </div> -->
        </div>
      </div>
    </div>
    <Vue3SlideUpDown v-model="openMenu" :opacityClosed="1">
      <div class="px-[50px] py-10 bg-bg-gray relative z-50">
        <h6 class="text-main-black/70 text-[28px] leading-[1.4] mb-3">
          會員專區
        </h6>
        <div class="2md:flex justify-between items-end">
          <ul
            class="text-xl text-main-black/70 px-4 py-6 border-t border-l border-main-black grid 2md:grid-rows-2 2md:grid-flow-col gap-x-[60px] gap-y-6 auto-cols-auto mb-6 2md:mb-0"
            :class="{
              '2md:grid-cols-3': passwordProvider,
              '2md:grid-cols-2': !passwordProvider,
            }"
          >
            <li>
              <NuxtLink to="/member" @click.native="openMenu = false"
                >會員資料
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/member/membershipAndDiscounts"
                @click.native="openMenu = false"
              >
                會員身分與優惠
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/member/orderTracking"
                @click.native="openMenu = false"
                >訂單追蹤
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/member/orderList" @click.native="openMenu = false"
                >訂購紀錄
              </NuxtLink>
            </li>
            <li v-if="passwordProvider">
              <a class="cursor-pointer" @click.native="resetPassword"
                >變更密碼
              </a>
            </li>
          </ul>
          <template v-if="user">
            <button
              class="border border-main-black/80 w-full 2md:w-[216px] h-[54px] text-lg text-main-black/80 font-bold rounded-[5px]"
              @click="handleSignOut"
            >
              登出
            </button>
          </template>
          <template v-else>
            <button
              class="border border-main-black/80 w-full 2md:w-[216px] h-[54px] text-lg text-main-black/80 font-bold rounded-[5px]"
              @click="handleLogin"
            >
              登入
            </button>
          </template>
        </div>
      </div>
    </Vue3SlideUpDown>
    <!-- <NuxtImg class="absolute h-full bg-cover" src="/banner.png"></NuxtImg> -->
    <teleport to="body">
      <div
        v-if="isModalOpen"
        class="bg-black/50 fixed top-0 left-0 right-0 bottom-0 z-[99]"
        @click.self="closeCart"
      >
        <div
          class="absolute right-0 w-[500px] bg-white h-screen p-6 flex flex-col"
        >
          <div
            class="flex justify-between items-end text-main-black/70 pb-3 border-b border-main-black"
          >
            <h2 class="text-[28px] leading-[1.4]">
              購物車({{ products.length }})
            </h2>
            <span class="cursor-pointer" @click="closeCart">關閉</span>
          </div>
          <template v-if="products.length !== 0">
            <div class="py-6 space-y-6 overflow-y-auto">
              <Product
                v-for="(product, index) of products"
                :key="index"
                :product="product"
                :disabled="isLoading"
                @remove="deleteProduct(product)"
                @valueUpdate="updateCart(product, $event)"
              ></Product>
            </div>
          </template>
          <template v-else>
            <div class="flex flex-col justify-center items-center pt-[60px]">
              <NuxtImg class="w-[71px] mb-6" src="/cart-icon.png"></NuxtImg>
              <div class="text-main-black/70 leading-[1.4]">
                你的購物車是空的
              </div>
            </div>
          </template>
          <div class="border-t border-main-black pt-3 mt-auto">
            <div
              class="flex justify-between items-center text-xl text-main-black/70 mb-3"
            >
              <span class="font-medium">總金額</span>
              <span class="font-bold">TWD $ {{ currency(amountTotal) }}</span>
            </div>
            <nuxt-link custom v-slot="{ navigate }" to="/cart">
              <button
                @click="goToOrder(navigate)"
                class="w-full h-[52px] bg-main-black/80 rounded-[5px] text-white text-lg font-bold"
              >
                前往結帳
              </button>
            </nuxt-link>
          </div>
        </div>
      </div>
    </teleport>
  </header>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
