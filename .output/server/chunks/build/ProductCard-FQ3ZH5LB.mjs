import { f as useCartStore, g as useToast, e as __nuxt_component_0$4 } from './server.mjs';
import { defineComponent, computed, resolveDirective, mergeProps, withCtx, createVNode, resolveDynamicComponent, unref, openBlock, createBlock, toDisplayString, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrGetDirectiveProps, ssrRenderComponent, ssrRenderAttr, ssrRenderVNode, ssrRenderClass, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { Gift, Heart, BookOpen, Wheat, Package, Star, ShoppingBag } from 'lucide-vue-next';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ProductCard",
  __ssrInlineRender: true,
  props: {
    product: {},
    delay: { default: 0 }
  },
  setup(__props) {
    const props = __props;
    useCartStore();
    useToast();
    const formatPrice = (price) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(price);
    const priceFCFA = computed(() => new Intl.NumberFormat("fr-FR").format(Math.round(props.product.price * 656)));
    const categoryName = computed(() => {
      if (!props.product.category) return "";
      return typeof props.product.category === "string" ? props.product.category : props.product.category.name;
    });
    const getCategoryIcon = computed(() => {
      const icons = {
        "Alimentaire": Wheat,
        "Scolarit\xE9": BookOpen,
        "Sant\xE9 & B\xE9b\xE9": Heart,
        "Sant\xE9": Heart,
        "F\xEAtes & Occasions": Gift,
        "F\xEAtes": Gift
      };
      return icons[categoryName.value] || Package;
    });
    const getCategoryTextClass = computed(() => {
      const classes = {
        "Alimentaire": "text-emerald-600",
        "Scolarit\xE9": "text-blue-600",
        "Sant\xE9 & B\xE9b\xE9": "text-pink-600",
        "Sant\xE9": "text-pink-600",
        "F\xEAtes & Occasions": "text-amber-600",
        "F\xEAtes": "text-amber-600"
      };
      return classes[categoryName.value] || "text-gray-600";
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$4;
      const _directive_motion = resolveDirective("motion");
      _push(`<article${ssrRenderAttrs(mergeProps({
        initial: { opacity: 0, y: 30 },
        visibleOnce: { opacity: 1, y: 0, transition: { delay: __props.delay, duration: 500 } },
        class: "card-product group relative flex flex-col h-full bg-white border border-gray-200 rounded-lg transition-all hover:shadow-xl hover:border-[var(--color-accent)]/30 overflow-hidden"
      }, _attrs, ssrGetDirectiveProps(_ctx, _directive_motion)))}>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/produit/${__props.product.handle || __props.product.id}`,
        class: "block relative aspect-square overflow-hidden bg-gray-50"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            if (__props.product.thumbnail || ((_a = __props.product.images) == null ? void 0 : _a[0])) {
              _push2(`<img${ssrRenderAttr("src", __props.product.thumbnail || __props.product.images[0])}${ssrRenderAttr("alt", __props.product.title)} class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"${_scopeId}>`);
            } else {
              _push2(`<div class="w-full h-full flex items-center justify-center"${_scopeId}>`);
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(unref(getCategoryIcon)), { class: "w-16 h-16 text-gray-200" }, null), _parent2, _scopeId);
              _push2(`</div>`);
            }
            _push2(`<div class="absolute top-2 left-2 flex flex-col gap-1.5"${_scopeId}>`);
            if (__props.product.category) {
              _push2(`<span class="${ssrRenderClass([unref(getCategoryTextClass), "px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-white/90 backdrop-blur shadow-sm border border-gray-100"])}"${_scopeId}>${ssrInterpolate(unref(categoryName))}</span>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.product.isNew) {
              _push2(`<span class="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-[var(--color-accent)] text-white shadow-sm"${_scopeId}> Nouveau </span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><button class="absolute top-2 right-2 p-2 rounded-full bg-white/80 backdrop-blur text-gray-400 hover:text-red-500 transition-colors shadow-sm opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Heart), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(`</button>`);
          } else {
            return [
              __props.product.thumbnail || ((_b = __props.product.images) == null ? void 0 : _b[0]) ? (openBlock(), createBlock("img", {
                key: 0,
                src: __props.product.thumbnail || __props.product.images[0],
                alt: __props.product.title,
                class: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "w-full h-full flex items-center justify-center"
              }, [
                (openBlock(), createBlock(resolveDynamicComponent(unref(getCategoryIcon)), { class: "w-16 h-16 text-gray-200" }))
              ])),
              createVNode("div", { class: "absolute top-2 left-2 flex flex-col gap-1.5" }, [
                __props.product.category ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: ["px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-white/90 backdrop-blur shadow-sm border border-gray-100", unref(getCategoryTextClass)]
                }, toDisplayString(unref(categoryName)), 3)) : createCommentVNode("", true),
                __props.product.isNew ? (openBlock(), createBlock("span", {
                  key: 1,
                  class: "px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-[var(--color-accent)] text-white shadow-sm"
                }, " Nouveau ")) : createCommentVNode("", true)
              ]),
              createVNode("button", { class: "absolute top-2 right-2 p-2 rounded-full bg-white/80 backdrop-blur text-gray-400 hover:text-red-500 transition-colors shadow-sm opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300" }, [
                createVNode(unref(Heart), { class: "w-4 h-4" })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="p-4 flex flex-col flex-grow"><div class="mb-2">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/produit/${__props.product.handle || __props.product.id}`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 class="font-medium text-gray-900 text-sm sm:text-base line-clamp-2 leading-tight group-hover:text-[var(--color-accent-dark)] transition-colors min-h-[2.5rem]"${_scopeId}>${ssrInterpolate(__props.product.title)}</h3>`);
          } else {
            return [
              createVNode("h3", { class: "font-medium text-gray-900 text-sm sm:text-base line-clamp-2 leading-tight group-hover:text-[var(--color-accent-dark)] transition-colors min-h-[2.5rem]" }, toDisplayString(__props.product.title), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (__props.product.subtitle) {
        _push(`<p class="text-xs text-gray-500 mt-1 line-clamp-1">${ssrInterpolate(__props.product.subtitle)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex items-center gap-1 mb-3"><div class="flex"><!--[-->`);
      ssrRenderList(5, (i) => {
        _push(ssrRenderComponent(unref(Star), {
          key: i,
          class: "w-3 h-3 fill-amber-400 text-amber-400"
        }, null, _parent));
      });
      _push(`<!--]--></div><span class="text-[10px] text-gray-400">(4.8)</span></div><div class="mt-auto pt-3 border-t border-gray-50"><div class="flex items-end justify-between gap-2"><div class="flex flex-col"><span class="text-lg sm:text-xl font-bold text-gray-900 leading-none">${ssrInterpolate(formatPrice(__props.product.price))}</span><span class="text-[10px] text-gray-500 font-medium mt-1"> \u2248 ${ssrInterpolate(unref(priceFCFA))} FCFA </span></div><button class="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-light)] transition-all active:scale-95 shadow-sm" title="Ajouter au panier">`);
      _push(ssrRenderComponent(unref(ShoppingBag), { class: "w-4 h-4 sm:w-5 h-5" }, null, _parent));
      _push(`</button></div><div class="mt-3 flex items-center gap-1.5"><div class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div><span class="text-[10px] font-medium text-emerald-600">En stock \u2014 Livraison 72h</span></div></div></div></article>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/product/ProductCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=ProductCard-FQ3ZH5LB.mjs.map
