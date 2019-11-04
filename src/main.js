import Vue from "vue";
import App from "./App.vue";
import axios from './http/http';
import request from './http/request';
import common from './http/common';
import regular from './http/regular';
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$axios = axios;
Vue.prototype.$request = request
Vue.prototype.$common = common
Vue.prototype.$regular = regular



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
