import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import VueI18n from "vue-i18n";
import router  from './router/router.js'

import { Message } from 'element-ui'


Vue.prototype.$message = Message
Vue.use(VueI18n);
Vue.use(ElementUI);

const i18n = new VueI18n({
  locale: 'zh',    // 语言标识
})

new Vue({
  el: "#app",
  i18n,
  router ,
  render: (h) => h(App),
});
