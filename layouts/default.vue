<script setup>
const store = useResetPasswordStore();
const { confirm, cancel } = store;
const { isVisible, resetPasswordState } = storeToRefs(store);
</script>

<template>
  <div class="bg-bg-gray">
    <!-- <Marquee>
      <h1>
        ARK-002 現已上市 ARK-001 PLUS 現已上市 ARK-002 貨和運輸 ARK-003 開發實況
        ARK-002 第四次募資總金額突破3億6千萬 ARK-002 產品發表會花絮
      </h1>
    </Marquee> -->
    <Header></Header>
    <div>
      <!-- Layout: default -->
      <slot />
    </div>
    <Footer></Footer>
    {{ resetPasswordState.onConfirm }}
    <Modal
      v-bind="resetPasswordState"
      :isVisible="isVisible"
      @close="cancel"
      @confirm="confirm"
    ></Modal>
  </div>
</template>

<style scoped></style>
