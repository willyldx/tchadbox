import { e as _export_sfc, m as useUI, t as twMerge, o as appConfig, p as mergeConfig, q as looseToNumber, r as textarea, g as useToast, a as useHead, b as __nuxt_component_3, l as __nuxt_component_0$1, _ as __nuxt_component_3$1 } from "../server.mjs";
import { _ as __nuxt_component_0 } from "./Input-L-ABqH2D.js";
import { _ as __nuxt_component_2 } from "./SelectMenu-CHcoscsC.js";
import { _ as __nuxt_component_5 } from "./Badge-CCKIa51X.js";
import { _ as __nuxt_component_9 } from "./Modal-D6oFe3LW.js";
import { mergeProps, defineComponent, toRef, ref, watch, nextTick, computed, useSSRContext, reactive, withCtx, createTextVNode, unref, isRef, toDisplayString, createVNode, openBlock, createBlock, createCommentVNode } from "vue";
import { twJoin } from "tailwind-merge";
import { defu } from "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/defu/dist/defu.mjs";
import { u as useFormGroup } from "./useFormGroup-DTWlat5q.js";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderSlot, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrRenderClass } from "vue/server-renderer";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/hookable/dist/index.mjs";
import { u as useBackendApi } from "./useBackendApi-Dq4zIPvK.js";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/unctx/dist/index.mjs";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/h3/dist/index.mjs";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/ufo/dist/index.mjs";
import "vue-router";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/klona/dist/index.mjs";
import "framesync";
import "popmotion";
import "style-value-types";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/@unhead/vue/dist/index.mjs";
import "@iconify/vue";
import "lucide-vue-next";
import "@iconify/utils/lib/css/icon";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/nuxt/node_modules/perfect-debounce/dist/index.mjs";
import "ohash/utils";
import "@tanstack/vue-virtual";
import "./form-DsUILy5F.js";
import "./active-element-history-QtuHblWR.js";
import "./keyboard-BvysMIIh.js";
import "./usePopper-CIeS2-3g.js";
import "./hidden-CZ0WYEIB.js";
import "./description-DXB91rC2.js";
const config = mergeConfig(appConfig.ui.strategy, appConfig.ui.textarea, textarea);
const _sfc_main$1 = defineComponent({
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number],
      default: ""
    },
    id: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    rows: {
      type: Number,
      default: 3
    },
    maxrows: {
      type: Number,
      default: 0
    },
    autoresize: {
      type: Boolean,
      default: false
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    autofocusDelay: {
      type: Number,
      default: 100
    },
    resize: {
      type: Boolean,
      default: false
    },
    padded: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: null,
      validator(value) {
        return Object.keys(config.size).includes(value);
      }
    },
    color: {
      type: String,
      default: () => config.default.color,
      validator(value) {
        return [...appConfig.ui.colors, ...Object.keys(config.color)].includes(value);
      }
    },
    variant: {
      type: String,
      default: () => config.default.variant,
      validator(value) {
        return [
          ...Object.keys(config.variant),
          ...Object.values(config.color).flatMap((value2) => Object.keys(value2))
        ].includes(value);
      }
    },
    textareaClass: {
      type: String,
      default: null
    },
    class: {
      type: [String, Object, Array],
      default: () => ""
    },
    ui: {
      type: Object,
      default: () => ({})
    },
    modelModifiers: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update:modelValue", "blur", "change"],
  setup(props, { emit }) {
    const { ui, attrs } = useUI("textarea", toRef(props, "ui"), config, toRef(props, "class"));
    const { emitFormBlur, emitFormInput, inputId, color, size, name } = useFormGroup(props, config);
    const modelModifiers = ref(defu({}, props.modelModifiers, { trim: false, lazy: false, number: false, nullify: false }));
    const textarea2 = ref(null);
    const autoResize = () => {
      if (props.autoresize) {
        if (!textarea2.value) {
          return;
        }
        textarea2.value.rows = props.rows;
        const overflow = textarea2.value.style.overflow;
        textarea2.value.style.overflow = "hidden";
        const styles = (void 0).getComputedStyle(textarea2.value);
        const paddingTop = Number.parseInt(styles.paddingTop);
        const paddingBottom = Number.parseInt(styles.paddingBottom);
        const padding = paddingTop + paddingBottom;
        const lineHeight = Number.parseInt(styles.lineHeight);
        const { scrollHeight } = textarea2.value;
        const newRows = (scrollHeight - padding) / lineHeight;
        if (newRows > props.rows) {
          textarea2.value.rows = props.maxrows ? Math.min(newRows, props.maxrows) : newRows;
        }
        textarea2.value.style.overflow = overflow;
      }
    };
    const updateInput = (value) => {
      if (modelModifiers.value.trim) {
        value = value.trim();
      }
      if (modelModifiers.value.number) {
        value = looseToNumber(value);
      }
      if (modelModifiers.value.nullify) {
        value ||= null;
      }
      emit("update:modelValue", value);
      emitFormInput();
    };
    const onInput = (event) => {
      autoResize();
      if (!modelModifiers.value.lazy) {
        updateInput(event.target.value);
      }
    };
    const onChange = (event) => {
      const value = event.target.value;
      emit("change", value);
      if (modelModifiers.value.lazy) {
        updateInput(value);
      }
      if (modelModifiers.value.trim) {
        event.target.value = value.trim();
      }
    };
    const onBlur = (event) => {
      emit("blur", event);
      emitFormBlur();
    };
    watch(() => props.modelValue, () => {
      nextTick(autoResize);
    });
    const textareaClass = computed(() => {
      const variant = ui.value.color?.[color.value]?.[props.variant] || ui.value.variant[props.variant];
      return twMerge(twJoin(
        ui.value.base,
        ui.value.form,
        ui.value.rounded,
        ui.value.placeholder,
        ui.value.size[size.value],
        props.padded ? ui.value.padding[size.value] : "p-0",
        variant?.replaceAll("{color}", color.value),
        !props.resize && "resize-none"
      ), props.textareaClass);
    });
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,
      // eslint-disable-next-line vue/no-dupe-keys
      name,
      inputId,
      textarea: textarea2,
      // eslint-disable-next-line vue/no-dupe-keys
      textareaClass,
      onInput,
      onChange,
      onBlur
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  let _temp0;
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: _ctx.ui.wrapper
  }, _attrs))}><textarea${ssrRenderAttrs(_temp0 = mergeProps({
    id: _ctx.inputId,
    ref: "textarea",
    value: _ctx.modelValue,
    name: _ctx.name,
    rows: _ctx.rows,
    required: _ctx.required,
    disabled: _ctx.disabled,
    placeholder: _ctx.placeholder,
    class: _ctx.textareaClass
  }, _ctx.attrs), "textarea")}>${ssrInterpolate("value" in _temp0 ? _temp0.value : "")}</textarea>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/forms/Textarea.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_7 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "stocks",
  __ssrInlineRender: true,
  setup(__props) {
    const api = useBackendApi();
    const toast = useToast();
    const loading = ref(true);
    const saving = ref(false);
    const creating = ref(false);
    const uploadingImage = ref(false);
    const products = ref([]);
    const search = ref("");
    const stockFilter = ref("");
    const showEditModal = ref(false);
    const showCreateModal = ref(false);
    const editingProduct = ref(null);
    const editForm = reactive({
      stockQuantity: 0,
      inStock: true
    });
    const createForm = reactive({
      title: "",
      price: 0,
      subtitle: "",
      description: "",
      category: "",
      category_handle: "",
      thumbnail: "",
      stock_quantity: 0
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
        const result = await api.adminStocks();
        products.value = result?.data || [];
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
        await api.adminStockUpdate(editingProduct.value.id, {
          stock_quantity: editForm.stockQuantity,
          in_stock: editForm.inStock
        });
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
    const createProduct = async () => {
      creating.value = true;
      try {
        await api.adminProductCreate({
          title: createForm.title,
          price: createForm.price,
          subtitle: createForm.subtitle || void 0,
          description: createForm.description || void 0,
          category: createForm.category || void 0,
          category_handle: createForm.category_handle || void 0,
          thumbnail: createForm.thumbnail || void 0,
          stock_quantity: createForm.stock_quantity,
          in_stock: true
        });
        toast.add({ title: "Succès", description: "Produit créé avec succès", color: "green" });
        showCreateModal.value = false;
        Object.assign(createForm, { title: "", price: 0, subtitle: "", description: "", category: "", category_handle: "", thumbnail: "", stock_quantity: 0 });
        fetchProducts();
      } catch (error) {
        console.error("Error creating product:", error);
        toast.add({ title: "Erreur", description: error?.data?.message || error.message || "Impossible de créer le produit", color: "red" });
      } finally {
        creating.value = false;
      }
    };
    const onImageSelected = async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      uploadingImage.value = true;
      try {
        const res = await api.adminUploadFile(file);
        createForm.thumbnail = res.url;
        toast.add({ title: "Aperçu généré", description: `L'image est prête !`, color: "green" });
      } catch (error) {
        console.error("Upload failed:", error);
        toast.add({ title: "Erreur", description: `Impossible de télécharger l'image.`, color: "red" });
      } finally {
        uploadingImage.value = false;
      }
    };
    const deleteProduct = async (product) => {
      if (!confirm(`Supprimer "${product.title}" ? Cette action est irréversible.`)) return;
      try {
        await api.adminProductDelete(product.id);
        toast.add({ title: "Supprimé", description: "Produit supprimé", color: "green" });
        fetchProducts();
      } catch (error) {
        toast.add({ title: "Erreur", description: error.message || "Impossible de supprimer", color: "red" });
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
      const _component_UTextarea = __nuxt_component_7;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"><div><h1 class="text-2xl font-bold text-gray-900">Gestion des stocks</h1><p class="text-gray-500 mt-1">Suivez et mettez à jour les niveaux de stock</p></div><div class="flex gap-2">`);
      _push(ssrRenderComponent(_component_UButton, {
        onClick: ($event) => showCreateModal.value = true,
        color: "primary",
        icon: "i-lucide-plus"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Ajouter un produit `);
          } else {
            return [
              createTextVNode(" Ajouter un produit ")
            ];
          }
        }),
        _: 1
      }, _parent));
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
        _push(`<p class="text-gray-500">Aucun produit trouvé</p><p class="text-sm text-gray-400 mt-1">Cliquez sur &quot;Ajouter un produit&quot; pour commencer</p></div>`);
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
          _push(`</td><td class="px-6 py-4"><div class="flex gap-2">`);
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
          _push(ssrRenderComponent(_component_UButton, {
            size: "sm",
            color: "red",
            variant: "soft",
            icon: "i-lucide-trash-2",
            onClick: ($event) => deleteProduct(product)
          }, null, _parent));
          _push(`</div></td></tr>`);
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
      _push(ssrRenderComponent(_component_UModal, {
        modelValue: unref(showCreateModal),
        "onUpdate:modelValue": ($event) => isRef(showCreateModal) ? showCreateModal.value = $event : null
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-6"${_scopeId}><h3 class="text-lg font-semibold text-gray-900 mb-1"${_scopeId}>Ajouter un produit</h3><p class="text-sm text-gray-500 mb-6"${_scopeId}>Remplissez les informations du nouveau produit</p><div class="space-y-4 max-h-[60vh] overflow-y-auto pr-2"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Nom du produit *</label>`);
            _push2(ssrRenderComponent(_component_UInput, {
              modelValue: unref(createForm).title,
              "onUpdate:modelValue": ($event) => unref(createForm).title = $event,
              placeholder: "Ex: Sac de riz 25kg"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="grid grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Prix (€) *</label>`);
            _push2(ssrRenderComponent(_component_UInput, {
              modelValue: unref(createForm).price,
              "onUpdate:modelValue": ($event) => unref(createForm).price = $event,
              modelModifiers: { number: true },
              type: "number",
              min: "0",
              step: "0.01",
              placeholder: "0.00"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Stock initial</label>`);
            _push2(ssrRenderComponent(_component_UInput, {
              modelValue: unref(createForm).stock_quantity,
              "onUpdate:modelValue": ($event) => unref(createForm).stock_quantity = $event,
              modelModifiers: { number: true },
              type: "number",
              min: "0",
              placeholder: "0"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Sous-titre</label>`);
            _push2(ssrRenderComponent(_component_UInput, {
              modelValue: unref(createForm).subtitle,
              "onUpdate:modelValue": ($event) => unref(createForm).subtitle = $event,
              placeholder: "Courte description"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="grid grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Catégorie</label>`);
            _push2(ssrRenderComponent(_component_UInput, {
              modelValue: unref(createForm).category,
              "onUpdate:modelValue": ($event) => unref(createForm).category = $event,
              placeholder: "Ex: Alimentaire"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Slug catégorie</label>`);
            _push2(ssrRenderComponent(_component_UInput, {
              modelValue: unref(createForm).category_handle,
              "onUpdate:modelValue": ($event) => unref(createForm).category_handle = $event,
              placeholder: "Ex: alimentaire"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Image du produit</label><div class="flex flex-col gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UInput, {
              type: "file",
              accept: "image/*",
              loading: unref(uploadingImage),
              onChange: onImageSelected
            }, null, _parent2, _scopeId));
            if (unref(createForm).thumbnail) {
              _push2(`<img${ssrRenderAttr("src", unref(createForm).thumbnail)} class="h-20 w-20 object-cover rounded-md border border-gray-200" alt="Aperçu"${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Description</label>`);
            _push2(ssrRenderComponent(_component_UTextarea, {
              modelValue: unref(createForm).description,
              "onUpdate:modelValue": ($event) => unref(createForm).description = $event,
              rows: 3,
              placeholder: "Description détaillée du produit..."
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex justify-end gap-3 mt-6"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              color: "gray",
              variant: "outline",
              onClick: ($event) => showCreateModal.value = false
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
              loading: unref(creating),
              disabled: !unref(createForm).title || !unref(createForm).price,
              onClick: createProduct
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Créer le produit`);
                } else {
                  return [
                    createTextVNode("Créer le produit")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-6" }, [
                createVNode("h3", { class: "text-lg font-semibold text-gray-900 mb-1" }, "Ajouter un produit"),
                createVNode("p", { class: "text-sm text-gray-500 mb-6" }, "Remplissez les informations du nouveau produit"),
                createVNode("div", { class: "space-y-4 max-h-[60vh] overflow-y-auto pr-2" }, [
                  createVNode("div", null, [
                    createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Nom du produit *"),
                    createVNode(_component_UInput, {
                      modelValue: unref(createForm).title,
                      "onUpdate:modelValue": ($event) => unref(createForm).title = $event,
                      placeholder: "Ex: Sac de riz 25kg"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Prix (€) *"),
                      createVNode(_component_UInput, {
                        modelValue: unref(createForm).price,
                        "onUpdate:modelValue": ($event) => unref(createForm).price = $event,
                        modelModifiers: { number: true },
                        type: "number",
                        min: "0",
                        step: "0.01",
                        placeholder: "0.00"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Stock initial"),
                      createVNode(_component_UInput, {
                        modelValue: unref(createForm).stock_quantity,
                        "onUpdate:modelValue": ($event) => unref(createForm).stock_quantity = $event,
                        modelModifiers: { number: true },
                        type: "number",
                        min: "0",
                        placeholder: "0"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
                  ]),
                  createVNode("div", null, [
                    createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Sous-titre"),
                    createVNode(_component_UInput, {
                      modelValue: unref(createForm).subtitle,
                      "onUpdate:modelValue": ($event) => unref(createForm).subtitle = $event,
                      placeholder: "Courte description"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Catégorie"),
                      createVNode(_component_UInput, {
                        modelValue: unref(createForm).category,
                        "onUpdate:modelValue": ($event) => unref(createForm).category = $event,
                        placeholder: "Ex: Alimentaire"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Slug catégorie"),
                      createVNode(_component_UInput, {
                        modelValue: unref(createForm).category_handle,
                        "onUpdate:modelValue": ($event) => unref(createForm).category_handle = $event,
                        placeholder: "Ex: alimentaire"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
                  ]),
                  createVNode("div", null, [
                    createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Image du produit"),
                    createVNode("div", { class: "flex flex-col gap-2" }, [
                      createVNode(_component_UInput, {
                        type: "file",
                        accept: "image/*",
                        loading: unref(uploadingImage),
                        onChange: onImageSelected
                      }, null, 8, ["loading"]),
                      unref(createForm).thumbnail ? (openBlock(), createBlock("img", {
                        key: 0,
                        src: unref(createForm).thumbnail,
                        class: "h-20 w-20 object-cover rounded-md border border-gray-200",
                        alt: "Aperçu"
                      }, null, 8, ["src"])) : createCommentVNode("", true)
                    ])
                  ]),
                  createVNode("div", null, [
                    createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Description"),
                    createVNode(_component_UTextarea, {
                      modelValue: unref(createForm).description,
                      "onUpdate:modelValue": ($event) => unref(createForm).description = $event,
                      rows: 3,
                      placeholder: "Description détaillée du produit..."
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                createVNode("div", { class: "flex justify-end gap-3 mt-6" }, [
                  createVNode(_component_UButton, {
                    color: "gray",
                    variant: "outline",
                    onClick: ($event) => showCreateModal.value = false
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Annuler")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(_component_UButton, {
                    color: "primary",
                    loading: unref(creating),
                    disabled: !unref(createForm).title || !unref(createForm).price,
                    onClick: createProduct
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Créer le produit")
                    ]),
                    _: 1
                  }, 8, ["loading", "disabled"])
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
//# sourceMappingURL=stocks-BArDj50-.js.map
