<script setup>
const { items } = defineProps({
  items: {
    type: Array,
  },
});
</script>

<template>
  <nav class="flex" aria-label="Breadcrumb">
    <ol
      class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse"
    >
      <li class="inline-flex items-center">
        <a
          href="#"
          class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
        >
          {{ items[0] }}
        </a>
      </li>
      <li v-for="(item, index) of items.slice(1)" :key="index">
        <div class="flex items-center">
          <svg
            class="rtl:rotate-180 w-3 h-3 text-main-black/70 mx-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <a href="#" class="ms-1 text-sm font-medium text-gray-700 md:ms-2">
            {{ item }}
            <!-- item -->
          </a>
        </div>
      </li>
    </ol>
  </nav>
</template>

<style></style>
