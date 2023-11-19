import { defineAsyncComponent } from "vue";
export const registerGlbalComponent = (app) => {
  app.component(
    "auth-layout",
    defineAsyncComponent(() => import("@/layouts/AuthLayout.vue"))
  );
  app.component(
    "default-layout",
    defineAsyncComponent(() => import("@/layouts/DefalutLayout.vue"))
  );
};
