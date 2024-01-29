import "@/assets/base.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";

import { createApp } from "vue";
import router from "@/routes";
import App from "./App.vue";

const app = createApp(App);
app.use(router);

app.mount("#app");
