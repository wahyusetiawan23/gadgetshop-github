import Vue from "vue";
import store from "./store";
import App from "./App.vue";
import router from "./router";
import VueMeta from "vue-meta";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "./assets/css/main.css";
import VueImg from "v-img";
import VueSweetalert2 from "vue-sweetalert2";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap";
Vue.prototype.$bus = new Vue();
Vue.use(VueSweetalert2);
Vue.use(VueImg);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueMeta);
Vue.use(Toast, {
  transition: "Vue-Toastification__fade",
  maxToasts: 20,
  newestOnTop: true,
  filterBeforeCreate: (toast, toasts) => {
    if (toasts.filter((t) => t.type === toast.type).length !== 0) {
      return false;
    }
    return toast;
  },
});
library.add(fas, far, fab);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
