<script setup>
import { addShoppingCart } from "@/api/order";
const type = ref("white");
async function addToCart() {
  try {
    const result = await addShoppingCart({
      commodity_info_id: 4,
      amount: 1,
    });
    console.log(result);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  }
}
</script>

<template>
  <div
    class="flex justify-end items-end lg:items-center bg-[url(@/assets/images/product-img-mobile.png),_url(@/assets/images/product-img-bg.jpg)] lg:bg-[url(@/assets/images/product-img-bg.jpg)] bg-cover bg-center min-h-[1115px] relative p-6 lg:px-[50px] lg:py-0"
  >
    <div class="max-w-screen-2xl mx-auto w-full">
      <div
        class="lg:hidden font-['Space_Grotesk'] mb-16 text-white absolute left-6 md:left-[90px] top-[100px]"
      >
        <h1 class="text-4xl leading-none font-light mb-1">ARK-002系列</h1>
        <span class="text-xl leading-none font-light"
          >2024年式 - 次世代空氣造水機
        </span>
      </div>
      <div
        class="lg:grid lg:grid-cols-[1fr,_minmax(200px,220px),_512px] w-full"
      >
        <div class="h-full relative">
          <NuxtImg
            class="hidden lg:block max-w-none w-auto h-full absolute right-0 aspect-[1315/1075]"
            src="/product-img.png"
          ></NuxtImg>
        </div>
        <div class="hidden lg:block"></div>
        <div
          class="text-white md:flex lg:block gap-x-14 p-4 lg:p-0 bg-[#c5c3c2]/50 lg:bg-transparent backdrop-blur-[15px] lg:backdrop-blur-none rounded-[10px]"
        >
          <div class="mb-12 md:mb-0 lg:mb-[75px] flex-1">
            <div class="hidden lg:block font-['Space_Grotesk'] mb-16">
              <h1 class="text-[46px] leading-none font-light mb-1">
                ARK-002系列
              </h1>
              <span class="text-[26px] leading-none font-light"
                >2024年式 - 次世代空氣造水機
              </span>
            </div>
            <div class="block mb-6 lg:mb-10">
              <div class="flex">
                <span
                  class="font-['Space_Grotesk'] text-[26px] leading-none font-light mr-5"
                  >79,800 元
                </span>
                <span class="text-sm leading-none">新臺幣</span>
              </div>
              <div class="my-6 border border-white"></div>
              <div class="flex justify-between items-center">
                <div class="text-sm leading-none flex items-center h-5">
                  以
                  <span class="underline underline-from-font ml-1.5">{{
                    type === "white" ? "白色" : "黑色"
                  }}</span>
                  完成
                </div>
                <div class="flex gap-x-3">
                  <div>
                    <label
                      for="white"
                      class="block cursor-pointer rounded-full border border-transparent p-2 hover:border-gray-200 has-[:checked]:border-white"
                    >
                      <div
                        class="w-5 h-5 rounded-full border border-white bg-[#c6c6c6]"
                      ></div>

                      <input
                        v-model="type"
                        type="radio"
                        name="type"
                        value="white"
                        id="white"
                        class="sr-only"
                        checked
                      />
                    </label>
                  </div>
                  <div>
                    <label
                      for="black"
                      class="block cursor-pointer rounded-full border border-transparent p-2 hover:border-gray-200 has-[:checked]:border-white"
                    >
                      <div
                        class="w-5 h-5 rounded-full border border-white bg-[#3f3f3f]"
                      ></div>

                      <input
                        v-model="type"
                        type="radio"
                        name="type"
                        value="black"
                        id="black"
                        class="sr-only"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <button
              class="flex justify-between items-center w-full bg-main-black h-[72px] px-9 text-xl"
              @click="addToCart"
            >
              <span>立即購買</span>
              <span class="font-['Space_Grotesk'] font-light">79,800 元</span>
            </button>
          </div>
          <div class="md:w-[280px] lg:w-auto">
            <div
              class="flex flex-col lg:flex-row lg:justify-between text-sm lg:text-xl leading-[1.2]"
            >
              <div class="mb-2">概述</div>
              <p class="md:max-w-[385px]">
                這款革命性的家電融合了除濕、空氣淨化與淨水技術，將清新的空氣轉化為安全可飲用的水。讓您在家中就能享受到來自空氣的純淨飲用水。除了有效節省空間，它的能源效率也遠超過單獨使用的多種家電。<br /><br />
                ARK-002帶來全新的智能使用體驗，為追求極致生活品質的您而設計的未來科技產品，將健康與便利融為一體，從每一口呼吸到每一滴飲用水，全面升級您的居家生活。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
