export const useUserStore = defineStore(
  "user",
  () => {
    // const user = useCurrentUser();
    // console.log(user);
    const cookie = useCookie("token");
    const userInfo = ref(null);
    const token = ref(null);
    const provider = ref([]);
    const isLogin = computed(() => {
      return !!userInfo.value?.uid;
    });
    const setUserInfo = (data) => {
      userInfo.value = data;
    };

    const getUserInfo = computed(() => {
      return userInfo.value;
    });
    const setToken = (data) => {
      token.value = data;
    };
    const getToken = computed(() => {
      return token.value;
    });
    const setProvider = (data) => {
      provider.value = data;
    };
    const clearUserInfo = () => {
      setToken(null);
      cookie.value = null;
      userInfo.value = null;
    };

    return {
      userInfo,
      setUserInfo,
      getUserInfo,
      setToken,
      getToken,
      isLogin,
      clearUserInfo,
      provider,
      setProvider,
    };
  },
  {
    persist: true,
  }
);
