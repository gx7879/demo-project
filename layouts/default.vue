<script setup>
import { onAuthStateChanged } from "firebase/auth";
const store = useResetPasswordStore();
const { confirm, cancel } = store;
const { isVisible, resetPasswordState } = storeToRefs(store);
const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);
const { setUserInfo, setToken } = userStore;
const cookie = useCookie("token");
const user = ref(null);
const currentUser = await getCurrentUser();
user.value = currentUser;
watchEffect(() => {
  if (user.value) {
    console.log(user.value.stsTokenManager.accessToken);
    cookie.value = user.value.stsTokenManager.accessToken;
    setUserInfo(user.value);
    setToken(user.value.stsTokenManager.accessToken);
  }
});
// watch(user, (newVal) => {
//   console.log(newVal);
//   if (newVal) {
//     console.log(newVal.stsTokenManager.accessToken);
//     cookie.value = newVal.stsTokenManager.accessToken;
//     setUserInfo(newVal);
//     setToken(newVal.stsTokenManager.accessToken);
//   }
// });
// console.log(cookie);
// const auth = useFirebaseAuth();
// onBeforeMount(() => {
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       // console.log(user);
//       setUserInfo(user);
//       cookie.value = user.stsTokenManager.accessToken;
//       setToken(user.stsTokenManager.accessToken);
//     } else {
//       setUserInfo(null);
//       cookie.value = null;
//       setToken(null);
//     }
//   });
// });
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
