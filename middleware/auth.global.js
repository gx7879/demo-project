export default defineNuxtRouteMiddleware(async (to, from) => {
  const whiteList = ["/login"];
  const cookie = useCookie("token");
  // const user = await getCurrentUser();
  // const user = await useState("user", () => getCurrentUser());
  // console.log(user.value);
  // const user = await getCurrentUser();
  if (cookie.value && to.name === "login") {
    return navigateTo("/");
  }

  if(!cookie.value && to.name!=="login"){
    return navigateTo("/login");
  }
});
