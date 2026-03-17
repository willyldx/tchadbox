import { _ as __nuxt_component_0 } from "./Input-CbX_cKiC.js";
import { e as _export_sfc, b as __nuxt_component_3, o as useUI, r as mergeConfig, q as appConfig, F as button, g as useToast, a as useHead, _ as __nuxt_component_3$2, d as __nuxt_component_0$1, n as navigateTo } from "../server.mjs";
import { _ as __nuxt_component_2 } from "./SelectMenu-Bc2TWh27.js";
import { _ as __nuxt_component_3$1 } from "./Table-DuRPAvLH.js";
import { _ as __nuxt_component_5 } from "./Badge-DHrI2Q_C.js";
import { _ as __nuxt_component_2$1 } from "./Dropdown-BUSRM3T8.js";
import { mergeProps, defineComponent, toRef, computed, useSSRContext, ref, isRef, unref, withCtx, createTextVNode, createVNode, openBlock, createBlock, toDisplayString } from "vue";
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as __nuxt_component_9 } from "./Modal-CfpZSCh7.js";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/hookable/dist/index.mjs";
import "tailwind-merge";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/defu/dist/defu.mjs";
import "./useFormGroup-C15lTjpg.js";
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
import "ohash/utils";
import "@clerk/vue";
import "@tanstack/vue-virtual";
import "./form-DsUILy5F.js";
import "./active-element-history-QtuHblWR.js";
import "./keyboard-BvysMIIh.js";
import "./usePopper-CIeS2-3g.js";
import "./hidden-CZ0WYEIB.js";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/scule/dist/index.mjs";
import "./description-DXB91rC2.js";
const pagination = {
  wrapper: "flex items-center -space-x-px",
  base: "",
  rounded: "first:rounded-s-md last:rounded-e-md",
  default: {
    size: "sm",
    activeButton: {
      color: "primary"
    },
    inactiveButton: {
      color: "white"
    },
    firstButton: {
      color: "white",
      class: "rtl:[&_span:first-child]:rotate-180",
      icon: "i-heroicons-chevron-double-left-20-solid"
    },
    lastButton: {
      color: "white",
      class: "rtl:[&_span:last-child]:rotate-180",
      icon: "i-heroicons-chevron-double-right-20-solid"
    },
    prevButton: {
      color: "white",
      class: "rtl:[&_span:first-child]:rotate-180",
      icon: "i-heroicons-chevron-left-20-solid"
    },
    nextButton: {
      color: "white",
      class: "rtl:[&_span:last-child]:rotate-180",
      icon: "i-heroicons-chevron-right-20-solid"
    }
  }
};
const config = mergeConfig(appConfig.ui.strategy, appConfig.ui.pagination, pagination);
const buttonConfig = mergeConfig(appConfig.ui.strategy, appConfig.ui.button, button);
const _sfc_main$1 = defineComponent({
  components: {
    UButton: __nuxt_component_3
  },
  inheritAttrs: false,
  props: {
    modelValue: {
      type: Number,
      required: true
    },
    pageCount: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      default: 7,
      validate(value) {
        return value >= 5 && value < Number.MAX_VALUE;
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: () => config.default.size,
      validator(value) {
        return Object.keys(buttonConfig.size).includes(value);
      }
    },
    to: {
      type: Function,
      default: null
    },
    activeButton: {
      type: Object,
      default: () => config.default.activeButton
    },
    inactiveButton: {
      type: Object,
      default: () => config.default.inactiveButton
    },
    showFirst: {
      type: Boolean,
      default: false
    },
    showLast: {
      type: Boolean,
      default: false
    },
    firstButton: {
      type: Object,
      default: () => config.default.firstButton
    },
    lastButton: {
      type: Object,
      default: () => config.default.lastButton
    },
    prevButton: {
      type: Object,
      default: () => config.default.prevButton
    },
    nextButton: {
      type: Object,
      default: () => config.default.nextButton
    },
    divider: {
      type: String,
      default: "…"
    },
    class: {
      type: [String, Object, Array],
      default: () => ""
    },
    ui: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const { ui, attrs } = useUI("pagination", toRef(props, "ui"), config, toRef(props, "class"));
    const currentPage = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit("update:modelValue", value);
      }
    });
    const pages = computed(() => Array.from({ length: Math.ceil(props.total / props.pageCount) }, (_, i) => i + 1));
    const displayedPages = computed(() => {
      const totalPages = pages.value.length;
      const current = currentPage.value;
      const maxDisplayedPages = Math.max(props.max, 5);
      const r = Math.floor((Math.min(maxDisplayedPages, totalPages) - 5) / 2);
      const r1 = current - r;
      const r2 = current + r;
      const beforeWrapped = r1 - 1 > 1;
      const afterWrapped = r2 + 1 < totalPages;
      const items = [];
      if (totalPages <= maxDisplayedPages) {
        for (let i = 1; i <= totalPages; i++) {
          items.push(i);
        }
        return items;
      }
      items.push(1);
      if (beforeWrapped) items.push(props.divider);
      if (!afterWrapped) {
        const addedItems = current + r + 2 - totalPages;
        for (let i = current - r - addedItems; i <= current - r - 1; i++) {
          items.push(i);
        }
      }
      for (let i = Math.max(2, r1); i <= Math.min(totalPages, r2); i++) {
        items.push(i);
      }
      if (!beforeWrapped) {
        const addedItems = 1 - (current - r - 2);
        for (let i = current + r + 1; i <= current + r + addedItems; i++) {
          items.push(i);
        }
      }
      if (afterWrapped) items.push(props.divider);
      if (r2 < totalPages) {
        items.push(totalPages);
      }
      if (items.length >= 3 && items[1] === props.divider && items[2] === 3) {
        items[1] = 2;
      }
      if (items.length >= 3 && items[items.length - 2] === props.divider && items[items.length - 1] === items.length) {
        items[items.length - 2] = items.length - 1;
      }
      return items;
    });
    const canGoFirstOrPrev = computed(() => currentPage.value > 1);
    const canGoLastOrNext = computed(() => currentPage.value < pages.value.length);
    function onClickFirst() {
      if (!canGoFirstOrPrev.value) {
        return;
      }
      currentPage.value = 1;
    }
    function onClickLast() {
      if (!canGoLastOrNext.value) {
        return;
      }
      currentPage.value = pages.value.length;
    }
    function onClickPage(page) {
      if (typeof page === "string") {
        return;
      }
      currentPage.value = page;
    }
    function onClickPrev() {
      if (!canGoFirstOrPrev.value) {
        return;
      }
      currentPage.value--;
    }
    function onClickNext() {
      if (!canGoLastOrNext.value) {
        return;
      }
      currentPage.value++;
    }
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,
      currentPage,
      pages,
      displayedPages,
      canGoLastOrNext,
      canGoFirstOrPrev,
      onClickPrev,
      onClickNext,
      onClickPage,
      onClickFirst,
      onClickLast
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_UButton = __nuxt_component_3;
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: _ctx.ui.wrapper
  }, _ctx.attrs, _attrs))}>`);
  ssrRenderSlot(_ctx.$slots, "first", {
    onClick: _ctx.onClickFirst,
    canGoFirst: _ctx.canGoFirstOrPrev
  }, () => {
    if (_ctx.firstButton && _ctx.showFirst) {
      _push(ssrRenderComponent(_component_UButton, mergeProps({
        size: _ctx.size,
        to: _ctx.to?.(1),
        disabled: !_ctx.canGoFirstOrPrev || _ctx.disabled,
        class: [_ctx.ui.base, _ctx.ui.rounded]
      }, { ..._ctx.ui.default.firstButton || {}, ..._ctx.firstButton }, {
        ui: { rounded: "" },
        "aria-label": "First",
        onClick: _ctx.onClickFirst
      }), null, _parent));
    } else {
      _push(`<!---->`);
    }
  }, _push, _parent);
  ssrRenderSlot(_ctx.$slots, "prev", {
    onClick: _ctx.onClickPrev,
    canGoPrev: _ctx.canGoFirstOrPrev
  }, () => {
    if (_ctx.prevButton) {
      _push(ssrRenderComponent(_component_UButton, mergeProps({
        size: _ctx.size,
        to: _ctx.to?.(_ctx.currentPage - 1),
        disabled: !_ctx.canGoFirstOrPrev || _ctx.disabled,
        class: [_ctx.ui.base, _ctx.ui.rounded]
      }, { ..._ctx.ui.default.prevButton || {}, ..._ctx.prevButton }, {
        ui: { rounded: "" },
        "aria-label": "Prev",
        onClick: _ctx.onClickPrev
      }), null, _parent));
    } else {
      _push(`<!---->`);
    }
  }, _push, _parent);
  _push(`<!--[-->`);
  ssrRenderList(_ctx.displayedPages, (page, index) => {
    _push(ssrRenderComponent(_component_UButton, mergeProps({
      key: `${page}-${index}`,
      to: typeof page === "number" ? _ctx.to?.(page) : null,
      size: _ctx.size,
      disabled: _ctx.disabled,
      label: `${page}`
    }, { ref_for: true }, page === _ctx.currentPage ? { ..._ctx.ui.default.activeButton || {}, ..._ctx.activeButton } : { ..._ctx.ui.default.inactiveButton || {}, ..._ctx.inactiveButton }, {
      class: [{ "pointer-events-none": typeof page === "string", "z-[1]": page === _ctx.currentPage }, _ctx.ui.base, _ctx.ui.rounded],
      ui: { rounded: "" },
      onClick: () => _ctx.onClickPage(page)
    }), null, _parent));
  });
  _push(`<!--]-->`);
  ssrRenderSlot(_ctx.$slots, "next", {
    onClick: _ctx.onClickNext,
    canGoNext: _ctx.canGoLastOrNext
  }, () => {
    if (_ctx.nextButton) {
      _push(ssrRenderComponent(_component_UButton, mergeProps({
        size: _ctx.size,
        to: _ctx.to?.(_ctx.currentPage + 1),
        disabled: !_ctx.canGoLastOrNext || _ctx.disabled,
        class: [_ctx.ui.base, _ctx.ui.rounded]
      }, { ..._ctx.ui.default.nextButton || {}, ..._ctx.nextButton }, {
        ui: { rounded: "" },
        "aria-label": "Next",
        onClick: _ctx.onClickNext
      }), null, _parent));
    } else {
      _push(`<!---->`);
    }
  }, _push, _parent);
  ssrRenderSlot(_ctx.$slots, "last", {
    onClick: _ctx.onClickLast,
    canGoLast: _ctx.canGoLastOrNext
  }, () => {
    if (_ctx.lastButton && _ctx.showLast) {
      _push(ssrRenderComponent(_component_UButton, mergeProps({
        size: _ctx.size,
        to: _ctx.to?.(_ctx.pages.length),
        disabled: !_ctx.canGoLastOrNext || _ctx.disabled,
        class: [_ctx.ui.base, _ctx.ui.rounded]
      }, { ..._ctx.ui.default.lastButton || {}, ..._ctx.lastButton }, {
        ui: { rounded: "" },
        "aria-label": "Last",
        onClick: _ctx.onClickLast
      }), null, _parent));
    } else {
      _push(`<!---->`);
    }
  }, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/navigation/Pagination.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_8 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const pageSize = 20;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { client } = useSupabase();
    const toast = useToast();
    const loading = ref(true);
    const orders = ref([]);
    const search = ref("");
    const statusFilter = ref(null);
    const fulfillmentFilter = ref(null);
    const currentPage = ref(1);
    const showAssignModal = ref(false);
    const selectedOrder = ref(null);
    const selectedLivreur = ref(null);
    const livreurs = ref([]);
    const assigning = ref(false);
    const columns = [
      { key: "display_id", label: "ID" },
      { key: "customer", label: "Client" },
      { key: "recipient", label: "Destinataire" },
      { key: "status", label: "Statut" },
      { key: "fulfillment", label: "Livraison" },
      { key: "total", label: "Total" },
      { key: "date", label: "Date" },
      { key: "assigned", label: "Livreur" },
      { key: "actions", label: "" }
    ];
    const statusOptions = [
      { label: "Tous", value: null },
      { label: "En attente", value: "pending" },
      { label: "En cours", value: "processing" },
      { label: "Terminé", value: "completed" },
      { label: "Annulé", value: "cancelled" }
    ];
    const fulfillmentOptions = [
      { label: "Tous", value: null },
      { label: "Non traité", value: "not_fulfilled" },
      { label: "Prêt", value: "fulfilled" },
      { label: "En livraison", value: "shipped" },
      { label: "Livré", value: "delivered" }
    ];
    const hasActiveFilters = computed(() => {
      return statusFilter.value || fulfillmentFilter.value || search.value;
    });
    const filteredOrders = computed(() => {
      let result = orders.value;
      if (search.value) {
        const s = search.value.toLowerCase();
        result = result.filter(
          (o) => (o.display_id || o.id)?.toLowerCase().includes(s) || o.email?.toLowerCase().includes(s) || o.customer_first_name?.toLowerCase().includes(s) || o.customer_last_name?.toLowerCase().includes(s) || o.recipient_name?.toLowerCase().includes(s)
        );
      }
      if (statusFilter.value) {
        result = result.filter((o) => o.status === statusFilter.value);
      }
      if (fulfillmentFilter.value) {
        result = result.filter((o) => o.fulfillment_status === fulfillmentFilter.value);
      }
      return result;
    });
    const totalPages = computed(() => Math.ceil(filteredOrders.value.length / pageSize));
    const fetchOrders = async () => {
      loading.value = true;
      try {
        const { data, error } = await client.rpc("get_all_orders");
        if (error) throw error;
        orders.value = data || [];
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.add({ title: "Erreur", description: "Impossible de charger les commandes", color: "red" });
      } finally {
        loading.value = false;
      }
    };
    const openAssignModal = (order) => {
      selectedOrder.value = order;
      selectedLivreur.value = order.assigned_to || null;
      showAssignModal.value = true;
    };
    const assignLivreur = async () => {
      if (!selectedOrder.value || !selectedLivreur.value) return;
      assigning.value = true;
      try {
        const { error } = await client.rpc("assign_delivery_agent", {
          order_id: selectedOrder.value.id,
          agent_id: selectedLivreur.value
        });
        if (error) throw error;
        toast.add({ title: "Succès", description: "Livreur assigné avec succès", color: "green" });
        showAssignModal.value = false;
        fetchOrders();
      } catch (error) {
        console.error("Error assigning livreur:", error);
        toast.add({ title: "Erreur", description: "Impossible d'assigner le livreur", color: "red" });
      } finally {
        assigning.value = false;
      }
    };
    const getRowActions = (row) => [
      [{
        label: "Voir détails",
        icon: "i-lucide-eye",
        click: () => navigateTo(`/admin/commandes/${row.id}`)
      }],
      [{
        label: "Assigner livreur",
        icon: "i-lucide-truck",
        click: () => openAssignModal(row)
      }]
    ];
    const clearFilters = () => {
      search.value = "";
      statusFilter.value = null;
      fulfillmentFilter.value = null;
    };
    const formatPrice = (amount) => {
      return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(amount || 0);
    };
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
    };
    const getStatusColor = (status) => {
      const colors = {
        pending: "amber",
        processing: "blue",
        completed: "green",
        cancelled: "red"
      };
      return colors[status] || "gray";
    };
    const getStatusLabel = (status) => {
      const labels = {
        pending: "En attente",
        processing: "En cours",
        completed: "Terminé",
        cancelled: "Annulé"
      };
      return labels[status] || status;
    };
    const getFulfillmentColor = (status) => {
      const colors = {
        not_fulfilled: "gray",
        fulfilled: "cyan",
        shipped: "indigo",
        delivered: "green"
      };
      return colors[status] || "gray";
    };
    const getFulfillmentLabel = (status) => {
      const labels = {
        not_fulfilled: "Non traité",
        fulfilled: "Prêt",
        shipped: "En livraison",
        delivered: "Livré"
      };
      return labels[status] || status;
    };
    useHead({
      title: "Commandes - Admin TchadBox"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UInput = __nuxt_component_0;
      const _component_UButton = __nuxt_component_3;
      const _component_USelectMenu = __nuxt_component_2;
      const _component_UTable = __nuxt_component_3$1;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_UBadge = __nuxt_component_5;
      const _component_Icon = __nuxt_component_3$2;
      const _component_UDropdown = __nuxt_component_2$1;
      const _component_UPagination = __nuxt_component_8;
      const _component_UModal = __nuxt_component_9;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"><div><h1 class="text-2xl font-bold text-gray-900">Commandes</h1><p class="text-gray-500 mt-1">Gérez toutes les commandes</p></div><div class="flex items-center gap-3">`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(search),
        "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
        placeholder: "Rechercher...",
        icon: "i-lucide-search",
        class: "w-64"
      }, null, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        onClick: fetchOrders,
        color: "gray",
        variant: "outline",
        icon: "i-lucide-refresh-cw"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Actualiser `);
          } else {
            return [
              createTextVNode(" Actualiser ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6"><div class="flex flex-wrap items-center gap-4">`);
      _push(ssrRenderComponent(_component_USelectMenu, {
        modelValue: unref(statusFilter),
        "onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null,
        options: statusOptions,
        placeholder: "Statut",
        class: "w-40"
      }, null, _parent));
      _push(ssrRenderComponent(_component_USelectMenu, {
        modelValue: unref(fulfillmentFilter),
        "onUpdate:modelValue": ($event) => isRef(fulfillmentFilter) ? fulfillmentFilter.value = $event : null,
        options: fulfillmentOptions,
        placeholder: "Livraison",
        class: "w-40"
      }, null, _parent));
      if (unref(hasActiveFilters)) {
        _push(ssrRenderComponent(_component_UButton, {
          onClick: clearFilters,
          color: "gray",
          variant: "ghost",
          size: "sm"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Effacer les filtres `);
            } else {
              return [
                createTextVNode(" Effacer les filtres ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">`);
      _push(ssrRenderComponent(_component_UTable, {
        columns,
        rows: unref(filteredOrders),
        loading: unref(loading),
        "empty-state": { icon: "i-lucide-package", label: "Aucune commande trouvée" }
      }, {
        "display_id-data": withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: `/admin/commandes/${row.id}`,
              class: "font-medium text-primary-600 hover:text-primary-700"
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` #${ssrInterpolate(row.display_id || row.id.slice(0, 8).toUpperCase())}`);
                } else {
                  return [
                    createTextVNode(" #" + toDisplayString(row.display_id || row.id.slice(0, 8).toUpperCase()), 1)
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtLink, {
                to: `/admin/commandes/${row.id}`,
                class: "font-medium text-primary-600 hover:text-primary-700"
              }, {
                default: withCtx(() => [
                  createTextVNode(" #" + toDisplayString(row.display_id || row.id.slice(0, 8).toUpperCase()), 1)
                ]),
                _: 2
              }, 1032, ["to"])
            ];
          }
        }),
        "customer-data": withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}><p class="font-medium text-gray-900"${_scopeId}>${ssrInterpolate(row.customer_first_name)} ${ssrInterpolate(row.customer_last_name)}</p><p class="text-xs text-gray-500"${_scopeId}>${ssrInterpolate(row.email)}</p></div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode("p", { class: "font-medium text-gray-900" }, toDisplayString(row.customer_first_name) + " " + toDisplayString(row.customer_last_name), 1),
                createVNode("p", { class: "text-xs text-gray-500" }, toDisplayString(row.email), 1)
              ])
            ];
          }
        }),
        "recipient-data": withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}><p class="font-medium text-gray-900"${_scopeId}>${ssrInterpolate(row.recipient_name || "-")}</p><p class="text-xs text-gray-500"${_scopeId}>${ssrInterpolate(row.recipient_phone || "-")}</p></div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode("p", { class: "font-medium text-gray-900" }, toDisplayString(row.recipient_name || "-"), 1),
                createVNode("p", { class: "text-xs text-gray-500" }, toDisplayString(row.recipient_phone || "-"), 1)
              ])
            ];
          }
        }),
        "status-data": withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UBadge, {
              color: getStatusColor(row.status),
              variant: "soft",
              size: "sm"
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(getStatusLabel(row.status))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(getStatusLabel(row.status)), 1)
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UBadge, {
                color: getStatusColor(row.status),
                variant: "soft",
                size: "sm"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(getStatusLabel(row.status)), 1)
                ]),
                _: 2
              }, 1032, ["color"])
            ];
          }
        }),
        "fulfillment-data": withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UBadge, {
              color: getFulfillmentColor(row.fulfillment_status),
              variant: "soft",
              size: "sm"
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(getFulfillmentLabel(row.fulfillment_status))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(getFulfillmentLabel(row.fulfillment_status)), 1)
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UBadge, {
                color: getFulfillmentColor(row.fulfillment_status),
                variant: "soft",
                size: "sm"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(getFulfillmentLabel(row.fulfillment_status)), 1)
                ]),
                _: 2
              }, 1032, ["color"])
            ];
          }
        }),
        "total-data": withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="font-semibold text-gray-900"${_scopeId}>${ssrInterpolate(formatPrice(row.total))}</span>`);
          } else {
            return [
              createVNode("span", { class: "font-semibold text-gray-900" }, toDisplayString(formatPrice(row.total)), 1)
            ];
          }
        }),
        "date-data": withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(formatDate(row.created_at))}</span>`);
          } else {
            return [
              createVNode("span", { class: "text-sm text-gray-500" }, toDisplayString(formatDate(row.created_at)), 1)
            ];
          }
        }),
        "assigned-data": withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (row.assigned_to) {
              _push2(`<div class="flex items-center gap-2"${_scopeId}><div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: "lucide:user",
                class: "w-3 h-3 text-green-600"
              }, null, _parent2, _scopeId));
              _push2(`</div><span class="text-sm text-gray-700"${_scopeId}>Assigné</span></div>`);
            } else {
              _push2(`<span class="text-sm text-gray-400"${_scopeId}>-</span>`);
            }
          } else {
            return [
              row.assigned_to ? (openBlock(), createBlock("div", {
                key: 0,
                class: "flex items-center gap-2"
              }, [
                createVNode("div", { class: "w-6 h-6 rounded-full bg-green-100 flex items-center justify-center" }, [
                  createVNode(_component_Icon, {
                    name: "lucide:user",
                    class: "w-3 h-3 text-green-600"
                  })
                ]),
                createVNode("span", { class: "text-sm text-gray-700" }, "Assigné")
              ])) : (openBlock(), createBlock("span", {
                key: 1,
                class: "text-sm text-gray-400"
              }, "-"))
            ];
          }
        }),
        "actions-data": withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UDropdown, {
              items: getRowActions(row),
              popper: { placement: "bottom-end" }
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UButton, {
                    color: "gray",
                    variant: "ghost",
                    icon: "i-lucide-more-vertical",
                    size: "sm"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UButton, {
                      color: "gray",
                      variant: "ghost",
                      icon: "i-lucide-more-vertical",
                      size: "sm"
                    })
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UDropdown, {
                items: getRowActions(row),
                popper: { placement: "bottom-end" }
              }, {
                default: withCtx(() => [
                  createVNode(_component_UButton, {
                    color: "gray",
                    variant: "ghost",
                    icon: "i-lucide-more-vertical",
                    size: "sm"
                  })
                ]),
                _: 1
              }, 8, ["items"])
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(totalPages) > 1) {
        _push(`<div class="border-t border-gray-100 px-4 py-3 flex items-center justify-between"><p class="text-sm text-gray-500">${ssrInterpolate(unref(filteredOrders).length)} commande(s) sur ${ssrInterpolate(unref(orders).length)}</p>`);
        _push(ssrRenderComponent(_component_UPagination, {
          modelValue: unref(currentPage),
          "onUpdate:modelValue": ($event) => isRef(currentPage) ? currentPage.value = $event : null,
          total: unref(totalPages),
          "page-count": pageSize
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_component_UModal, {
        modelValue: unref(showAssignModal),
        "onUpdate:modelValue": ($event) => isRef(showAssignModal) ? showAssignModal.value = $event : null
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-6"${_scopeId}><h3 class="text-lg font-semibold text-gray-900 mb-4"${_scopeId}>Assigner un livreur</h3><p class="text-sm text-gray-500 mb-4"${_scopeId}> Commande #${ssrInterpolate(unref(selectedOrder)?.display_id || unref(selectedOrder)?.id?.slice(0, 8).toUpperCase())}</p>`);
            _push2(ssrRenderComponent(_component_USelectMenu, {
              modelValue: unref(selectedLivreur),
              "onUpdate:modelValue": ($event) => isRef(selectedLivreur) ? selectedLivreur.value = $event : null,
              options: unref(livreurs),
              "option-attribute": "label",
              "value-attribute": "value",
              placeholder: "Sélectionner un livreur",
              class: "mb-4"
            }, null, _parent2, _scopeId));
            _push2(`<div class="flex justify-end gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              color: "gray",
              variant: "outline",
              onClick: ($event) => showAssignModal.value = false
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Annuler `);
                } else {
                  return [
                    createTextVNode(" Annuler ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UButton, {
              color: "primary",
              loading: unref(assigning),
              onClick: assignLivreur
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Assigner `);
                } else {
                  return [
                    createTextVNode(" Assigner ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-6" }, [
                createVNode("h3", { class: "text-lg font-semibold text-gray-900 mb-4" }, "Assigner un livreur"),
                createVNode("p", { class: "text-sm text-gray-500 mb-4" }, " Commande #" + toDisplayString(unref(selectedOrder)?.display_id || unref(selectedOrder)?.id?.slice(0, 8).toUpperCase()), 1),
                createVNode(_component_USelectMenu, {
                  modelValue: unref(selectedLivreur),
                  "onUpdate:modelValue": ($event) => isRef(selectedLivreur) ? selectedLivreur.value = $event : null,
                  options: unref(livreurs),
                  "option-attribute": "label",
                  "value-attribute": "value",
                  placeholder: "Sélectionner un livreur",
                  class: "mb-4"
                }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                createVNode("div", { class: "flex justify-end gap-3" }, [
                  createVNode(_component_UButton, {
                    color: "gray",
                    variant: "outline",
                    onClick: ($event) => showAssignModal.value = false
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Annuler ")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(_component_UButton, {
                    color: "primary",
                    loading: unref(assigning),
                    onClick: assignLivreur
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Assigner ")
                    ]),
                    _: 1
                  }, 8, ["loading"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/commandes/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-DRyvJhWe.js.map
