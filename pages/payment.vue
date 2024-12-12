<script setup>
import { gateway, createPayment } from "@/api/payment";
const route = useRoute();
const id = route.query.orderId;

const { data: payment, error } = await useAsyncData("payment", () =>
  gateway({
    id,
    ChoosePaymentList: 1,
    OrderResultURL: "http://localhost:3000/payComplete?orderId=" + id,
  })
);
console.log(error.value, payment.value.status);
if (error.value || payment.value.status === "fail") {
  navigateTo("/");
}
const jqueryLoaded = ref(false);
const ecpayLoaded = ref(false);
useHead({
  script: [
    {
      tagPriority: "before:script:ecpay",
      src: "https://code.jquery.com/jquery-3.5.1.min.js",
      tagPosition: "bodyClose",
      onload: () => {
        const checkJqueryLoaded = setInterval(() => {
          console.log(window.$);
          if (window.$) {
            clearInterval(checkJqueryLoaded);
            jqueryLoaded.value = true;
          }
        }, 100);
      },
    },
    {
      key: "ecpay",
      src: "https://ecpg.ecpay.com.tw/Scripts/sdk-1.0.0.js?t=20210121100116",
      tagPosition: "bodyClose",
      onload: () => {
        const checkSDKLoaded = setInterval(() => {
          console.log(window.ECPay);
          if (window.ECPay) {
            clearInterval(checkSDKLoaded);
            ecpayLoaded.value = true;
          }
        }, 100);
      },
    },
  ],
});

watchEffect(() => {
  if (jqueryLoaded.value && ecpayLoaded.value) {
    nextTick(() => {
      ecpayInit();
    });
  }
});

function ErrHandle(strErr) {
  if (strErr != null) {
    $("#ECPayPayment").append(
      '<div style="text-align: center;"><label style="color: red;">' +
        strErr +
        "</label></div>"
    );
    console.log(strErr);
  } else {
    $("#ECPayPayment").append(
      '<div style="text-align: center;"><label style="color: red;">Token取得失敗</label></div>'
    );
    console.log("Wrong");
  }
  // navigateTo("/");

  //$('#btnPay').hide();
}

function paymentConfirm() {
  try {
    ECPay.getPayToken(async function (paymentInfo, errMsg) {
      //console.log("response => getPayToken(paymentInfo, errMsg):", paymentInfo, errMsg);
      if (errMsg != null) {
        ErrHandle(errMsg);
        return;
      }

      // $("#PayToken").val(paymentInfo.PayToken);
      // $("#PaymentTypeResult").val(paymentInfo.PaymentType);
      console.log("Pay Process : ", paymentInfo);
      const result = await createPayment({
        PayToken: paymentInfo.PayToken,
        PaymentType: paymentInfo.PaymentType,
        MerchantTradeNo: payment.value.MerchantTradeNo,
      });
      console.log("result", result);
      await navigateTo(result.ThreeDInfo.ThreeDURL, {
        external: true,
        // open: {
        //   target: "_blank",
        // },
      });
      // window.open(result.ThreeDInfo.ThreeDURL)
      return true;
    });
  } catch (err) {
    // ErrHandle(err);
  }
}

function ecpayInit() {
  const Environment = "STAGE"; //請設定要連線的環境: 測試 STAGE ,正式PROD
  const envi = GetEnvi(Environment);
  console.log(payment.value);
  let _token = payment.value.Token;
  //初始化SDK畫面
  try {
    ECPay.initialize(envi, 1, function (errMsg) {
      if (_token === "") {
        _token = prompt("請填入Token: ");
      }

      // try {
      ECPay.createPayment(
        _token,
        ECPay.Language.zhTW,
        function (errMsg) {
          //console.log('Callback Message: ' + errMsg);
          if (errMsg != null) ErrHandle(errMsg);
        },
        "V2"
      );
      // } catch (err) {
      //   ErrHandle(err);
      // }
    });
  } catch (err) {
    ErrHandle(err);
  }

  function GetEnvi(env) {
    let result = "STAGE";
    switch (env) {
      case "STAGE":
        result = "Stage";
        break;
      case "PROD":
        result = "Prod";
        break;
    }
    return result;
  }
}
</script>

<template>
  <div class="text-center pt-[100px] pb-40">
    <div id="ECPayPayment"></div>
    <button
      class="rounded-[5px] bg-[#39B67C] text-white h-[52px] px-6 mt-6"
      @click="paymentConfirm"
    >
      確認送出
    </button>
  </div>
</template>

<style></style>
