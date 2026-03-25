import { f as useCartStore, g as useToast, a as useHead, e as __nuxt_component_0$4 } from './server.mjs';
import { defineComponent, resolveDirective, withCtx, createTextVNode, unref, mergeProps, createVNode, resolveDynamicComponent, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrGetDirectiveProps, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrRenderVNode } from 'vue/server-renderer';
import { ChevronRight, ShoppingBag, ArrowRight, Package, Trash2, Minus, Plus, ArrowLeft, Truck, CreditCard, Shield, Camera } from 'lucide-vue-next';
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
import '@iconify/utils/lib/css/icon';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "panier",
  __ssrInlineRender: true,
  setup(__props) {
    const cartStore = useCartStore();
    useToast();
    const formatPrice = (price) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(price);
    const trustBadges = [
      { icon: Shield, label: "Paiement s\xE9curis\xE9 Paystack" },
      { icon: Truck, label: "Livraison en 3-5 jours" },
      { icon: Camera, label: "Photo de preuve garantie" }
    ];
    useHead({ title: "Mon Panier" });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$4;
      const _directive_motion = resolveDirective("motion");
      _push(`<div${ssrRenderAttrs(_attrs)}><section class="relative py-14 bg-[var(--color-bg-warm)] overflow-hidden"><div class="container-main relative"><div class="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "hover:text-[var(--color-accent-dark)] transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Accueil`);
          } else {
            return [
              createTextVNode("Accueil")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(ChevronRight), { class: "w-4 h-4" }, null, _parent));
      _push(`<span class="text-[var(--color-text)]">Mon panier</span></div><h1 class="heading-section flex items-center gap-4"><div class="w-12 h-12 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center">`);
      _push(ssrRenderComponent(unref(ShoppingBag), { class: "w-6 h-6 text-[var(--color-accent-dark)]" }, null, _parent));
      _push(`</div> Mon Panier `);
      if (!unref(cartStore).isEmpty) {
        _push(`<span class="text-lg font-normal text-[var(--color-text-muted)]"> (${ssrInterpolate(unref(cartStore).itemCount)} article${ssrInterpolate(unref(cartStore).itemCount > 1 ? "s" : "")}) </span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</h1></div></section><div class="container-main py-10">`);
      if (unref(cartStore).isEmpty) {
        _push(`<div class="max-w-xl mx-auto py-12"><div${ssrRenderAttrs(mergeProps({
          initial: { opacity: 0, scale: 0.95 },
          enter: { opacity: 1, scale: 1 },
          class: "card p-16 text-center"
        }, ssrGetDirectiveProps(_ctx, _directive_motion)))}><div class="w-24 h-24 rounded-2xl bg-amber-50 flex items-center justify-center mx-auto mb-6">`);
        _push(ssrRenderComponent(unref(ShoppingBag), { class: "w-12 h-12 text-amber-300" }, null, _parent));
        _push(`</div><h2 class="text-2xl font-bold text-[var(--color-text)] mb-3">Votre panier est vide</h2><p class="text-[var(--color-text-muted)] mb-8 max-w-sm mx-auto"> Parcourez notre catalogue et faites plaisir \xE0 votre famille au Tchad </p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/catalogue",
          class: "btn-gold"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span${_scopeId}>`);
              _push2(ssrRenderComponent(unref(ArrowRight), { class: "w-5 h-5" }, null, _parent2, _scopeId));
              _push2(`D\xE9couvrir le catalogue</span>`);
            } else {
              return [
                createVNode("span", null, [
                  createVNode(unref(ArrowRight), { class: "w-5 h-5" }),
                  createTextVNode("D\xE9couvrir le catalogue")
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<div class="grid grid-cols-1 lg:grid-cols-3 gap-8"><div class="lg:col-span-2 space-y-4"><!--[-->`);
        ssrRenderList(unref(cartStore).items, (item) => {
          _push(`<div class="card p-5 group hover:!border-[var(--color-accent)]/15"><div class="flex gap-5"><div class="w-24 h-24 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden">`);
          if (item.thumbnail) {
            _push(`<img${ssrRenderAttr("src", item.thumbnail)}${ssrRenderAttr("alt", item.title)} class="w-full h-full object-cover">`);
          } else {
            _push(ssrRenderComponent(unref(Package), { class: "w-10 h-10 text-gray-200" }, null, _parent));
          }
          _push(`</div><div class="flex-grow min-w-0"><div class="flex justify-between items-start gap-3"><div class="min-w-0"><h3 class="text-lg font-semibold text-[var(--color-text)] truncate">${ssrInterpolate(item.title)}</h3>`);
          if (item.category) {
            _push(`<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 mt-1">${ssrInterpolate(item.category)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><button class="p-2 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all flex-shrink-0">`);
          _push(ssrRenderComponent(unref(Trash2), { class: "w-5 h-5" }, null, _parent));
          _push(`</button></div><div class="flex items-end justify-between mt-4"><div class="flex items-center gap-1 bg-gray-50 rounded-xl p-1"><button class="${ssrRenderClass([item.quantity <= 1 ? "text-gray-300" : "text-[var(--color-text)]", "w-9 h-9 rounded-lg hover:bg-white flex items-center justify-center transition-all active:scale-95"])}">`);
          _push(ssrRenderComponent(unref(Minus), { class: "w-4 h-4" }, null, _parent));
          _push(`</button><span class="w-10 text-center font-semibold text-[var(--color-text)]">${ssrInterpolate(item.quantity)}</span><button class="w-9 h-9 rounded-lg hover:bg-white flex items-center justify-center transition-all active:scale-95 text-[var(--color-text)]">`);
          _push(ssrRenderComponent(unref(Plus), { class: "w-4 h-4" }, null, _parent));
          _push(`</button></div><div class="text-right"><span class="text-xl font-bold text-[var(--color-text)]">${ssrInterpolate(formatPrice(item.price * item.quantity))}</span>`);
          if (item.quantity > 1) {
            _push(`<p class="text-xs text-[var(--color-text-muted)]">${ssrInterpolate(formatPrice(item.price))} /pi\xE8ce</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div></div></div></div>`);
        });
        _push(`<!--]-->`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/catalogue",
          class: "inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent-dark)] transition-colors mt-4"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(ArrowLeft), { class: "w-4 h-4" }, null, _parent2, _scopeId));
              _push2(` Continuer les achats `);
            } else {
              return [
                createVNode(unref(ArrowLeft), { class: "w-4 h-4" }),
                createTextVNode(" Continuer les achats ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="lg:col-span-1"><div class="card p-6 sticky top-28 space-y-6"><h2 class="text-xl font-bold text-[var(--color-text)]">R\xE9sum\xE9</h2><div class="space-y-3"><!--[-->`);
        ssrRenderList(unref(cartStore).items, (item) => {
          _push(`<div class="flex justify-between text-sm"><span class="text-[var(--color-text-secondary)] truncate mr-3">${ssrInterpolate(item.title)} \xD7 ${ssrInterpolate(item.quantity)}</span><span class="text-[var(--color-text)] font-medium flex-shrink-0">${ssrInterpolate(formatPrice(item.price * item.quantity))}</span></div>`);
        });
        _push(`<!--]--></div><div class="section-divider"></div><div class="space-y-3"><div class="flex justify-between text-[var(--color-text-secondary)]"><span>Sous-total</span><span>${ssrInterpolate(unref(cartStore).subtotalFormatted)}</span></div><div class="flex justify-between text-[var(--color-text-secondary)]"><span class="flex items-center gap-2">`);
        _push(ssrRenderComponent(unref(Truck), { class: "w-4 h-4" }, null, _parent));
        _push(`Livraison</span><span>${ssrInterpolate(unref(cartStore).shippingFormatted)}</span></div><div class="section-divider"></div><div class="flex justify-between items-end"><span class="font-semibold text-[var(--color-text)]">Total</span><div class="text-right"><span class="text-2xl font-bold text-[var(--color-text)]">${ssrInterpolate(unref(cartStore).totalFormatted)}</span><p class="text-xs text-[var(--color-text-muted)]">\u2248 ${ssrInterpolate(unref(cartStore).totalFCFA)}</p></div></div></div>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/checkout",
          class: "btn-gold w-full text-center"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span${_scopeId}>`);
              _push2(ssrRenderComponent(unref(CreditCard), { class: "w-5 h-5" }, null, _parent2, _scopeId));
              _push2(`Commander</span>`);
            } else {
              return [
                createVNode("span", null, [
                  createVNode(unref(CreditCard), { class: "w-5 h-5" }),
                  createTextVNode("Commander")
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="space-y-2.5 pt-4 border-t border-[var(--color-border)]"><!--[-->`);
        ssrRenderList(trustBadges, (badge) => {
          _push(`<div class="flex items-center gap-3"><div class="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">`);
          ssrRenderVNode(_push, createVNode(resolveDynamicComponent(badge.icon), { class: "w-3.5 h-3.5 text-green-600" }, null), _parent);
          _push(`</div><span class="text-sm text-[var(--color-text-muted)]">${ssrInterpolate(badge.label)}</span></div>`);
        });
        _push(`<!--]--></div></div></div></div>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/panier.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=panier-Wyzw2rwj.mjs.map
