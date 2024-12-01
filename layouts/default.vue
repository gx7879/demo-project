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
    <Modal
      :title="resetPasswordState.title"
      :text="resetPasswordState.text"
      :icon="resetPasswordState.icon"
      :password="resetPasswordState.password"
      :isVisible="isVisible"
      @close="cancel"
      @confirm="confirm"
    ></Modal>
  </div>
</template>

<style scoped></style>
