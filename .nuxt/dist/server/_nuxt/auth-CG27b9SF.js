import { executeAsync } from "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/unctx/dist/index.mjs";
import { G as defineNuxtRouteMiddleware, i as useAuthStore, n as navigateTo } from "../server.mjs";
import "vue";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/hookable/dist/index.mjs";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/h3/dist/index.mjs";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/ufo/dist/index.mjs";
import "vue-router";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/defu/dist/defu.mjs";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/klona/dist/index.mjs";
import "framesync";
import "popmotion";
import "style-value-types";
import "tailwind-merge";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/@unhead/vue/dist/index.mjs";
import "@iconify/vue";
import "vue/server-renderer";
import "lucide-vue-next";
import "@iconify/utils/lib/css/icon";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/nuxt/node_modules/perfect-debounce/dist/index.mjs";
import "ohash/utils";
import "@clerk/vue";
const auth = defineNuxtRouteMiddleware(async (to) => {
  let __temp, __restore;
  const authStore = useAuthStore();
  if (!authStore.sessionChecked) {
    [__temp, __restore] = executeAsync(() => authStore.checkSession()), await __temp, __restore();
  }
  const protectedRoutes = ["/compte", "/checkout"];
  const guestOnlyRoutes = ["/auth/login", "/auth/register"];
  const isProtectedRoute = protectedRoutes.some((route) => to.path.startsWith(route));
  const isGuestOnlyRoute = guestOnlyRoutes.some((route) => to.path.startsWith(route));
  if (isProtectedRoute && !authStore.isAuthenticated) {
    return navigateTo(`/auth/login?redirect=${encodeURIComponent(to.fullPath)}`);
  }
  if (isGuestOnlyRoute && authStore.isAuthenticated) {
    return navigateTo(authStore.getRedirectPath());
  }
});
export {
  auth as default
};
//# sourceMappingURL=auth-CG27b9SF.js.map
