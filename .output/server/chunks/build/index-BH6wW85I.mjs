import { i as useAuthStore, a as useHead, _ as __nuxt_component_3$2, e as __nuxt_component_0$4, b as __nuxt_component_3$1 } from './server.mjs';
import { _ as __nuxt_component_5 } from './Badge-CCKIa51X.mjs';
import { defineComponent, ref, unref, withCtx, createTextVNode, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderComponent } from 'vue/server-renderer';
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
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const authStore = useAuthStore();
    const stats = ref([
      { label: "Commandes aujourd'hui", value: "0", icon: "lucide:shopping-bag", bgColor: "bg-blue-100", iconColor: "text-blue-600", subtext: "0\u20AC de CA" },
      { label: "En attente", value: "0", icon: "lucide:clock", bgColor: "bg-amber-100", iconColor: "text-amber-600" },
      { label: "En livraison", value: "0", icon: "lucide:truck", bgColor: "bg-green-100", iconColor: "text-green-600" },
      { label: "Livr\xE9es ce mois", value: "0", icon: "lucide:package-check", bgColor: "bg-purple-100", iconColor: "text-purple-600" }
    ]);
    const pendingOrders = ref([]);
    const activeDeliveries = ref([]);
    const formatPrice = (amount) => {
      return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(amount || 0);
    };
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("fr-FR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
    };
    const getStatusColor = (status) => {
      const colors = {
        pending: "amber",
        processing: "blue",
        fulfilled: "cyan",
        shipped: "indigo",
        delivered: "green",
        cancelled: "red"
      };
      return colors[status] || "gray";
    };
    const getStatusLabel = (status) => {
      const labels = {
        not_fulfilled: "Non trait\xE9",
        fulfilled: "Pr\xEAt",
        shipped: "En livraison",
        delivered: "Livr\xE9"
      };
      return labels[status] || status;
    };
    useHead({
      title: "Dashboard Admin - TchadBox"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_3$2;
      const _component_NuxtLink = __nuxt_component_0$4;
      const _component_UButton = __nuxt_component_3$1;
      const _component_UBadge = __nuxt_component_5;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="mb-8"><h1 class="text-2xl font-bold text-gray-900">Dashboard</h1><p class="text-gray-500 mt-1">Bienvenue, ${ssrInterpolate(unref(authStore).fullName)} \u{1F44B}</p></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"><!--[-->`);
      ssrRenderList(unref(stats), (stat) => {
        _push(`<div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100"><div class="flex items-center justify-between"><div><p class="text-sm text-gray-500">${ssrInterpolate(stat.label)}</p><p class="text-2xl font-bold text-gray-900 mt-1">${ssrInterpolate(stat.value)}</p>`);
        if (stat.subtext) {
          _push(`<p class="text-xs text-gray-400 mt-1">${ssrInterpolate(stat.subtext)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="${ssrRenderClass(["w-12 h-12 rounded-xl flex items-center justify-center", stat.bgColor])}">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: stat.icon,
          class: ["w-6 h-6", stat.iconColor]
        }, null, _parent));
        _push(`</div></div></div>`);
      });
      _push(`<!--]--></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"><div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100"><div class="p-6 border-b border-gray-100 flex items-center justify-between"><h2 class="font-semibold text-gray-900">Commandes en attente</h2>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/commandes",
        class: "text-sm text-primary-600 hover:text-primary-700 font-medium"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Voir tout \u2192 `);
          } else {
            return [
              createTextVNode(" Voir tout \u2192 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (unref(pendingOrders).length > 0) {
        _push(`<div class="divide-y divide-gray-100"><!--[-->`);
        ssrRenderList(unref(pendingOrders), (order) => {
          _push(`<div class="p-4 hover:bg-gray-50 transition-colors"><div class="flex items-center justify-between"><div><p class="font-medium text-gray-900">#${ssrInterpolate(order.display_id || order.id.slice(0, 8).toUpperCase())}</p><p class="text-sm text-gray-500">${ssrInterpolate(order.recipient_name || order.customer_first_name)}</p></div><div class="text-right"><p class="font-semibold text-gray-900">${ssrInterpolate(formatPrice(order.total))}</p><p class="text-xs text-gray-400">${ssrInterpolate(formatDate(order.created_at))}</p></div>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/admin/commandes/${order.id}`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_UButton, {
                  size: "sm",
                  color: "primary",
                  variant: "soft"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` Traiter `);
                    } else {
                      return [
                        createTextVNode(" Traiter ")
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_UButton, {
                    size: "sm",
                    color: "primary",
                    variant: "soft"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Traiter ")
                    ]),
                    _: 1
                  })
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="p-8 text-center text-gray-500">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:package-check",
          class: "w-12 h-12 mx-auto mb-3 text-gray-300"
        }, null, _parent));
        _push(`<p>Aucune commande en attente</p></div>`);
      }
      _push(`</div><div class="bg-white rounded-xl shadow-sm border border-gray-100"><div class="p-6 border-b border-gray-100 flex items-center justify-between"><h2 class="font-semibold text-gray-900">Livraisons en cours</h2><span class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">${ssrInterpolate(unref(activeDeliveries).length)}</span></div>`);
      if (unref(activeDeliveries).length > 0) {
        _push(`<div class="divide-y divide-gray-100"><!--[-->`);
        ssrRenderList(unref(activeDeliveries), (delivery) => {
          _push(`<div class="p-4"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "lucide:truck",
            class: "w-5 h-5 text-green-600"
          }, null, _parent));
          _push(`</div><div class="flex-1"><p class="font-medium text-gray-900">#${ssrInterpolate(delivery.display_id || delivery.id.slice(0, 8).toUpperCase())}</p><p class="text-xs text-gray-500">${ssrInterpolate(delivery.recipient_name)}</p></div>`);
          _push(ssrRenderComponent(_component_UBadge, {
            color: getStatusColor(delivery.fulfillment_status),
            variant: "soft",
            size: "xs"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(getStatusLabel(delivery.fulfillment_status))}`);
              } else {
                return [
                  createTextVNode(toDisplayString(getStatusLabel(delivery.fulfillment_status)), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="p-8 text-center text-gray-500">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:truck",
          class: "w-12 h-12 mx-auto mb-3 text-gray-300"
        }, null, _parent));
        _push(`<p>Aucune livraison en cours</p></div>`);
      }
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BH6wW85I.mjs.map
