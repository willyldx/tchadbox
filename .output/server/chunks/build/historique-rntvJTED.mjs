import { i as useAuthStore, a as useHead, _ as __nuxt_component_3$2, l as __nuxt_component_0$2 } from './server.mjs';
import { _ as __nuxt_component_2 } from './SelectMenu-Bc2TWh27.mjs';
import { defineComponent, ref, computed, mergeProps, unref, isRef, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
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
import '@clerk/vue';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import '@tanstack/vue-virtual';
import './form-DsUILy5F.mjs';
import './active-element-history-QtuHblWR.mjs';
import './keyboard-BvysMIIh.mjs';
import './usePopper-CIeS2-3g.mjs';
import './hidden-CZ0WYEIB.mjs';
import './useFormGroup-C15lTjpg.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "historique",
  __ssrInlineRender: true,
  setup(__props) {
    useAuthStore();
    const { client } = useSupabase();
    const loading = ref(true);
    const history = ref([]);
    const totalDeliveries = ref(0);
    const rating = ref("5.0");
    const selectedMonth = ref(null);
    const monthOptions = computed(() => {
      const months = [];
      const now = /* @__PURE__ */ new Date();
      for (let i = 0; i < 6; i++) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        months.push({
          label: date.toLocaleDateString("fr-FR", { month: "long", year: "numeric" }),
          value: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
        });
      }
      return [{ label: "Tous", value: null }, ...months];
    });
    const filteredHistory = computed(() => {
      if (!selectedMonth.value) return history.value;
      return history.value.filter((d) => {
        const date = new Date(d.deliveredAt || d.createdAt);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
        return monthKey === selectedMonth.value;
      });
    });
    const formatPrice = (amount) => {
      return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(amount);
    };
    const formatDate = (date) => {
      if (!date) return "-";
      return new Date(date).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    useHead({
      title: "Historique - TchadBox Livreur"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_3$2;
      const _component_USelectMenu = __nuxt_component_2;
      const _component_UIcon = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "px-4 py-6" }, _attrs))}><div class="mb-6"><h1 class="text-2xl font-bold text-gray-900">Historique</h1><p class="text-gray-500 mt-1">Toutes vos livraisons pass\xE9es</p></div><div class="grid grid-cols-2 gap-3 mb-6"><div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100"><p class="text-3xl font-bold text-gray-900">${ssrInterpolate(unref(totalDeliveries))}</p><p class="text-sm text-gray-500">Livraisons totales</p></div><div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100"><div class="flex items-center gap-1">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:star",
        class: "w-6 h-6 text-amber-500 fill-current"
      }, null, _parent));
      _push(`<p class="text-3xl font-bold text-gray-900">${ssrInterpolate(unref(rating))}</p></div><p class="text-sm text-gray-500">Note moyenne</p></div></div><div class="mb-4">`);
      _push(ssrRenderComponent(_component_USelectMenu, {
        modelValue: unref(selectedMonth),
        "onUpdate:modelValue": ($event) => isRef(selectedMonth) ? selectedMonth.value = $event : null,
        options: unref(monthOptions),
        placeholder: "Filtrer par mois",
        class: "w-full"
      }, null, _parent));
      _push(`</div>`);
      if (unref(loading)) {
        _push(`<div class="flex items-center justify-center py-12">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-loader-2",
          class: "w-8 h-8 animate-spin text-green-500"
        }, null, _parent));
        _push(`</div>`);
      } else if (unref(filteredHistory).length > 0) {
        _push(`<div class="space-y-3"><!--[-->`);
        ssrRenderList(unref(filteredHistory), (delivery) => {
          var _a;
          _push(`<div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100"><div class="flex items-start justify-between mb-2"><div><span class="font-semibold text-gray-900">#${ssrInterpolate(delivery.displayId)}</span><p class="text-sm text-gray-500">${ssrInterpolate(formatDate(delivery.deliveredAt))}</p></div><span class="font-bold text-green-600">${ssrInterpolate(formatPrice(delivery.total))}</span></div><div class="flex items-center gap-2 text-sm text-gray-600">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "lucide:user",
            class: "w-4 h-4 text-gray-400"
          }, null, _parent));
          _push(`<span>${ssrInterpolate(delivery.recipientName)}</span></div><div class="flex items-center gap-2 text-sm text-gray-600 mt-1">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "lucide:map-pin",
            class: "w-4 h-4 text-gray-400"
          }, null, _parent));
          _push(`<span>${ssrInterpolate(((_a = delivery.shippingAddress) == null ? void 0 : _a.city) || "N/A")}</span></div>`);
          if (delivery.deliveryPhoto) {
            _push(`<div class="mt-3"><img${ssrRenderAttr("src", delivery.deliveryPhoto)} alt="Preuve" class="w-full h-24 object-cover rounded-lg"></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="text-center py-12"><div class="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:history",
          class: "w-10 h-10 text-gray-400"
        }, null, _parent));
        _push(`</div><p class="text-gray-500 font-medium">Aucune livraison</p><p class="text-sm text-gray-400 mt-1">Votre historique appara\xEEtra ici</p></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/livreur/historique.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=historique-rntvJTED.mjs.map
