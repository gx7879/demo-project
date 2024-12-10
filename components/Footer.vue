<script setup></script>

<template>
  <div
    class="bg-main-black text-white px-6 py-10 lg:px-[50px] flex justify-between"
  >
    <div class="hidden mobile:flex flex-col justify-between items-start">
      <NuxtImg src="/footer-logo.png"></NuxtImg>
      <div class="grid grid-cols-[auto_1fr]">
        <div class="flex items-center gap-x-4">
          <NuxtImg class="size-4" src="/ig-icon.png"></NuxtImg>
          <NuxtImg class="size-4" src="/line-icon.png"></NuxtImg>
          <NuxtImg class="size-4" src="/fb-icon.png"></NuxtImg>
        </div>
        <div class="ml-6 text-sm">@ 2024 ARKVO</div>
      </div>
    </div>
    <div class="w-full mobile:w-auto flex flex-col items-start gap-y-12">
      <div class="mobile:hidden">
        <NuxtImg src="/footer-logo.png"></NuxtImg>
      </div>
      <div
        class="self-end grid grid-cols-[repeat(2,_auto)] lg:grid-cols-[repeat(4,_auto)] justify-between items-start gap-x-8 gap-y-8 text-sm text-white leading-[1.4]"
      >
        <div class="flex flex-col items-start px-2">
          <div class="border-b border-white pb-1.5 font-bold mb-3">
            產品與耗材
          </div>
          <div class="mb-3">ARK-002空氣飲水機</div>
          <div>ARK-002耗材組</div>
        </div>
        <div class="flex flex-col items-start px-2">
          <div class="border-b border-white pb-1.5 font-bold mb-3">發現</div>
          <div class="mb-3">團隊</div>
          <div class="mb-3">職涯</div>
          <div>專利與商標</div>
        </div>
        <div class="flex flex-col items-start px-2">
          <div class="border-b border-white pb-1.5 font-bold mb-3">支援</div>
          <div class="mb-3">產品型錄</div>
          <div class="mb-3"><NuxtLink to="/shipping">運送與運費</NuxtLink></div>
          <div class="mb-3">保養維護服務說明</div>
          <div class="mb-3">
            <NuxtLink to="/contact">聯繫客服</NuxtLink>
          </div>
          <div>專利與商標</div>
        </div>
        <div class="flex flex-col items-start px-2">
          <div class="border-b border-white pb-1.5 font-bold mb-3">
            最新消息
          </div>
          <div class="mb-3">大師對談</div>
          <div>媒體</div>
        </div>
      </div>
      <div class="mobile:hidden">
        <div class="grid grid-cols-[auto_1fr]">
          <div class="flex items-center gap-x-4">
            <NuxtImg class="size-4" src="/ig-icon.png"></NuxtImg>
            <NuxtImg class="size-4" src="/line-icon.png"></NuxtImg>
            <NuxtImg class="size-4" src="/fb-icon.png"></NuxtImg>
          </div>
          <div class="ml-6 text-sm">@ 2024 ARKVO</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
