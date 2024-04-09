<template>
  <div class="appBox">
    <header>
      <vxe-button
        v-for="(item, index) in routeList"
        :key="index"
        status="primary"
        :content="item.meta.name"
        @click="routerPush(item)"
      ></vxe-button>
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const routeList = router.options.routes;

const routerPush = (data) => {
  if (route.name !== data.name) {
    router.push({
      name: data.name,
    });
  }
};
</script>

<style scoped lang="scss">
.appBox {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  header {
    width: 100%;
    height: 50px;
    background: skyblue;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  main {
    flex: 1;
    > div {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
