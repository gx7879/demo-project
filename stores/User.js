export const useUserStore = defineStore("user", () => {
  const user = useCurrentUser();
  const cookie = useCookie("token");
  const userInfo = ref(user);
  const token = ref(cookie);
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

  return {
    userInfo,
    setUserInfo,
    getUserInfo,
    setToken,
    getToken,
    isLogin,
  };
});
