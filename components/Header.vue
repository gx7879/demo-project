<script setup></script>

<template>
  <header
    class="h-[337px] md:h-[401px] bg-[url(@/assets/images/banner.png)] bg-cover bg-center"
  >
    <div class="bg-bg-gray/30 px-6 lg:px-[50px] h-20 backdrop-blur-[10px]">
      <div
        class="flex justify-between items-center border-b border-white h-full"
      >
        <NuxtImg
          class="2md:hidden"
          width="36"
          height="36"
          src="/bar-icon.svg"
        ></NuxtImg>

        <div class="h-5 lg:h-7 aspect-[23/4]">
          <NuxtImg class="w-full" src="/header-logo.svg"></NuxtImg>
        </div>
        <div class="flex items-center">
          <NuxtLink
            class="text-xl text-white hidden 2md:inline-block mr-[85px]"
            to="/"
            >會員</NuxtLink
          >
          <!-- <div class="flex items-center"> -->
          <NuxtLink to="/" class="flex items-center">
            <div class="text-xl text-white mr-2 hidden 2md:inline-block">
              購物車
            </div>
            <div
              class="border border-white w-[38px] h-[38px] rounded-full flex justify-center items-center text-white text-lg"
            >
              0
            </div>
          </NuxtLink>
          <!-- </div> -->
        </div>
      </div>
    </div>
    <!-- <NuxtImg class="absolute h-full bg-cover" src="/banner.png"></NuxtImg> -->
  </header>
</template>

<style></style>
