export default defineNuxtRouteMiddleware(async (to, from) => {
  const whiteList = [
    "/login",
    "/forgetPassword",
    "/forgetPasswordConfirm",
    "/resetPassword",
    "/resetPasswordSuccess",
    "/payComplete",
  ];
  const cookie = useCookie("token");
  console.log(cookie.value, to.path);
  if (cookie.value && whiteList.includes(to.path)) {
    if (to.path !== "/payComplete" && to.path !== "/resetPasswordSuccess") {
      return navigateTo("/");
    }
  }

  if (!cookie.value && !whiteList.includes(to.path)) {
    return navigateTo("/login");
  }
});
