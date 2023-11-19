import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/images/logo.svg";
import "@/assets/styles/tailwind.css";
import "@/assets/styles/global.css";
import { registerGlbalComponent } from "./utils/import";
const app = createApp(App);

registerGlbalComponent(app);
app.use(router);
app.use(store);
app.mount("#app");
