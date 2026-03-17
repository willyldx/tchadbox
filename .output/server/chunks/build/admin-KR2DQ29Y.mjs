import { Q as executeAsync } from '../_/nitro.mjs';
import { H as defineNuxtRouteMiddleware, i as useAuthStore, n as navigateTo } from './server.mjs';
import 'jose';
import '@supabase/supabase-js';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:url';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'ipx';
import 'node:path';
import 'vue';
import 'vue-router';
import 'framesync';
import 'popmotion';
import 'style-value-types';
import 'tailwind-merge';
import '@iconify/vue';
import 'vue/server-renderer';
import 'lucide-vue-next';
import '@iconify/utils/lib/css/icon';
import '@clerk/vue';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const admin = defineNuxtRouteMiddleware(async (to) => {
  let __temp, __restore;
  const authStore = useAuthStore();
  if (!authStore.sessionChecked) {
    [__temp, __restore] = executeAsync(() => authStore.checkSession()), await __temp, __restore();
  }
  if (!authStore.isAuthenticated) {
    return navigateTo("/auth/login?redirect=" + encodeURIComponent(to.fullPath));
  }
  if (!authStore.canAccessAdmin) {
    return navigateTo("/403");
  }
  const superAdminRoutes = ["/admin/equipe", "/admin/finances"];
  if (superAdminRoutes.some((route) => to.path.startsWith(route))) {
    if (!authStore.isSuperAdmin) {
      return navigateTo("/403");
    }
  }
});

export { admin as default };
//# sourceMappingURL=admin-KR2DQ29Y.mjs.map
