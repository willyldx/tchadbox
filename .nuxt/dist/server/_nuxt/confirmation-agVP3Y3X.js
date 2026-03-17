import { k as useRoute, i as useAuthStore, c as useSeoMeta, d as __nuxt_component_0, e as _export_sfc } from "../server.mjs";
import { defineComponent, computed, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { Check, Package } from "lucide-vue-next";
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
import "@iconify/utils/lib/css/icon";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/nuxt/node_modules/perfect-debounce/dist/index.mjs";
import "ohash/utils";
import "@clerk/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "confirmation",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const authStore = useAuthStore();
    const orderId = computed(() => {
      return route.query.order || "TCB-XXXXXXX";
    });
    useSeoMeta({
      title: `Commande ${orderId.value} confirmée - TchadBox`,
      description: "Votre commande TchadBox a été confirmée avec succès."
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-[var(--color-bg)] flex items-center justify-center p-4" }, _attrs))} data-v-022bf50a><div class="max-w-lg w-full" data-v-022bf50a><div class="text-center mb-8" data-v-022bf50a><div class="relative inline-block" data-v-022bf50a><div class="w-24 h-24 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-green-500/30 animate-bounce-once" data-v-022bf50a>`);
      _push(ssrRenderComponent(unref(Check), { class: "w-12 h-12 text-white" }, null, _parent));
      _push(`</div><div class="absolute inset-0 pointer-events-none" data-v-022bf50a><div class="absolute top-0 left-1/4 w-2 h-2 bg-amber-400 rounded-full animate-confetti-1" data-v-022bf50a></div><div class="absolute top-0 right-1/4 w-2 h-2 bg-green-400 rounded-full animate-confetti-2" data-v-022bf50a></div><div class="absolute top-1/4 left-0 w-2 h-2 bg-blue-400 rounded-full animate-confetti-3" data-v-022bf50a></div><div class="absolute top-1/4 right-0 w-2 h-2 bg-pink-400 rounded-full animate-confetti-4" data-v-022bf50a></div></div></div></div><div class="card-glass rounded-2xl shadow-xl overflow-hidden" data-v-022bf50a><div class="p-8 text-center" data-v-022bf50a><h1 class="text-2xl font-bold text-[var(--color-text)] mb-2" data-v-022bf50a>Commande confirmée !</h1><p class="text-[var(--color-text-muted)]" data-v-022bf50a>Merci pour votre confiance</p></div><div class="px-8 pb-8 space-y-6" data-v-022bf50a><div class="bg-amber-50 rounded-xl p-4 text-center" data-v-022bf50a><p class="text-sm text-amber-600 mb-1" data-v-022bf50a>Numéro de commande</p><p class="text-2xl font-bold text-amber-700 font-mono" data-v-022bf50a>${ssrInterpolate(unref(orderId))}</p></div><div class="space-y-4" data-v-022bf50a><h3 class="font-semibold text-[var(--color-text)]" data-v-022bf50a>Prochaines étapes</h3><div class="flex items-start gap-4" data-v-022bf50a><div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0" data-v-022bf50a><span class="text-green-600 font-bold text-sm" data-v-022bf50a>1</span></div><div data-v-022bf50a><p class="font-medium text-[var(--color-text)]" data-v-022bf50a>Email de confirmation</p><p class="text-sm text-[var(--color-text-muted)]" data-v-022bf50a>Vous allez recevoir un email avec les détails de votre commande</p></div></div><div class="flex items-start gap-4" data-v-022bf50a><div class="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center shrink-0" data-v-022bf50a><span class="text-amber-600 font-bold text-sm" data-v-022bf50a>2</span></div><div data-v-022bf50a><p class="font-medium text-[var(--color-text)]" data-v-022bf50a>Préparation du colis</p><p class="text-sm text-[var(--color-text-muted)]" data-v-022bf50a>Nous préparons votre colis avec soin sous 24-48h</p></div></div><div class="flex items-start gap-4" data-v-022bf50a><div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0" data-v-022bf50a><span class="text-blue-600 font-bold text-sm" data-v-022bf50a>3</span></div><div data-v-022bf50a><p class="font-medium text-[var(--color-text)]" data-v-022bf50a>Expédition</p><p class="text-sm text-[var(--color-text-muted)]" data-v-022bf50a>Livraison à N&#39;Djamena sous 3-5 jours</p></div></div><div class="flex items-start gap-4" data-v-022bf50a><div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0" data-v-022bf50a><span class="text-green-600 font-bold text-sm" data-v-022bf50a>4</span></div><div data-v-022bf50a><p class="font-medium text-[var(--color-text)]" data-v-022bf50a>Livraison avec photo</p><p class="text-sm text-[var(--color-text-muted)]" data-v-022bf50a>Photo de confirmation lors de la remise au destinataire</p></div></div></div><div class="bg-gray-50 rounded-xl p-4 flex items-start gap-3" data-v-022bf50a>`);
      _push(ssrRenderComponent(unref(Package), { class: "w-5 h-5 text-[var(--color-text-muted)] mt-0.5 shrink-0" }, null, _parent));
      _push(`<div data-v-022bf50a><p class="text-sm font-medium text-[var(--color-text)]" data-v-022bf50a>Suivez votre colis</p><p class="text-sm text-[var(--color-text-muted)]" data-v-022bf50a> Utilisez votre numéro de commande <strong data-v-022bf50a>${ssrInterpolate(unref(orderId))}</strong> pour suivre votre colis en temps réel. </p></div></div><div class="space-y-3 pt-4" data-v-022bf50a>`);
      if (unref(authStore).isAuthenticated) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/compte/commandes`,
          class: "block w-full py-3 btn-gold text-center"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Voir ma commande `);
            } else {
              return [
                createTextVNode(" Voir ma commande ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/suivi",
        class: "block w-full py-3 border border-[var(--color-border)] text-[var(--color-text-secondary)] font-semibold rounded-xl hover:bg-gray-50 transition-colors text-center"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Suivre mon colis `);
          } else {
            return [
              createTextVNode(" Suivre mon colis ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "block w-full py-3 text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] font-medium text-center transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Retour à l&#39;accueil `);
          } else {
            return [
              createTextVNode(" Retour à l'accueil ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><div class="text-center mt-8" data-v-022bf50a><p class="text-sm text-[var(--color-text-muted)]" data-v-022bf50a> Une question ? `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/contact",
        class: "text-amber-600 hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Contactez-nous`);
          } else {
            return [
              createTextVNode("Contactez-nous")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/checkout/confirmation.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const confirmation = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-022bf50a"]]);
export {
  confirmation as default
};
//# sourceMappingURL=confirmation-agVP3Y3X.js.map
