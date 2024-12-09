<script setup>
import { onAuthStateChanged } from "firebase/auth";
const store = useResetPasswordStore();
const { confirm, cancel } = store;
const { isVisible, resetPasswordState } = storeToRefs(store);
const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);
const { setUserInfo, setToken, clearUserInfo } = userStore;
const cookie = useCookie("token");
const productStore = useProductStore();
const { setProduct, productClear, getCart } = productStore;
const resetPassword = useResetPasswordStore();
const { setMail } = resetPassword;
// const currentUser = ref(null);
// const user = useCurrentUser();
// console.log(user);
// currentUser.value = await getCurrentUser();
// console.log(currentUser.value);
// setUserInfo(currentUser.value);
// watchEffect(() => {
//   if (userInfo.value) {
//     console.log(userInfo.value);
//     cookie.value = userInfo.value.stsTokenManager.accessToken;
//     setUserInfo(userInfo.value);
//     setToken(userInfo.value.stsTokenManager.accessToken);
//   }
// });
// watch(userInfo, (newVal) => {
//   console.log(newVal);
//   if (newVal) {
//     console.log(newVal.stsTokenManager.accessToken);
//     cookie.value = newVal.stsTokenManager.accessToken;
//     setUserInfo(newVal);
//     setToken(newVal.stsTokenManager.accessToken);
//   }
// });
// console.log(cookie);
const auth = useFirebaseAuth();

onBeforeMount(() => {
  onAuthStateChanged(auth, (user) => {
    console.log(user);
    if (user) {
      console.log(user);
      const currentMail = user.providerData.filter(
        (provider) => provider.providerId === "password"
      )[0].email;
      setUserInfo(user);
      cookie.value = user.stsTokenManager.accessToken;
      setToken(user.stsTokenManager.accessToken);
      setMail(currentMail);
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
      <NuxtLoadingIndicator color="red" :height="5" :throttle="0" />
      <slot />
    </div>
    <Footer></Footer>
    {{ resetPasswordState.onConfirm }}
    <Modal
      v-bind="resetPasswordState"
      :isVisible="isVisible"
      @close="cancel"
      @confirm="confirm"
    ></Modal>
  </div>
</template>

<style scoped></style>
