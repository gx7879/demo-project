import { defineStore } from "pinia";

export const useUserStore = defineStore(
  "user",
  () => {
    const userInfo = ref(null);
    const getUserInfo = computed(() => userInfo.value);
    const isLogin = computed(() => !!userInfo.value?.uid);
    const token = ref(null);
    const getToken = computed(() => token.value);

    function setToken(accessToken) {
      token.value = accessToken;
    }

    function clearUserInfo() {
      userInfo.value = null;
    }
    return {
      userInfo,
      getUserInfo,
      isLogin,
      getToken,
      setToken,
      clearUserInfo,
    };
  },
  {
    persist: true,
  }
);
