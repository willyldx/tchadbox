import { a as useHead, d as __nuxt_component_0 } from "../server.mjs";
import { defineComponent, ref, computed, resolveDirective, mergeProps, unref, createVNode, resolveDynamicComponent, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrGetDirectiveProps, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderClass, ssrRenderStyle, ssrRenderList, ssrRenderVNode } from "vue/server-renderer";
import { MapPin, Hash, Loader, Search, Lightbulb, Check, MessageCircle, SearchX } from "lucide-vue-next";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/hookable/dist/index.mjs";
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
import "@clerk/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "suivi",
  __ssrInlineRender: true,
  setup(__props) {
    const orderNumber = ref("");
    const order = ref(null);
    const notFound = ref(false);
    const isSearching = ref(false);
    const completedPercent = computed(() => {
      if (!order.value) return 0;
      const completed = order.value.timeline.filter((s) => s.completed).length;
      return completed / order.value.timeline.length * 100;
    });
    useHead({ title: "Suivre ma commande" });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _directive_motion = resolveDirective("motion");
      _push(`<div${ssrRenderAttrs(_attrs)}><section class="relative py-20 bg-[var(--color-bg-warm)] overflow-hidden"><div class="orb orb-amber w-80 h-80 -top-20 -right-20 opacity-10"></div><div class="container-main relative text-center"><div${ssrRenderAttrs(mergeProps({
        initial: { opacity: 0, y: 10 },
        enter: { opacity: 1, y: 0 },
        class: "w-16 h-16 mx-auto rounded-2xl bg-[var(--color-accent)]/10 flex items-center justify-center mb-5"
      }, ssrGetDirectiveProps(_ctx, _directive_motion)))}>`);
      _push(ssrRenderComponent(unref(MapPin), { class: "w-8 h-8 text-[var(--color-accent-dark)]" }, null, _parent));
      _push(`</div><h1${ssrRenderAttrs(mergeProps({
        initial: { opacity: 0, y: 20 },
        enter: { opacity: 1, y: 0, transition: { delay: 100 } },
        class: "heading-section mb-4"
      }, ssrGetDirectiveProps(_ctx, _directive_motion)))}> Suivre ma <span class="text-gradient">commande</span></h1><p${ssrRenderAttrs(mergeProps({
        initial: { opacity: 0, y: 20 },
        enter: { opacity: 1, y: 0, transition: { delay: 200 } },
        class: "text-lg text-[var(--color-text-muted)] max-w-lg mx-auto"
      }, ssrGetDirectiveProps(_ctx, _directive_motion)))}> Saisissez votre numéro de commande pour suivre son acheminement en temps réel </p></div></section><div class="container-main py-12 max-w-2xl"><div class="card p-8 mb-8"><form><label class="block text-sm font-medium text-[var(--color-text)] mb-3">Numéro de commande</label><div class="flex gap-4"><div class="relative flex-grow">`);
      _push(ssrRenderComponent(unref(Hash), { class: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]" }, null, _parent));
      _push(`<input${ssrRenderAttr("value", unref(orderNumber))} type="text" placeholder="Ex: TCB-2024-001234" class="input pl-12" required></div><button type="submit"${ssrIncludeBooleanAttr(unref(isSearching)) ? " disabled" : ""} class="btn-gold flex-shrink-0"><span>`);
      if (unref(isSearching)) {
        _push(ssrRenderComponent(unref(Loader), { class: "w-5 h-5 animate-spin" }, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(Search), { class: "w-5 h-5" }, null, _parent));
      }
      _push(` Rechercher </span></button></div><p class="text-sm text-[var(--color-text-muted)] mt-3 flex items-center gap-2">`);
      _push(ssrRenderComponent(unref(Lightbulb), { class: "w-4 h-4 text-[var(--color-accent)]" }, null, _parent));
      _push(` Entrez le numéro reçu par email après votre commande </p></form></div>`);
      if (unref(order)) {
        _push(`<div class="card overflow-hidden"><div class="bg-[var(--color-primary)] text-white p-6"><div class="flex justify-between items-center"><div><p class="text-sm text-white/60 mb-1">Commande</p><p class="text-xl font-bold font-mono">${ssrInterpolate(unref(order).number)}</p></div><span class="${ssrRenderClass([unref(order).delivered ? "bg-green-500/20 text-green-300" : "bg-amber-500/20 text-amber-300", "px-4 py-2 rounded-xl text-sm font-semibold"])}">${ssrInterpolate(unref(order).delivered ? "✓ Livré" : "⏳ En cours")}</span></div></div><div class="p-6"><div class="relative"><div class="absolute left-[15px] top-2 bottom-2 w-0.5 bg-gray-100"></div><div class="absolute left-[15px] top-2 w-0.5 bg-gradient-to-b from-[var(--color-accent)] to-[var(--color-success)] transition-all duration-1000" style="${ssrRenderStyle({ height: `${unref(completedPercent)}%` })}"></div><!--[-->`);
        ssrRenderList(unref(order).timeline, (step, i) => {
          _push(`<div class="relative pl-12 pb-8 last:pb-0"><div class="${ssrRenderClass([step.completed ? "bg-[var(--color-success)] text-white shadow-md shadow-green-500/20" : "bg-gray-100 text-gray-400", "absolute left-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300"])}">`);
          if (step.completed) {
            _push(ssrRenderComponent(unref(Check), { class: "w-4 h-4" }, null, _parent));
          } else {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(step.icon), { class: "w-4 h-4" }, null), _parent);
          }
          _push(`</div><div><p class="${ssrRenderClass([{ "text-[var(--color-success)]": step.completed }, "font-semibold text-[var(--color-text)]"])}">${ssrInterpolate(step.title)}</p><p class="text-sm text-[var(--color-text-muted)]">${ssrInterpolate(step.date)}</p>`);
          if (step.detail) {
            _push(`<p class="text-sm text-[var(--color-text-secondary)] mt-1">${ssrInterpolate(step.detail)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        });
        _push(`<!--]--></div></div><div class="px-6 pb-6 flex gap-3">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/contact",
          class: "btn-outline flex-1 text-center text-sm"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span${_scopeId}>`);
              _push2(ssrRenderComponent(unref(MessageCircle), { class: "w-4 h-4" }, null, _parent2, _scopeId));
              _push2(`Contacter le support</span>`);
            } else {
              return [
                createVNode("span", null, [
                  createVNode(unref(MessageCircle), { class: "w-4 h-4" }),
                  createTextVNode("Contacter le support")
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(notFound)) {
        _push(`<div class="card p-12 text-center"><div class="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">`);
        _push(ssrRenderComponent(unref(SearchX), { class: "w-8 h-8 text-red-300" }, null, _parent));
        _push(`</div><h3 class="text-xl font-semibold text-[var(--color-text)] mb-2">Commande introuvable</h3><p class="text-[var(--color-text-muted)] mb-6 max-w-sm mx-auto"> Vérifiez votre numéro de commande et réessayez. Si le problème persiste, notre équipe est disponible pour vous aider. </p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/contact",
          class: "btn-outline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span${_scopeId}>`);
              _push2(ssrRenderComponent(unref(MessageCircle), { class: "w-4 h-4" }, null, _parent2, _scopeId));
              _push2(`Nous contacter</span>`);
            } else {
              return [
                createVNode("span", null, [
                  createVNode(unref(MessageCircle), { class: "w-4 h-4" }),
                  createTextVNode("Nous contacter")
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/suivi.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=suivi-CUiDwH8B.js.map
