<script setup>
const emit = defineEmits(["remove", "valueUpdate"]);
const number = defineModel("number", { type: Number, default: 0 });
const disabled = defineModel("disabled", { type: Boolean, default: false });
function inCrease() {
  number.value++;
  nextTick(() => {
    emit("valueUpdate", number.value);
  });
}

function deCrease() {
  if (number.value > 0) {
    number.value--;
    nextTick(() => {
      emit("valueUpdate", number.value);
      if (number.value === 0) {
        emit("remove");
      }
    });
  }
}
</script>

<template>
  <div
    class="relative flex justify-center items-center border border-main-black/70 h-6 px-2"
  >
    <button
      type="button"
      :disabled="disabled"
      class="flex-shrink-0 inline-flex items-center justify-center w-2 h-2"
      @click="deCrease"
    >
      <svg
        class="w-2.5 h-2.5 text-gray-900 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 18 2"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M1 1h16"
        />
      </svg>
    </button>
    <input
      type="text"
      class="min-w-2.5 flex-shrink-0 flex-grow-0 text-gray-900 dark:text-white border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 text-center p-0 mx-3"
      placeholder=""
      v-model.lazy="number"
      v-autoWidth
    />
    <button
      type="button"
      :disabled="disabled"
      class="flex-shrink-0 inline-flex items-center justify-center w-2 h-2"
      @click="inCrease"
    >
      <svg
        class="w-2.5 h-2.5 text-gray-900 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 18 18"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 1v16M1 9h16"
        />
      </svg>
    </button>
  </div>
</template>

<style></style>
