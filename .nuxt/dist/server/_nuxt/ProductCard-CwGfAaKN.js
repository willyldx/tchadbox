import { f as useCartStore, g as useToast, d as __nuxt_component_0 } from "../server.mjs";
import { defineComponent, ref, computed, resolveDirective, mergeProps, unref, withCtx, createVNode, resolveDynamicComponent, openBlock, createBlock, toDisplayString, createCommentVNode, withModifiers, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrGetDirectiveProps, ssrRenderStyle, ssrRenderComponent, ssrRenderAttr, ssrRenderVNode, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import { Gift, Heart, BookOpen, Wheat, Package, Plus, ShoppingBag } from "lucide-vue-next";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ProductCard",
  __ssrInlineRender: true,
  props: {
    product: {},
    delay: { default: 0 }
  },
  setup(__props) {
    const props = __props;
    const cartStore = useCartStore();
    const toast = useToast();
    const cardRef = ref();
    const cardTransform = ref("");
    const formatPrice = (price) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(price);
    const priceFCFA = computed(() => new Intl.NumberFormat("fr-FR").format(Math.round(props.product.price * 656)));
    const categoryName = computed(() => {
      if (!props.product.category) return "";
      return typeof props.product.category === "string" ? props.product.category : props.product.category.name;
    });
    const getCategoryIcon = computed(() => {
      const icons = {
        "Alimentaire": Wheat,
        "Scolarité": BookOpen,
        "Santé & Bébé": Heart,
        "Santé": Heart,
        "Fêtes & Occasions": Gift,
        "Fêtes": Gift
      };
      return icons[categoryName.value] || Package;
    });
    const getCategoryBadgeClass = computed(() => {
      const classes = {
        "Alimentaire": "bg-emerald-50 text-emerald-700 border border-emerald-200",
        "Scolarité": "bg-blue-50 text-blue-700 border border-blue-200",
        "Santé & Bébé": "bg-pink-50 text-pink-700 border border-pink-200",
        "Santé": "bg-pink-50 text-pink-700 border border-pink-200",
        "Fêtes & Occasions": "bg-amber-50 text-amber-700 border border-amber-200",
        "Fêtes": "bg-amber-50 text-amber-700 border border-amber-200"
      };
      return classes[categoryName.value] || "badge-primary";
    });
    const addToCart = () => {
      cartStore.addItem({
        id: `cart-${props.product.id}-${Date.now()}`,
        productId: props.product.id,
        title: props.product.title,
        price: props.product.price,
        thumbnail: props.product.thumbnail || props.product.images?.[0],
        category: categoryName.value
      });
      toast.add({ title: "Ajouté au panier", description: props.product.title, icon: "i-heroicons-check-circle", color: "green", timeout: 2500 });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _directive_motion = resolveDirective("motion");
      _push(`<article${ssrRenderAttrs(mergeProps({
        initial: { opacity: 0, y: 30 },
        visibleOnce: { opacity: 1, y: 0, transition: { delay: __props.delay, duration: 500 } },
        class: "card-product group",
        ref_key: "cardRef",
        ref: cardRef
      }, _attrs, ssrGetDirectiveProps(_ctx, _directive_motion)))}><div style="${ssrRenderStyle({ transform: unref(cardTransform) })}" class="transition-transform duration-200">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/produit/${__props.product.handle || __props.product.id}`,
        class: "block"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100"${_scopeId}>`);
            if (__props.product.thumbnail || __props.product.images?.[0]) {
              _push2(`<img${ssrRenderAttr("src", __props.product.thumbnail || __props.product.images[0])}${ssrRenderAttr("alt", __props.product.title)} class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"${_scopeId}>`);
            } else {
              _push2(`<div class="w-full h-full flex items-center justify-center"${_scopeId}>`);
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(unref(getCategoryIcon)), { class: "w-20 h-20 text-gray-200" }, null), _parent2, _scopeId);
              _push2(`</div>`);
            }
            if (__props.product.category) {
              _push2(`<span class="${ssrRenderClass([unref(getCategoryBadgeClass), "absolute top-4 left-4 badge"])}"${_scopeId}>${ssrInterpolate(unref(categoryName))}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<button class="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-[var(--color-accent)] text-white flex items-center justify-center opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-[var(--color-accent-dark)] shadow-lg"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Plus), { class: "w-5 h-5" }, null, _parent2, _scopeId));
            _push2(`</button><div class="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"${_scopeId}></div></div>`);
          } else {
            return [
              createVNode("div", { class: "relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100" }, [
                __props.product.thumbnail || __props.product.images?.[0] ? (openBlock(), createBlock("img", {
                  key: 0,
                  src: __props.product.thumbnail || __props.product.images[0],
                  alt: __props.product.title,
                  class: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                  key: 1,
                  class: "w-full h-full flex items-center justify-center"
                }, [
                  (openBlock(), createBlock(resolveDynamicComponent(unref(getCategoryIcon)), { class: "w-20 h-20 text-gray-200" }))
                ])),
                __props.product.category ? (openBlock(), createBlock("span", {
                  key: 2,
                  class: ["absolute top-4 left-4 badge", unref(getCategoryBadgeClass)]
                }, toDisplayString(unref(categoryName)), 3)) : createCommentVNode("", true),
                createVNode("button", {
                  onClick: withModifiers(addToCart, ["prevent"]),
                  class: "absolute bottom-4 right-4 w-12 h-12 rounded-full bg-[var(--color-accent)] text-white flex items-center justify-center opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-[var(--color-accent-dark)] shadow-lg"
                }, [
                  createVNode(unref(Plus), { class: "w-5 h-5" })
                ]),
                createVNode("div", { class: "absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="p-5">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/produit/${__props.product.handle || __props.product.id}`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 class="font-semibold text-[var(--color-text)] text-lg mb-1 group-hover:text-[var(--color-accent-dark)] transition-colors line-clamp-1"${_scopeId}>${ssrInterpolate(__props.product.title)}</h3>`);
          } else {
            return [
              createVNode("h3", { class: "font-semibold text-[var(--color-text)] text-lg mb-1 group-hover:text-[var(--color-accent-dark)] transition-colors line-clamp-1" }, toDisplayString(__props.product.title), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (__props.product.subtitle) {
        _push(`<p class="text-sm text-[var(--color-text-muted)] mb-3">${ssrInterpolate(__props.product.subtitle)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex items-end justify-between"><div><span class="text-2xl font-bold text-[var(--color-text)]">${ssrInterpolate(formatPrice(__props.product.price))}</span><span class="block text-xs text-[var(--color-text-muted)] mt-0.5"> ≈ ${ssrInterpolate(unref(priceFCFA))} FCFA </span></div><button class="btn-ghost flex items-center gap-2 text-[var(--color-accent-dark)]">`);
      _push(ssrRenderComponent(unref(ShoppingBag), { class: "w-4 h-4" }, null, _parent));
      _push(`<span class="text-sm font-medium hidden sm:inline">Ajouter</span></button></div></div></div></article>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/product/ProductCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
//# sourceMappingURL=ProductCard-CwGfAaKN.js.map
