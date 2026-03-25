import { c as _export_sfc, d as useSeoMeta, i as useAuthStore, n as navigateTo, e as __nuxt_component_0$4 } from './server.mjs';
import { defineComponent, reactive, ref, computed, watch, mergeProps, unref, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderDynamicModel, ssrRenderList, ssrRenderClass, ssrLooseContain } from 'vue/server-renderer';
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
  __name: "register",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Cr\xE9er un compte - TchadBox",
      description: "Cr\xE9ez votre compte TchadBox et commencez \xE0 envoyer des colis de la France vers le Tchad."
    });
    const authStore = useAuthStore();
    const form = reactive({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false
    });
    const showPassword = ref(false);
    const showSuccess = ref(false);
    const passwordStrength = computed(() => {
      const password = form.password;
      if (!password) return 0;
      let strength = 0;
      if (password.length >= 6) strength++;
      if (password.length >= 8) strength++;
      if (/[A-Z]/.test(password) && /[a-z]/.test(password)) strength++;
      if (/[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password)) strength++;
      return strength;
    });
    const strengthLabels = ["", "Faible", "Moyen", "Bon", "Excellent"];
    const strengthColors = ["bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-green-400"];
    const strengthTextColors = ["text-red-500", "text-orange-500", "text-yellow-600", "text-green-500"];
    const passwordsMatch = computed(() => {
      return form.password === form.confirmPassword;
    });
    const isFormValid = computed(() => {
      return form.firstName && form.lastName && form.email && form.password.length >= 6 && passwordsMatch.value && form.acceptTerms;
    });
    const currentBg = ref("/auth-bg.png");
    watch(() => authStore.isAuthenticated, (isAuth) => {
      if (isAuth) {
        navigateTo(authStore.getRedirectPath());
      }
    }, { immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen relative flex items-center justify-center p-4 py-12 overflow-hidden" }, _attrs))} data-v-6772ab67>`);
      if (unref(currentBg)) {
        _push(`<div class="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-[40000ms] ease-out scale-105" style="${ssrRenderStyle({ backgroundImage: `url(${unref(currentBg)})` })}" data-v-6772ab67></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="absolute inset-0 z-0 bg-black/60 backdrop-blur-[4px]" data-v-6772ab67></div><div class="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40 mix-blend-screen" data-v-6772ab67><div class="orb orb-amber w-80 h-80 -top-40 -right-40" data-v-6772ab67></div><div class="orb orb-warm w-80 h-80 -bottom-40 -left-40" data-v-6772ab67></div></div><div class="w-full max-w-md relative z-10" data-v-6772ab67>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "flex flex-col items-center justify-center gap-4 mb-10 group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center bg-white rounded-2xl shadow-xl shadow-amber-500/10 group-hover:shadow-amber-500/20 transition-all duration-300 transform group-hover:-translate-y-1" data-v-6772ab67${_scopeId}><div class="absolute inset-0 bg-gradient-to-br from-amber-50 to-white rounded-2xl border border-amber-100/50" data-v-6772ab67${_scopeId}></div><img${ssrRenderAttr("src", _imports_0)} alt="TchadBox Logo" class="w-20 h-20 sm:w-24 sm:h-24 object-contain relative z-10 p-2" data-v-6772ab67${_scopeId}></div><div class="text-center" data-v-6772ab67${_scopeId}><span class="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-400 tracking-tight" data-v-6772ab67${_scopeId}>TchadBox</span><div class="h-1 w-12 bg-amber-400 rounded-full mx-auto mt-2 opacity-50 group-hover:w-16 transition-all duration-300" data-v-6772ab67${_scopeId}></div></div>`);
          } else {
            return [
              createVNode("div", { class: "relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center bg-white rounded-2xl shadow-xl shadow-amber-500/10 group-hover:shadow-amber-500/20 transition-all duration-300 transform group-hover:-translate-y-1" }, [
                createVNode("div", { class: "absolute inset-0 bg-gradient-to-br from-amber-50 to-white rounded-2xl border border-amber-100/50" }),
                createVNode("img", {
                  src: _imports_0,
                  alt: "TchadBox Logo",
                  class: "w-20 h-20 sm:w-24 sm:h-24 object-contain relative z-10 p-2"
                })
              ]),
              createVNode("div", { class: "text-center" }, [
                createVNode("span", { class: "text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-400 tracking-tight" }, "TchadBox"),
                createVNode("div", { class: "h-1 w-12 bg-amber-400 rounded-full mx-auto mt-2 opacity-50 group-hover:w-16 transition-all duration-300" })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="card-glass rounded-2xl shadow-xl p-8" data-v-6772ab67><div class="text-center mb-8" data-v-6772ab67><h1 class="text-2xl font-bold text-[var(--color-text)] mb-2" data-v-6772ab67>Cr\xE9er un compte</h1><p class="text-[var(--color-text-muted)]" data-v-6772ab67>Rejoignez TchadBox et envoyez vos colis</p></div>`);
      if (unref(showSuccess)) {
        _push(`<div class="mb-6 p-4 bg-green-50 border border-green-100 rounded-xl" data-v-6772ab67><div class="flex items-start gap-3" data-v-6772ab67><svg class="w-5 h-5 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-6772ab67><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-v-6772ab67></path></svg><div data-v-6772ab67><p class="text-sm font-medium text-green-800" data-v-6772ab67>Compte cr\xE9\xE9 avec succ\xE8s !</p><p class="text-sm text-green-600 mt-1" data-v-6772ab67>V\xE9rifiez votre email pour confirmer votre compte.</p></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(authStore).error) {
        _push(`<div class="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3" data-v-6772ab67><svg class="w-5 h-5 text-red-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-6772ab67><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-6772ab67></path></svg><p class="text-sm text-red-600" data-v-6772ab67>${ssrInterpolate(unref(authStore).error)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<form class="space-y-5" data-v-6772ab67><div class="grid grid-cols-2 gap-4" data-v-6772ab67><div data-v-6772ab67><label for="firstName" class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2" data-v-6772ab67> Pr\xE9nom </label><input id="firstName"${ssrRenderAttr("value", unref(form).firstName)} type="text" required autocomplete="given-name" placeholder="Jean" class="input"${ssrIncludeBooleanAttr(unref(authStore).isLoading) ? " disabled" : ""} data-v-6772ab67></div><div data-v-6772ab67><label for="lastName" class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2" data-v-6772ab67> Nom </label><input id="lastName"${ssrRenderAttr("value", unref(form).lastName)} type="text" required autocomplete="family-name" placeholder="Dupont" class="input"${ssrIncludeBooleanAttr(unref(authStore).isLoading) ? " disabled" : ""} data-v-6772ab67></div></div><div data-v-6772ab67><label for="email" class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2" data-v-6772ab67> Adresse email </label><div class="relative" data-v-6772ab67><div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none" data-v-6772ab67><svg class="w-5 h-5 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-6772ab67><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" data-v-6772ab67></path></svg></div><input id="email"${ssrRenderAttr("value", unref(form).email)} type="email" required autocomplete="email" placeholder="votre@email.com" class="input" style="${ssrRenderStyle({ "padding-left": "3rem" })}"${ssrIncludeBooleanAttr(unref(authStore).isLoading) ? " disabled" : ""} data-v-6772ab67></div></div><div data-v-6772ab67><label for="phone" class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2" data-v-6772ab67> T\xE9l\xE9phone <span class="text-[var(--color-text-muted)] font-normal" data-v-6772ab67>(optionnel)</span></label><div class="relative" data-v-6772ab67><div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none" data-v-6772ab67><svg class="w-5 h-5 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-6772ab67><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" data-v-6772ab67></path></svg></div><input id="phone"${ssrRenderAttr("value", unref(form).phone)} type="tel" autocomplete="tel" placeholder="+235 XX XX XX XX" class="input" style="${ssrRenderStyle({ "padding-left": "3rem" })}"${ssrIncludeBooleanAttr(unref(authStore).isLoading) ? " disabled" : ""} data-v-6772ab67></div></div><div data-v-6772ab67><label for="password" class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2" data-v-6772ab67> Mot de passe </label><div class="relative" data-v-6772ab67><div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none" data-v-6772ab67><svg class="w-5 h-5 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-6772ab67><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" data-v-6772ab67></path></svg></div><input id="password"${ssrRenderDynamicModel(unref(showPassword) ? "text" : "password", unref(form).password, null)}${ssrRenderAttr("type", unref(showPassword) ? "text" : "password")} required autocomplete="new-password" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" minlength="6" class="input" style="${ssrRenderStyle({ "padding-left": "3rem", "padding-right": "3rem" })}"${ssrIncludeBooleanAttr(unref(authStore).isLoading) ? " disabled" : ""} data-v-6772ab67><button type="button" class="absolute inset-y-0 right-0 pr-4 flex items-center" data-v-6772ab67>`);
      if (!unref(showPassword)) {
        _push(`<svg class="w-5 h-5 text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-6772ab67><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-6772ab67></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-6772ab67></path></svg>`);
      } else {
        _push(`<svg class="w-5 h-5 text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-6772ab67><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" data-v-6772ab67></path></svg>`);
      }
      _push(`</button></div><div class="mt-2" data-v-6772ab67><div class="flex gap-1" data-v-6772ab67><!--[-->`);
      ssrRenderList(4, (i) => {
        _push(`<div class="${ssrRenderClass([i <= unref(passwordStrength) ? strengthColors[unref(passwordStrength) - 1] : "bg-gray-200", "h-1 flex-1 rounded-full transition-colors"])}" data-v-6772ab67></div>`);
      });
      _push(`<!--]--></div>`);
      if (unref(form).password) {
        _push(`<p class="${ssrRenderClass([strengthTextColors[unref(passwordStrength) - 1] || "text-[var(--color-text-muted)]", "text-xs mt-1"])}" data-v-6772ab67>${ssrInterpolate(strengthLabels[unref(passwordStrength)] || "Entrez un mot de passe")}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div data-v-6772ab67><label for="confirmPassword" class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2" data-v-6772ab67> Confirmer le mot de passe </label><div class="relative" data-v-6772ab67><div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none" data-v-6772ab67><svg class="w-5 h-5 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-6772ab67><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" data-v-6772ab67></path></svg></div><input id="confirmPassword"${ssrRenderDynamicModel(unref(showPassword) ? "text" : "password", unref(form).confirmPassword, null)}${ssrRenderAttr("type", unref(showPassword) ? "text" : "password")} required autocomplete="new-password" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" style="${ssrRenderStyle({ "padding-left": "3rem" })}" class="${ssrRenderClass([{ "border-red-300 focus:border-red-500": unref(form).confirmPassword && !unref(passwordsMatch) }, "input"])}"${ssrIncludeBooleanAttr(unref(authStore).isLoading) ? " disabled" : ""} data-v-6772ab67></div>`);
      if (unref(form).confirmPassword && !unref(passwordsMatch)) {
        _push(`<p class="text-xs text-red-500 mt-1" data-v-6772ab67> Les mots de passe ne correspondent pas </p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex items-start" data-v-6772ab67><input id="terms"${ssrIncludeBooleanAttr(Array.isArray(unref(form).acceptTerms) ? ssrLooseContain(unref(form).acceptTerms, null) : unref(form).acceptTerms) ? " checked" : ""} type="checkbox" required class="w-4 h-4 mt-0.5 text-amber-500 border-gray-300 rounded focus:ring-amber-500/20 cursor-pointer" data-v-6772ab67><label for="terms" class="ml-2 text-sm text-[var(--color-text-secondary)] cursor-pointer" data-v-6772ab67> J&#39;accepte les `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/conditions",
        class: "text-amber-600 hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`conditions d&#39;utilisation`);
          } else {
            return [
              createTextVNode("conditions d'utilisation")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(` et la `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/confidentialite",
        class: "text-amber-600 hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`politique de confidentialit\xE9`);
          } else {
            return [
              createTextVNode("politique de confidentialit\xE9")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</label></div><button type="submit"${ssrIncludeBooleanAttr(unref(authStore).isLoading || !unref(isFormValid)) ? " disabled" : ""} class="w-full py-3.5 btn-gold !rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2" data-v-6772ab67>`);
      if (unref(authStore).isLoading) {
        _push(`<svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" data-v-6772ab67><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-6772ab67></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-6772ab67></path></svg>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span data-v-6772ab67>${ssrInterpolate(unref(authStore).isLoading ? "Cr\xE9ation..." : "Cr\xE9er mon compte")}</span></button></form><p class="text-center text-[var(--color-text-secondary)] mt-8" data-v-6772ab67> D\xE9j\xE0 un compte ? `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/auth/login",
        class: "text-[var(--color-accent-dark)] hover:text-[var(--color-accent)] font-semibold transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Se connecter `);
          } else {
            return [
              createTextVNode(" Se connecter ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div><div class="flex items-center justify-center gap-6 mt-8" data-v-6772ab67><div class="flex items-center gap-2 text-xs text-white/80 font-medium" data-v-6772ab67><svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-6772ab67><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" data-v-6772ab67></path></svg><span data-v-6772ab67>SSL s\xE9curis\xE9</span></div><div class="flex items-center gap-2 text-xs text-white/80 font-medium" data-v-6772ab67><svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-6772ab67><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" data-v-6772ab67></path></svg><span data-v-6772ab67>Donn\xE9es prot\xE9g\xE9es</span></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const register = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6772ab67"]]);

export { register as default };
//# sourceMappingURL=register-DNUBcCJD.mjs.map
