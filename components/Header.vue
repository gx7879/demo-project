<script setup>
const route = useRoute();
const openMenu = ref(false);
const toggleMenu = () => {
  openMenu.value = !openMenu.value;
};
</script>

<template>
  <header
    class="absolute w-full"
    :class="{
      'h-[337px] md:h-[401px] bg-[url(@/assets/images/banner.png)] bg-cover bg-center':
        route.name !== 'index',
    }"
  >
    <div class="bg-bg-gray px-6 lg:px-[50px] h-20 backdrop-blur-[10px]">
      <div
        class="flex justify-between items-center border-b border-white h-full"
        :class="{ 'border-white': !openMenu, 'border-main-black/70': openMenu }"
      >
        <!-- <NuxtImg
          class="2md:hidden"
          :class="{ 'text-main-black/70': true }"
          width="36"
          height="36"
          src="/bar-icon.svg"
          @click="toggleMenu"
        ></NuxtImg> -->
        <svg
          class="2md:hidden fill-current stroke-current"
          :class="{ 'text-white': !openMenu, 'text-main-black/70': openMenu }"
          width="36"
          height="36"
          viewBox="0 0 36 36"
          xmlns="http://www.w3.org/2000/svg"
          @click="toggleMenu"
        >
          <g id="solar:hamburger-menu-linear">
            <path
              id="Vector"
              d="M30 10.5H6M30 18H6M30 25.5H6"
              stroke-width="3.125"
              stroke-linecap="round"
            />
          </g>
        </svg>
        <!-- <transition>
          <div
            v-if="openMenu"
            class="absolute top-full left-0 w-full px-[50px] py-10 bg-bg-gray"
          >
            <h6 class="text-[28px] leading-[140%] mb-3">會員專區</h6>
            <ul
              class="text-xl text-main-black/70 space-y-6 px-4 py-6 border-t border-l border-main-black mb-6"
            >
              <li>會員資料</li>
              <li>會員身分與優惠</li>
              <li>訂單追蹤</li>
              <li>訂購紀錄</li>
              <li>變更密碼</li>
            </ul>
            <button
              class="border border-main-black/80 w-full h-[54px] text-lg text-main-black/80 font-bold rounded-[5px]"
            >
              登出
            </button>
          </div>
        </transition> -->

        <div class="h-5 lg:h-7 aspect-[23/4]">
          <NuxtImg class="w-full" src="/header-logo.svg"></NuxtImg>
        </div>
        <div class="flex items-center">
          <!-- <NuxtLink
            class="text-xl text-main-black/70 hidden 2md:inline-block mr-[85px]"
            to="/"
            @click="isOpen = !isOpen"
            >會員
          </NuxtLink> -->
          <div
            class="text-xl text-main-black/70 hidden 2md:inline-block mr-[85px] cursor-pointer"
            @click="toggleMenu"
          >
            會員
          </div>
          <!-- <div class="flex items-center"> -->
          <NuxtLink to="/" class="flex items-center">
            <div
              class="text-xl text-main-black/70 mr-2 hidden 2md:inline-block"
            >
              購物車
            </div>
            <div
              class="border w-[38px] h-[38px] rounded-full flex justify-center items-center text-lg"
              :class="{
                'text-white border-white': !openMenu,
                'text-main-black/70 border-main-black/70': openMenu,
              }"
            >
              0
            </div>
          </NuxtLink>
          <!-- </div> -->
        </div>
      </div>
    </div>
    <Vue3SlideUpDown v-model="openMenu" opacityClosed="1">
      <div class="px-[50px] py-10 bg-bg-gray">
        <h6 class="text-main-black/70 text-[28px] leading-[140%] mb-3">
          會員專區
        </h6>
        <div class="2md:flex justify-between items-end">
          <ul
            class="text-xl text-main-black/70 px-4 py-6 border-t border-l border-main-black grid 2md:grid-cols-3 gap-x-[60px] gap-y-6 auto-cols-auto mb-6 2md:mb-0"
          >
            <li>會員資料</li>
            <li>會員身分與優惠</li>
            <li>訂單追蹤</li>
            <li>訂購紀錄</li>
            <li>變更密碼</li>
          </ul>
          <button
            class="border border-main-black/80 w-full 2md:w-[216px] h-[54px] text-lg text-main-black/80 font-bold rounded-[5px]"
          >
            登出
          </button>
        </div>
      </div>
    </Vue3SlideUpDown>
    <!-- <CollapseTransition :isOpen="isOpen">
      <div class="px-[50px] py-10 bg-bg-gray">
        <h6 class="text-main-black/70 text-[28px] leading-[140%] mb-3">
          會員專區
        </h6>
        <div class="flex justify-between items-end">
          <ul
            class="text-xl text-main-black/70 px-4 py-6 border-t border-l border-main-black mb-6 grid grid-cols-3 gap-x-[60px] gap-y-6 auto-cols-auto"
          >
            <li>會員資料</li>
            <li>會員身分與優惠</li>
            <li>訂單追蹤</li>
            <li>訂購紀錄</li>
            <li>變更密碼</li>
          </ul>
          <button
            class="border border-main-black/80 w-[216px] h-[54px] text-lg text-main-black/80 font-bold rounded-[5px]"
          >
            登出
          </button>
        </div>
      </div>
    </CollapseTransition> -->
    <!-- <NuxtImg class="absolute h-full bg-cover" src="/banner.png"></NuxtImg> -->
  </header>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
