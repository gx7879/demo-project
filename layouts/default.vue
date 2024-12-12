<script setup>
import { onAuthStateChanged } from "firebase/auth";
const modalStore = useModalStore();
const { confirm, cancel } = modalStore;
const { isVisible, modalState } = storeToRefs(modalStore);
const userStore = useUserStore();
const { setUserInfo, setToken, clearUserInfo } = userStore;
const cookie = useCookie("token");
const productStore = useProductStore();
const { setProduct, productClear, getCart } = productStore;
const resetPassword = useResetPasswordStore();
const { setMail } = resetPassword;

const auth = useFirebaseAuth();
const route = useRoute();

onBeforeMount(() => {
  onAuthStateChanged(auth, (user) => {
    // console.log(user);
    if (user) {
      // console.log(user);
      const currentMail = user.providerData[0].email;
      setUserInfo(user);
      cookie.value = user.stsTokenManager.accessToken;
      setToken(user.stsTokenManager.accessToken);
      setMail(currentMail);
      if (route.path === "/login") {
        navigateTo("/");
      }
      nextTick(async () => {
        await getCart();
      });
    } else {
      setUserInfo(null);
      cookie.value = null;
      setToken(null);
      productClear();
    }
  });
});
</script>

<template>
  <div class="bg-bg-gray">
    <!-- <Marquee>
      <h1>
        ARK-002 現已上市 ARK-001 PLUS 現已上市 ARK-002 貨和運輸 ARK-003 開發實況
        ARK-002 第四次募資總金額突破3億6千萬 ARK-002 產品發表會花絮
      </h1>
    </Marquee> -->
    <Header></Header>
    <div>
      <!-- Layout: default -->
      <NuxtLoadingIndicator color="#231815" :height="5" :throttle="0" />
      <slot />
    </div>
    <Footer></Footer>
    <Modal
      v-bind="modalState"
      :isVisible="isVisible"
      @close="cancel"
      @confirm="confirm"
    ></Modal>
  </div>
</template>

<style scoped></style>
