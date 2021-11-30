import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
// import Vue from 'vue'
// import axios from 'axios'
// import qs from 'qs'
// Vue.prototype.$axios = axios    //全局注册，使用方法为:this.$axios
// Vue.prototype.qs = qs           //全局注册，使用方法为:this.qs
const app=createApp(App);
app.use(store).use(router).use(Antd).mount("#app");
