<script setup>
const store = useCartStore();
const { isSubmittingOrder } = storeToRefs(store);
const { product } = defineProps({
  product: {
    type: Object,
    default: () => ({}),
  },
});

const productInfo = computed(() => {
  return product.CommodityInfo.Commodity;
});

const { currency } = useCurrency();

function removeProduct() {
  console.log("remove");
}
</script>

<template>
  <div class="grid grid-cols-[120px,_1fr] gap-x-3">
    <div>
      <NuxtImg class="w-full" src="/cart-product-img.jpg"></NuxtImg>
    </div>
    <div class="text-main-black/70 flex flex-col justify-between">
      <div>
        <div class="flex justify-between text-xl font-medium">
          <div class="sm:mr-5">
            {{ productInfo.name }}
            <span class="text-sm font-light mt-1 block">Black</span>
          </div>
          <div
            class="whitespace-nowrap auto-rows-max text-right hidden sm:grid"
          >
            <span
              :class="{ 'line-through': productInfo.discount_price !== null }"
            >
              $ {{ currency(productInfo.price) }}
            </span>
            <span
              v-if="productInfo.discount_price !== null"
              class="text-[#ff7700]"
            >
              $ {{ currency(productInfo.discount_price) }}
            </span>
          </div>
        </div>
      </div>
      <div class="flex justify-between items-end sm:items-center">
        <span class="hidden sm:block">數量</span>
        <template v-if="!isSubmittingOrder">
          <TouchSpin
            v-model="product.amount"
            @remove="removeProduct"
          ></TouchSpin>
        </template>
        <template v-else>
          <div class="w-12 text-center">
            {{ product.amount }}
          </div>
        </template>
        <div
          class="whitespace-nowrap grid auto-rows-max text-right sm:hidden text-xl"
        >
          <span
            :class="{ 'line-through': productInfo.discount_price !== null }"
          >
            $ {{ currency(productInfo.price) }}
          </span>
          <span
            v-if="productInfo.discount_price !== null"
            class="text-[#ff7700]"
          >
            $ {{ currency(productInfo.discount_price) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
