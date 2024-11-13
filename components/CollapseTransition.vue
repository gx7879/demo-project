<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});
const transitionStyle = "0.3s height ease-in-out";
const beforeEnter = (el) => {
  el.style.transition = transitionStyle;

  el.style.height = 0;
  el.style.overflow = "hidden";
  console.log(1);
};
const enter = (el) => {
  if (el.scrollHeight !== 0) {
    el.style.height = `${el.scrollHeight}px`;
  } else {
    el.style.height = "";
  }
  console.log(2);
};
const afterEnter = (el) => {
  // el.style.transition = "";
  // el.style.height = "";
  el.style.height = `${el.scrollHeight}px`;
  el.style.overflow = "hidden";
  console.log(3);
};
// const beforeLeave = (el) => {
//   el.style.transition = transitionStyle;
//   el.style.height = 0;
//   // el.style.overflow = "hidden";
//   console.log(4);
// };
const leave = (el, done) => {
  // if (el.scrollHeight !== 0) {
  el.style.transition = transitionStyle;
  el.style.height = 0;
  // }
  console.log(5);
  done();
};
// const afterLeave = (el) => {
//   el.style.transition = "";
//   el.style.height = "";
//   console.log(6);
// };
</script>

<template>
  <transition
    @before-enter="beforeEnter"
    @enter="enter"
    @afterEnter="afterEnter"
    @leave="leave"
    :css="false"
  >
    <div v-if="isOpen" class="static">
      <slot></slot>
    </div>
  </transition>
</template>

<style></style>
