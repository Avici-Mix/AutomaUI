import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

import { getToken } from "@/request/token";
import { Message } from "element-ui";

import Main from "../components/Main.vue";

// 导入 vue-router 依赖
Vue.use(VueRouter);

const router = new VueRouter({

  routes: [
    { path: "/", component: Main, name: "main" },
    {
      path: "/register",
      component: () => import("../components/user/register.vue"),
      name: "register"
    },
    {
      path: "/view/:id",
      component: () => import("../components/articleDetail/articleDetail.vue"),
      name: "view"
    },
    {
      path: "/publish",
      component: () =>
        import("../components/articlePublish/articlePublish.vue"),
      name: "publish"
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (getToken) {
    if (store.state.account.length === 0) {
      store
        .dispatch("getUserInfo")
        .then(data => {
          //获取用户信息
          next();
        })
        .catch(() => {
          // next({ path: "/" });
        });
    } else {
    }
    next();
  }
});

export default router;
