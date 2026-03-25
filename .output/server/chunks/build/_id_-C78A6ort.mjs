import { j as useRoute, i as useAuthStore, d as useSeoMeta, e as __nuxt_component_0$4 } from './server.mjs';
import { defineComponent, ref, computed, withCtx, createTextVNode, unref, createVNode, resolveDynamicComponent, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderVNode, ssrRenderStyle, ssrRenderAttr } from 'vue/server-renderer';
import { ShoppingCart, CreditCard, Truck, Home, ChevronRight, AlertCircle, ArrowLeft, Download, MessageCircle, Camera, Package, MapPin, Phone, CheckCircle, Clock, RefreshCw } from 'lucide-vue-next';
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
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    useAuthStore();
    const order = ref(null);
    const isLoading = ref(true);
    const error = ref("");
    const trackingSteps = computed(() => {
      var _a, _b, _c;
      const status = ((_a = order.value) == null ? void 0 : _a.fulfillmentStatus) || "not_fulfilled";
      const statusOrder = ["not_fulfilled", "fulfilled", "shipped", "delivered"];
      const currentIndex = statusOrder.indexOf(status);
      return [
        {
          id: "ordered",
          label: "Command\xE9",
          icon: ShoppingCart,
          completed: true,
          date: order.value ? formatShortDate(order.value.createdAt) : ""
        },
        {
          id: "paid",
          label: "Pay\xE9",
          icon: CreditCard,
          completed: ((_b = order.value) == null ? void 0 : _b.paymentStatus) === "captured",
          date: ((_c = order.value) == null ? void 0 : _c.paymentStatus) === "captured" ? formatShortDate(order.value.createdAt) : ""
        },
        {
          id: "shipped",
          label: "Exp\xE9di\xE9",
          icon: Truck,
          completed: currentIndex >= 1,
          date: currentIndex >= 1 ? "En cours" : ""
        },
        {
          id: "delivered",
          label: "Livr\xE9",
          icon: Home,
          completed: status === "delivered",
          date: status === "delivered" ? "Re\xE7u" : ""
        }
      ];
    });
    const progressWidth = computed(() => {
      const completedSteps = trackingSteps.value.filter((s) => s.completed).length;
      return (completedSteps - 1) / (trackingSteps.value.length - 1) * 100;
    });
    const timeline = computed(() => {
      if (!order.value) return [];
      const events = [
        {
          id: "1",
          title: "Commande confirm\xE9e",
          description: "Votre commande a \xE9t\xE9 re\xE7ue et confirm\xE9e",
          date: formatDateTime(order.value.createdAt),
          completed: true
        }
      ];
      if (order.value.paymentStatus === "captured") {
        events.push({
          id: "2",
          title: "Paiement re\xE7u",
          description: "Le paiement a \xE9t\xE9 trait\xE9 avec succ\xE8s",
          date: formatDateTime(order.value.createdAt),
          completed: true
        });
      }
      if (["fulfilled", "shipped", "delivered"].includes(order.value.fulfillmentStatus)) {
        events.push({
          id: "3",
          title: "Colis exp\xE9di\xE9",
          description: "Votre colis est en route depuis Paris",
          date: "En cours",
          completed: true
        });
      }
      if (order.value.fulfillmentStatus === "shipped") {
        events.push({
          id: "4",
          title: "En transit",
          description: "Le colis est en route vers N'Djamena",
          date: "En cours",
          completed: true
        });
      }
      if (order.value.fulfillmentStatus === "delivered") {
        events.push({
          id: "5",
          title: "Livr\xE9",
          description: "Le colis a \xE9t\xE9 remis au destinataire",
          date: formatDateTime(order.value.updatedAt),
          completed: true
        });
      }
      return events;
    });
    useSeoMeta({
      title: () => order.value ? `Commande ${order.value.displayId} - TchadBox` : "Commande - TchadBox"
    });
    function formatDate(date) {
      return new Date(date).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });
    }
    function formatShortDate(date) {
      return new Date(date).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "short"
      });
    }
    function formatDateTime(date) {
      return new Date(date).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit"
      });
    }
    function formatPrice(amount) {
      return new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR"
      }).format(amount);
    }
    function formatFCFA(amount) {
      const fcfa = Math.round(amount * 656);
      return new Intl.NumberFormat("fr-FR").format(fcfa) + " FCFA";
    }
    function getStatusLabel(status) {
      const labels = {
        not_fulfilled: "En pr\xE9paration",
        partially_fulfilled: "Partiellement exp\xE9di\xE9",
        fulfilled: "Exp\xE9di\xE9",
        shipped: "En transit",
        delivered: "Livr\xE9"
      };
      return labels[status] || status;
    }
    function getStatusClass(status) {
      const classes = {
        not_fulfilled: "bg-gray-100 text-[var(--color-text-secondary)]",
        partially_fulfilled: "bg-blue-100 text-blue-700",
        fulfilled: "bg-blue-100 text-blue-700",
        shipped: "bg-amber-100 text-amber-700",
        delivered: "bg-green-100 text-green-700"
      };
      return classes[status] || "bg-gray-100 text-[var(--color-text-secondary)]";
    }
    function getStatusDotClass(status) {
      const classes = {
        not_fulfilled: "bg-gray-500",
        partially_fulfilled: "bg-blue-500",
        fulfilled: "bg-blue-500",
        shipped: "bg-amber-500",
        delivered: "bg-green-500"
      };
      return classes[status] || "bg-gray-500";
    }
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_NuxtLink = __nuxt_component_0$4;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><nav class="flex items-center gap-2 text-sm mb-6">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/compte",
        class: "text-[var(--color-text-muted)] hover:text-[var(--color-accent-dark)]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Mon compte`);
          } else {
            return [
              createTextVNode("Mon compte")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(ChevronRight), { class: "w-4 h-4 text-[var(--color-text-muted)]" }, null, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/compte/commandes",
        class: "text-[var(--color-text-muted)] hover:text-[var(--color-accent-dark)]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Mes commandes`);
          } else {
            return [
              createTextVNode("Mes commandes")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(ChevronRight), { class: "w-4 h-4 text-[var(--color-text-muted)]" }, null, _parent));
      _push(`<span class="text-[var(--color-text)] font-medium">${ssrInterpolate(((_a = unref(order)) == null ? void 0 : _a.displayId) || "Chargement...")}</span></nav>`);
      if (unref(isLoading)) {
        _push(`<div class="space-y-6"><div class="bg-white rounded-2xl border border-[var(--color-border)] p-8 animate-pulse"><div class="h-6 bg-gray-200 rounded w-48 mb-4"></div><div class="h-4 bg-gray-200 rounded w-32"></div></div></div>`);
      } else if (unref(error)) {
        _push(`<div class="bg-white rounded-2xl border border-red-100 p-12 text-center"><div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">`);
        _push(ssrRenderComponent(unref(AlertCircle), { class: "w-8 h-8 text-red-500" }, null, _parent));
        _push(`</div><h3 class="font-semibold text-[var(--color-text)] mb-2">Commande introuvable</h3><p class="text-[var(--color-text-muted)] mb-4">${ssrInterpolate(unref(error))}</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/compte/commandes",
          class: "inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(ArrowLeft), { class: "w-4 h-4" }, null, _parent2, _scopeId));
              _push2(` Retour aux commandes `);
            } else {
              return [
                createVNode(unref(ArrowLeft), { class: "w-4 h-4" }),
                createTextVNode(" Retour aux commandes ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else if (unref(order)) {
        _push(`<div class="space-y-6"><div class="bg-white rounded-2xl border border-[var(--color-border)] p-6"><div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4"><div><div class="flex items-center gap-3 mb-2"><h1 class="text-2xl font-bold text-[var(--color-text)]">${ssrInterpolate(unref(order).displayId)}</h1><span class="${ssrRenderClass([getStatusClass(unref(order).fulfillmentStatus), "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium"])}"><span class="${ssrRenderClass([getStatusDotClass(unref(order).fulfillmentStatus), "w-2 h-2 rounded-full"])}"></span> ${ssrInterpolate(getStatusLabel(unref(order).fulfillmentStatus))}</span></div><p class="text-[var(--color-text-muted)]"> Command\xE9 le ${ssrInterpolate(formatDate(unref(order).createdAt))}</p></div><div class="flex gap-3"><button class="flex items-center gap-2 px-4 py-2 border border-[var(--color-border)] rounded-xl text-[var(--color-text-secondary)] hover:bg-gray-50 transition-colors">`);
        _push(ssrRenderComponent(unref(Download), { class: "w-4 h-4" }, null, _parent));
        _push(` Facture </button><button class="flex items-center gap-2 px-4 py-2 border border-[var(--color-border)] rounded-xl text-[var(--color-text-secondary)] hover:bg-gray-50 transition-colors">`);
        _push(ssrRenderComponent(unref(MessageCircle), { class: "w-4 h-4" }, null, _parent));
        _push(` Aide </button></div></div></div><div class="bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden"><div class="p-6 border-b border-[var(--color-border)]"><h2 class="text-lg font-semibold text-[var(--color-text)]">Suivi de commande</h2></div><div class="p-6"><div class="relative mb-8"><div class="flex items-center justify-between"><!--[-->`);
        ssrRenderList(unref(trackingSteps), (step, index) => {
          _push(`<div class="flex flex-col items-center relative z-10"><div class="${ssrRenderClass([step.completed ? "bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/25" : "bg-gray-100 text-[var(--color-text-muted)]", "w-10 h-10 rounded-full flex items-center justify-center transition-colors"])}">`);
          ssrRenderVNode(_push, createVNode(resolveDynamicComponent(step.icon), { class: "w-5 h-5" }, null), _parent);
          _push(`</div><p class="${ssrRenderClass([step.completed ? "text-[var(--color-text)]" : "text-[var(--color-text-muted)]", "text-xs font-medium mt-2 text-center"])}">${ssrInterpolate(step.label)}</p>`);
          if (step.date) {
            _push(`<p class="text-xs text-[var(--color-text-muted)]">${ssrInterpolate(step.date)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div><div class="absolute top-5 left-0 right-0 h-0.5 bg-gray-100 -z-0 mx-16"><div class="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-500" style="${ssrRenderStyle({ width: unref(progressWidth) + "%" })}"></div></div></div><div class="space-y-4"><!--[-->`);
        ssrRenderList(unref(timeline), (event) => {
          _push(`<div class="flex gap-4"><div class="flex flex-col items-center"><div class="${ssrRenderClass([event.completed ? "bg-amber-500" : "bg-gray-200", "w-3 h-3 rounded-full"])}"></div><div class="w-0.5 flex-1 bg-gray-100"></div></div><div class="pb-6"><p class="font-medium text-[var(--color-text)]">${ssrInterpolate(event.title)}</p>`);
          if (event.description) {
            _push(`<p class="text-sm text-[var(--color-text-muted)]">${ssrInterpolate(event.description)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<p class="text-xs text-[var(--color-text-muted)] mt-1">${ssrInterpolate(event.date)}</p></div></div>`);
        });
        _push(`<!--]--></div>`);
        if (unref(order).deliveryPhoto) {
          _push(`<div class="mt-6 p-4 bg-green-50 rounded-xl"><p class="text-sm font-medium text-green-800 mb-3 flex items-center gap-2">`);
          _push(ssrRenderComponent(unref(Camera), { class: "w-4 h-4" }, null, _parent));
          _push(` Photo de livraison </p><img${ssrRenderAttr("src", unref(order).deliveryPhoto)} alt="Photo de livraison" class="w-full max-w-md rounded-lg border border-green-200"></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden"><div class="p-6 border-b border-[var(--color-border)]"><h2 class="text-lg font-semibold text-[var(--color-text)]"> Articles (${ssrInterpolate(unref(order).items.length)}) </h2></div><div class="divide-y divide-[var(--color-border)]"><!--[-->`);
        ssrRenderList(unref(order).items, (item) => {
          _push(`<div class="flex items-center gap-4 p-6"><div class="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">`);
          if (item.thumbnail) {
            _push(`<img${ssrRenderAttr("src", item.thumbnail)}${ssrRenderAttr("alt", item.title)} class="w-16 h-16 object-contain">`);
          } else {
            _push(ssrRenderComponent(unref(Package), { class: "w-8 h-8 text-[var(--color-text-muted)]" }, null, _parent));
          }
          _push(`</div><div class="flex-1 min-w-0"><p class="font-medium text-[var(--color-text)]">${ssrInterpolate(item.title)}</p><p class="text-sm text-[var(--color-text-muted)]">Quantit\xE9: ${ssrInterpolate(item.quantity)}</p></div><p class="font-semibold text-[var(--color-text)]">${ssrInterpolate(formatPrice(item.total))}</p></div>`);
        });
        _push(`<!--]--></div></div><div class="grid md:grid-cols-2 gap-6"><div class="bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden"><div class="p-6 border-b border-[var(--color-border)]"><h2 class="text-lg font-semibold text-[var(--color-text)]">Adresse de livraison</h2></div><div class="p-6"><div class="flex items-start gap-3">`);
        _push(ssrRenderComponent(unref(MapPin), { class: "w-5 h-5 text-amber-500 mt-0.5 shrink-0" }, null, _parent));
        _push(`<div><p class="font-medium text-[var(--color-text)]">${ssrInterpolate(unref(order).shippingAddress.firstName)} ${ssrInterpolate(unref(order).shippingAddress.lastName)}</p><p class="text-[var(--color-text-secondary)] mt-1">${ssrInterpolate(unref(order).shippingAddress.address1)}<br>`);
        if (unref(order).shippingAddress.address2) {
          _push(`<span>${ssrInterpolate(unref(order).shippingAddress.address2)}<br></span>`);
        } else {
          _push(`<!---->`);
        }
        _push(` ${ssrInterpolate(unref(order).shippingAddress.city)}, ${ssrInterpolate(unref(order).shippingAddress.country)}</p>`);
        if (unref(order).shippingAddress.phone) {
          _push(`<p class="text-[var(--color-text-muted)] mt-2 flex items-center gap-2">`);
          _push(ssrRenderComponent(unref(Phone), { class: "w-4 h-4" }, null, _parent));
          _push(` ${ssrInterpolate(unref(order).shippingAddress.phone)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div></div><div class="bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden"><div class="p-6 border-b border-[var(--color-border)]"><h2 class="text-lg font-semibold text-[var(--color-text)]">R\xE9capitulatif</h2></div><div class="p-6 space-y-3"><div class="flex justify-between text-[var(--color-text-secondary)]"><span>Sous-total</span><span>${ssrInterpolate(formatPrice(unref(order).subtotal))}</span></div><div class="flex justify-between text-[var(--color-text-secondary)]"><span>Livraison</span><span>${ssrInterpolate(formatPrice(unref(order).shippingTotal))}</span></div><div class="pt-3 border-t border-[var(--color-border)] flex justify-between"><span class="font-semibold text-[var(--color-text)]">Total</span><div class="text-right"><p class="font-bold text-lg text-[var(--color-text)]">${ssrInterpolate(formatPrice(unref(order).total))}</p><p class="text-xs text-[var(--color-text-muted)]">\u2248 ${ssrInterpolate(formatFCFA(unref(order).total))}</p></div></div><div class="pt-4 mt-4 border-t border-[var(--color-border)]"><div class="flex items-center gap-2">`);
        if (unref(order).paymentStatus === "captured") {
          _push(ssrRenderComponent(unref(CheckCircle), { class: "w-5 h-5 text-green-500" }, null, _parent));
        } else {
          _push(ssrRenderComponent(unref(Clock), { class: "w-5 h-5 text-amber-500" }, null, _parent));
        }
        _push(`<span class="${ssrRenderClass([unref(order).paymentStatus === "captured" ? "text-green-700" : "text-amber-700", "text-sm"])}">${ssrInterpolate(unref(order).paymentStatus === "captured" ? "Paiement confirm\xE9" : "Paiement en attente")}</span></div></div></div></div></div><div class="flex flex-col sm:flex-row gap-4">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/catalogue",
          class: "flex-1 btn-gold flex items-center justify-center gap-2"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(RefreshCw), { class: "w-5 h-5" }, null, _parent2, _scopeId));
              _push2(` Commander \xE0 nouveau `);
            } else {
              return [
                createVNode(unref(RefreshCw), { class: "w-5 h-5" }),
                createTextVNode(" Commander \xE0 nouveau ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/compte/commandes",
          class: "flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-[var(--color-border)] text-[var(--color-text-secondary)] font-semibold rounded-xl hover:bg-gray-50 transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(ArrowLeft), { class: "w-5 h-5" }, null, _parent2, _scopeId));
              _push2(` Retour aux commandes `);
            } else {
              return [
                createVNode(unref(ArrowLeft), { class: "w-5 h-5" }),
                createTextVNode(" Retour aux commandes ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/compte/commandes/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-C78A6ort.mjs.map
