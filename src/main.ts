import { createApp } from "vue";
import ArcoVue from "@arco-design/web-vue";
import App from "./App.vue";
import "@arco-design/web-vue/dist/arco.css";
import router from "./router";
import store from "./store";
import "@/plugins/axios"; // 直接定义aixos请求库的全局参数，比如全局请求响应拦截器
import "@/access/index";
import "bytemd/dist/index.css";

const app = createApp(App);

app.use(store).use(router);
app.use(ArcoVue);
app.mount("#app");
