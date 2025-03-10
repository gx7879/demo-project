<script setup>
import { useClipboard } from "@vueuse/core";
import { orderDetail, updateOrder } from "@/api/order";

const route = useRoute();

const orderId = ref(route.params.orderId);

const { data: orderDetailInfo, error } = await useAsyncData("orderDetail", () =>
  orderDetail({ id: orderId.value })
);

console.log(orderDetailInfo);

const recipientInfo = ref(orderDetailInfo.value.ReceiveAddress);

const modalStore = useModalStore();
const { showModal, setIsVisible } = modalStore;

const orderStatus = ref("");

const { copy, isSupported } = useClipboard();

function handleCopy() {
  if (!isSupported) {
    // message.error("您的浏览器不支持Clipboard API");
    console.log("您的浏览器不支持Clipboard API");
    return;
  }
  copy(orderId.value);
}
const { currency } = useCurrency();
const steps = ref([
  {
    id: 1,
    name: "訂單成立",
  },
  {
    id: 2,
    name: "待出貨",
  },
  {
    id: 3,
    name: "已出貨",
  },
  {
    id: 4,
    name: "已完成",
  },
]);

const currentActive = ref(orderDetailInfo.value.order_status_id);

function cancelOrder() {
  showModal({
    title: "取消訂單",
    text: "確定要取消訂單?",
    icon: "",
    isVisible: true,
    onSuccess: () => {
      cancelSuccess();
    },
  });
}

function cancelSuccess() {
  showModal({
    title: "取消成功",
    text: "您的訂單已取消",
    icon: "success",
  });
  setTimeout(() => {
    setIsVisible(false);
  }, 2000);
}

function formatOrderStatus(id) {
  const status = {
    1: "訂單成立",
    2: "待出貨",
    3: "已出貨",
    4: "已完成",
    5: "已取消",
  };
  return status[id];
}
const infoEditStatus = ref(false);
const myForm = ref(null);
function editOrderInfo() {
  infoEditStatus.value = true;
  nextTick(() => {
    myForm.value.setValues({
      recipientLastName: recipientInfo.value.last_name,
      recipientFirstName: recipientInfo.value.first_name,
      recipientPhone: recipientInfo.value.phone_number,
      recipientCountry: recipientInfo.value.country,
      recipientPostalCode: recipientInfo.value.zip_code,
      recipientAddress: recipientInfo.value.address,
    });
  });
}

function canceleditInfo() {
  infoEditStatus.value = false;
}

const isSameAsOrder = ref(false);

const handleCheckboxChange = (setFieldValue) => {
  if (isSameAsOrder.value) {
    setFieldValue(
      "recipientLastName",
      orderDetailInfo.value.OrderAddress.last_name
    );
    setFieldValue(
      "recipientFirstName",
      orderDetailInfo.value.OrderAddress.first_name
    );
    setFieldValue(
      "recipientPhone",
      orderDetailInfo.value.OrderAddress.phone_number
    );
    setFieldValue(
      "recipientCountry",
      orderDetailInfo.value.OrderAddress.country
    );
    setFieldValue(
      "recipientPostalCode",
      orderDetailInfo.value.OrderAddress.zip_code
    );
    setFieldValue(
      "recipientAddress",
      orderDetailInfo.value.OrderAddress.address
    );
  } else {
    setFieldValue("recipientLastName", "");
    setFieldValue("recipientFirstName", "");
    setFieldValue("recipientPhone", "");
    setFieldValue("recipientCountry", "");
    setFieldValue("recipientPostalCode", "");
    setFieldValue("recipientAddress", "");
  }
};

async function submitEditInfo(values) {
  console.log(values);
  try {
    const result = await updateOrder({
      order_id: orderDetailInfo.value.id,
      receive_address: {
        is_same: isSameAsOrder.value,
        first_name: values.recipientFirstName,
        last_name: values.recipientLastName,
        phone_number: values.recipientPhone,
        country: values.recipientCountry,
        zip_code: values.recipientPostalCode,
        address: values.recipientAddress,
      },
    });
    console.log(result);
    recipientInfo.value = {
      first_name: values.recipientFirstName,
      last_name: values.recipientLastName,
      phone_number: values.recipientPhone,
      country: values.recipientCountry,
      zip_code: values.recipientPostalCode,
      address: values.recipientAddress,
    };
    canceleditInfo();
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  }
}
</script>

