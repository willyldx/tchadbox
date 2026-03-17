import { d as useSeoMeta, h as useFavoritesStore, f as useCartStore, i as useAuthStore, e as __nuxt_component_0$4 } from './server.mjs';
import { defineComponent, ref, unref, withCtx, createVNode, createTextVNode, openBlock, createBlock, withModifiers, toDisplayString, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrRenderTeleport } from 'vue/server-renderer';
import { ShoppingCart, Trash, Heart, Search, Package, CheckCircle, User } from 'lucide-vue-next';
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
  __name: "favoris",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Mes favoris - TchadBox",
      description: "Retrouvez tous vos produits favoris sur TchadBox."
    });
    const favoritesStore = useFavoritesStore();
    useCartStore();
    const authStore = useAuthStore();
    const showClearConfirm = ref(false);
    function formatPrice(amount) {
      return new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR"
      }).format(amount);
    }
    function formatDate(date) {
      const now = /* @__PURE__ */ new Date();
      const added = new Date(date);
      const diffDays = Math.floor((now.getTime() - added.getTime()) / (1e3 * 60 * 60 * 24));
      if (diffDays === 0) return "aujourd'hui";
      if (diffDays === 1) return "hier";
      if (diffDays < 7) return `il y a ${diffDays} jours`;
      return added.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "short"
      });
    }
    function removeFromFavorites(productId) {
      favoritesStore.removeFromFavorites(productId);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$4;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"><div><h1 class="text-3xl font-bold text-[var(--color-text)]">Mes favoris</h1><p class="text-[var(--color-text-muted)] mt-1">${ssrInterpolate(unref(favoritesStore).count)} article${ssrInterpolate(unref(favoritesStore).count > 1 ? "s" : "")} sauvegard\xE9${ssrInterpolate(unref(favoritesStore).count > 1 ? "s" : "")}</p></div>`);
      if (!unref(favoritesStore).isEmpty) {
        _push(`<div class="flex gap-3"><button class="flex items-center gap-2 px-4 py-2 btn-gold !py-2 !px-4 !text-sm">`);
        _push(ssrRenderComponent(unref(ShoppingCart), { class: "w-5 h-5" }, null, _parent));
        _push(` Tout ajouter au panier </button><button class="flex items-center gap-2 px-4 py-2 btn-outline !py-2 !px-4 !text-sm">`);
        _push(ssrRenderComponent(unref(Trash), { class: "w-5 h-5" }, null, _parent));
        _push(` Vider </button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(favoritesStore).isEmpty) {
        _push(`<div class="card p-12 text-center"><div class="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">`);
        _push(ssrRenderComponent(unref(Heart), { class: "w-10 h-10 text-amber-300" }, null, _parent));
        _push(`</div><h3 class="text-lg font-semibold text-[var(--color-text)] mb-2">Aucun favori</h3><p class="text-[var(--color-text-muted)] mb-6 max-w-md mx-auto"> Parcourez notre catalogue et cliquez sur le c\u0153ur pour sauvegarder vos produits pr\xE9f\xE9r\xE9s. </p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/catalogue",
          class: "btn-gold"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(Search), { class: "w-5 h-5" }, null, _parent2, _scopeId));
              _push2(` D\xE9couvrir nos produits `);
            } else {
              return [
                createVNode(unref(Search), { class: "w-5 h-5" }),
                createTextVNode(" D\xE9couvrir nos produits ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"><!--[-->`);
        ssrRenderList(unref(favoritesStore).items, (item) => {
          _push(`<div class="card overflow-hidden group hover:!border-[var(--color-accent)]/15">`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/produit/${item.productId}`,
            class: "block relative aspect-square bg-gray-50"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                if (item.thumbnail) {
                  _push2(`<img${ssrRenderAttr("src", item.thumbnail)}${ssrRenderAttr("alt", item.title)} class="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-300"${_scopeId}>`);
                } else {
                  _push2(`<div class="w-full h-full flex items-center justify-center"${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(Package), { class: "w-12 h-12 text-gray-300" }, null, _parent2, _scopeId));
                  _push2(`</div>`);
                }
                _push2(`<button class="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-red-50 transition-colors group/btn"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Heart), { class: "w-5 h-5 fill-red-500 text-red-500 group-hover/btn:scale-110 transition-transform" }, null, _parent2, _scopeId));
                _push2(`</button>`);
                if (item.category) {
                  _push2(`<span class="absolute bottom-3 left-3 text-xs bg-white/90 backdrop-blur-sm text-[var(--color-text-secondary)] px-2 py-1 rounded-full"${_scopeId}>${ssrInterpolate(item.category)}</span>`);
                } else {
                  _push2(`<!---->`);
                }
              } else {
                return [
                  item.thumbnail ? (openBlock(), createBlock("img", {
                    key: 0,
                    src: item.thumbnail,
                    alt: item.title,
                    class: "w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-300"
                  }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "w-full h-full flex items-center justify-center"
                  }, [
                    createVNode(unref(Package), { class: "w-12 h-12 text-gray-300" })
                  ])),
                  createVNode("button", {
                    onClick: withModifiers(($event) => removeFromFavorites(item.productId), ["prevent"]),
                    class: "absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-red-50 transition-colors group/btn"
                  }, [
                    createVNode(unref(Heart), { class: "w-5 h-5 fill-red-500 text-red-500 group-hover/btn:scale-110 transition-transform" })
                  ], 8, ["onClick"]),
                  item.category ? (openBlock(), createBlock("span", {
                    key: 2,
                    class: "absolute bottom-3 left-3 text-xs bg-white/90 backdrop-blur-sm text-[var(--color-text-secondary)] px-2 py-1 rounded-full"
                  }, toDisplayString(item.category), 1)) : createCommentVNode("", true)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`<div class="p-4">`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/produit/${item.productId}`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<h3 class="font-medium text-[var(--color-text)] mb-1 line-clamp-2 hover:text-[var(--color-accent-dark)] transition-colors"${_scopeId}>${ssrInterpolate(item.title)}</h3>`);
              } else {
                return [
                  createVNode("h3", { class: "font-medium text-[var(--color-text)] mb-1 line-clamp-2 hover:text-[var(--color-accent-dark)] transition-colors" }, toDisplayString(item.title), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`<div class="flex items-center justify-between mt-3"><p class="font-bold text-lg text-[var(--color-text)]">${ssrInterpolate(formatPrice(item.price))}</p><button class="w-10 h-10 bg-amber-100 hover:bg-amber-500 text-amber-600 hover:text-white rounded-xl flex items-center justify-center transition-colors">`);
          _push(ssrRenderComponent(unref(ShoppingCart), { class: "w-5 h-5" }, null, _parent));
          _push(`</button></div><p class="text-xs text-[var(--color-text-muted)] mt-1">Ajout\xE9 ${ssrInterpolate(formatDate(item.addedAt))}</p></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      if (unref(authStore).isAuthenticated && !unref(favoritesStore).isEmpty) {
        _push(`<div class="mt-8 p-4 bg-green-50 border border-green-100 rounded-xl flex items-start gap-3">`);
        _push(ssrRenderComponent(unref(CheckCircle), { class: "w-5 h-5 text-green-500 mt-0.5 shrink-0" }, null, _parent));
        _push(`<div><p class="text-sm text-green-800 font-medium">Favoris synchronis\xE9s</p><p class="text-sm text-green-600">Vos favoris sont sauvegard\xE9s sur votre compte et accessibles depuis tous vos appareils.</p></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(authStore).isAuthenticated && !unref(favoritesStore).isEmpty) {
        _push(`<div class="mt-8 p-4 bg-amber-50 border border-amber-100 rounded-xl flex items-start gap-3">`);
        _push(ssrRenderComponent(unref(User), { class: "w-5 h-5 text-amber-600 mt-0.5 shrink-0" }, null, _parent));
        _push(`<div><p class="text-sm text-amber-800 font-medium">Connectez-vous pour sauvegarder</p><p class="text-sm text-amber-600">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/auth/login?redirect=/favoris",
          class: "underline hover:no-underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Connectez-vous `);
            } else {
              return [
                createTextVNode(" Connectez-vous ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(` pour synchroniser vos favoris sur tous vos appareils. </p></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (unref(showClearConfirm)) {
          _push2(`<div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"><div class="bg-white rounded-2xl max-w-md w-full p-6"><div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">`);
          _push2(ssrRenderComponent(unref(Trash), { class: "w-8 h-8 text-red-600" }, null, _parent));
          _push2(`</div><h3 class="text-xl font-bold text-[var(--color-text)] text-center mb-2">Vider les favoris ?</h3><p class="text-[var(--color-text-muted)] text-center mb-6"> Tous vos ${ssrInterpolate(unref(favoritesStore).count)} articles favoris seront supprim\xE9s. </p><div class="flex gap-3"><button class="flex-1 py-3 border border-[var(--color-border)] text-[var(--color-text-secondary)] font-medium rounded-xl hover:bg-gray-50 transition-colors"> Annuler </button><button class="flex-1 py-3 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors"> Vider </button></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/favoris.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=favoris-D21XQcFm.mjs.map
