import "@/assets/base.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap-icons/font/bootstrap-icons.min.css";

import { createApp } from "vue";
import router from "@/routers";
import App from "./App.vue";
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";
import store from "./stores/store";
const app = createApp(App);
app.use(router);
app.use(ToastPlugin);
app.use(store);
app.mount("#app");
