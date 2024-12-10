<script setup></script>

<template>
  <div
    class="max-w-[1200px] py-[200px] mx-auto px-6 text-main-black/70 leading-normal"
  >
    <h1
      class="text-4xl leading-[1.4] font-medium underline underline-from-font text-center mb-[100px]"
    >
      產品配送服務
    </h1>
    <p class="text-[40px] font-light text-center mb-[300px]">
      超 過 六 百 個 部 件，從 生 產 線 到 您 手 中<br />
      我 們 用 心 確 保 每 次 運 送 完 好 無 損 地 送 達。
    </p>
    <div class="-mx-6">
      <NuxtImg class="mb-[130px]" src="/shipping-img.jpg"></NuxtImg>
    </div>
    <h2
      class="text-2xl font-bold flex items-center after:flex-1 after:ml-6 after:border-b after:border-main-black mb-[70px]"
    >
      運送政策
    </h2>
    <p class="text-xl font-medium mb-40">
      由於我們產品的定製性質，ARKVO的政策是在收到訂單后一周內發貨。<br /><br />
      當訂單湧入異常多時，例如在新產品發佈后立即，隨著我們的追趕，這個時間可能會延長幾天。由於承運人、海關和進口問題以及罷工造成的延誤可能而且將會發生，不幸的是，這超出了我們的控制範圍。我們將盡可能協助解決這些問題，但我們不對第三方延誤負責。在選擇USPS等廉價承運商時，請記住這一點，因為解決問題可能是一個漫長的過程。<br /><br />
      所有超過 250 美元的訂單都會通過 Route 自動投保全額保險。請與 Route
      聯繫以解決任何問題或安排退款或更換。
    </p>
    <h2
      class="text-2xl font-bold flex items-center after:flex-1 after:ml-6 after:border-b after:border-main-black mb-[70px]"
    >
      配送流程
    </h2>
    <p class="text-xl font-medium mb-[130px]">
      由於我們產品的定製性質，ARKVO的政策是在收到訂單后一周內發貨。<br /><br />
      當訂單湧入異常多時，例如在新產品發佈后立即，隨著我們的追趕，這個時間可能會延長幾天。由於承運人、海關和進口問題以及罷工造成的延誤可能而且將會發生，不幸的是，這超出了我們的控制範圍。我們將盡可能協助解決這些問題，但我們不對第三方延誤負責。在選擇USPS等廉價承運商時，請記住這一點，因為解決問題可能是一個漫長的過程。<br /><br />
      所有超過 250 美元的訂單都會通過 Route 自動投保全額保險。請與 Route
      聯繫以解決任何問題或安排退款或更換。
    </p>
    <div class="flex gap-x-12 mb-[200px]">
      <div
        v-for="(text, index) of [
          '確認訂單',
          '客服聯繫確認',
          '運送訂單成立',
          '物流聯繫時間',
          '運送配達',
        ]"
        :key="index"
        class="text-center"
      >
        <div class="mb-px">
          <NuxtImg src="/shipping-icon.jpg"></NuxtImg>
        </div>
        <p class="text-2xl font-bold">{{ text }}</p>
      </div>
    </div>
    <h2
      class="text-2xl font-bold flex items-center after:flex-1 after:ml-6 after:border-b after:border-main-black mb-[70px]"
    >
      山區/偏遠地區/離島 需酌收交通費用
    </h2>
    <p class="text-xl font-medium mb-[130px]">
      交通費3,000元<br />
      金門、澎湖<br /><br />
      交通費2,000元<br />
      花蓮、台東全區<br /><br />
      交通費1,000元<br />
      山區（頭城、礁溪、員山、三星、冬山）、大同鄉、南澳鄉、蘇澳鄉<br /><br />
      交通費800元<br />
      員山鄉、三星鄉、冬山鄉<br /><br />
      交通費500元<br />
      頭城鎮、礁溪鄉、壯圍鄉、宜蘭市、羅東鎮、五結鄉<br /><br />
    </p>
    <h2
      class="text-2xl font-bold flex items-center after:flex-1 after:ml-6 after:border-b after:border-main-black mb-[70px]"
    >
      台灣本島 交通費用減免
    </h2>
    <p class="text-xl font-medium mb-[130px]">
      北北基<br />
      三芝區、石門區、金山區、萬里區、貢寮區、坪林區、烏來區、石碇區、平溪區、雙溪區、陽明山區、新店山區、九份區、三峽山區、汐止山區、基隆山區、淡水山區、深坑山區、北投湖山路
      <br /><br />
      桃園<br />
      復興區、龍潭山區、大溪山區、蘆竹山區
      <br /><br />
      新竹<br />
      橫山鄉、寶山鄉、北埔鄉、峨眉鄉、尖石鄉、五峰鄉、關西、芎林山區、竹東山區<br /><br />
      苗栗<br />
      頭屋鄉、西湖鄉、造橋鄉、南庄鄉、卓蘭鎮、三灣鄉、獅潭鄉、泰安鄉、大湖鄉、通霄山區<br /><br />
      台中<br />
      和平區（谷關、福壽山農場、梨山、武陵、大雪山）、石岡山區、新社區、東勢區<br /><br />
      南投<br />
      中寮鄉、鹿谷鄉、信義鄉、仁愛鄉、竹山鎮、魚池鄉、名閒山區、水里山區<br /><br />
      雲林<br />
      古坑山區（華山、桂林（含）以上山區）<br /><br />
      嘉義<br />
      竹崎鄉、大埔鄉、阿里山鄉、番路鄉、中埔鄉、梅山鄉<br /><br />
      台南<br />
      玉井區、楠西區、左鎮區、南化區、龍崎區、七股區、北門區、將軍區、關子嶺、走馬瀨、東山區、大內區、白河山區
      <br /><br />
      高雄<br />
      桃源區、那瑪夏區、內門區、茂林區、甲仙區、六龜區、杉林區、旗山區、美濃區、林園區、旗津區、田寮區、大樹區、大社區學府路<br /><br />
      屏東<br />
      瑪家鄉、來義鄉、霧台鄉、恆春鄉、車城鄉、枋山鄉以南、獅子鄉、牡丹鄉、滿州鄉、枋寮鄉、霧台鄉、內埔鄉水門、三地門鄉、泰武鄉、春日鄉<br /><br />
    </p>
  </div>
</template>

<style></style>
