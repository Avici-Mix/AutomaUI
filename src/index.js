import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import VueI18n from "vue-i18n";
import router from "./router/router.js";
import store from "./store/index";

import { Message } from "element-ui";
import axios from "axios";
import VueAxios from "vue-axios";
import Vuex from "vuex";

import "./assets/icon/iconfont.css";

Vue.use(Vuex);
Vue.use(VueAxios, axios);

Vue.prototype.$message = Message;
Vue.use(VueI18n);
Vue.use(ElementUI);

const i18n = new VueI18n({
  locale: "zh", // 语言标识
});

new Vue({
  el: "#app",
  i18n,
  router,
  store,
  render: (h) => h(App),
});
