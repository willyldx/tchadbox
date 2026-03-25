import { _ as __nuxt_component_5 } from "./Badge-CCKIa51X.js";
import { _ as __nuxt_component_2 } from "./SelectMenu-CHcoscsC.js";
import { i as useAuthStore, n as navigateTo, a as useHead, _ as __nuxt_component_3, d as __nuxt_component_0 } from "../server.mjs";
import { defineComponent, ref, withCtx, createTextVNode, isRef, unref, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/hookable/dist/index.mjs";
import "tailwind-merge";
import "@tanstack/vue-virtual";
import "./form-DsUILy5F.js";
import "./active-element-history-QtuHblWR.js";
import "./keyboard-BvysMIIh.js";
import "./usePopper-CIeS2-3g.js";
import "./hidden-CZ0WYEIB.js";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/defu/dist/defu.mjs";
import "ohash/utils";
import "./useFormGroup-DTWlat5q.js";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/unctx/dist/index.mjs";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/h3/dist/index.mjs";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/ufo/dist/index.mjs";
import "vue-router";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/klona/dist/index.mjs";
import "framesync";
import "popmotion";
import "style-value-types";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/@unhead/vue/dist/index.mjs";
import "@iconify/vue";
import "lucide-vue-next";
import "@iconify/utils/lib/css/icon";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/nuxt/node_modules/perfect-debounce/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "finances",
  __ssrInlineRender: true,
  setup(__props) {
    const authStore = useAuthStore();
    if (!authStore.isSuperAdmin) {
      navigateTo("/admin");
    }
    const period = ref("month");
    const periodOptions = [
      { label: "Ce mois", value: "month" },
      { label: "Cette année", value: "year" },
      { label: "Tout", value: "all" }
    ];
    const stats = ref({
      totalRevenue: 0,
      totalOrders: 0,
      monthRevenue: 0,
      monthGrowth: 0,
      weekRevenue: 0,
      weekOrders: 0,
      todayRevenue: 0,
      todayOrders: 0
    });
    const paymentStats = ref([]);
    const topProducts = ref([]);
    const recentOrders = ref([]);
    const formatPrice = (amount) => {
      return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(amount || 0);
    };
    const formatDateTime = (date) => {
      return new Date(date).toLocaleDateString("fr-FR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
    };
    const getPaymentBg = (status) => {
      const map = { captured: "bg-green-100", awaiting: "bg-amber-100", refunded: "bg-red-100" };
      return map[status] || "bg-gray-100";
    };
    const getPaymentIcon = (status) => {
      const map = { captured: "lucide:check", awaiting: "lucide:clock", refunded: "lucide:rotate-ccw" };
      return map[status] || "lucide:help-circle";
    };
    const getPaymentColor = (status) => {
      const map = { captured: "text-green-600", awaiting: "text-amber-600", refunded: "text-red-600" };
      return map[status] || "text-gray-600";
    };
    const getPaymentBadgeColor = (status) => {
      const map = { captured: "green", awaiting: "amber", refunded: "red" };
      return map[status] || "gray";
    };
    const getPaymentLabel = (status) => {
      const map = { captured: "Payé", awaiting: "En attente", refunded: "Remboursé" };
      return map[status] || status;
    };
    useHead({
      title: "Finances - Admin TchadBox"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UBadge = __nuxt_component_5;
      const _component_USelectMenu = __nuxt_component_2;
      const _component_Icon = __nuxt_component_3;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"><div><div class="flex items-center gap-2 mb-1"><h1 class="text-2xl font-bold text-gray-900">Finances</h1>`);
      _push(ssrRenderComponent(_component_UBadge, {
        color: "amber",
        variant: "soft"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`👑 CEO Only`);
          } else {
            return [
              createTextVNode("👑 CEO Only")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><p class="text-gray-500">Vue d&#39;ensemble des revenus de TchadBox</p></div>`);
      _push(ssrRenderComponent(_component_USelectMenu, {
        modelValue: unref(period),
        "onUpdate:modelValue": ($event) => isRef(period) ? period.value = $event : null,
        options: periodOptions,
        class: "w-40"
      }, null, _parent));
      _push(`</div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"><div class="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white"><p class="text-green-100 text-sm">Revenu total</p><p class="text-3xl font-bold mt-1">${ssrInterpolate(formatPrice(unref(stats).totalRevenue))}</p><p class="text-green-200 text-sm mt-2">${ssrInterpolate(unref(stats).totalOrders)} commandes</p></div><div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100"><p class="text-gray-500 text-sm">Ce mois</p><p class="text-2xl font-bold text-gray-900 mt-1">${ssrInterpolate(formatPrice(unref(stats).monthRevenue))}</p><div class="flex items-center gap-1 mt-2">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: unref(stats).monthGrowth >= 0 ? "lucide:trending-up" : "lucide:trending-down",
        class: [unref(stats).monthGrowth >= 0 ? "text-green-500" : "text-red-500", "w-4 h-4"]
      }, null, _parent));
      _push(`<span class="${ssrRenderClass([unref(stats).monthGrowth >= 0 ? "text-green-600" : "text-red-600", "text-sm font-medium"])}">${ssrInterpolate(unref(stats).monthGrowth >= 0 ? "+" : "")}${ssrInterpolate(unref(stats).monthGrowth)}% </span><span class="text-gray-400 text-sm">vs mois dernier</span></div></div><div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100"><p class="text-gray-500 text-sm">Cette semaine</p><p class="text-2xl font-bold text-gray-900 mt-1">${ssrInterpolate(formatPrice(unref(stats).weekRevenue))}</p><p class="text-gray-400 text-sm mt-2">${ssrInterpolate(unref(stats).weekOrders)} commandes</p></div><div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100"><p class="text-gray-500 text-sm">Aujourd&#39;hui</p><p class="text-2xl font-bold text-gray-900 mt-1">${ssrInterpolate(formatPrice(unref(stats).todayRevenue))}</p><p class="text-gray-400 text-sm mt-2">${ssrInterpolate(unref(stats).todayOrders)} commandes</p></div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"><div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6"><h2 class="font-semibold text-gray-900 mb-4">Par statut de paiement</h2><div class="space-y-4"><!--[-->`);
      ssrRenderList(unref(paymentStats), (item) => {
        _push(`<div class="flex items-center gap-4"><div class="${ssrRenderClass(["w-3 h-3 rounded-full", item.color])}"></div><div class="flex-1"><div class="flex items-center justify-between mb-1"><span class="text-sm text-gray-700">${ssrInterpolate(item.label)}</span><span class="text-sm font-medium text-gray-900">${ssrInterpolate(formatPrice(item.amount))}</span></div><div class="h-2 bg-gray-100 rounded-full overflow-hidden"><div class="${ssrRenderClass(["h-full rounded-full", item.bgColor])}" style="${ssrRenderStyle({ width: item.percent + "%" })}"></div></div></div></div>`);
      });
      _push(`<!--]--></div></div><div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6"><h2 class="font-semibold text-gray-900 mb-4">Produits les plus vendus</h2><div class="space-y-3"><!--[-->`);
      ssrRenderList(unref(topProducts), (product, index) => {
        _push(`<div class="flex items-center gap-3"><span class="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600">${ssrInterpolate(index + 1)}</span><div class="flex-1"><p class="text-sm font-medium text-gray-900">${ssrInterpolate(product.title)}</p><p class="text-xs text-gray-500">${ssrInterpolate(product.quantity)} vendus</p></div><span class="text-sm font-semibold text-gray-900">${ssrInterpolate(formatPrice(product.revenue))}</span></div>`);
      });
      _push(`<!--]-->`);
      if (unref(topProducts).length === 0) {
        _push(`<div class="text-center py-4 text-gray-500 text-sm"> Pas encore de données </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div><div class="bg-white rounded-xl shadow-sm border border-gray-100"><div class="p-6 border-b border-gray-100 flex items-center justify-between"><h2 class="font-semibold text-gray-900">Transactions récentes</h2>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/commandes",
        class: "text-sm text-primary-600 hover:text-primary-700 font-medium"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Voir toutes → `);
          } else {
            return [
              createTextVNode(" Voir toutes → ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="divide-y divide-gray-100"><!--[-->`);
      ssrRenderList(unref(recentOrders), (order) => {
        _push(`<div class="p-4 flex items-center gap-4"><div class="${ssrRenderClass(["w-10 h-10 rounded-full flex items-center justify-center", getPaymentBg(order.payment_status)])}">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: getPaymentIcon(order.payment_status),
          class: ["w-5 h-5", getPaymentColor(order.payment_status)]
        }, null, _parent));
        _push(`</div><div class="flex-1"><p class="font-medium text-gray-900">#${ssrInterpolate(order.display_id || order.id.slice(0, 8).toUpperCase())}</p><p class="text-sm text-gray-500">${ssrInterpolate(order.customer_first_name)} ${ssrInterpolate(order.customer_last_name)}</p></div><div class="text-right"><p class="font-semibold text-gray-900">${ssrInterpolate(formatPrice(order.total))}</p><p class="text-xs text-gray-400">${ssrInterpolate(formatDateTime(order.created_at))}</p></div>`);
        _push(ssrRenderComponent(_component_UBadge, {
          color: getPaymentBadgeColor(order.payment_status),
          variant: "soft",
          size: "sm"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(getPaymentLabel(order.payment_status))}`);
            } else {
              return [
                createTextVNode(toDisplayString(getPaymentLabel(order.payment_status)), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div>`);
      });
      _push(`<!--]-->`);
      if (unref(recentOrders).length === 0) {
        _push(`<div class="p-8 text-center text-gray-500"> Aucune transaction récente </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/finances.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=finances-kSJkTzaT.js.map
