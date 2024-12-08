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
  // const user = await getCurrentUser();
  // const user = await useState("user", () => getCurrentUser());
  // console.log(user.value);
  // const user = await getCurrentUser();
  if (cookie.value && whiteList.includes(to.path)) {
    if (to.path !== "/payComplete") {
      return navigateTo("/");
    }
  }

  if (!cookie.value && !whiteList.includes(to.path)) {
    return navigateTo(to.path);
  }
});
