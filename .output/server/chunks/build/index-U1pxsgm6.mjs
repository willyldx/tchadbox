import { i as useAuthStore, a as useHead, l as __nuxt_component_0$2, e as __nuxt_component_0$4, _ as __nuxt_component_3$2, b as __nuxt_component_3$1 } from './server.mjs';
import { _ as __nuxt_component_5 } from './Badge-CCKIa51X.mjs';
import { defineComponent, ref, computed, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderComponent } from 'vue/server-renderer';
import { u as useBackendApi } from './useBackendApi-Dq4zIPvK.mjs';
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

function useOrderNormalizer() {
  function normalizeOrder(dbOrder) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
    const items = getOrderItems(dbOrder);
    const shippingAddress = dbOrder.shipping_address && typeof dbOrder.shipping_address === "object" ? {
      firstName: (_a = dbOrder.shipping_address.first_name) != null ? _a : "Destinataire",
      lastName: (_b = dbOrder.shipping_address.last_name) != null ? _b : "",
      address1: (_d = (_c = dbOrder.shipping_address.address_1) != null ? _c : dbOrder.shipping_address.address1) != null ? _d : "",
      address2: (_e = dbOrder.shipping_address.address_2) != null ? _e : dbOrder.shipping_address.address2,
      city: (_f = dbOrder.shipping_address.city) != null ? _f : "N'Djamena",
      country: (_g = dbOrder.shipping_address.country) != null ? _g : "Tchad",
      phone: dbOrder.shipping_address.phone
    } : null;
    return {
      id: dbOrder.id,
      displayId: dbOrder.display_id || `TCB-${(dbOrder.id || "").toString().slice(0, 8).toUpperCase()}`,
      status: dbOrder.status,
      paymentStatus: dbOrder.payment_status,
      fulfillmentStatus: dbOrder.fulfillment_status,
      items,
      shippingAddress,
      subtotal: Number((_h = dbOrder.subtotal) != null ? _h : 0),
      shippingTotal: Number((_i = dbOrder.shipping_total) != null ? _i : 0),
      total: Number((_j = dbOrder.total) != null ? _j : 0),
      currency: (_k = dbOrder.currency) != null ? _k : "EUR",
      createdAt: dbOrder.created_at,
      updatedAt: dbOrder.updated_at,
      assignedTo: dbOrder.assigned_to,
      assignedAt: dbOrder.assigned_at,
      pickedUpAt: dbOrder.picked_up_at,
      deliveredAt: dbOrder.delivered_at,
      deliveryPhoto: dbOrder.delivery_photo,
      trackingNumber: dbOrder.tracking_number,
      email: dbOrder.email,
      customerFirstName: dbOrder.customer_first_name,
      customerLastName: dbOrder.customer_last_name,
      customerPhone: dbOrder.customer_phone,
      recipientName: dbOrder.recipient_name,
      recipientPhone: dbOrder.recipient_phone,
      deliveryInstructions: dbOrder.delivery_instructions,
      notes: dbOrder.notes
    };
  }
  function getOrderItems(dbOrder) {
    var _a;
    const fromMetadata = (_a = dbOrder.metadata) == null ? void 0 : _a.items;
    if (Array.isArray(fromMetadata) && fromMetadata.length > 0) {
      return fromMetadata.map((item, index) => ({
        id: item.id || item.product_id || `item-${index}`,
        productId: item.product_id,
        variantId: item.variant_id,
        title: item.title,
        thumbnail: item.thumbnail,
        quantity: item.quantity,
        unitPrice: item.unit_price,
        total: item.total
      }));
    }
    const fromJoin = dbOrder.order_items;
    if (Array.isArray(fromJoin) && fromJoin.length > 0) {
      return fromJoin.map((item) => ({
        id: item.id,
        productId: item.product_id,
        variantId: item.variant_id,
        title: item.title,
        description: item.description,
        thumbnail: item.thumbnail,
        quantity: item.quantity,
        unitPrice: item.unit_price,
        total: item.total
      }));
    }
    return [];
  }
  return { normalizeOrder, getOrderItems };
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const authStore = useAuthStore();
    const loading = ref(true);
    const activeTab = ref("pending");
    const deliveries = ref([]);
    const tabs = computed(() => [
      { label: "\xC0 livrer", value: "pending", count: pendingCount.value },
      { label: "En cours", value: "in_progress", count: inProgressCount.value },
      { label: "Livr\xE9es", value: "delivered", count: deliveredTodayCount.value }
    ]);
    const pendingCount = computed(() => deliveries.value.filter((d) => d.fulfillmentStatus === "fulfilled").length);
    const inProgressCount = computed(() => deliveries.value.filter((d) => d.fulfillmentStatus === "shipped").length);
    const deliveredTodayCount = computed(() => {
      const today = /* @__PURE__ */ new Date();
      today.setHours(0, 0, 0, 0);
      return deliveries.value.filter(
        (d) => d.fulfillmentStatus === "delivered" && new Date(d.deliveredAt || "") >= today
      ).length;
    });
    const filteredDeliveries = computed(() => {
      switch (activeTab.value) {
        case "pending":
          return deliveries.value.filter((d) => d.fulfillmentStatus === "fulfilled");
        case "in_progress":
          return deliveries.value.filter((d) => d.fulfillmentStatus === "shipped");
        case "delivered":
          const today = /* @__PURE__ */ new Date();
          today.setHours(0, 0, 0, 0);
          return deliveries.value.filter(
            (d) => d.fulfillmentStatus === "delivered" && new Date(d.deliveredAt || "") >= today
          );
        default:
          return deliveries.value;
      }
    });
    const todayDate = computed(() => {
      return (/* @__PURE__ */ new Date()).toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long"
      });
    });
    const fetchDeliveries = async () => {
      if (!authStore.user) return;
      loading.value = true;
      try {
        const data = await useBackendApi().livreurOrders();
        const { normalizeOrder } = useOrderNormalizer();
        deliveries.value = ((data == null ? void 0 : data.data) || []).map((order) => normalizeOrder(order));
      } catch (error) {
        console.error("Error fetching deliveries:", error);
      } finally {
        loading.value = false;
      }
    };
    const formatPrice = (amount) => {
      return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(amount);
    };
    const formatTime = (date) => {
      if (!date) return "-";
      return new Date(date).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
    };
    const formatAddress = (address) => {
      if (!address) return "Adresse non sp\xE9cifi\xE9e";
      return `${address.address_1 || ""}, ${address.city || ""}`;
    };
    const getStatusColor = (status) => {
      const colors = {
        fulfilled: "amber",
        shipped: "blue",
        delivered: "green"
      };
      return colors[status] || "gray";
    };
    const getStatusLabel = (status) => {
      const labels = {
        fulfilled: "\xC0 r\xE9cup\xE9rer",
        shipped: "En livraison",
        delivered: "Livr\xE9"
      };
      return labels[status] || status;
    };
    useHead({
      title: "Mes livraisons - TchadBox"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = __nuxt_component_0$2;
      const _component_NuxtLink = __nuxt_component_0$4;
      const _component_UBadge = __nuxt_component_5;
      const _component_Icon = __nuxt_component_3$2;
      const _component_UButton = __nuxt_component_3$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "px-4 py-6" }, _attrs))}><div class="mb-6"><h1 class="text-2xl font-bold text-gray-900">Mes livraisons</h1><p class="text-gray-500 mt-1">${ssrInterpolate(unref(todayDate))}</p></div><div class="grid grid-cols-3 gap-3 mb-6"><div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center"><p class="text-2xl font-bold text-amber-600">${ssrInterpolate(unref(pendingCount))}</p><p class="text-xs text-gray-500">En attente</p></div><div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center"><p class="text-2xl font-bold text-blue-600">${ssrInterpolate(unref(inProgressCount))}</p><p class="text-xs text-gray-500">En cours</p></div><div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center"><p class="text-2xl font-bold text-green-600">${ssrInterpolate(unref(deliveredTodayCount))}</p><p class="text-xs text-gray-500">Livr\xE9es</p></div></div><div class="flex gap-2 mb-4 overflow-x-auto pb-2"><!--[-->`);
      ssrRenderList(unref(tabs), (tab) => {
        _push(`<button class="${ssrRenderClass([
          "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
          unref(activeTab) === tab.value ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600"
        ])}">${ssrInterpolate(tab.label)} `);
        if (tab.count) {
          _push(`<span class="${ssrRenderClass([unref(activeTab) === tab.value ? "bg-white/20" : "bg-gray-200", "ml-1 px-1.5 py-0.5 rounded-full text-xs"])}">${ssrInterpolate(tab.count)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</button>`);
      });
      _push(`<!--]--></div>`);
      if (unref(loading)) {
        _push(`<div class="flex items-center justify-center py-12">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-loader-2",
          class: "w-8 h-8 animate-spin text-green-500"
        }, null, _parent));
        _push(`</div>`);
      } else if (unref(filteredDeliveries).length > 0) {
        _push(`<div class="space-y-3"><!--[-->`);
        ssrRenderList(unref(filteredDeliveries), (delivery) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: delivery.id,
            to: `/livreur/${delivery.id}`,
            class: "block bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              var _a, _b;
              if (_push2) {
                _push2(`<div class="flex items-start justify-between mb-3"${_scopeId}><div${_scopeId}><div class="flex items-center gap-2"${_scopeId}><span class="font-semibold text-gray-900"${_scopeId}>#${ssrInterpolate(delivery.displayId)}</span>`);
                _push2(ssrRenderComponent(_component_UBadge, {
                  color: getStatusColor(delivery.fulfillmentStatus),
                  variant: "soft",
                  size: "xs"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(getStatusLabel(delivery.fulfillmentStatus))}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(getStatusLabel(delivery.fulfillmentStatus)), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div><p class="text-sm text-gray-500 mt-0.5"${_scopeId}>${ssrInterpolate(formatTime(delivery.assignedAt))}</p></div><span class="font-bold text-green-600"${_scopeId}>${ssrInterpolate(formatPrice(delivery.total))}</span></div><div class="flex items-center gap-3 mb-3"${_scopeId}><div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_Icon, {
                  name: "lucide:user",
                  class: "w-5 h-5 text-gray-500"
                }, null, _parent2, _scopeId));
                _push2(`</div><div${_scopeId}><p class="font-medium text-gray-900"${_scopeId}>${ssrInterpolate(delivery.recipientName)}</p><p class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(delivery.recipientPhone)}</p></div></div><div class="flex items-start gap-2 text-sm text-gray-600"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_Icon, {
                  name: "lucide:map-pin",
                  class: "w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0"
                }, null, _parent2, _scopeId));
                _push2(`<p${_scopeId}>${ssrInterpolate(formatAddress(delivery.shippingAddress))}</p></div><div class="mt-3 pt-3 border-t border-gray-100"${_scopeId}><p class="text-xs text-gray-500"${_scopeId}>${ssrInterpolate(((_a = delivery.items) == null ? void 0 : _a.length) || 0)} article(s)</p></div>`);
              } else {
                return [
                  createVNode("div", { class: "flex items-start justify-between mb-3" }, [
                    createVNode("div", null, [
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        createVNode("span", { class: "font-semibold text-gray-900" }, "#" + toDisplayString(delivery.displayId), 1),
                        createVNode(_component_UBadge, {
                          color: getStatusColor(delivery.fulfillmentStatus),
                          variant: "soft",
                          size: "xs"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(getStatusLabel(delivery.fulfillmentStatus)), 1)
                          ]),
                          _: 2
                        }, 1032, ["color"])
                      ]),
                      createVNode("p", { class: "text-sm text-gray-500 mt-0.5" }, toDisplayString(formatTime(delivery.assignedAt)), 1)
                    ]),
                    createVNode("span", { class: "font-bold text-green-600" }, toDisplayString(formatPrice(delivery.total)), 1)
                  ]),
                  createVNode("div", { class: "flex items-center gap-3 mb-3" }, [
                    createVNode("div", { class: "w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center" }, [
                      createVNode(_component_Icon, {
                        name: "lucide:user",
                        class: "w-5 h-5 text-gray-500"
                      })
                    ]),
                    createVNode("div", null, [
                      createVNode("p", { class: "font-medium text-gray-900" }, toDisplayString(delivery.recipientName), 1),
                      createVNode("p", { class: "text-sm text-gray-500" }, toDisplayString(delivery.recipientPhone), 1)
                    ])
                  ]),
                  createVNode("div", { class: "flex items-start gap-2 text-sm text-gray-600" }, [
                    createVNode(_component_Icon, {
                      name: "lucide:map-pin",
                      class: "w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0"
                    }),
                    createVNode("p", null, toDisplayString(formatAddress(delivery.shippingAddress)), 1)
                  ]),
                  createVNode("div", { class: "mt-3 pt-3 border-t border-gray-100" }, [
                    createVNode("p", { class: "text-xs text-gray-500" }, toDisplayString(((_b = delivery.items) == null ? void 0 : _b.length) || 0) + " article(s)", 1)
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="text-center py-12"><div class="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:package",
          class: "w-10 h-10 text-gray-400"
        }, null, _parent));
        _push(`</div><p class="text-gray-500 font-medium">Aucune livraison</p><p class="text-sm text-gray-400 mt-1">${ssrInterpolate(unref(activeTab) === "pending" ? "Pas de nouvelles livraisons assign\xE9es" : "Aucune livraison dans cette cat\xE9gorie")}</p></div>`);
      }
      _push(`<div class="fixed bottom-24 right-4">`);
      _push(ssrRenderComponent(_component_UButton, {
        onClick: fetchDeliveries,
        color: "green",
        icon: "i-lucide-refresh-cw",
        size: "lg",
        class: "rounded-full shadow-lg",
        loading: unref(loading)
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/livreur/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-U1pxsgm6.mjs.map
