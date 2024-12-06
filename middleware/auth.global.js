export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = await getCurrentUser();
  // const user = await useState("user", () => getCurrentUser());
  console.log(user && to.name === "login", !user && to.name !== "login", user);

  if (user && to.name === "login") {
    return navigateTo("/");
  }

  if (!user && to.name !== "login") {
    return navigateTo("/login");
  }
});
