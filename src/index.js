import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);
Vue.use(ElementUI);

const i18n = new VueI18n({
  locale: 'zh',    // 语言标识
})

new Vue({
  el: "#app",
  i18n,
  render: (h) => h(App),
});
