import { u as useRouter, a as useHead, _ as __nuxt_component_3$2, b as __nuxt_component_3$1 } from './server.mjs';
import { defineComponent, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
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
import 'lucide-vue-next';
import '@iconify/utils/lib/css/icon';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "403",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const goBack = () => {
      router.back();
    };
    useHead({
      title: "Acc\xE8s refus\xE9 - TchadBox"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_3$2;
      const _component_UButton = __nuxt_component_3$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 flex items-center justify-center px-4" }, _attrs))}><div class="text-center"><div class="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:shield-x",
        class: "w-12 h-12 text-red-600"
      }, null, _parent));
      _push(`</div><h1 class="text-4xl font-bold text-gray-900 mb-2">403</h1><h2 class="text-xl font-semibold text-gray-700 mb-4">Acc\xE8s refus\xE9</h2><p class="text-gray-500 mb-8 max-w-md mx-auto"> Vous n&#39;avez pas les permissions n\xE9cessaires pour acc\xE9der \xE0 cette page. </p><div class="flex flex-col sm:flex-row gap-4 justify-center">`);
      _push(ssrRenderComponent(_component_UButton, {
        to: "/",
        color: "primary",
        size: "lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Retour \xE0 l&#39;accueil `);
          } else {
            return [
              createTextVNode(" Retour \xE0 l'accueil ")
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
            _push2(` Page pr\xE9c\xE9dente `);
          } else {
            return [
              createTextVNode(" Page pr\xE9c\xE9dente ")
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

export { _sfc_main as default };
//# sourceMappingURL=403-CFHMUch-.mjs.map
