import { c as _export_sfc, d as useSeoMeta, i as useAuthStore, e as __nuxt_component_0$4 } from './server.mjs';
import { defineComponent, reactive, ref, mergeProps, unref, withCtx, createVNode, createTextVNode, openBlock, createBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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
  __name: "mot-de-passe-oublie",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Mot de passe oubli\xE9 - TchadBox",
      description: "R\xE9initialisez votre mot de passe TchadBox."
    });
    useAuthStore();
    const form = reactive({
      email: ""
    });
    const isLoading = ref(false);
    const emailSent = ref(false);
    const error = ref("");
    const currentBg = ref("/auth-bg.png");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen relative flex items-center justify-center p-4 overflow-hidden" }, _attrs))} data-v-d0b3b350>`);
      if (unref(currentBg)) {
        _push(`<div class="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-[40000ms] ease-out scale-105" style="${ssrRenderStyle({ backgroundImage: `url(${unref(currentBg)})` })}" data-v-d0b3b350></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="absolute inset-0 z-0 bg-black/60 backdrop-blur-[4px]" data-v-d0b3b350></div><div class="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40 mix-blend-screen" data-v-d0b3b350><div class="orb orb-amber w-80 h-80 -top-40 -right-40" data-v-d0b3b350></div><div class="orb orb-warm w-80 h-80 -bottom-40 -left-40" data-v-d0b3b350></div></div><div class="w-full max-w-md relative z-10" data-v-d0b3b350>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "flex flex-col items-center justify-center gap-4 mb-10 group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center bg-white rounded-2xl shadow-xl shadow-amber-500/10 group-hover:shadow-amber-500/20 transition-all duration-300 transform group-hover:-translate-y-1" data-v-d0b3b350${_scopeId}><div class="absolute inset-0 bg-gradient-to-br from-amber-50 to-white rounded-2xl border border-amber-100/50" data-v-d0b3b350${_scopeId}></div><img${ssrRenderAttr("src", _imports_0)} alt="TchadBox Logo" class="w-20 h-20 sm:w-24 sm:h-24 object-contain relative z-10 p-2" data-v-d0b3b350${_scopeId}></div><div class="text-center" data-v-d0b3b350${_scopeId}><span class="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-400 tracking-tight" data-v-d0b3b350${_scopeId}>TchadBox</span><div class="h-1 w-12 bg-amber-400 rounded-full mx-auto mt-2 opacity-50 group-hover:w-16 transition-all duration-300" data-v-d0b3b350${_scopeId}></div></div>`);
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
      _push(`<div class="card-glass rounded-2xl shadow-xl p-8" data-v-d0b3b350>`);
      if (unref(emailSent)) {
        _push(`<div class="text-center" data-v-d0b3b350><div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6" data-v-d0b3b350><svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d0b3b350><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" data-v-d0b3b350></path></svg></div><h1 class="text-2xl font-bold text-[var(--color-text)] mb-2" data-v-d0b3b350>Email envoy\xE9 !</h1><p class="text-[var(--color-text-muted)] mb-6" data-v-d0b3b350> Si un compte existe avec l&#39;adresse <strong data-v-d0b3b350>${ssrInterpolate(unref(form).email)}</strong>, vous recevrez un lien de r\xE9initialisation. </p><p class="text-sm text-[var(--color-text-muted)] mb-8" data-v-d0b3b350> N&#39;oubliez pas de v\xE9rifier vos spams si vous ne voyez pas l&#39;email. </p><div class="space-y-3" data-v-d0b3b350><button class="w-full py-3 btn-outline" data-v-d0b3b350> Essayer une autre adresse </button>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/auth/login",
          class: "block w-full py-3 btn-gold !rounded-xl text-center"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Retour \xE0 la connexion `);
            } else {
              return [
                createTextVNode(" Retour \xE0 la connexion ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<div data-v-d0b3b350><div class="text-center mb-8" data-v-d0b3b350><div class="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6" data-v-d0b3b350><svg class="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d0b3b350><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" data-v-d0b3b350></path></svg></div><h1 class="text-2xl font-bold text-[var(--color-text)] mb-2" data-v-d0b3b350>Mot de passe oubli\xE9 ?</h1><p class="text-[var(--color-text-muted)]" data-v-d0b3b350>Entrez votre email et nous vous enverrons un lien de r\xE9initialisation.</p></div>`);
        if (unref(error)) {
          _push(`<div class="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3" data-v-d0b3b350><svg class="w-5 h-5 text-red-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d0b3b350><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-d0b3b350></path></svg><p class="text-sm text-red-600" data-v-d0b3b350>${ssrInterpolate(unref(error))}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<form class="space-y-5" data-v-d0b3b350><div data-v-d0b3b350><label for="email" class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2" data-v-d0b3b350> Adresse email </label><div class="relative" data-v-d0b3b350><div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none" data-v-d0b3b350><svg class="w-5 h-5 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d0b3b350><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" data-v-d0b3b350></path></svg></div><input id="email"${ssrRenderAttr("value", unref(form).email)} type="email" required autocomplete="email" placeholder="votre@email.com" class="input" style="${ssrRenderStyle({ "padding-left": "3rem" })}"${ssrIncludeBooleanAttr(unref(isLoading)) ? " disabled" : ""} data-v-d0b3b350></div></div><button type="submit"${ssrIncludeBooleanAttr(unref(isLoading) || !unref(form).email) ? " disabled" : ""} class="w-full py-3.5 btn-gold !rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2" data-v-d0b3b350>`);
        if (unref(isLoading)) {
          _push(`<svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" data-v-d0b3b350><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-d0b3b350></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-d0b3b350></path></svg>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span data-v-d0b3b350>${ssrInterpolate(unref(isLoading) ? "Envoi..." : "Envoyer le lien")}</span></button></form><div class="mt-8 text-center" data-v-d0b3b350>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/auth/login",
          class: "inline-flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-accent-dark)] transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d0b3b350${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-v-d0b3b350${_scopeId}></path></svg> Retour \xE0 la connexion `);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  class: "w-4 h-4",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M10 19l-7-7m0 0l7-7m-7 7h18"
                  })
                ])),
                createTextVNode(" Retour \xE0 la connexion ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      }
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/mot-de-passe-oublie.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const motDePasseOublie = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d0b3b350"]]);

export { motDePasseOublie as default };
//# sourceMappingURL=mot-de-passe-oublie-XeoXJ6os.mjs.map
