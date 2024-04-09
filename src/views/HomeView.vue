<template>
  <div class="homeBox">
    <h2>首页</h2>
  </div>
</template>

<script setup>
import videoData from "@/datas/ss";
const aa = ref(videoData);
console.log("aa", aa.value);
</script>

<style lang="scss" scoped>
img {
  width: 100px;
  height: 100px;
}
</style>
