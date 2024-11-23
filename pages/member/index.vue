<script setup>
const data = ref([
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    details: "Lorem ipsum dolor sit amet.",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    details: "Consectetur adipiscing elit.",
  },
  {
    id: 3,
    name: "Sam Wilson",
    email: "sam@example.com",
    details: "Sed do eiusmod tempor incididunt.",
  },
]);

// 管理展開行的 ID 列表
const expandedRows = ref([]);

const toggleRow = (id) => {
  if (expandedRows.value.includes(id)) {
    expandedRows.value = expandedRows.value.filter((rowId) => rowId !== id);
  } else {
    expandedRows.value.push(id);
  }
};
</script>

<template>
  <div>
    <h2 class="mb-3 text-main-black/70 text-[28px] leading-[140%] font-medium">
      訂購紀錄
    </h2>
    <table class="border-t border-main-black">
      <thead>
        <tr
          class="relative after:left-0 after:right-0 after:bottom-0 after:bg-main-black after:h-px after:block after:absolute after:scale-y-50"
        >
          <td>訂單編號</td>
          <td>訂單日期</td>
          <td>合計</td>
          <td>狀態</td>
          <td></td>
        </tr>
      </thead>
      <tbody is="transition-group" tag="tbody" name="fade">
        <!-- eslint-disable-next-line vue/no-v-for-template-key -->
        <template v-for="(item, index) in data" :key="index">
          <tr
            class="relative after:left-0 after:right-0 after:bottom-0 after:bg-main-black after:h-px after:block after:absolute after:scale-y-50"
          >
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr
            v-if="expandedRows.includes(item.id)"
            :key="`detail-${item.data}`"
          >
            <td colspan="4">
              <div class="details">
                <strong>Details for {{ item.name }}</strong>
                <p>{{ item.details }}</p>
              </div>
            </td>
            <td></td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<style></style>