<template>
  <div class="px-6 2xl:px-0">
    <div class="mb-[60px] text-center">
      <h2 class="text-[28px] leading-[1.4] font-medium text-main-black/70 mb-3">
        訂單編號
      </h2>
      <div class="flex justify-center items-center mb-3">
        <span
          class="font-medium text-[28px] leading-[1.4] text-main-black/70 mr-1"
        >
          {{ orderId }}
        </span>
        <NuxtImg
          class="w-[22px] cursor-pointer"
          src="/copy-icon.png"
          @click="handleCopy"
        ></NuxtImg>
      </div>
      <div class="text-4xl leading-[1.4] font-medium text-main-black/70">
        {{ formatOrderStatus(orderDetailInfo.order_status_id) }}
      </div>
      <span class="text-[#fa0e0e] mt-[5px] block">貨品轉址運送中...</span>
    </div>
    <ol
      class="grid grid-cols-[1fr_1fr_1fr_auto] w-full mb-[120px] px-3 2xl:px-5"
    >
      <li
        v-for="step of steps"
        :key="step.id"
        class="flex w-full items-center group after:border-[#C0C6D8] has-[~.active]:text-blue-600 [&:not(:last-child)]:after:w-full [&:not(:last-child)]:after:h-1 [&:not(:last-child)]:after:border-b-[3px] [&:not(:last-child)]:has-[~.active]:after:border-[#68759F] [&:not(:last-child)]:after:inline-block"
        :class="{
          active: step.id === currentActive,
        }"
      >
        <span
          class="relative flex items-center justify-center w-10 h-10 rounded-full shrink-0 border-2 group-has-[~.active]:border-[#68759F] group-[.active]:border-[#68759F] group-[.active]:bg-[#68769F] after:absolute after:content-[attr(data-step-name)] after:left-1/2 after:-translate-x-1/2 after:top-[calc(100%_+_7px)] 2xl:after:top-[calc(100%_+_9px)] after:whitespace-nowrap 2xl:after:text-xl after:leading-normal after:group-[.active]:font-bold after:text-main-black/70"
          :class="{
            'border-[#C0C6D8] bg-white': step.id > currentActive,
          }"
          :data-step-name="step.name"
        >
          <svg
            class="size-6 text-[#68759F]"
            :class="{
              hidden: step.id >= currentActive,
            }"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m4.5 12.75 6 6 9-13.5"
            />
          </svg>
          <!-- <p
            class="absolute left-1/2 -translate-x-1/2 top-[calc(100%_+_9px)] whitespace-nowrap text-xl leading-normal group-[.active]:font-bold text-main-black/70"
          >
            {{ step.name }}
          </p> -->
        </span>
      </li>
    </ol>
    <h2 class="mb-9 text-main-black/70 text-[28px] leading-[1.4] font-medium">
      訂單資訊
    </h2>
    <div class="text-main-black/70">
      <div
        class="grid 2md:grid-cols-[2fr_repeat(4,1fr)] border-b border-main-black"
      >
        <div class="font-medium">商品資料</div>
        <div class="font-medium hidden 2md:block">優惠</div>
        <div class="font-medium hidden 2md:block">單件價格</div>
        <div class="font-medium hidden 2md:block text-center">數量</div>
        <div class="font-medium hidden 2md:block text-right">小計</div>
      </div>
      <div
        class="grid 2md:grid-cols-[2fr_repeat(4,1fr)] border-b border-main-black py-6"
      >
        <div class="flex">
          <div class="w-[100px] rounded-[5px] overflow-hidden mr-5">
            <NuxtImg class="w-full" src="/cart-product-img.jpg"></NuxtImg>
          </div>

          <div class="text-main-black/70 flex flex-col flex-1 2md:block">
            <div>
              <div class="leading-[1.4] font-bold">
                {{
                  orderDetailInfo.OrderCommodities[0].CommodityPropertyInfo
                    .Commodity.name
                }}
              </div>
              <span class="leading-[1.4] font-light">Black</span>
            </div>
            <span class="text-right mt-auto self-end 2md:hidden">
              TWD
              {{
                currency(
                  orderDetailInfo.OrderCommodities[0].price *
                    orderDetailInfo.OrderCommodities[0].amount
                )
              }}
            </span>
          </div>
        </div>
        <div class="hidden 2md:block"></div>
        <div class="hidden 2md:block">
          TWD
          {{
            currency(
              orderDetailInfo.OrderCommodities[0].CommodityPropertyInfo.price
            )
          }}
        </div>
        <div class="hidden 2md:block text-center">
          {{ orderDetailInfo.OrderCommodities[0].amount }}
        </div>
        <div class="hidden 2md:block text-right">
          TWD
          {{ currency(orderDetailInfo.OrderCommodities[0].price) }}
        </div>
      </div>
      <div class="flex flex-col items-end space-y-4 mt-3">
        <div class="text-main-black/70 max-w-80 w-full flex justify-between">
          <div class="text-sm font-medium">小計:</div>
          <div>
            TWD
            {{ currency(orderDetailInfo.OrderCommodities[0].price) }}
          </div>
        </div>
        <div class="text-main-black/70 max-w-80 w-full flex justify-between">
          <div class="text-sm font-medium">運費:</div>
          <div>TWD 0</div>
        </div>
        <div class="text-main-black/70 max-w-80 w-full flex justify-between">
          <div class="text-sm font-bold">總計:</div>
          <div class="font-bold">
            TWD
            {{ currency(orderDetailInfo.OrderCommodities[0].price) }}
          </div>
        </div>
      </div>
    </div>
    <div class="border-b border-main-black my-11 2md:my-12"></div>
    <h2 class="text-[28px] leading-[1.4] font-medium text-main-black/70 mb-9">
      訂購人資訊
    </h2>
    <div class="space-y-6 text-xl font-medium text-main-black/70">
      <div>電子郵件 : {{ orderDetailInfo.OrderAddress.email }}</div>
      <div>
        訂購人 :
        {{
          orderDetailInfo.OrderAddress.first_name +
          orderDetailInfo.OrderAddress.last_name
        }}
      </div>
      <div class="flex flex-wrap gap-y-[21px]">
        <div class="mr-[21px]">
          連絡電話 : {{ orderDetailInfo.OrderAddress.phone_number }}
        </div>
        <div class="whitespace-nowrap">
          公司 : {{ orderDetailInfo.OrderAddress.company_name ?? "無" }}
        </div>
      </div>
      <div class="flex flex-wrap gap-y-[21px]">
        <div class="mr-[21px]">
          所在國家與地區 : {{ orderDetailInfo.OrderAddress.country }}
        </div>
        <div class="whitespace-nowrap">
          郵遞區號 : {{ orderDetailInfo.OrderAddress.zip_code }}
        </div>
      </div>
      <div>地址 : {{ orderDetailInfo.OrderAddress.address }}</div>
    </div>
    <div class="border-b border-main-black my-11 2md:my-12"></div>
    <h2
      class="text-[28px] leading-[1.4] font-medium text-main-black/70 mb-9 flex flex-wrap items-end"
    >
      收貨資訊
      <span class="text-xl whitespace-nowrap">
        (詳細運送資料將由專人與您聯繫)
      </span>
    </h2>
    <template v-if="infoEditStatus">
      <div class="max-w-[660px]">
        <veeForm
          ref="myForm"
          v-slot="{ setFieldValue }"
          @submit="submitEditInfo"
        >
          <div class="flex items-center mb-6">
            <div class="flex items-center h-6">
              <input
                id="isSameAsOrder"
                type="checkbox"
                v-model="isSameAsOrder"
                class="w-6 h-6 border border-main-black/80 rounded bg-white focus:ring-3 focus:ring-blue-300 checked:bg-main-black/80"
                @change="handleCheckboxChange(setFieldValue)"
              />
            </div>
            <label
              for="isSameAsOrder"
              class="flex gap-x-1 ms-2 text-xl text-main-black/80"
            >
              同訂購人資訊
            </label>
          </div>
          <div class="grid sm:grid-cols-[1fr,_2fr] sm:gap-x-3">
            <div class="mb-6">
              <label
                for="recipientFirstName"
                class="block text-xl text-main-black/70 font-normal mb-3"
              >
                姓氏
              </label>
              <VeeField
                type="text"
                name="recipientFirstName"
                class="bg-gray-50 border border-notice-gray placeholder:text-[#b3b3b3] text-lg leading-[26px] rounded-[10px] block w-full px-4 py-[15px]"
                placeholder=""
                rules="required"
              />
              <VeeErrorMessage
                name="recipientFirstName"
                class="text-error-msg text-sm"
              />
            </div>
            <div>
              <label
                for="recipientLastName"
                class="block text-xl text-main-black/70 font-normal mb-3"
              >
                名字
              </label>
              <VeeField
                type="text"
                name="recipientLastName"
                class="bg-gray-50 border border-notice-gray placeholder:text-[#b3b3b3] text-lg leading-[26px] rounded-[10px] block w-full px-4 py-[15px]"
                placeholder=""
                rules="required"
              />
              <VeeErrorMessage
                name="recipientLastName"
                class="text-error-msg text-sm"
              />
            </div>
          </div>
          <div class="grid sm:grid-cols-[1fr,_2fr] sm:gap-x-3">
            <div class="mb-6">
              <label
                for="recipientPhone"
                class="block text-xl text-main-black/70 font-normal mb-3"
              >
                連絡電話
              </label>
              <VeeField
                type="text"
                name="recipientPhone"
                class="bg-gray-50 border border-notice-gray placeholder:text-[#b3b3b3] text-lg leading-[26px] rounded-[10px] block w-full px-4 py-[15px]"
                placeholder="0912345678"
                rules="required"
              />
              <VeeErrorMessage
                name="recipientPhone"
                class="text-error-msg text-sm"
              />
            </div>
          </div>
          <div class="grid sm:grid-cols-[2fr,_1fr] sm:gap-x-3">
            <div class="mb-6">
              <label
                for="recipientCountry"
                class="block text-xl text-main-black/70 font-normal mb-3"
              >
                所在國家與地區
              </label>
              <VeeField
                type="text"
                name="recipientCountry"
                class="bg-gray-50 border border-notice-gray placeholder:text-[#b3b3b3] text-lg leading-[26px] rounded-[10px] block w-full px-4 py-[15px]"
                placeholder="台灣"
                rules="required"
              />
              <VeeErrorMessage
                name="recipientCountry"
                class="text-error-msg text-sm"
              />
            </div>
            <div>
              <label
                for="recipientPostalCode"
                class="block text-xl text-main-black/70 font-normal mb-3"
              >
                郵遞區號
              </label>
              <VeeField
                type="text"
                name="recipientPostalCode"
                class="bg-gray-50 border border-notice-gray placeholder:text-[#b3b3b3] text-lg leading-[26px] rounded-[10px] block w-full px-4 py-[15px]"
                placeholder="112"
                rules="required"
              />
              <VeeErrorMessage
                name="recipientPostalCode"
                class="text-error-msg text-sm"
              />
            </div>
          </div>
          <div>
            <label
              for="recipientAddress"
              class="block text-xl text-main-black/70 font-normal mb-3"
            >
              地址
            </label>
            <VeeField
              type="text"
              name="recipientAddress"
              class="bg-gray-50 border border-notice-gray placeholder:text-[#b3b3b3] text-lg leading-[26px] rounded-[10px] block w-full px-4 py-[15px]"
              placeholder="台北市中正區中正路123號"
              rules="required"
            />
            <VeeErrorMessage
              name="recipientAddress"
              class="text-error-msg text-sm"
            />
          </div>
          <div class="flex gap-4 flex-col 2md:flex-row mt-10">
            <button
              @click="canceleditInfo"
              class="h-[52px] text-lg font-bold rounded-[5px] border border-main-black/80 text-main-black/80 2md:flex-1 disabled:text-main-black/20 disabled:border-main-black/20"
            >
              取消
            </button>
            <button
              class="h-[52px] text-lg font-bold rounded-[5px] bg-main-black/80 text-white 2md:flex-1 disabled:bg-main-black/20"
            >
              確定
            </button>
          </div>
        </veeForm>
      </div>
    </template>
    <template v-else>
      <div class="space-y-6 text-xl font-medium text-main-black/70">
        <div>
          訂購人 :
          {{ recipientInfo.first_name + recipientInfo.last_name }}
        </div>
        <div class="flex flex-wrap gap-y-[21px]">
          <div class="mr-[21px]">
            連絡電話 : {{ recipientInfo.phone_number }}
          </div>
          <div class="whitespace-nowrap">
            公司 : {{ recipientInfo.company_name ?? "無" }}
          </div>
        </div>
        <div class="flex flex-wrap gap-y-[21px]">
          <div class="mr-[21px]">
            所在國家與地區 : {{ recipientInfo.country }}
          </div>
          <div class="whitespace-nowrap">
            郵遞區號 : {{ recipientInfo.zip_code }}
          </div>
        </div>
        <div>地址 : {{ recipientInfo.address }}</div>
      </div>
    </template>
    <div class="border-b border-main-black my-11 2md:my-12"></div>
    <h2 class="text-[28px] leading-[1.4] font-medium text-main-black/70 mb-9">
      付款資訊
    </h2>
    <div class="space-y-6 text-xl font-medium text-main-black/70">
      <div>付款方式 : 信用卡</div>
    </div>
    <div class="border-b border-main-black my-11 2md:my-12"></div>
    <template v-if="orderStatus === 'cancel'">
      <div class="flex gap-6 flex-col 2md:flex-row">
        <NuxtLink custom v-slot="{ navigate }" to="/contact">
          <button
            @click="navigate"
            class="h-[52px] text-lg font-bold rounded-[5px] border border-main-black/80 text-main-black/80 2md:flex-1"
          >
            聯絡客服
          </button>
        </NuxtLink>
        <button
          class="h-[52px] text-lg font-bold rounded-[5px] bg-main-black/80 text-white 2md:flex-1"
        >
          再買一次
        </button>
      </div>
    </template>
    <template v-else-if="currentActive < 3">
      <div class="flex gap-6 flex-col 2md:flex-row">
        <button
          @click="cancelOrder"
          :disabled="infoEditStatus"
          class="h-[52px] text-lg font-bold rounded-[5px] border border-main-black/80 text-main-black/80 2md:flex-1 disabled:text-main-black/20 disabled:border-main-black/20"
        >
          取消訂單
        </button>
        <button
          @click="editOrderInfo"
          :disabled="infoEditStatus"
          class="h-[52px] text-lg font-bold rounded-[5px] bg-main-black/80 text-white 2md:flex-1 disabled:bg-main-black/20"
        >
          編輯訂購資訊
        </button>
      </div>
    </template>
    <template v-else-if="currentActive >= 3">
      <div class="flex gap-6 flex-col 2md:flex-row">
        <button
          class="h-[52px] text-lg font-bold rounded-[5px] border border-main-black/80 text-main-black/80 2md:flex-1"
        >
          我要退貨
        </button>
        <button
          class="h-[52px] text-lg font-bold rounded-[5px] bg-main-black/80 text-white 2md:flex-1"
        >
          連絡客服
        </button>
      </div>
    </template>
  </div>
</template>

<style></style>
