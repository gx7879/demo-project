export default defineNuxtPlugin(() => {
  addRouteMiddleware("auth", (to) => {
    const { $auth } = useNuxtApp();
    console.log($auth.currentUser);
    if (!$auth?.currentUser?.uid) {
      return abortNavigation();
    }
  });
});
