import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        name: "首页",
      },
    },
    {
      path: "/customizeTable",
      name: "customizeTable",
      component: () => import("../views/customizeTable.vue"),
      meta: {
        name: "自定义表格",
      },
    },
    {
      path: "/editTable",
      name: "editTable",
      component: () => import("../views/editTable.vue"),
      meta: {
        name: "可编辑表格",
      },
    },
    {
      path: "/screenTable",
      name: "screenTable",
      component: () => import("../views/screenTable.vue"),
      meta: {
        name: "筛选表格",
      },
    },
    {
      path: "/screenTable2",
      name: "screenTable2",
      component: () => import("../views/screenTable2.vue"),
      meta: {
        name: "高级筛选表格",
      },
    },
    // baseTreeTable
    {
      path: "/baseTreeTable",
      name: "baseTreeTable",
      component: () => import("../views/baseTreeTable.vue"),
      meta: {
        name: "基础树表格",
      },
    },
    {
      path: "/baseTreeTable2",
      name: "baseTreeTable2",
      component: () => import("../views/baseTreeTable2.vue"),
      meta: {
        name: "单选/多选 树表格",
      },
    },
    {
      path: "/baseTreeTable3",
      name: "baseTreeTable3",
      component: () => import("../views/baseTreeTable3.vue"),
      meta: {
        name: "自定义图标/不允许展开-关闭 树表格",
      },
    },
    {
      path: "/lazyTreeTable",
      name: "lazyTreeTable",
      component: () => import("../views/lazyTreeTable.vue"),
      meta: {
        name: "懒加载展开树表格",
      },
    },
    {
      path: "/commenceTable",
      name: "commenceTable",
      component: () => import("../views/commenceTable.vue"),
      meta: {
        name: "展开行表格",
      },
    },
  ],
});

export default router;
