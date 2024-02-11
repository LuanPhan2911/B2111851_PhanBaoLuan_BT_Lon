import "@/assets/base.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "vue-toast-notification/dist/theme-bootstrap.css";
import "vue-select/dist/vue-select.css";
import vSelect from "vue-select";
import { createApp } from "vue";
import router from "@/routers";
import App from "./App.vue";
import ToastPlugin from "vue-toast-notification";
import store from "./stores/store";

const app = createApp(App);
app.component("v-select", vSelect);
app.use(router);
app.use(ToastPlugin);
app.use(store);
app.mount("#app");
