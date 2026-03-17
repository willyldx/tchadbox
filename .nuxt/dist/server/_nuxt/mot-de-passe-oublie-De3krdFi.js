import { c as useSeoMeta, i as useAuthStore, d as __nuxt_component_0 } from "../server.mjs";
import { defineComponent, reactive, ref, mergeProps, withCtx, createVNode, openBlock, createBlock, unref, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderStyle, ssrIncludeBooleanAttr } from "vue/server-renderer";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/hookable/dist/index.mjs";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/unctx/dist/index.mjs";
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
import "lucide-vue-next";
import "@iconify/utils/lib/css/icon";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/nuxt/node_modules/perfect-debounce/dist/index.mjs";
import "ohash/utils";
import "@clerk/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "mot-de-passe-oublie",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Mot de passe oublié - TchadBox",
      description: "Réinitialisez votre mot de passe TchadBox."
    });
    useAuthStore();
    const form = reactive({
      email: ""
    });
    const isLoading = ref(false);
    const emailSent = ref(false);
    const error = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-[var(--color-bg)] flex items-center justify-center p-4" }, _attrs))}><div class="absolute inset-0 overflow-hidden pointer-events-none"><div class="orb orb-amber w-80 h-80 -top-40 -right-40"></div><div class="orb orb-warm w-80 h-80 -bottom-40 -left-40"></div></div><div class="w-full max-w-md relative">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "flex items-center justify-center gap-3 mb-8 group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/25 group-hover:shadow-amber-500/40 transition-shadow"${_scopeId}><svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"${_scopeId}></path></svg></div><span class="text-2xl font-bold text-[var(--color-text)]"${_scopeId}>TchadBox</span>`);
          } else {
            return [
              createVNode("div", { class: "w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/25 group-hover:shadow-amber-500/40 transition-shadow" }, [
                (openBlock(), createBlock("svg", {
                  class: "w-7 h-7 text-white",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  })
                ]))
              ]),
              createVNode("span", { class: "text-2xl font-bold text-[var(--color-text)]" }, "TchadBox")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="card-glass rounded-2xl shadow-xl p-8">`);
      if (unref(emailSent)) {
        _push(`<div class="text-center"><div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"><svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg></div><h1 class="text-2xl font-bold text-[var(--color-text)] mb-2">Email envoyé !</h1><p class="text-[var(--color-text-muted)] mb-6"> Si un compte existe avec l&#39;adresse <strong>${ssrInterpolate(unref(form).email)}</strong>, vous recevrez un lien de réinitialisation. </p><p class="text-sm text-[var(--color-text-muted)] mb-8"> N&#39;oubliez pas de vérifier vos spams si vous ne voyez pas l&#39;email. </p><div class="space-y-3"><button class="w-full py-3 btn-outline"> Essayer une autre adresse </button>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/auth/login",
          class: "block w-full py-3 btn-gold !rounded-xl text-center"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Retour à la connexion `);
            } else {
              return [
                createTextVNode(" Retour à la connexion ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<div><div class="text-center mb-8"><div class="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6"><svg class="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg></div><h1 class="text-2xl font-bold text-[var(--color-text)] mb-2">Mot de passe oublié ?</h1><p class="text-[var(--color-text-muted)]">Entrez votre email et nous vous enverrons un lien de réinitialisation.</p></div>`);
        if (unref(error)) {
          _push(`<div class="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3"><svg class="w-5 h-5 text-red-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><p class="text-sm text-red-600">${ssrInterpolate(unref(error))}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<form class="space-y-5"><div><label for="email" class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2"> Adresse email </label><div class="relative"><div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><svg class="w-5 h-5 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg></div><input id="email"${ssrRenderAttr("value", unref(form).email)} type="email" required autocomplete="email" placeholder="votre@email.com" class="input" style="${ssrRenderStyle({ "padding-left": "3rem" })}"${ssrIncludeBooleanAttr(unref(isLoading)) ? " disabled" : ""}></div></div><button type="submit"${ssrIncludeBooleanAttr(unref(isLoading) || !unref(form).email) ? " disabled" : ""} class="w-full py-3.5 btn-gold !rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">`);
        if (unref(isLoading)) {
          _push(`<svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span>${ssrInterpolate(unref(isLoading) ? "Envoi..." : "Envoyer le lien")}</span></button></form><div class="mt-8 text-center">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/auth/login",
          class: "inline-flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-accent-dark)] transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"${_scopeId}></path></svg> Retour à la connexion `);
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
                createTextVNode(" Retour à la connexion ")
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
export {
  _sfc_main as default
};
//# sourceMappingURL=mot-de-passe-oublie-De3krdFi.js.map
