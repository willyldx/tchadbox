import { k as useRoute, f as useCartStore, h as useFavoritesStore, c as useSeoMeta, d as __nuxt_component_0 } from "../server.mjs";
import { _ as _sfc_main$1 } from "./ProductCard-FQ3ZH5LB.js";
import { defineComponent, ref, computed, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderTeleport } from "vue/server-renderer";
import { ChevronRight, Heart, ZoomIn, Check, Minus, Plus, Loader, ShoppingCart, Truck, ShieldCheck, Package, Star, X } from "lucide-vue-next";
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    useCartStore();
    const favoritesStore = useFavoritesStore();
    const product = ref(null);
    const relatedProducts = ref([]);
    const isLoading = ref(true);
    const isAddingToCart = ref(false);
    const selectedImage = ref(null);
    const quantity = ref(1);
    const activeTab = ref("description");
    const showZoom = ref(false);
    const tabs = [
      { id: "description", label: "Description" },
      { id: "shipping", label: "Livraison" },
      { id: "reviews", label: "Avis (0)" }
    ];
    const isFavorite = computed(() => {
      return product.value ? favoritesStore.isFavorite(product.value.id) : false;
    });
    const discountPercent = computed(() => {
      if (!product.value?.compareAtPrice) return 0;
      return Math.round((1 - product.value.price / product.value.compareAtPrice) * 100);
    });
    useSeoMeta({
      title: () => product.value ? `${product.value.title} - TchadBox` : "Produit - TchadBox",
      description: () => product.value?.description || "Découvrez ce produit sur TchadBox"
    });
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
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_ProductCard = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (unref(isLoading)) {
        _push(`<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><div class="grid lg:grid-cols-2 gap-12 animate-pulse"><div class="aspect-square bg-gray-200 rounded-2xl"></div><div class="space-y-4"><div class="h-8 bg-gray-200 rounded w-3/4"></div><div class="h-6 bg-gray-200 rounded w-1/4"></div><div class="h-24 bg-gray-200 rounded"></div></div></div></div>`);
      } else if (unref(product)) {
        _push(`<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><nav class="flex items-center gap-2 text-sm mb-6">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "text-[var(--color-text-muted)] hover:text-[var(--color-accent-dark)]"
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
        _push(ssrRenderComponent(unref(ChevronRight), { class: "w-4 h-4 text-[var(--color-text-muted)]" }, null, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/catalogue",
          class: "text-[var(--color-text-muted)] hover:text-[var(--color-accent-dark)]"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Catalogue`);
            } else {
              return [
                createTextVNode("Catalogue")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(ChevronRight), { class: "w-4 h-4 text-[var(--color-text-muted)]" }, null, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/catalogue?categorie=${unref(product).categoryHandle}`,
          class: "text-[var(--color-text-muted)] hover:text-[var(--color-accent-dark)]"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(product).category)}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(product).category), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(ChevronRight), { class: "w-4 h-4 text-[var(--color-text-muted)]" }, null, _parent));
        _push(`<span class="text-[var(--color-text)] font-medium truncate">${ssrInterpolate(unref(product).title)}</span></nav><div class="grid lg:grid-cols-2 gap-12"><div class="space-y-4"><div class="relative aspect-square bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden group"><img${ssrRenderAttr("src", unref(selectedImage) || unref(product).thumbnail)}${ssrRenderAttr("alt", unref(product).title)} class="w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-105"><button class="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors">`);
        _push(ssrRenderComponent(unref(Heart), {
          class: ["w-6 h-6 transition-colors", unref(isFavorite) ? "fill-red-500 text-red-500" : "text-[var(--color-text-muted)]"]
        }, null, _parent));
        _push(`</button><button class="absolute bottom-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors">`);
        _push(ssrRenderComponent(unref(ZoomIn), { class: "w-5 h-5 text-[var(--color-text-secondary)]" }, null, _parent));
        _push(`</button><div class="absolute top-4 left-4 flex flex-col gap-2">`);
        if (unref(product).compareAtPrice) {
          _push(`<span class="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full"> -${ssrInterpolate(unref(discountPercent))}% </span>`);
        } else {
          _push(`<!---->`);
        }
        if (!unref(product).inStock) {
          _push(`<span class="bg-[var(--color-primary)] text-white text-xs font-bold px-3 py-1 rounded-full"> Rupture </span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
        if (unref(product).images?.length > 1) {
          _push(`<div class="flex gap-3 overflow-x-auto pb-2"><!--[-->`);
          ssrRenderList(unref(product).images, (image, index) => {
            _push(`<button class="${ssrRenderClass([unref(selectedImage) === image ? "border-amber-500" : "border-[var(--color-border)] hover:border-[var(--color-border)]", "w-20 h-20 bg-white rounded-xl border-2 overflow-hidden shrink-0 transition-colors"])}"><img${ssrRenderAttr("src", image)}${ssrRenderAttr("alt", `Vue ${index + 1}`)} class="w-full h-full object-contain p-2"></button>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="space-y-6"><div class="flex items-center gap-2"><span class="text-sm text-amber-600 font-medium bg-amber-50 px-3 py-1 rounded-full">${ssrInterpolate(unref(product).category)}</span>`);
        if (unref(product).inStock) {
          _push(`<span class="text-sm text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full flex items-center gap-1">`);
          _push(ssrRenderComponent(unref(Check), { class: "w-4 h-4" }, null, _parent));
          _push(` En stock </span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><h1 class="text-3xl lg:text-4xl font-bold text-[var(--color-text)]">${ssrInterpolate(unref(product).title)}</h1>`);
        if (unref(product).subtitle) {
          _push(`<p class="text-lg text-[var(--color-text-muted)]">${ssrInterpolate(unref(product).subtitle)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex items-baseline gap-4"><span class="text-4xl font-bold text-[var(--color-text)]">${ssrInterpolate(formatPrice(unref(product).price))}</span>`);
        if (unref(product).compareAtPrice) {
          _push(`<span class="text-xl text-[var(--color-text-muted)] line-through">${ssrInterpolate(formatPrice(unref(product).compareAtPrice))}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><p class="text-sm text-[var(--color-text-muted)]">≈ ${ssrInterpolate(formatFCFA(unref(product).price))}</p><div class="prose prose-stone max-w-none"><p class="text-[var(--color-text-secondary)] leading-relaxed">${ssrInterpolate(unref(product).description)}</p></div><div class="flex items-center gap-4"><span class="text-sm font-medium text-[var(--color-text-secondary)]">Quantité</span><div class="flex items-center border border-[var(--color-border)] rounded-xl overflow-hidden"><button${ssrIncludeBooleanAttr(unref(quantity) <= 1) ? " disabled" : ""} class="w-12 h-12 flex items-center justify-center text-[var(--color-text-secondary)] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">`);
        _push(ssrRenderComponent(unref(Minus), { class: "w-5 h-5" }, null, _parent));
        _push(`</button><span class="w-16 text-center font-semibold text-[var(--color-text)]">${ssrInterpolate(unref(quantity))}</span><button${ssrIncludeBooleanAttr(unref(quantity) >= 10) ? " disabled" : ""} class="w-12 h-12 flex items-center justify-center text-[var(--color-text-secondary)] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">`);
        _push(ssrRenderComponent(unref(Plus), { class: "w-5 h-5" }, null, _parent));
        _push(`</button></div></div><div class="flex gap-4"><button${ssrIncludeBooleanAttr(!unref(product).inStock || unref(isAddingToCart)) ? " disabled" : ""} class="flex-1 py-4 btn-gold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">`);
        if (unref(isAddingToCart)) {
          _push(ssrRenderComponent(unref(Loader), { class: "w-5 h-5 animate-spin" }, null, _parent));
        } else {
          _push(ssrRenderComponent(unref(ShoppingCart), { class: "w-5 h-5" }, null, _parent));
        }
        _push(` ${ssrInterpolate(unref(isAddingToCart) ? "Ajout..." : "Ajouter au panier")}</button><button${ssrIncludeBooleanAttr(!unref(product).inStock) ? " disabled" : ""} class="px-6 py-4 border-2 border-amber-500 text-amber-600 font-semibold rounded-xl hover:bg-amber-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"> Acheter </button></div><div class="grid grid-cols-3 gap-4 pt-6 border-t border-[var(--color-border)]"><div class="text-center"><div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">`);
        _push(ssrRenderComponent(unref(Truck), { class: "w-6 h-6 text-green-600" }, null, _parent));
        _push(`</div><p class="text-xs text-[var(--color-text-secondary)] font-medium">Livraison N&#39;Djamena</p><p class="text-xs text-[var(--color-text-muted)]">3-5 jours</p></div><div class="text-center"><div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">`);
        _push(ssrRenderComponent(unref(ShieldCheck), { class: "w-6 h-6 text-blue-600" }, null, _parent));
        _push(`</div><p class="text-xs text-[var(--color-text-secondary)] font-medium">Paiement sécurisé</p><p class="text-xs text-[var(--color-text-muted)]">100% protégé</p></div><div class="text-center"><div class="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-2">`);
        _push(ssrRenderComponent(unref(Package), { class: "w-6 h-6 text-amber-600" }, null, _parent));
        _push(`</div><p class="text-xs text-[var(--color-text-secondary)] font-medium">Photo à la livraison</p><p class="text-xs text-[var(--color-text-muted)]">Preuve de remise</p></div></div></div></div><div class="mt-16"><div class="border-b border-[var(--color-border)]"><nav class="flex gap-8"><!--[-->`);
        ssrRenderList(tabs, (tab) => {
          _push(`<button class="${ssrRenderClass([unref(activeTab) === tab.id ? "border-amber-500 text-amber-600" : "border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]", "py-4 border-b-2 font-medium transition-colors"])}">${ssrInterpolate(tab.label)}</button>`);
        });
        _push(`<!--]--></nav></div><div class="py-8">`);
        if (unref(activeTab) === "description") {
          _push(`<div class="prose prose-stone max-w-none"><p>${ssrInterpolate(unref(product).description)}</p><h3>Caractéristiques</h3><ul><li>Produit de qualité sélectionné en France</li><li>Emballage soigné pour le transport</li><li>Livraison directe à N&#39;Djamena</li></ul></div>`);
        } else if (unref(activeTab) === "shipping") {
          _push(`<div class="space-y-6"><div class="bg-gray-50 rounded-xl p-6"><h3 class="font-semibold text-[var(--color-text)] mb-4">Informations de livraison</h3><ul class="space-y-3 text-[var(--color-text-secondary)]"><li class="flex items-start gap-3">`);
          _push(ssrRenderComponent(unref(Check), { class: "w-5 h-5 text-green-500 mt-0.5 shrink-0" }, null, _parent));
          _push(`<span>Délai de livraison : 3 à 5 jours ouvrés</span></li><li class="flex items-start gap-3">`);
          _push(ssrRenderComponent(unref(Check), { class: "w-5 h-5 text-green-500 mt-0.5 shrink-0" }, null, _parent));
          _push(`<span>Livraison gratuite à partir de 100€</span></li><li class="flex items-start gap-3">`);
          _push(ssrRenderComponent(unref(Check), { class: "w-5 h-5 text-green-500 mt-0.5 shrink-0" }, null, _parent));
          _push(`<span>Suivi en temps réel de votre colis</span></li><li class="flex items-start gap-3">`);
          _push(ssrRenderComponent(unref(Check), { class: "w-5 h-5 text-green-500 mt-0.5 shrink-0" }, null, _parent));
          _push(`<span>Photo de confirmation à la livraison</span></li></ul></div></div>`);
        } else if (unref(activeTab) === "reviews") {
          _push(`<div class="space-y-6"><div class="text-center py-12">`);
          _push(ssrRenderComponent(unref(Star), { class: "w-12 h-12 text-gray-300 mx-auto mb-4" }, null, _parent));
          _push(`<p class="text-[var(--color-text-muted)]">Aucun avis pour le moment</p><p class="text-sm text-[var(--color-text-muted)]">Soyez le premier à donner votre avis !</p></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="mt-16"><h2 class="text-2xl font-bold text-[var(--color-text)] mb-8">Vous aimerez aussi</h2><div class="grid grid-cols-2 md:grid-cols-4 gap-6"><!--[-->`);
        ssrRenderList(unref(relatedProducts), (relatedProduct) => {
          _push(ssrRenderComponent(_component_ProductCard, {
            key: relatedProduct.id,
            product: relatedProduct
          }, null, _parent));
        });
        _push(`<!--]--></div></div></div>`);
      } else {
        _push(`<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center"><div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">`);
        _push(ssrRenderComponent(unref(Package), { class: "w-10 h-10 text-[var(--color-text-muted)]" }, null, _parent));
        _push(`</div><h2 class="text-xl font-semibold text-[var(--color-text)] mb-2">Produit introuvable</h2><p class="text-[var(--color-text-muted)] mb-6">Ce produit n&#39;existe pas ou a été supprimé.</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/catalogue",
          class: "btn-gold"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Voir le catalogue `);
            } else {
              return [
                createTextVNode(" Voir le catalogue ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      ssrRenderTeleport(_push, (_push2) => {
        if (unref(showZoom)) {
          _push2(`<div class="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 cursor-zoom-out"><button class="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">`);
          _push2(ssrRenderComponent(unref(X), { class: "w-6 h-6 text-white" }, null, _parent));
          _push2(`</button><img${ssrRenderAttr("src", unref(selectedImage) || unref(product)?.thumbnail)}${ssrRenderAttr("alt", unref(product)?.title)} class="max-w-full max-h-full object-contain"></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/produit/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=_slug_-BsjvgzU-.js.map
