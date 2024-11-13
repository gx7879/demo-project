<script setup>
// import { onMounted } from "vue";
// import { useFlowbite } from "~/composables/useFlowbite";
// let modal = ref(null);
// function closeModal() {
//   modal.value.hide();
// }
// onMounted(() => {
//   useFlowbite(() => {
//     const $buttonElement = document.querySelector("#button");
//     const $modalElement = document.querySelector("#modal");
//     const $closeButton = document.querySelector("#closeButton");
//     const modalOptions = {
//       backdropClasses:
//         "bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40",
//     };
//     if ($modalElement) {
//       modal.value = new Modal($modalElement, modalOptions);
//       $buttonElement.addEventListener("click", () => modal.value.toggle());
//       $closeButton.addEventListener("click", () => modal.value.hide());

//       // programatically show
//       modal.value.show();
//     }
//   });
// });
</script>

<template>
  <div
    class="bg-[url(@/assets/images/product-img.jpg)] bg-cover bg-center h-screen"
  ></div>
</template>

<style scoped></style>
