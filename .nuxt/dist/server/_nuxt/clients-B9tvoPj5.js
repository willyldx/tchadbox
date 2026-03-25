import { _ as __nuxt_component_0 } from "./Input-L-ABqH2D.js";
import { _ as __nuxt_component_3 } from "./Table-nMeZyDe_.js";
import { defineComponent, ref, computed, isRef, unref, withCtx, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/hookable/dist/index.mjs";
import { g as useToast, a as useHead } from "../server.mjs";
import "tailwind-merge";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/defu/dist/defu.mjs";
import "./useFormGroup-DTWlat5q.js";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/klona/dist/index.mjs";
import "#internal/nuxt/paths";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/scule/dist/index.mjs";
import "ohash/utils";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/ofetch/dist/node.mjs";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/unctx/dist/index.mjs";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/h3/dist/index.mjs";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/ufo/dist/index.mjs";
import "vue-router";
import "framesync";
import "popmotion";
import "style-value-types";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/@unhead/vue/dist/index.mjs";
import "@iconify/vue";
import "lucide-vue-next";
import "@iconify/utils/lib/css/icon";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/nuxt/node_modules/perfect-debounce/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "clients",
  __ssrInlineRender: true,
  setup(__props) {
    useToast();
    const loading = ref(true);
    const search = ref("");
    const clients = ref([]);
    const columns = [
      { key: "name", label: "Client" },
      { key: "phone", label: "Téléphone" },
      { key: "orders", label: "Commandes" },
      { key: "spent", label: "Total dépensé" },
      { key: "joined", label: "Inscrit le" }
    ];
    const filteredClients = computed(() => {
      if (!search.value) return clients.value;
      const s = search.value.toLowerCase();
      return clients.value.filter(
        (c) => c.first_name?.toLowerCase().includes(s) || c.last_name?.toLowerCase().includes(s) || c.email?.toLowerCase().includes(s)
      );
    });
    const newThisMonth = computed(() => {
      const firstOfMonth = /* @__PURE__ */ new Date();
      firstOfMonth.setDate(1);
      firstOfMonth.setHours(0, 0, 0, 0);
      return clients.value.filter((c) => new Date(c.created_at) >= firstOfMonth).length;
    });
    const activeClients = computed(() => {
      return clients.value.filter((c) => (c.totalOrders || 0) > 0).length;
    });
    const getInitials = (client) => {
      return ((client.first_name?.[0] || "") + (client.last_name?.[0] || "")).toUpperCase() || "?";
    };
    const formatPrice = (amount) => {
      return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(amount);
    };
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
    };
    useHead({
      title: "Clients - Admin TchadBox"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UInput = __nuxt_component_0;
      const _component_UTable = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"><div><h1 class="text-2xl font-bold text-gray-900">Clients</h1><p class="text-gray-500 mt-1">Liste des clients de la diaspora</p></div>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(search),
        "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
        placeholder: "Rechercher...",
        icon: "i-lucide-search",
        class: "w-64"
      }, null, _parent));
      _push(`</div><div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"><div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100"><p class="text-sm text-gray-500">Total clients</p><p class="text-2xl font-bold text-gray-900">${ssrInterpolate(unref(clients).length)}</p></div><div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100"><p class="text-sm text-gray-500">Nouveaux ce mois</p><p class="text-2xl font-bold text-green-600">${ssrInterpolate(unref(newThisMonth))}</p></div><div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100"><p class="text-sm text-gray-500">Clients actifs</p><p class="text-2xl font-bold text-primary-600">${ssrInterpolate(unref(activeClients))}</p></div></div><div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">`);
      _push(ssrRenderComponent(_component_UTable, {
        columns,
        rows: unref(filteredClients),
        loading: unref(loading),
        "empty-state": { icon: "i-lucide-users", label: "Aucun client trouvé" }
      }, {
        "name-data": withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-3"${_scopeId}><div class="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center"${_scopeId}><span class="text-sm font-semibold text-primary-700"${_scopeId}>${ssrInterpolate(getInitials(row))}</span></div><div${_scopeId}><p class="font-medium text-gray-900"${_scopeId}>${ssrInterpolate(row.first_name)} ${ssrInterpolate(row.last_name)}</p><p class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(row.email)}</p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-3" }, [
                createVNode("div", { class: "w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center" }, [
                  createVNode("span", { class: "text-sm font-semibold text-primary-700" }, toDisplayString(getInitials(row)), 1)
                ]),
                createVNode("div", null, [
                  createVNode("p", { class: "font-medium text-gray-900" }, toDisplayString(row.first_name) + " " + toDisplayString(row.last_name), 1),
                  createVNode("p", { class: "text-sm text-gray-500" }, toDisplayString(row.email), 1)
                ])
              ])
            ];
          }
        }),
        "phone-data": withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="text-sm text-gray-600"${_scopeId}>${ssrInterpolate(row.phone || "-")}</span>`);
          } else {
            return [
              createVNode("span", { class: "text-sm text-gray-600" }, toDisplayString(row.phone || "-"), 1)
            ];
          }
        }),
        "orders-data": withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="font-medium text-gray-900"${_scopeId}>${ssrInterpolate(row.totalOrders || 0)}</span>`);
          } else {
            return [
              createVNode("span", { class: "font-medium text-gray-900" }, toDisplayString(row.totalOrders || 0), 1)
            ];
          }
        }),
        "spent-data": withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="font-semibold text-gray-900"${_scopeId}>${ssrInterpolate(formatPrice(row.totalSpent || 0))}</span>`);
          } else {
            return [
              createVNode("span", { class: "font-semibold text-gray-900" }, toDisplayString(formatPrice(row.totalSpent || 0)), 1)
            ];
          }
        }),
        "joined-data": withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(formatDate(row.created_at))}</span>`);
          } else {
            return [
              createVNode("span", { class: "text-sm text-gray-500" }, toDisplayString(formatDate(row.created_at)), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/clients.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=clients-B9tvoPj5.js.map
