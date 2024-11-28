<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  text: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: "",
  },
  isVisible: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["close", "confirm"]);

function closeModal() {
  emit("close");
}

function confirmModal() {
  emit("confirm");
}
</script>

<template>
  <teleport to="body">
    <div
      v-if="isVisible"
      class="fixed top-0 right-0 left-0 z-50 bg-black/15 w-full h-full max-h-full flex justify-center items-center"
      @click.self="closeModal"
    >
      <div class="relative p-4 w-full max-w-2xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow">
          <!-- Modal header -->
          <div
            class="flex items-center justify-between px-2 py-1.5 border-b rounded-t-lg bg-main-black/80"
          >
            <button
              @click="closeModal"
              type="button"
              class="text-white bg-transparent rounded-lg text-sm w-6 h-6 ms-auto inline-flex justify-center items-center"
              data-modal-hide="default-modal"
            >
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <!-- Modal body -->
          <div class="p-10 space-y-12 text-center">
            <h3
              class="text-[28px] leading-[1.4] font-medium text-main-black/70"
            >
              {{ title }}
            </h3>
            <div v-if="icon" class="flex justify-center">
              <NuxtImg :src="`/${icon}.png`"></NuxtImg>
            </div>
            <p class="text-xl font-medium text-main-black/70">
              {{ text }}
            </p>
            <div v-if="!icon" class="flex gap-4">
              <button
                @click="closeModal"
                class="border border-main-black/80 text-main-black/80 rounded-[5px] flex-1 h-[52px] text-lg leading-normal font-bold"
              >
                取消
              </button>
              <button
                @click="confirmModal"
                class="text-white bg-main-black/80 rounded-[5px] flex-1 h-[52px] text-lg leading-normal font-bold"
              >
                確定
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<style></style>
