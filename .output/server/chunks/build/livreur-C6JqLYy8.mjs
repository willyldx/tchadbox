import { Q as executeAsync } from '../_/nitro.mjs';
import { J as defineNuxtRouteMiddleware, i as useAuthStore, n as navigateTo } from './server.mjs';
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
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const livreur = defineNuxtRouteMiddleware(async (to) => {
  let __temp, __restore;
  const authStore = useAuthStore();
  if (!authStore.sessionChecked) {
    [__temp, __restore] = executeAsync(() => authStore.checkSession()), await __temp, __restore();
  }
  if (!authStore.isAuthenticated) {
    return navigateTo("/auth/login?redirect=" + encodeURIComponent(to.fullPath));
  }
  if (!authStore.canAccessLivreur) {
    return navigateTo("/403");
  }
});

export { livreur as default };
//# sourceMappingURL=livreur-C6JqLYy8.mjs.map
