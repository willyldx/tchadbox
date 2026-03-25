import { c as useSeoMeta, i as useAuthStore, d as __nuxt_component_0 } from "../server.mjs";
import { defineComponent, ref, computed, withCtx, createTextVNode, unref, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass, ssrRenderStyle, ssrRenderAttr } from "vue/server-renderer";
import { ChevronRight, Package, ShoppingBag, ChevronLeft } from "lucide-vue-next";
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
const itemsPerPage = 10;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Mes commandes - TchadBox",
      description: "Consultez et suivez toutes vos commandes TchadBox."
    });
    useAuthStore();
    const orders = ref([]);
    const isLoading = ref(true);
    const statusFilter = ref("all");
    const currentPage = ref(1);
    const filteredOrders = computed(() => {
      if (statusFilter.value === "all") return orders.value;
      const statusMap = {
        pending: ["not_fulfilled", "partially_fulfilled"],
        shipped: ["fulfilled", "shipped"],
        delivered: ["delivered"]
      };
      return orders.value.filter(
        (o) => statusMap[statusFilter.value]?.includes(o.fulfillmentStatus)
      );
    });
    const totalPages = computed(() => Math.ceil(filteredOrders.value.length / itemsPerPage));
    const visiblePages = computed(() => {
      const pages = [];
      const start = Math.max(1, currentPage.value - 2);
      const end = Math.min(totalPages.value, currentPage.value + 2);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    });
    function formatDate(date) {
      return new Date(date).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric"
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
    function estimatedDelivery(orderDate) {
      const date = new Date(orderDate);
      date.setDate(date.getDate() + 14);
      return date.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "short"
      });
    }
    function getStatusLabel(status) {
      const labels = {
        not_fulfilled: "En préparation",
        partially_fulfilled: "Partiellement expédié",
        fulfilled: "Expédié",
        shipped: "En transit",
        delivered: "Livré"
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
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><nav class="flex items-center gap-2 text-sm mb-6">`);
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
      _push(`<span class="text-[var(--color-text)] font-medium">Mes commandes</span></nav><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"><div><h1 class="text-3xl font-bold text-[var(--color-text)]">Mes commandes</h1><p class="text-[var(--color-text-muted)] mt-1">${ssrInterpolate(unref(orders).length)} commande${ssrInterpolate(unref(orders).length > 1 ? "s" : "")} au total</p></div><div class="flex items-center gap-3"><select class="px-4 py-2 bg-white border border-[var(--color-border)] rounded-xl text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"><option value="all"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "all") : ssrLooseEqual(unref(statusFilter), "all")) ? " selected" : ""}>Tous les statuts</option><option value="pending"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "pending") : ssrLooseEqual(unref(statusFilter), "pending")) ? " selected" : ""}>En préparation</option><option value="shipped"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "shipped") : ssrLooseEqual(unref(statusFilter), "shipped")) ? " selected" : ""}>En transit</option><option value="delivered"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "delivered") : ssrLooseEqual(unref(statusFilter), "delivered")) ? " selected" : ""}>Livrés</option></select></div></div>`);
      if (unref(isLoading)) {
        _push(`<div class="space-y-4"><!--[-->`);
        ssrRenderList(3, (i) => {
          _push(`<div class="bg-white rounded-2xl border border-[var(--color-border)] p-6 animate-pulse"><div class="flex items-center gap-4"><div class="w-20 h-20 bg-gray-200 rounded-xl"></div><div class="flex-1"><div class="h-4 bg-gray-200 rounded w-32 mb-2"></div><div class="h-3 bg-gray-200 rounded w-48"></div></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else if (unref(filteredOrders).length === 0) {
        _push(`<div class="bg-white rounded-2xl border border-[var(--color-border)] p-12 text-center"><div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">`);
        _push(ssrRenderComponent(unref(Package), { class: "w-10 h-10 text-[var(--color-text-muted)]" }, null, _parent));
        _push(`</div><h3 class="text-lg font-semibold text-[var(--color-text)] mb-2">${ssrInterpolate(unref(statusFilter) === "all" ? "Aucune commande" : "Aucune commande avec ce statut")}</h3><p class="text-[var(--color-text-muted)] mb-6">${ssrInterpolate(unref(statusFilter) === "all" ? "Vous n'avez pas encore passé de commande." : "Essayez un autre filtre.")}</p>`);
        if (unref(statusFilter) === "all") {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/catalogue",
            class: "btn-gold"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(ShoppingBag), { class: "w-5 h-5" }, null, _parent2, _scopeId));
                _push2(` Découvrir nos produits `);
              } else {
                return [
                  createVNode(unref(ShoppingBag), { class: "w-5 h-5" }),
                  createTextVNode(" Découvrir nos produits ")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<div class="space-y-4"><!--[-->`);
        ssrRenderList(unref(filteredOrders), (order) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: order.id,
            to: `/compte/commandes/${order.id}`,
            class: "block bg-white rounded-2xl border border-[var(--color-border)] hover:border-[var(--color-border)] hover:shadow-lg transition-all overflow-hidden group"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 border-b border-[var(--color-border)]"${_scopeId}><div class="flex items-center gap-4"${_scopeId}><div class="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Package), { class: "w-6 h-6 text-amber-600" }, null, _parent2, _scopeId));
                _push2(`</div><div${_scopeId}><p class="font-semibold text-[var(--color-text)]"${_scopeId}>${ssrInterpolate(order.displayId)}</p><p class="text-sm text-[var(--color-text-muted)]"${_scopeId}>${ssrInterpolate(formatDate(order.createdAt))}</p></div></div><div class="flex items-center gap-4"${_scopeId}><span class="${ssrRenderClass([getStatusClass(order.fulfillmentStatus), "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium"])}"${_scopeId}><span class="${ssrRenderClass([getStatusDotClass(order.fulfillmentStatus), "w-2 h-2 rounded-full"])}"${_scopeId}></span> ${ssrInterpolate(getStatusLabel(order.fulfillmentStatus))}</span>`);
                _push2(ssrRenderComponent(unref(ChevronRight), { class: "w-5 h-5 text-[var(--color-text-muted)] group-hover:text-amber-500 transition-colors" }, null, _parent2, _scopeId));
                _push2(`</div></div><div class="p-6"${_scopeId}><div class="flex items-center gap-4"${_scopeId}><div class="flex -space-x-3"${_scopeId}><!--[-->`);
                ssrRenderList(order.items.slice(0, 4), (item, index) => {
                  _push2(`<div class="w-16 h-16 bg-gray-100 rounded-xl border-2 border-white flex items-center justify-center overflow-hidden" style="${ssrRenderStyle({ zIndex: 4 - index })}"${_scopeId}>`);
                  if (item.thumbnail) {
                    _push2(`<img${ssrRenderAttr("src", item.thumbnail)}${ssrRenderAttr("alt", item.title)} class="w-12 h-12 object-contain"${_scopeId}>`);
                  } else {
                    _push2(ssrRenderComponent(unref(Package), { class: "w-6 h-6 text-[var(--color-text-muted)]" }, null, _parent2, _scopeId));
                  }
                  _push2(`</div>`);
                });
                _push2(`<!--]-->`);
                if (order.items.length > 4) {
                  _push2(`<div class="w-16 h-16 bg-gray-200 rounded-xl border-2 border-white flex items-center justify-center text-sm font-medium text-[var(--color-text-secondary)]"${_scopeId}> +${ssrInterpolate(order.items.length - 4)}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><div class="flex-1 min-w-0"${_scopeId}><p class="text-sm text-[var(--color-text-secondary)] truncate"${_scopeId}>${ssrInterpolate(order.items.map((i) => i.title).join(", "))}</p><p class="text-sm text-[var(--color-text-muted)] mt-1"${_scopeId}>${ssrInterpolate(order.items.length)} article${ssrInterpolate(order.items.length > 1 ? "s" : "")}</p></div><div class="text-right"${_scopeId}><p class="text-lg font-bold text-[var(--color-text)]"${_scopeId}>${ssrInterpolate(formatPrice(order.total))}</p><p class="text-xs text-[var(--color-text-muted)]"${_scopeId}>${ssrInterpolate(formatFCFA(order.total))}</p></div></div>`);
                if (order.fulfillmentStatus === "shipped") {
                  _push2(`<div class="mt-6"${_scopeId}><div class="flex items-center justify-between text-xs text-[var(--color-text-muted)] mb-2"${_scopeId}><span${_scopeId}>En transit vers N&#39;Djamena</span><span${_scopeId}>Livraison estimée: ${ssrInterpolate(estimatedDelivery(order.createdAt))}</span></div><div class="h-2 bg-gray-100 rounded-full overflow-hidden"${_scopeId}><div class="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full w-2/3 animate-pulse"${_scopeId}></div></div></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              } else {
                return [
                  createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 border-b border-[var(--color-border)]" }, [
                    createVNode("div", { class: "flex items-center gap-4" }, [
                      createVNode("div", { class: "w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center" }, [
                        createVNode(unref(Package), { class: "w-6 h-6 text-amber-600" })
                      ]),
                      createVNode("div", null, [
                        createVNode("p", { class: "font-semibold text-[var(--color-text)]" }, toDisplayString(order.displayId), 1),
                        createVNode("p", { class: "text-sm text-[var(--color-text-muted)]" }, toDisplayString(formatDate(order.createdAt)), 1)
                      ])
                    ]),
                    createVNode("div", { class: "flex items-center gap-4" }, [
                      createVNode("span", {
                        class: ["inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium", getStatusClass(order.fulfillmentStatus)]
                      }, [
                        createVNode("span", {
                          class: ["w-2 h-2 rounded-full", getStatusDotClass(order.fulfillmentStatus)]
                        }, null, 2),
                        createTextVNode(" " + toDisplayString(getStatusLabel(order.fulfillmentStatus)), 1)
                      ], 2),
                      createVNode(unref(ChevronRight), { class: "w-5 h-5 text-[var(--color-text-muted)] group-hover:text-amber-500 transition-colors" })
                    ])
                  ]),
                  createVNode("div", { class: "p-6" }, [
                    createVNode("div", { class: "flex items-center gap-4" }, [
                      createVNode("div", { class: "flex -space-x-3" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(order.items.slice(0, 4), (item, index) => {
                          return openBlock(), createBlock("div", {
                            key: item.id,
                            class: "w-16 h-16 bg-gray-100 rounded-xl border-2 border-white flex items-center justify-center overflow-hidden",
                            style: { zIndex: 4 - index }
                          }, [
                            item.thumbnail ? (openBlock(), createBlock("img", {
                              key: 0,
                              src: item.thumbnail,
                              alt: item.title,
                              class: "w-12 h-12 object-contain"
                            }, null, 8, ["src", "alt"])) : (openBlock(), createBlock(unref(Package), {
                              key: 1,
                              class: "w-6 h-6 text-[var(--color-text-muted)]"
                            }))
                          ], 4);
                        }), 128)),
                        order.items.length > 4 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "w-16 h-16 bg-gray-200 rounded-xl border-2 border-white flex items-center justify-center text-sm font-medium text-[var(--color-text-secondary)]"
                        }, " +" + toDisplayString(order.items.length - 4), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "flex-1 min-w-0" }, [
                        createVNode("p", { class: "text-sm text-[var(--color-text-secondary)] truncate" }, toDisplayString(order.items.map((i) => i.title).join(", ")), 1),
                        createVNode("p", { class: "text-sm text-[var(--color-text-muted)] mt-1" }, toDisplayString(order.items.length) + " article" + toDisplayString(order.items.length > 1 ? "s" : ""), 1)
                      ]),
                      createVNode("div", { class: "text-right" }, [
                        createVNode("p", { class: "text-lg font-bold text-[var(--color-text)]" }, toDisplayString(formatPrice(order.total)), 1),
                        createVNode("p", { class: "text-xs text-[var(--color-text-muted)]" }, toDisplayString(formatFCFA(order.total)), 1)
                      ])
                    ]),
                    order.fulfillmentStatus === "shipped" ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "mt-6"
                    }, [
                      createVNode("div", { class: "flex items-center justify-between text-xs text-[var(--color-text-muted)] mb-2" }, [
                        createVNode("span", null, "En transit vers N'Djamena"),
                        createVNode("span", null, "Livraison estimée: " + toDisplayString(estimatedDelivery(order.createdAt)), 1)
                      ]),
                      createVNode("div", { class: "h-2 bg-gray-100 rounded-full overflow-hidden" }, [
                        createVNode("div", { class: "h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full w-2/3 animate-pulse" })
                      ])
                    ])) : createCommentVNode("", true)
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
      }
      if (unref(totalPages) > 1) {
        _push(`<div class="flex items-center justify-center gap-2 mt-8"><button${ssrIncludeBooleanAttr(unref(currentPage) === 1) ? " disabled" : ""} class="p-2 rounded-xl border border-[var(--color-border)] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">`);
        _push(ssrRenderComponent(unref(ChevronLeft), { class: "w-5 h-5" }, null, _parent));
        _push(`</button><!--[-->`);
        ssrRenderList(unref(visiblePages), (page) => {
          _push(`<button class="${ssrRenderClass([unref(currentPage) === page ? "bg-amber-500 text-white" : "border border-[var(--color-border)] hover:bg-gray-50 text-[var(--color-text-secondary)]", "w-10 h-10 rounded-xl font-medium transition-colors"])}">${ssrInterpolate(page)}</button>`);
        });
        _push(`<!--]--><button${ssrIncludeBooleanAttr(unref(currentPage) === unref(totalPages)) ? " disabled" : ""} class="p-2 rounded-xl border border-[var(--color-border)] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">`);
        _push(ssrRenderComponent(unref(ChevronRight), { class: "w-5 h-5" }, null, _parent));
        _push(`</button></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/compte/commandes/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-DuRbrxzO.js.map
