import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

// 组件
import VXETable from "vxe-table";
import "vxe-table/lib/style.min.css";
function useTable(app: any) {
  app.use(VXETable);
}

const app = createApp(App);
app.use(createPinia()).use(router).use(useTable).mount("#app");
