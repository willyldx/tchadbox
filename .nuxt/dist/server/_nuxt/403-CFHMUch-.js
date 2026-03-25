import { u as useRouter, a as useHead, _ as __nuxt_component_3, b as __nuxt_component_3$1 } from "../server.mjs";
import { defineComponent, mergeProps, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
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
import "lucide-vue-next";
import "@iconify/utils/lib/css/icon";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/nuxt/node_modules/perfect-debounce/dist/index.mjs";
import "ohash/utils";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "403",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const goBack = () => {
      router.back();
    };
    useHead({
      title: "Accès refusé - TchadBox"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_3;
      const _component_UButton = __nuxt_component_3$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 flex items-center justify-center px-4" }, _attrs))}><div class="text-center"><div class="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:shield-x",
        class: "w-12 h-12 text-red-600"
      }, null, _parent));
      _push(`</div><h1 class="text-4xl font-bold text-gray-900 mb-2">403</h1><h2 class="text-xl font-semibold text-gray-700 mb-4">Accès refusé</h2><p class="text-gray-500 mb-8 max-w-md mx-auto"> Vous n&#39;avez pas les permissions nécessaires pour accéder à cette page. </p><div class="flex flex-col sm:flex-row gap-4 justify-center">`);
      _push(ssrRenderComponent(_component_UButton, {
        to: "/",
        color: "primary",
        size: "lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Retour à l&#39;accueil `);
          } else {
            return [
              createTextVNode(" Retour à l'accueil ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        onClick: goBack,
        color: "gray",
        variant: "outline",
        size: "lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Page précédente `);
          } else {
            return [
              createTextVNode(" Page précédente ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/403.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=403-CFHMUch-.js.map
