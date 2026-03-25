import { k as useRoute, g as useToast, a as useHead, b as __nuxt_component_3, l as __nuxt_component_0, _ as __nuxt_component_3$1, i as useAuthStore, s as useSupabase } from "../server.mjs";
import { _ as __nuxt_component_5 } from "./Badge-CCKIa51X.js";
import { _ as __nuxt_component_9 } from "./Modal-D6oFe3LW.js";
import { defineComponent, ref, computed, mergeProps, withCtx, createTextVNode, unref, toDisplayString, createVNode, isRef, openBlock, createBlock, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList } from "vue/server-renderer";
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
import "./keyboard-BvysMIIh.js";
import "./hidden-CZ0WYEIB.js";
import "./active-element-history-QtuHblWR.js";
import "./description-DXB91rC2.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    const { client, uploadImage } = useSupabase();
    const toast = useToast();
    const loading = ref(true);
    const updating = ref(false);
    const delivery = ref(null);
    const showCompleteModal = ref(false);
    const photoFile = ref(null);
    const photoPreview = ref(null);
    const fileInput = ref(null);
    const startDelivery = async () => {
      if (!delivery.value) return;
      updating.value = true;
      try {
        const { error } = await client.from("orders").update({
          fulfillment_status: "shipped",
          picked_up_at: (/* @__PURE__ */ new Date()).toISOString()
        }).eq("id", delivery.value.id);
        if (error) throw error;
        delivery.value.fulfillmentStatus = "shipped";
        toast.add({ title: "Succès", description: "Livraison démarrée", color: "green" });
      } catch (error) {
        console.error("Error starting delivery:", error);
        toast.add({ title: "Erreur", description: "Impossible de démarrer la livraison", color: "red" });
      } finally {
        updating.value = false;
      }
    };
    const triggerCamera = () => {
      fileInput.value?.click();
    };
    const handlePhoto = (event) => {
      const input = event.target;
      if (input.files && input.files[0]) {
        photoFile.value = input.files[0];
        photoPreview.value = URL.createObjectURL(input.files[0]);
      }
    };
    const clearPhoto = () => {
      photoFile.value = null;
      photoPreview.value = null;
      if (fileInput.value) fileInput.value.value = "";
    };
    const completeDelivery = async () => {
      if (!delivery.value) return;
      updating.value = true;
      try {
        let photoUrl = null;
        if (photoFile.value) {
          const path = `deliveries/${delivery.value.id}_${Date.now()}.jpg`;
          photoUrl = await uploadImage("delivery-photos", path, photoFile.value);
        }
        const { error } = await client.from("orders").update({
          fulfillment_status: "delivered",
          delivered_at: (/* @__PURE__ */ new Date()).toISOString(),
          delivery_photo: photoUrl,
          status: "completed"
        }).eq("id", delivery.value.id);
        if (error) throw error;
        const authStore = useAuthStore();
        if (authStore.user) {
          await client.rpc("increment_delivery_count", { agent_user_id: authStore.user.id });
        }
        delivery.value.fulfillmentStatus = "delivered";
        delivery.value.deliveredAt = (/* @__PURE__ */ new Date()).toISOString();
        delivery.value.deliveryPhoto = photoUrl || void 0;
        showCompleteModal.value = false;
        toast.add({ title: "Succès", description: "Livraison confirmée !", color: "green" });
      } catch (error) {
        console.error("Error completing delivery:", error);
        toast.add({ title: "Erreur", description: "Impossible de confirmer la livraison", color: "red" });
      } finally {
        updating.value = false;
      }
    };
    const openInMaps = () => {
      if (!delivery.value?.shippingAddress) return;
      const addr = delivery.value.shippingAddress;
      const query = encodeURIComponent(`${addr.address_1}, ${addr.city}, ${addr.country}`);
      (void 0).open(`https://www.google.com/maps/search/?api=1&query=${query}`, "_blank");
    };
    const formatPrice = (amount) => {
      return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(amount);
    };
    const formatDateTime = (date) => {
      if (!date) return "-";
      return new Date(date).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    const getStatusColor = (status) => {
      const colors = {
        fulfilled: "amber",
        shipped: "blue",
        delivered: "green"
      };
      return colors[status] || "gray";
    };
    const getStatusLabel = (status) => {
      const labels = {
        fulfilled: "À récupérer",
        shipped: "En livraison",
        delivered: "Livré"
      };
      return labels[status] || status;
    };
    useHead({
      title: computed(() => delivery.value ? `Livraison #${delivery.value.displayId}` : "Chargement...")
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = __nuxt_component_3;
      const _component_UIcon = __nuxt_component_0;
      const _component_UBadge = __nuxt_component_5;
      const _component_Icon = __nuxt_component_3$1;
      const _component_UModal = __nuxt_component_9;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "px-4 py-6" }, _attrs))}><div class="mb-4">`);
      _push(ssrRenderComponent(_component_UButton, {
        to: "/livreur",
        color: "gray",
        variant: "ghost",
        icon: "i-lucide-arrow-left",
        size: "sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Retour `);
          } else {
            return [
              createTextVNode(" Retour ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (unref(loading)) {
        _push(`<div class="flex items-center justify-center py-12">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-loader-2",
          class: "w-8 h-8 animate-spin text-green-500"
        }, null, _parent));
        _push(`</div>`);
      } else if (unref(delivery)) {
        _push(`<div><div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4"><div class="flex items-start justify-between mb-3"><div><h1 class="text-xl font-bold text-gray-900">#${ssrInterpolate(unref(delivery).displayId)}</h1><p class="text-sm text-gray-500">Assignée ${ssrInterpolate(formatDateTime(unref(delivery).assignedAt))}</p></div>`);
        _push(ssrRenderComponent(_component_UBadge, {
          color: getStatusColor(unref(delivery).fulfillmentStatus),
          variant: "soft",
          size: "lg"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(getStatusLabel(unref(delivery).fulfillmentStatus))}`);
            } else {
              return [
                createTextVNode(toDisplayString(getStatusLabel(unref(delivery).fulfillmentStatus)), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="text-2xl font-bold text-green-600">${ssrInterpolate(formatPrice(unref(delivery).total))}</div></div><div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4"><h2 class="font-semibold text-gray-900 mb-3 flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:user",
          class: "w-5 h-5 text-gray-400"
        }, null, _parent));
        _push(` Destinataire </h2><div class="space-y-3"><div><p class="font-medium text-gray-900">${ssrInterpolate(unref(delivery).recipientName)}</p></div><a${ssrRenderAttr("href", `tel:${unref(delivery).recipientPhone}`)} class="flex items-center gap-3 p-3 bg-green-50 rounded-lg"><div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:phone",
          class: "w-5 h-5 text-green-600"
        }, null, _parent));
        _push(`</div><div class="flex-1"><p class="text-sm text-gray-500">Téléphone</p><p class="font-medium text-gray-900">${ssrInterpolate(unref(delivery).recipientPhone)}</p></div>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:chevron-right",
          class: "w-5 h-5 text-gray-400"
        }, null, _parent));
        _push(`</a></div></div><div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4"><h2 class="font-semibold text-gray-900 mb-3 flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:map-pin",
          class: "w-5 h-5 text-gray-400"
        }, null, _parent));
        _push(` Adresse de livraison </h2>`);
        if (unref(delivery).shippingAddress) {
          _push(`<div class="mb-4"><p class="text-gray-900">${ssrInterpolate(unref(delivery).shippingAddress.address_1)}</p>`);
          if (unref(delivery).shippingAddress.address_2) {
            _push(`<p class="text-gray-600">${ssrInterpolate(unref(delivery).shippingAddress.address_2)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<p class="text-gray-600">${ssrInterpolate(unref(delivery).shippingAddress.city)}, ${ssrInterpolate(unref(delivery).shippingAddress.country)}</p></div>`);
        } else {
          _push(`<p class="text-gray-500">Adresse non spécifiée</p>`);
        }
        if (unref(delivery).shippingAddress) {
          _push(ssrRenderComponent(_component_UButton, {
            onClick: openInMaps,
            color: "gray",
            variant: "outline",
            icon: "i-lucide-navigation",
            class: "w-full"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Ouvrir dans Google Maps `);
              } else {
                return [
                  createTextVNode(" Ouvrir dans Google Maps ")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (unref(delivery).deliveryInstructions) {
          _push(`<div class="mt-4 p-3 bg-amber-50 rounded-lg"><p class="text-xs text-amber-600 font-medium mb-1">Instructions de livraison</p><p class="text-sm text-gray-700">${ssrInterpolate(unref(delivery).deliveryInstructions)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4"><h2 class="font-semibold text-gray-900 mb-3 flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:package",
          class: "w-5 h-5 text-gray-400"
        }, null, _parent));
        _push(` Articles (${ssrInterpolate(unref(delivery).items?.length || 0)}) </h2><div class="space-y-3"><!--[-->`);
        ssrRenderList(unref(delivery).items, (item) => {
          _push(`<div class="flex items-center gap-3"><div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">`);
          if (item.thumbnail) {
            _push(`<img${ssrRenderAttr("src", item.thumbnail)}${ssrRenderAttr("alt", item.title)} class="w-full h-full object-cover">`);
          } else {
            _push(ssrRenderComponent(_component_Icon, {
              name: "lucide:package",
              class: "w-5 h-5 text-gray-400"
            }, null, _parent));
          }
          _push(`</div><div class="flex-1"><p class="font-medium text-gray-900 text-sm">${ssrInterpolate(item.title)}</p><p class="text-xs text-gray-500">Qté: ${ssrInterpolate(item.quantity)}</p></div></div>`);
        });
        _push(`<!--]--></div></div><div class="fixed bottom-24 left-4 right-4 space-y-3">`);
        if (unref(delivery).fulfillmentStatus === "fulfilled") {
          _push(ssrRenderComponent(_component_UButton, {
            onClick: startDelivery,
            color: "blue",
            size: "xl",
            class: "w-full",
            loading: unref(updating)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_Icon, {
                  name: "lucide:truck",
                  class: "w-5 h-5 mr-2"
                }, null, _parent2, _scopeId));
                _push2(` Commencer la livraison `);
              } else {
                return [
                  createVNode(_component_Icon, {
                    name: "lucide:truck",
                    class: "w-5 h-5 mr-2"
                  }),
                  createTextVNode(" Commencer la livraison ")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (unref(delivery).fulfillmentStatus === "shipped") {
          _push(ssrRenderComponent(_component_UButton, {
            onClick: ($event) => showCompleteModal.value = true,
            color: "green",
            size: "xl",
            class: "w-full"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_Icon, {
                  name: "lucide:check-circle",
                  class: "w-5 h-5 mr-2"
                }, null, _parent2, _scopeId));
                _push2(` Confirmer la livraison `);
              } else {
                return [
                  createVNode(_component_Icon, {
                    name: "lucide:check-circle",
                    class: "w-5 h-5 mr-2"
                  }),
                  createTextVNode(" Confirmer la livraison ")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (unref(delivery).fulfillmentStatus === "delivered") {
          _push(`<div class="bg-green-50 rounded-xl p-4 text-center">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "lucide:check-circle",
            class: "w-12 h-12 mx-auto text-green-500 mb-2"
          }, null, _parent));
          _push(`<p class="font-medium text-green-700">Livraison effectuée</p><p class="text-sm text-green-600">${ssrInterpolate(formatDateTime(unref(delivery).deliveredAt))}</p>`);
          if (unref(delivery).deliveryPhoto) {
            _push(`<img${ssrRenderAttr("src", unref(delivery).deliveryPhoto)} alt="Preuve" class="mt-3 rounded-lg w-full max-h-40 object-cover">`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_UModal, {
        modelValue: unref(showCompleteModal),
        "onUpdate:modelValue": ($event) => isRef(showCompleteModal) ? showCompleteModal.value = $event : null
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-6"${_scopeId}><h3 class="text-lg font-semibold text-gray-900 mb-2"${_scopeId}>Confirmer la livraison</h3><p class="text-sm text-gray-500 mb-4"${_scopeId}> Prenez une photo comme preuve de livraison </p><div class="mb-4"${_scopeId}>`);
            if (!unref(photoPreview)) {
              _push2(`<div class="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-green-500 transition-colors"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: "lucide:camera",
                class: "w-12 h-12 mx-auto text-gray-400 mb-2"
              }, null, _parent2, _scopeId));
              _push2(`<p class="text-sm text-gray-500"${_scopeId}>Appuyez pour prendre une photo</p></div>`);
            } else {
              _push2(`<div class="relative"${_scopeId}><img${ssrRenderAttr("src", unref(photoPreview))} alt="Preview" class="w-full rounded-xl"${_scopeId}><button class="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: "lucide:x",
                class: "w-5 h-5"
              }, null, _parent2, _scopeId));
              _push2(`</button></div>`);
            }
            _push2(`<input type="file" accept="image/*" capture="environment" class="hidden"${_scopeId}></div><div class="flex gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              color: "gray",
              variant: "outline",
              class: "flex-1",
              onClick: ($event) => showCompleteModal.value = false
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Annuler `);
                } else {
                  return [
                    createTextVNode(" Annuler ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UButton, {
              color: "green",
              class: "flex-1",
              loading: unref(updating),
              onClick: completeDelivery
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Confirmer `);
                } else {
                  return [
                    createTextVNode(" Confirmer ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-6" }, [
                createVNode("h3", { class: "text-lg font-semibold text-gray-900 mb-2" }, "Confirmer la livraison"),
                createVNode("p", { class: "text-sm text-gray-500 mb-4" }, " Prenez une photo comme preuve de livraison "),
                createVNode("div", { class: "mb-4" }, [
                  !unref(photoPreview) ? (openBlock(), createBlock("div", {
                    key: 0,
                    onClick: triggerCamera,
                    class: "border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-green-500 transition-colors"
                  }, [
                    createVNode(_component_Icon, {
                      name: "lucide:camera",
                      class: "w-12 h-12 mx-auto text-gray-400 mb-2"
                    }),
                    createVNode("p", { class: "text-sm text-gray-500" }, "Appuyez pour prendre une photo")
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "relative"
                  }, [
                    createVNode("img", {
                      src: unref(photoPreview),
                      alt: "Preview",
                      class: "w-full rounded-xl"
                    }, null, 8, ["src"]),
                    createVNode("button", {
                      onClick: clearPhoto,
                      class: "absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center"
                    }, [
                      createVNode(_component_Icon, {
                        name: "lucide:x",
                        class: "w-5 h-5"
                      })
                    ])
                  ])),
                  createVNode("input", {
                    ref_key: "fileInput",
                    ref: fileInput,
                    type: "file",
                    accept: "image/*",
                    capture: "environment",
                    onChange: handlePhoto,
                    class: "hidden"
                  }, null, 544)
                ]),
                createVNode("div", { class: "flex gap-3" }, [
                  createVNode(_component_UButton, {
                    color: "gray",
                    variant: "outline",
                    class: "flex-1",
                    onClick: ($event) => showCompleteModal.value = false
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Annuler ")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(_component_UButton, {
                    color: "green",
                    class: "flex-1",
                    loading: unref(updating),
                    onClick: completeDelivery
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Confirmer ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/livreur/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=_id_-AD7zLEQk.js.map
