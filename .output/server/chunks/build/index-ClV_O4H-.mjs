import { d as useSeoMeta, i as useAuthStore, e as __nuxt_component_0$4 } from './server.mjs';
import { defineComponent, reactive, ref, unref, withCtx, createVNode, resolveDynamicComponent, openBlock, createBlock, toDisplayString, createCommentVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent, ssrRenderVNode, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
import { Package, ShoppingBag, User, MapPin, Heart, LogOut, Truck, CheckCircle, ChevronRight, Plus, Search } from 'lucide-vue-next';
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
import '@clerk/vue';
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
    useSeoMeta({
      title: "Mon compte - TchadBox",
      description: "G\xE9rez votre compte TchadBox, suivez vos commandes et vos colis."
    });
    const authStore = useAuthStore();
    const navItems = [
      { to: "/compte", label: "Tableau de bord", icon: Package },
      { to: "/compte/commandes", label: "Mes commandes", icon: ShoppingBag, badge: null },
      { to: "/compte/profil", label: "Mon profil", icon: User },
      { to: "/compte/adresses", label: "Adresses", icon: MapPin },
      { to: "/favoris", label: "Favoris", icon: Heart }
    ];
    const stats = reactive({
      totalOrders: 0,
      inProgress: 0,
      delivered: 0
    });
    const recentOrders = ref([]);
    function formatDate(date) {
      return new Date(date).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "short",
        year: "numeric"
      });
    }
    function formatPrice(amount) {
      return new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR"
      }).format(amount);
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
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><div class="mb-8"><h1 class="text-3xl font-bold text-[var(--color-text)]">Mon compte</h1><p class="text-[var(--color-text-muted)] mt-1">Bienvenue, ${ssrInterpolate(unref(authStore).fullName || "cher client")}</p></div><div class="grid lg:grid-cols-4 gap-8"><div class="lg:col-span-1"><nav class="card overflow-hidden"><div class="p-6 border-b border-[var(--color-border)]"><div class="flex items-center gap-4"><div class="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-amber-500/25">${ssrInterpolate(unref(authStore).initials)}</div><div><p class="font-semibold text-[var(--color-text)]">${ssrInterpolate(unref(authStore).fullName)}</p><p class="text-sm text-[var(--color-text-muted)]">${ssrInterpolate((_a = unref(authStore).user) == null ? void 0 : _a.email)}</p></div></div></div><ul class="p-2"><!--[-->`);
      ssrRenderList(navItems, (item) => {
        _push(`<li>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: item.to,
          class: ["flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--color-text-secondary)] hover:bg-amber-50 hover:text-amber-700 transition-colors", { "bg-amber-50 text-amber-700 font-medium": _ctx.$route.path === item.to }]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(item.icon), { class: "w-5 h-5" }, null), _parent2, _scopeId);
              _push2(`<span${_scopeId}>${ssrInterpolate(item.label)}</span>`);
              if (item.badge) {
                _push2(`<span class="ml-auto bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full"${_scopeId}>${ssrInterpolate(item.badge)}</span>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                (openBlock(), createBlock(resolveDynamicComponent(item.icon), { class: "w-5 h-5" })),
                createVNode("span", null, toDisplayString(item.label), 1),
                item.badge ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "ml-auto bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full"
                }, toDisplayString(item.badge), 1)) : createCommentVNode("", true)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul><div class="p-2 border-t border-[var(--color-border)]"><button class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors">`);
      _push(ssrRenderComponent(unref(LogOut), { class: "w-5 h-5" }, null, _parent));
      _push(`<span>D\xE9connexion</span></button></div></nav></div><div class="lg:col-span-3 space-y-8"><div class="grid sm:grid-cols-3 gap-4"><div class="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] p-6"><div class="flex items-center justify-between mb-4"><div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">`);
      _push(ssrRenderComponent(unref(Package), { class: "w-6 h-6 text-blue-600" }, null, _parent));
      _push(`</div><span class="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">Ce mois</span></div><p class="text-3xl font-bold text-[var(--color-text)]">${ssrInterpolate(unref(stats).totalOrders)}</p><p class="text-sm text-[var(--color-text-muted)] mt-1">Commandes totales</p></div><div class="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] p-6"><div class="flex items-center justify-between mb-4"><div class="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">`);
      _push(ssrRenderComponent(unref(Truck), { class: "w-6 h-6 text-amber-600" }, null, _parent));
      _push(`</div><span class="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">En cours</span></div><p class="text-3xl font-bold text-[var(--color-text)]">${ssrInterpolate(unref(stats).inProgress)}</p><p class="text-sm text-[var(--color-text-muted)] mt-1">En transit</p></div><div class="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] p-6"><div class="flex items-center justify-between mb-4"><div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">`);
      _push(ssrRenderComponent(unref(CheckCircle), { class: "w-6 h-6 text-green-600" }, null, _parent));
      _push(`</div><span class="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">Livr\xE9s</span></div><p class="text-3xl font-bold text-[var(--color-text)]">${ssrInterpolate(unref(stats).delivered)}</p><p class="text-sm text-[var(--color-text-muted)] mt-1">Colis livr\xE9s</p></div></div><div class="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] overflow-hidden"><div class="flex items-center justify-between p-6 border-b border-[var(--color-border)]"><h2 class="text-lg font-semibold text-[var(--color-text)]">Commandes r\xE9centes</h2>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/compte/commandes",
        class: "text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Voir tout `);
            _push2(ssrRenderComponent(unref(ChevronRight), { class: "w-4 h-4" }, null, _parent2, _scopeId));
          } else {
            return [
              createTextVNode(" Voir tout "),
              createVNode(unref(ChevronRight), { class: "w-4 h-4" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (unref(recentOrders).length === 0) {
        _push(`<div class="p-12 text-center"><div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">`);
        _push(ssrRenderComponent(unref(Package), { class: "w-8 h-8 text-[var(--color-text-muted)]" }, null, _parent));
        _push(`</div><h3 class="font-medium text-[var(--color-text)] mb-2">Aucune commande</h3><p class="text-sm text-[var(--color-text-muted)] mb-4">Vous n&#39;avez pas encore pass\xE9 de commande.</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/catalogue",
          class: "btn-gold"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(ShoppingBag), { class: "w-5 h-5" }, null, _parent2, _scopeId));
              _push2(` D\xE9couvrir nos produits `);
            } else {
              return [
                createVNode(unref(ShoppingBag), { class: "w-5 h-5" }),
                createTextVNode(" D\xE9couvrir nos produits ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="divide-y divide-[var(--color-border)]"><!--[-->`);
        ssrRenderList(unref(recentOrders), (order) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: order.id,
            to: `/compte/commandes/${order.id}`,
            class: "flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              var _a2, _b;
              if (_push2) {
                _push2(`<div class="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center shrink-0"${_scopeId}>`);
                if ((_a2 = order.items[0]) == null ? void 0 : _a2.thumbnail) {
                  _push2(`<img${ssrRenderAttr("src", order.items[0].thumbnail)}${ssrRenderAttr("alt", order.items[0].title)} class="w-12 h-12 object-contain"${_scopeId}>`);
                } else {
                  _push2(ssrRenderComponent(unref(Package), { class: "w-8 h-8 text-[var(--color-text-muted)]" }, null, _parent2, _scopeId));
                }
                _push2(`</div><div class="flex-1 min-w-0"${_scopeId}><p class="font-medium text-[var(--color-text)]"${_scopeId}>${ssrInterpolate(order.displayId)}</p><p class="text-sm text-[var(--color-text-muted)] truncate"${_scopeId}>${ssrInterpolate(order.items.length)} article${ssrInterpolate(order.items.length > 1 ? "s" : "")} \u2022 ${ssrInterpolate(formatDate(order.createdAt))}</p></div><div class="text-right shrink-0"${_scopeId}><p class="font-semibold text-[var(--color-text)]"${_scopeId}>${ssrInterpolate(formatPrice(order.total))}</p><span class="${ssrRenderClass([getStatusClass(order.fulfillmentStatus), "inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full"])}"${_scopeId}><span class="${ssrRenderClass([getStatusDotClass(order.fulfillmentStatus), "w-1.5 h-1.5 rounded-full"])}"${_scopeId}></span> ${ssrInterpolate(getStatusLabel(order.fulfillmentStatus))}</span></div>`);
                _push2(ssrRenderComponent(unref(ChevronRight), { class: "w-5 h-5 text-[var(--color-text-muted)]" }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode("div", { class: "w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center shrink-0" }, [
                    ((_b = order.items[0]) == null ? void 0 : _b.thumbnail) ? (openBlock(), createBlock("img", {
                      key: 0,
                      src: order.items[0].thumbnail,
                      alt: order.items[0].title,
                      class: "w-12 h-12 object-contain"
                    }, null, 8, ["src", "alt"])) : (openBlock(), createBlock(unref(Package), {
                      key: 1,
                      class: "w-8 h-8 text-[var(--color-text-muted)]"
                    }))
                  ]),
                  createVNode("div", { class: "flex-1 min-w-0" }, [
                    createVNode("p", { class: "font-medium text-[var(--color-text)]" }, toDisplayString(order.displayId), 1),
                    createVNode("p", { class: "text-sm text-[var(--color-text-muted)] truncate" }, toDisplayString(order.items.length) + " article" + toDisplayString(order.items.length > 1 ? "s" : "") + " \u2022 " + toDisplayString(formatDate(order.createdAt)), 1)
                  ]),
                  createVNode("div", { class: "text-right shrink-0" }, [
                    createVNode("p", { class: "font-semibold text-[var(--color-text)]" }, toDisplayString(formatPrice(order.total)), 1),
                    createVNode("span", {
                      class: ["inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full", getStatusClass(order.fulfillmentStatus)]
                    }, [
                      createVNode("span", {
                        class: ["w-1.5 h-1.5 rounded-full", getStatusDotClass(order.fulfillmentStatus)]
                      }, null, 2),
                      createTextVNode(" " + toDisplayString(getStatusLabel(order.fulfillmentStatus)), 1)
                    ], 2)
                  ]),
                  createVNode(unref(ChevronRight), { class: "w-5 h-5 text-[var(--color-text-muted)]" })
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div><div class="grid sm:grid-cols-2 gap-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/catalogue",
        class: "bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-6 text-white group hover:shadow-xl hover:shadow-amber-500/25 transition-all"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-start justify-between"${_scopeId}><div${_scopeId}><h3 class="font-semibold text-lg mb-1"${_scopeId}>Nouvelle commande</h3><p class="text-amber-100 text-sm"${_scopeId}>Parcourez notre catalogue et envoyez un colis</p></div><div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Plus), { class: "w-6 h-6" }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-start justify-between" }, [
                createVNode("div", null, [
                  createVNode("h3", { class: "font-semibold text-lg mb-1" }, "Nouvelle commande"),
                  createVNode("p", { class: "text-amber-100 text-sm" }, "Parcourez notre catalogue et envoyez un colis")
                ]),
                createVNode("div", { class: "w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform" }, [
                  createVNode(unref(Plus), { class: "w-6 h-6" })
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/suivi",
        class: "bg-white rounded-2xl p-6 border border-[var(--color-border)] group hover:shadow-lg hover:border-[var(--color-border)] transition-all"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-start justify-between"${_scopeId}><div${_scopeId}><h3 class="font-semibold text-lg text-[var(--color-text)] mb-1"${_scopeId}>Suivre un colis</h3><p class="text-[var(--color-text-muted)] text-sm"${_scopeId}>Entrez votre num\xE9ro de suivi</p></div><div class="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-amber-100 group-hover:text-[var(--color-accent-dark)] transition-colors"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Search), { class: "w-6 h-6 text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent-dark)]" }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-start justify-between" }, [
                createVNode("div", null, [
                  createVNode("h3", { class: "font-semibold text-lg text-[var(--color-text)] mb-1" }, "Suivre un colis"),
                  createVNode("p", { class: "text-[var(--color-text-muted)] text-sm" }, "Entrez votre num\xE9ro de suivi")
                ]),
                createVNode("div", { class: "w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-amber-100 group-hover:text-[var(--color-accent-dark)] transition-colors" }, [
                  createVNode(unref(Search), { class: "w-6 h-6 text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent-dark)]" })
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] overflow-hidden"><div class="flex items-center justify-between p-6 border-b border-[var(--color-border)]"><h2 class="text-lg font-semibold text-[var(--color-text)]">Adresses enregistr\xE9es</h2>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/compte/adresses",
        class: "text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` G\xE9rer `);
            _push2(ssrRenderComponent(unref(ChevronRight), { class: "w-4 h-4" }, null, _parent2, _scopeId));
          } else {
            return [
              createTextVNode(" G\xE9rer "),
              createVNode(unref(ChevronRight), { class: "w-4 h-4" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (!unref(authStore).hasAddresses) {
        _push(`<div class="p-8 text-center">`);
        _push(ssrRenderComponent(unref(MapPin), { class: "w-12 h-12 text-gray-300 mx-auto mb-3" }, null, _parent));
        _push(`<p class="text-[var(--color-text-muted)] mb-4">Aucune adresse enregistr\xE9e</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/compte/adresses",
          class: "inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(Plus), { class: "w-4 h-4" }, null, _parent2, _scopeId));
              _push2(` Ajouter une adresse `);
            } else {
              return [
                createVNode(unref(Plus), { class: "w-4 h-4" }),
                createTextVNode(" Ajouter une adresse ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="p-6">`);
        if (unref(authStore).defaultAddress) {
          _push(`<div class="flex items-start gap-4"><div class="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center shrink-0">`);
          _push(ssrRenderComponent(unref(MapPin), { class: "w-5 h-5 text-amber-600" }, null, _parent));
          _push(`</div><div><div class="flex items-center gap-2 mb-1"><p class="font-medium text-[var(--color-text)]">${ssrInterpolate(unref(authStore).defaultAddress.firstName)} ${ssrInterpolate(unref(authStore).defaultAddress.lastName)}</p><span class="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Par d\xE9faut</span></div><p class="text-sm text-[var(--color-text-muted)]">${ssrInterpolate(unref(authStore).defaultAddress.address1)}<br> ${ssrInterpolate(unref(authStore).defaultAddress.city)}, ${ssrInterpolate(unref(authStore).defaultAddress.country)}</p>`);
          if (unref(authStore).defaultAddress.phone) {
            _push(`<p class="text-sm text-[var(--color-text-muted)] mt-1">${ssrInterpolate(unref(authStore).defaultAddress.phone)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      _push(`</div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/compte/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-ClV_O4H-.mjs.map
