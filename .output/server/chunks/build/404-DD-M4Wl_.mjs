import { c as _export_sfc, d as useSeoMeta, e as __nuxt_component_0$4 } from './server.mjs';
import { defineComponent, mergeProps, unref, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { PackageX, Home, ShoppingBag } from 'lucide-vue-next';
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
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "404",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Page introuvable - TchadBox",
      description: "Cette page n'existe pas sur TchadBox."
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-[var(--color-bg)] flex items-center justify-center p-4" }, _attrs))} data-v-f32f1c37><div class="text-center max-w-lg" data-v-f32f1c37><div class="relative mb-8" data-v-f32f1c37><h1 class="text-[150px] font-bold text-[var(--color-border)] leading-none select-none" data-v-f32f1c37>404</h1><div class="absolute inset-0 flex items-center justify-center" data-v-f32f1c37><div class="w-32 h-32 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-xl shadow-amber-500/30 animate-bounce-slow" data-v-f32f1c37>`);
      _push(ssrRenderComponent(unref(PackageX), { class: "w-16 h-16 text-white" }, null, _parent));
      _push(`</div></div></div><h2 class="text-2xl font-bold text-[var(--color-text)] mb-3" data-v-f32f1c37>Page introuvable</h2><p class="text-[var(--color-text-muted)] mb-8" data-v-f32f1c37> Oups ! Cette page semble s&#39;\xEAtre perdue en route vers N&#39;Djamena. Elle n&#39;existe pas ou a \xE9t\xE9 d\xE9plac\xE9e. </p><div class="flex flex-col sm:flex-row gap-4 justify-center" data-v-f32f1c37>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "btn-gold"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Home), { class: "w-5 h-5" }, null, _parent2, _scopeId));
            _push2(` Retour \xE0 l&#39;accueil `);
          } else {
            return [
              createVNode(unref(Home), { class: "w-5 h-5" }),
              createTextVNode(" Retour \xE0 l'accueil ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/catalogue",
        class: "btn-outline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ShoppingBag), { class: "w-5 h-5" }, null, _parent2, _scopeId));
            _push2(` Voir le catalogue `);
          } else {
            return [
              createVNode(unref(ShoppingBag), { class: "w-5 h-5" }),
              createTextVNode(" Voir le catalogue ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><p class="text-sm text-[var(--color-text-muted)] mt-12" data-v-f32f1c37> Besoin d&#39;aide ? `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/contact",
        class: "text-[var(--color-accent-dark)] hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Contactez-nous`);
          } else {
            return [
              createTextVNode("Contactez-nous")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/404.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _404 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f32f1c37"]]);

export { _404 as default };
//# sourceMappingURL=404-DD-M4Wl_.mjs.map
