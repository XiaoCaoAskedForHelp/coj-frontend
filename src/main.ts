import { createApp } from "vue";
import ArcoVue from "@arco-design/web-vue";
import App from "./App.vue";
import "@arco-design/web-vue/dist/arco.css";
import router from "./router";
import store from "./store";

const app = createApp(App);

app.use(store).use(router);
app.use(ArcoVue);
app.mount("#app");
