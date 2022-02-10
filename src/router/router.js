import Vue from "vue";
import VueRouter from "vue-router";

import Main from "../components/Main.vue";

// 导入 vue-router 依赖
Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    { path: "/", component: Main, name: "main" },
    {
      path: "/register",
      component: () => import("../components/user/register.vue"),
      name: "register",
    },
  ],
});
