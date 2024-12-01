<script setup>
definePageMeta({
  middleware: [
    function (to, from) {
      const store = useResetPasswordStore();
      const { resetPasswordAuth } = storeToRefs(store);
      const router = useRouter();
      if (!resetPasswordAuth.value) {
        return navigateTo("/member");
      }
    },
  ],
});
</script>

<template>
  <div>Page: resetpassword</div>
</template>

<style></style>
