export default defineNuxtRouteMiddleware(async (to, from) => {
  const whiteList = [
    "/login",
    "/forgetPassword",
    "/forgetPasswordConfirm",
    "/resetPassword",
    "/resetPasswordSuccess",
    "/payComplete",
    "/register",
    "/serviceTerms",
    "/privacyPolicy",
    "/shipping",
  ];
  const cookie = useCookie("token");
  // const { data: user } = await useAsyncData("user", () => getCurrentUser());
  // const user = await getCurrentUser();

  // console.log(cookie.value, to.path);
  // if (cookie.value && whiteList.includes(to.path)) {
  //   if (to.path !== "/payComplete" && to.path !== "/resetPasswordSuccess") {
  //     return navigateTo("/");
  //   }
  // }

  // if (!cookie.value && !whiteList.includes(to.path)) {
  //   return navigateTo("/login");
  // }
  const noAuthList = [
    "/login",
    "/forgetPassword",
    "/forgetPasswordConfirm",
    "/resetPassword",
  ];
  console.log(cookie.value, to.path);
  if (cookie.value) {
    if (noAuthList.includes(to.path)) {
      return navigateTo("/");
    }
    // return navigateTo(to.path);
  } else {
    console.log(!whiteList.includes(to.path));
    if (!whiteList.includes(to.path)) {
      return navigateTo("/login");
    }
  }
});
