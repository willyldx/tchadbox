import { c as _export_sfc, d as useSeoMeta, i as useAuthStore, j as useRoute, n as navigateTo, e as __nuxt_component_0$4 } from './server.mjs';
import { defineComponent, reactive, ref, watch, mergeProps, unref, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderDynamicModel, ssrLooseContain } from 'vue/server-renderer';
import { _ as _imports_0 } from './virtual_public-IWZl7zz2.mjs';
import '../_/nitro.mjs';
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
import 'vue-router';
import 'framesync';
import 'popmotion';
import 'style-value-types';
import 'tailwind-merge';
import '@iconify/vue';
import 'lucide-vue-next';
import '@iconify/utils/lib/css/icon';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Connexion - TchadBox",
      description: "Connectez-vous \xE0 votre compte TchadBox pour suivre vos commandes et g\xE9rer vos colis."
    });
    const authStore = useAuthStore();
    const route = useRoute();
    const form = reactive({
      email: "",
      password: "",
      remember: false
    });
    const showPassword = ref(false);
    const showVerification = ref(false);
    const verificationCode = ref("");
    const currentBg = ref("/auth-bg.png");
    watch(() => authStore.isAuthenticated, (isAuth) => {
      if (isAuth) {
        const redirect = route.query.redirect || authStore.getRedirectPath();
        navigateTo(redirect);
      }
    }, { immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen relative flex items-center justify-center p-4 overflow-hidden" }, _attrs))} data-v-cb070de4>`);
      if (unref(currentBg)) {
        _push(`<div class="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-[40000ms] ease-out scale-105" style="${ssrRenderStyle({ backgroundImage: `url(${unref(currentBg)})` })}" data-v-cb070de4></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="absolute inset-0 z-0 bg-black/60 backdrop-blur-[4px]" data-v-cb070de4></div><div class="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40 mix-blend-screen" data-v-cb070de4><div class="orb orb-amber w-80 h-80 -top-40 -right-40" data-v-cb070de4></div><div class="orb orb-warm w-80 h-80 -bottom-40 -left-40" data-v-cb070de4></div></div><div class="w-full max-w-md relative z-10" data-v-cb070de4>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "flex flex-col items-center justify-center gap-4 mb-8 group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center rounded-3xl backdrop-blur-md border border-white/20 shadow-2xl transition-all duration-500 transform group-hover:-translate-y-1" data-v-cb070de4${_scopeId}><div class="absolute inset-0 bg-white/10 rounded-3xl" data-v-cb070de4${_scopeId}></div><img${ssrRenderAttr("src", _imports_0)} alt="TchadBox Logo" class="w-16 h-16 sm:w-20 sm:h-20 object-contain relative z-10" data-v-cb070de4${_scopeId}></div><div class="text-center" data-v-cb070de4${_scopeId}><span class="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-200 tracking-tight drop-shadow-sm" data-v-cb070de4${_scopeId}>TchadBox</span><div class="h-1 w-8 bg-amber-400 rounded-full mx-auto mt-1.5 opacity-40 group-hover:w-12 transition-all duration-300" data-v-cb070de4${_scopeId}></div></div>`);
          } else {
            return [
              createVNode("div", { class: "relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center rounded-3xl backdrop-blur-md border border-white/20 shadow-2xl transition-all duration-500 transform group-hover:-translate-y-1" }, [
                createVNode("div", { class: "absolute inset-0 bg-white/10 rounded-3xl" }),
                createVNode("img", {
                  src: _imports_0,
                  alt: "TchadBox Logo",
                  class: "w-16 h-16 sm:w-20 sm:h-20 object-contain relative z-10"
                })
              ]),
              createVNode("div", { class: "text-center" }, [
                createVNode("span", { class: "text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-200 tracking-tight drop-shadow-sm" }, "TchadBox"),
                createVNode("div", { class: "h-1 w-8 bg-amber-400 rounded-full mx-auto mt-1.5 opacity-40 group-hover:w-12 transition-all duration-300" })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="card-glass rounded-[2rem] shadow-2xl p-8 sm:p-10" data-v-cb070de4><div class="text-center mb-8" data-v-cb070de4><h1 class="text-2xl font-bold text-[var(--color-text)] mb-2" data-v-cb070de4>Bon retour !</h1><p class="text-[var(--color-text-muted)]" data-v-cb070de4>Connectez-vous \xE0 votre compte TchadBox</p></div>`);
      if (unref(authStore).error) {
        _push(`<div class="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3" data-v-cb070de4><svg class="w-5 h-5 text-red-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-cb070de4><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-cb070de4></path></svg><p class="text-sm text-red-600" data-v-cb070de4>${ssrInterpolate(unref(authStore).error)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(showVerification)) {
        _push(`<form class="space-y-5" data-v-cb070de4><div data-v-cb070de4><label for="email" class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2" data-v-cb070de4> Adresse email </label><div class="relative" data-v-cb070de4><div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none" data-v-cb070de4><svg class="w-5 h-5 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-cb070de4><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" data-v-cb070de4></path></svg></div><input id="email"${ssrRenderAttr("value", unref(form).email)} type="email" required autocomplete="email" placeholder="votre@email.com" class="input" style="${ssrRenderStyle({ "padding-left": "3rem" })}"${ssrIncludeBooleanAttr(unref(authStore).isLoading) ? " disabled" : ""} data-v-cb070de4></div></div><div data-v-cb070de4><div class="flex items-center justify-between mb-2" data-v-cb070de4><label for="password" class="block text-sm font-medium text-[var(--color-text-secondary)]" data-v-cb070de4> Mot de passe </label>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/auth/mot-de-passe-oublie",
          class: "text-sm text-[var(--color-accent-dark)] hover:text-[var(--color-accent)] font-medium transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Oubli\xE9 ? `);
            } else {
              return [
                createTextVNode(" Oubli\xE9 ? ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="relative" data-v-cb070de4><div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none" data-v-cb070de4><svg class="w-5 h-5 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-cb070de4><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" data-v-cb070de4></path></svg></div><input id="password"${ssrRenderDynamicModel(unref(showPassword) ? "text" : "password", unref(form).password, null)}${ssrRenderAttr("type", unref(showPassword) ? "text" : "password")} required autocomplete="current-password" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" class="input" style="${ssrRenderStyle({ "padding-left": "3rem", "padding-right": "3rem" })}"${ssrIncludeBooleanAttr(unref(authStore).isLoading) ? " disabled" : ""} data-v-cb070de4><button type="button" class="absolute inset-y-0 right-0 pr-4 flex items-center" data-v-cb070de4>`);
        if (!unref(showPassword)) {
          _push(`<svg class="w-5 h-5 text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-cb070de4><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-cb070de4></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-cb070de4></path></svg>`);
        } else {
          _push(`<svg class="w-5 h-5 text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-cb070de4><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" data-v-cb070de4></path></svg>`);
        }
        _push(`</button></div></div><div class="flex items-center" data-v-cb070de4><input id="remember"${ssrIncludeBooleanAttr(Array.isArray(unref(form).remember) ? ssrLooseContain(unref(form).remember, null) : unref(form).remember) ? " checked" : ""} type="checkbox" class="w-4 h-4 text-amber-500 border-gray-300 rounded focus:ring-amber-500/20 cursor-pointer" data-v-cb070de4><label for="remember" class="ml-2 text-sm text-[var(--color-text-secondary)] cursor-pointer" data-v-cb070de4> Se souvenir de moi </label></div><button type="submit"${ssrIncludeBooleanAttr(unref(authStore).isLoading) ? " disabled" : ""} class="w-full py-3.5 btn-gold !rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2" data-v-cb070de4>`);
        if (unref(authStore).isLoading) {
          _push(`<svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" data-v-cb070de4><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-cb070de4></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-cb070de4></path></svg>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span data-v-cb070de4>${ssrInterpolate(unref(authStore).isLoading ? "Connexion..." : "Se connecter")}</span></button></form>`);
      } else {
        _push(`<form class="space-y-5" data-v-cb070de4><div data-v-cb070de4><label for="code" class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2" data-v-cb070de4> Code de v\xE9rification (6 chiffres) </label><input id="code"${ssrRenderAttr("value", unref(verificationCode))} type="text" required placeholder="123456" maxlength="6" class="input text-center text-2xl tracking-widest font-mono"${ssrIncludeBooleanAttr(unref(authStore).isLoading) ? " disabled" : ""} data-v-cb070de4></div><button type="submit"${ssrIncludeBooleanAttr(unref(authStore).isLoading || unref(verificationCode).length < 6) ? " disabled" : ""} class="w-full py-3.5 btn-gold !rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2" data-v-cb070de4>`);
        if (unref(authStore).isLoading) {
          _push(`<svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" data-v-cb070de4><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-cb070de4></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-cb070de4></path></svg>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span data-v-cb070de4>${ssrInterpolate(unref(authStore).isLoading ? "V\xE9rification..." : "Valider la connexion")}</span></button></form>`);
      }
      if (!unref(showVerification)) {
        _push(`<div class="relative my-8" data-v-cb070de4><div class="absolute inset-0 flex items-center" data-v-cb070de4><div class="w-full border-t border-[var(--color-border)]" data-v-cb070de4></div></div><div class="relative flex justify-center text-sm" data-v-cb070de4><span class="px-4 text-[var(--color-text-muted)] bg-transparent" data-v-cb070de4>ou continuer avec</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(showVerification)) {
        _push(`<div class="grid grid-cols-2 gap-4" data-v-cb070de4><button type="button" class="flex items-center justify-center gap-2 py-3.5 px-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 group/social" data-v-cb070de4><svg class="w-5 h-5" viewBox="0 0 24 24" data-v-cb070de4><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" data-v-cb070de4></path><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" data-v-cb070de4></path><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" data-v-cb070de4></path><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" data-v-cb070de4></path></svg><span class="text-sm font-medium text-[var(--color-text-secondary)]" data-v-cb070de4>Google</span></button><button type="button" class="flex items-center justify-center gap-2 py-3 px-4 border border-[var(--color-border)] rounded-xl hover:bg-gray-50 transition-colors" data-v-cb070de4><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" data-v-cb070de4><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" data-v-cb070de4></path></svg><span class="text-sm font-medium text-[var(--color-text-secondary)]" data-v-cb070de4>Apple</span></button></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(showVerification)) {
        _push(`<p class="text-center text-[var(--color-text-secondary)] mt-8" data-v-cb070de4> Pas encore de compte ? `);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/auth/register",
          class: "text-[var(--color-accent-dark)] hover:text-[var(--color-accent)] font-semibold transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Cr\xE9er un compte `);
            } else {
              return [
                createTextVNode(" Cr\xE9er un compte ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><p class="text-center text-xs text-white/70 mt-6 font-medium tracking-wide" data-v-cb070de4><svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-cb070de4><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" data-v-cb070de4></path></svg> Connexion s\xE9curis\xE9e via SSL </p></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const login = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-cb070de4"]]);

export { login as default };
//# sourceMappingURL=login-B8YMZM2L.mjs.map
