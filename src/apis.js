import axios from "axios";
import Vue from "vue";
const apis = axios.create({
  baseURL: "",
});
apis.interceptors.request.use(
  function (config) {
    Vue.prototype.$bus.$emit("loading", true);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

apis.interceptors.response.use(
  function (response) {
    Vue.prototype.$bus.$emit("loading", false);
    return response;
  },
  function (error) {
    Vue.prototype.$bus.$emit("loading", false);
    return Promise.reject(error);
  }
);

export default {
  apis,
  AuthPath: "/Auth",
  ContentPath: "/Privates",
  PublicPath: "/Publics",
};
