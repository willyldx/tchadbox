import { g as useToast, a as useHead, b as __nuxt_component_3, l as __nuxt_component_0$1, _ as __nuxt_component_3$1 } from "../server.mjs";
import { _ as __nuxt_component_0 } from "./Input-CbX_cKiC.js";
import { _ as __nuxt_component_2 } from "./SelectMenu-Bc2TWh27.js";
import { _ as __nuxt_component_5 } from "./Badge-DHrI2Q_C.js";
import { _ as __nuxt_component_9 } from "./Modal-CfpZSCh7.js";
import { defineComponent, ref, reactive, computed, unref, withCtx, createTextVNode, isRef, toDisplayString, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass } from "vue/server-renderer";
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
import "@clerk/vue";
import "./useFormGroup-C15lTjpg.js";
import "@tanstack/vue-virtual";
import "./form-DsUILy5F.js";
import "./active-element-history-QtuHblWR.js";
import "./keyboard-BvysMIIh.js";
import "./usePopper-CIeS2-3g.js";
import "./hidden-CZ0WYEIB.js";
import "./description-DXB91rC2.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "stocks",
  __ssrInlineRender: true,
  setup(__props) {
    const { client } = useSupabase();
    const toast = useToast();
    const loading = ref(true);
    const saving = ref(false);
    const products = ref([]);
    const search = ref("");
    const stockFilter = ref("");
    const showEditModal = ref(false);
    const editingProduct = ref(null);
    const editForm = reactive({
      stockQuantity: 0,
      inStock: true
    });
    const stockFilterOptions = [
      { label: "Tous les statuts", value: "" },
      { label: "En stock", value: "in_stock" },
      { label: "Stock faible (< 10)", value: "low_stock" },
      { label: "Rupture", value: "out_of_stock" }
    ];
    const inStockCount = computed(() => products.value.filter((p) => p.in_stock && (p.stock_quantity ?? 1) > 0).length);
    const lowStockCount = computed(() => products.value.filter((p) => p.stock_quantity !== null && p.stock_quantity > 0 && p.stock_quantity < 10).length);
    const outOfStockCount = computed(() => products.value.filter((p) => !p.in_stock || p.stock_quantity === 0).length);
    const filteredProducts = computed(() => {
      let result = [...products.value];
      if (search.value) {
        const q = search.value.toLowerCase();
        result = result.filter((p) => p.title?.toLowerCase().includes(q) || p.handle?.toLowerCase().includes(q));
      }
      if (stockFilter.value === "in_stock") {
        result = result.filter((p) => p.in_stock && (p.stock_quantity ?? 1) > 0);
      } else if (stockFilter.value === "low_stock") {
        result = result.filter((p) => p.stock_quantity !== null && p.stock_quantity > 0 && p.stock_quantity < 10);
      } else if (stockFilter.value === "out_of_stock") {
        result = result.filter((p) => !p.in_stock || p.stock_quantity === 0);
      }
      return result;
    });
    const fetchProducts = async () => {
      loading.value = true;
      try {
        const { data, error } = await client.from("products").select("id, title, handle, price, thumbnail, in_stock, stock_quantity").order("title");
        if (error) throw error;
        products.value = data || [];
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.add({ title: "Erreur", description: "Impossible de charger les produits", color: "red" });
      } finally {
        loading.value = false;
      }
    };
    const openEditModal = (product) => {
      editingProduct.value = product;
      editForm.stockQuantity = product.stock_quantity ?? 0;
      editForm.inStock = product.in_stock ?? true;
      showEditModal.value = true;
    };
    const saveStock = async () => {
      if (!editingProduct.value) return;
      saving.value = true;
      try {
        const { data: variants, error: variantError } = await client.from("product_variant").select("id").eq("product_id", editingProduct.value.id).is("deleted_at", null).limit(1);
        if (variantError) throw variantError;
        if (variants && variants.length > 0) {
          const variantId = variants[0].id;
          const { data: invItems } = await client.from("product_variant_inventory_item").select("inventory_item_id").eq("variant_id", variantId).limit(1);
          if (invItems && invItems.length > 0) {
            const { error: invError } = await client.from("inventory_level").update({
              stocked_quantity: editForm.stockQuantity,
              raw_stocked_quantity: { value: editForm.stockQuantity.toString(), precision: 20 }
            }).eq("inventory_item_id", invItems[0].inventory_item_id);
            if (invError) throw invError;
          }
        }
        toast.add({ title: "Succès", description: "Stock mis à jour", color: "green" });
        showEditModal.value = false;
        fetchProducts();
      } catch (error) {
        console.error("Error saving stock:", error);
        toast.add({ title: "Erreur", description: error.message || "Impossible de mettre à jour le stock", color: "red" });
      } finally {
        saving.value = false;
      }
    };
    const formatPrice = (amount) => {
      return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(amount || 0);
    };
    const getStockColor = (product) => {
      const qty = product.stock_quantity;
      if (qty === null || qty === void 0) return "text-gray-400";
      if (qty === 0) return "text-red-600";
      if (qty < 10) return "text-amber-600";
      return "text-green-600";
    };
    const getStatusBadge = (product) => {
      const qty = product.stock_quantity;
      if (!product.in_stock || qty === 0) return { label: "Rupture", color: "red" };
      if (qty !== null && qty < 10) return { label: "Stock faible", color: "amber" };
      return { label: "En stock", color: "green" };
    };
    useHead({
      title: "Stocks - Admin TchadBox"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = __nuxt_component_3;
      const _component_UInput = __nuxt_component_0;
      const _component_USelectMenu = __nuxt_component_2;
      const _component_UIcon = __nuxt_component_0$1;
      const _component_Icon = __nuxt_component_3$1;
      const _component_UBadge = __nuxt_component_5;
      const _component_UModal = __nuxt_component_9;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"><div><h1 class="text-2xl font-bold text-gray-900">Gestion des stocks</h1><p class="text-gray-500 mt-1">Suivez et mettez à jour les niveaux de stock</p></div><div class="flex gap-2">`);
      _push(ssrRenderComponent(_component_UButton, {
        onClick: fetchProducts,
        color: "gray",
        variant: "outline",
        icon: "i-lucide-refresh-cw",
        loading: unref(loading)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Actualiser `);
          } else {
            return [
              createTextVNode(" Actualiser ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"><div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100"><p class="text-sm text-gray-500">Total produits</p><p class="text-2xl font-bold text-gray-900">${ssrInterpolate(unref(products).length)}</p></div><div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100"><p class="text-sm text-gray-500">En stock</p><p class="text-2xl font-bold text-green-600">${ssrInterpolate(unref(inStockCount))}</p></div><div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100"><p class="text-sm text-gray-500">Stock faible</p><p class="text-2xl font-bold text-amber-600">${ssrInterpolate(unref(lowStockCount))}</p></div><div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100"><p class="text-sm text-gray-500">Rupture</p><p class="text-2xl font-bold text-red-600">${ssrInterpolate(unref(outOfStockCount))}</p></div></div><div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6 flex flex-col sm:flex-row gap-4">`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(search),
        "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
        placeholder: "Rechercher un produit...",
        icon: "i-lucide-search",
        class: "flex-grow"
      }, null, _parent));
      _push(ssrRenderComponent(_component_USelectMenu, {
        modelValue: unref(stockFilter),
        "onUpdate:modelValue": ($event) => isRef(stockFilter) ? stockFilter.value = $event : null,
        options: stockFilterOptions,
        placeholder: "Tous les statuts",
        class: "w-48"
      }, null, _parent));
      _push(`</div><div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">`);
      if (unref(loading)) {
        _push(`<div class="p-8 text-center">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-loader-2",
          class: "w-8 h-8 animate-spin text-primary-500 mx-auto"
        }, null, _parent));
        _push(`</div>`);
      } else if (unref(filteredProducts).length === 0) {
        _push(`<div class="p-8 text-center">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:package",
          class: "w-12 h-12 mx-auto text-gray-300 mb-3"
        }, null, _parent));
        _push(`<p class="text-gray-500">Aucun produit trouvé</p><p class="text-sm text-gray-400 mt-1">Les produits apparaîtront ici quand vous les ajouterez via Medusa Admin</p></div>`);
      } else {
        _push(`<div><table class="w-full"><thead><tr class="border-b border-gray-100 text-left"><th class="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Produit</th><th class="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Prix</th><th class="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Stock</th><th class="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Statut</th><th class="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th></tr></thead><tbody class="divide-y divide-gray-50"><!--[-->`);
        ssrRenderList(unref(filteredProducts), (product) => {
          _push(`<tr class="hover:bg-gray-50 transition-colors"><td class="px-6 py-4"><div class="flex items-center gap-3"><div class="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">`);
          if (product.thumbnail) {
            _push(`<img${ssrRenderAttr("src", product.thumbnail)}${ssrRenderAttr("alt", product.title)} class="w-full h-full object-cover">`);
          } else {
            _push(ssrRenderComponent(_component_Icon, {
              name: "lucide:package",
              class: "w-5 h-5 text-gray-400"
            }, null, _parent));
          }
          _push(`</div><div><p class="font-medium text-gray-900">${ssrInterpolate(product.title)}</p><p class="text-xs text-gray-400">${ssrInterpolate(product.handle)}</p></div></div></td><td class="px-6 py-4 font-medium text-gray-900">${ssrInterpolate(formatPrice(product.price))}</td><td class="px-6 py-4"><span class="${ssrRenderClass([getStockColor(product), "font-semibold"])}">${ssrInterpolate(product.stock_quantity ?? "—")}</span></td><td class="px-6 py-4">`);
          _push(ssrRenderComponent(_component_UBadge, {
            color: getStatusBadge(product).color,
            variant: "soft",
            size: "sm"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(getStatusBadge(product).label)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(getStatusBadge(product).label), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</td><td class="px-6 py-4">`);
          _push(ssrRenderComponent(_component_UButton, {
            size: "sm",
            color: "primary",
            variant: "soft",
            icon: "i-lucide-pencil",
            onClick: ($event) => openEditModal(product)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Modifier `);
              } else {
                return [
                  createTextVNode(" Modifier ")
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</td></tr>`);
        });
        _push(`<!--]--></tbody></table></div>`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_component_UModal, {
        modelValue: unref(showEditModal),
        "onUpdate:modelValue": ($event) => isRef(showEditModal) ? showEditModal.value = $event : null
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-6"${_scopeId}><h3 class="text-lg font-semibold text-gray-900 mb-1"${_scopeId}>Modifier le stock</h3><p class="text-sm text-gray-500 mb-6"${_scopeId}>${ssrInterpolate(unref(editingProduct)?.title)}</p><div class="space-y-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Quantité en stock</label>`);
            _push2(ssrRenderComponent(_component_UInput, {
              modelValue: unref(editForm).stockQuantity,
              "onUpdate:modelValue": ($event) => unref(editForm).stockQuantity = $event,
              modelModifiers: { number: true },
              type: "number",
              min: "0",
              placeholder: "0"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Disponibilité</label>`);
            _push2(ssrRenderComponent(_component_USelectMenu, {
              modelValue: unref(editForm).inStock,
              "onUpdate:modelValue": ($event) => unref(editForm).inStock = $event,
              options: [
                { label: "En stock", value: true },
                { label: "Rupture de stock", value: false }
              ],
              "value-attribute": "value",
              "option-attribute": "label"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex justify-end gap-3 mt-6"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              color: "gray",
              variant: "outline",
              onClick: ($event) => showEditModal.value = false
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Annuler`);
                } else {
                  return [
                    createTextVNode("Annuler")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UButton, {
              color: "primary",
              loading: unref(saving),
              onClick: saveStock
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Enregistrer`);
                } else {
                  return [
                    createTextVNode("Enregistrer")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-6" }, [
                createVNode("h3", { class: "text-lg font-semibold text-gray-900 mb-1" }, "Modifier le stock"),
                createVNode("p", { class: "text-sm text-gray-500 mb-6" }, toDisplayString(unref(editingProduct)?.title), 1),
                createVNode("div", { class: "space-y-4" }, [
                  createVNode("div", null, [
                    createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Quantité en stock"),
                    createVNode(_component_UInput, {
                      modelValue: unref(editForm).stockQuantity,
                      "onUpdate:modelValue": ($event) => unref(editForm).stockQuantity = $event,
                      modelModifiers: { number: true },
                      type: "number",
                      min: "0",
                      placeholder: "0"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", null, [
                    createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Disponibilité"),
                    createVNode(_component_USelectMenu, {
                      modelValue: unref(editForm).inStock,
                      "onUpdate:modelValue": ($event) => unref(editForm).inStock = $event,
                      options: [
                        { label: "En stock", value: true },
                        { label: "Rupture de stock", value: false }
                      ],
                      "value-attribute": "value",
                      "option-attribute": "label"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex justify-end gap-3 mt-6" }, [
                  createVNode(_component_UButton, {
                    color: "gray",
                    variant: "outline",
                    onClick: ($event) => showEditModal.value = false
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Annuler")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(_component_UButton, {
                    color: "primary",
                    loading: unref(saving),
                    onClick: saveStock
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Enregistrer")
                    ]),
                    _: 1
                  }, 8, ["loading"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/stocks.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=stocks-CZ_TRl6z.js.map
