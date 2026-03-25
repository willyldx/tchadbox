import { j as useRoute, s as useSupabase, g as useToast, a as useHead, b as __nuxt_component_3$1, l as __nuxt_component_0$2, _ as __nuxt_component_3$2 } from './server.mjs';
import { _ as __nuxt_component_5 } from './Badge-CCKIa51X.mjs';
import { _ as __nuxt_component_9 } from './Modal-D6oFe3LW.mjs';
import { _ as __nuxt_component_2 } from './SelectMenu-CHcoscsC.mjs';
import { defineComponent, ref, computed, withCtx, createTextVNode, unref, toDisplayString, createVNode, isRef, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
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
import './keyboard-BvysMIIh.mjs';
import './hidden-CZ0WYEIB.mjs';
import './active-element-history-QtuHblWR.mjs';
import './description-DXB91rC2.mjs';
import '@tanstack/vue-virtual';
import './form-DsUILy5F.mjs';
import './usePopper-CIeS2-3g.mjs';
import './useFormGroup-DTWlat5q.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const { client, uploadImage } = useSupabase();
    const toast = useToast();
    const loading = ref(true);
    const updating = ref(false);
    const order = ref(null);
    const orderItems = ref([]);
    const assignedLivreur = ref(null);
    const showAssignModal = ref(false);
    const showDeliveryModal = ref(false);
    const selectedLivreur = ref(null);
    const livreurs = ref([]);
    const deliveryPhoto = ref(null);
    const fetchOrder = async () => {
      loading.value = true;
      try {
        const { data: allOrders, error } = await client.rpc("get_all_orders");
        if (error) throw error;
        order.value = (allOrders == null ? void 0 : allOrders.find((o) => o.id === route.params.id)) || null;
        if (order.value) {
          const { data: items } = await client.from("order_items").select("*").eq("order_id", route.params.id);
          orderItems.value = items || [];
          if (order.value.assigned_to) {
            const { data: livreurData } = await client.rpc("get_profiles_by_role", { target_role: "livreur" });
            assignedLivreur.value = (livreurData == null ? void 0 : livreurData.find((l) => l.id === order.value.assigned_to)) || null;
          }
        }
      } catch (error) {
        console.error("Error fetching order:", error);
        toast.add({ title: "Erreur", description: "Impossible de charger la commande", color: "red" });
      } finally {
        loading.value = false;
      }
    };
    const updateFulfillment = async (status) => {
      if (!order.value) return;
      updating.value = true;
      try {
        const { error } = await client.from("orders").update({
          fulfillment_status: status,
          updated_at: (/* @__PURE__ */ new Date()).toISOString()
        }).eq("id", order.value.id);
        if (error) throw error;
        order.value.fulfillment_status = status;
        toast.add({ title: "Succ\xE8s", description: "Statut mis \xE0 jour", color: "green" });
      } catch (error) {
        console.error("Error updating status:", error);
        toast.add({ title: "Erreur", description: "Impossible de mettre \xE0 jour le statut", color: "red" });
      } finally {
        updating.value = false;
      }
    };
    const assignLivreur = async () => {
      if (!order.value || !selectedLivreur.value) return;
      updating.value = true;
      try {
        const { error } = await client.rpc("assign_delivery_agent", {
          order_id: order.value.id,
          agent_id: selectedLivreur.value
        });
        if (error) throw error;
        toast.add({ title: "Succ\xE8s", description: "Livreur assign\xE9", color: "green" });
        showAssignModal.value = false;
        fetchOrder();
      } catch (error) {
        console.error("Error assigning livreur:", error);
        toast.add({ title: "Erreur", description: "Impossible d'assigner le livreur", color: "red" });
      } finally {
        updating.value = false;
      }
    };
    const handlePhotoUpload = (event) => {
      const input = event.target;
      if (input.files && input.files[0]) {
        deliveryPhoto.value = input.files[0];
      }
    };
    const confirmDelivery = async () => {
      if (!order.value) return;
      updating.value = true;
      try {
        let photoUrl = null;
        if (deliveryPhoto.value) {
          const path = `deliveries/${order.value.id}_${Date.now()}.jpg`;
          photoUrl = await uploadImage("delivery-photos", path, deliveryPhoto.value);
        }
        const { error } = await client.from("orders").update({
          fulfillment_status: "delivered",
          delivered_at: (/* @__PURE__ */ new Date()).toISOString(),
          delivery_photo: photoUrl,
          status: "completed"
        }).eq("id", order.value.id);
        if (error) throw error;
        toast.add({ title: "Succ\xE8s", description: "Livraison confirm\xE9e", color: "green" });
        showDeliveryModal.value = false;
        fetchOrder();
      } catch (error) {
        console.error("Error confirming delivery:", error);
        toast.add({ title: "Erreur", description: "Impossible de confirmer la livraison", color: "red" });
      } finally {
        updating.value = false;
      }
    };
    const formatPrice = (amount) => {
      return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(amount || 0);
    };
    const formatDateTime = (date) => {
      if (!date) return "-";
      return new Date(date).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    const getStatusColor = (status) => {
      const colors = { pending: "amber", processing: "blue", completed: "green", cancelled: "red" };
      return colors[status] || "gray";
    };
    const getStatusLabel = (status) => {
      const labels = { pending: "En attente", processing: "En cours", completed: "Termin\xE9", cancelled: "Annul\xE9" };
      return labels[status] || status;
    };
    const getFulfillmentColor = (status) => {
      const colors = { not_fulfilled: "gray", fulfilled: "cyan", shipped: "indigo", delivered: "green" };
      return colors[status] || "gray";
    };
    const getFulfillmentLabel = (status) => {
      const labels = { not_fulfilled: "Non trait\xE9", fulfilled: "Pr\xEAt", shipped: "En livraison", delivered: "Livr\xE9" };
      return labels[status] || status;
    };
    useHead({
      title: computed(() => order.value ? `Commande #${order.value.display_id || order.value.id.slice(0, 8).toUpperCase()} - Admin TchadBox` : "Chargement...")
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = __nuxt_component_3$1;
      const _component_UIcon = __nuxt_component_0$2;
      const _component_UBadge = __nuxt_component_5;
      const _component_Icon = __nuxt_component_3$2;
      const _component_UModal = __nuxt_component_9;
      const _component_USelectMenu = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="mb-6">`);
      _push(ssrRenderComponent(_component_UButton, {
        to: "/admin/commandes",
        color: "gray",
        variant: "ghost",
        icon: "i-lucide-arrow-left"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Retour aux commandes `);
          } else {
            return [
              createTextVNode(" Retour aux commandes ")
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
          class: "w-8 h-8 animate-spin text-primary-500"
        }, null, _parent));
        _push(`</div>`);
      } else if (unref(order)) {
        _push(`<div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><div class="lg:col-span-2 space-y-6"><div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6"><div class="flex items-start justify-between mb-6"><div><h1 class="text-2xl font-bold text-gray-900">Commande #${ssrInterpolate(unref(order).display_id || unref(order).id.slice(0, 8).toUpperCase())}</h1><p class="text-gray-500 mt-1">${ssrInterpolate(formatDateTime(unref(order).created_at))}</p></div><div class="flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_UBadge, {
          color: getStatusColor(unref(order).status),
          variant: "soft",
          size: "lg"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(getStatusLabel(unref(order).status))}`);
            } else {
              return [
                createTextVNode(toDisplayString(getStatusLabel(unref(order).status)), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_UBadge, {
          color: getFulfillmentColor(unref(order).fulfillment_status),
          variant: "soft",
          size: "lg"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(getFulfillmentLabel(unref(order).fulfillment_status))}`);
            } else {
              return [
                createTextVNode(toDisplayString(getFulfillmentLabel(unref(order).fulfillment_status)), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div><div class="flex flex-wrap gap-3">`);
        if (unref(order).fulfillment_status === "not_fulfilled") {
          _push(ssrRenderComponent(_component_UButton, {
            onClick: ($event) => updateFulfillment("fulfilled"),
            color: "cyan",
            loading: unref(updating)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_Icon, {
                  name: "lucide:package-check",
                  class: "w-4 h-4 mr-2"
                }, null, _parent2, _scopeId));
                _push2(` Marquer pr\xEAt `);
              } else {
                return [
                  createVNode(_component_Icon, {
                    name: "lucide:package-check",
                    class: "w-4 h-4 mr-2"
                  }),
                  createTextVNode(" Marquer pr\xEAt ")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (unref(order).fulfillment_status === "fulfilled" && unref(order).assigned_to) {
          _push(ssrRenderComponent(_component_UButton, {
            onClick: ($event) => updateFulfillment("shipped"),
            color: "indigo",
            loading: unref(updating)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_Icon, {
                  name: "lucide:truck",
                  class: "w-4 h-4 mr-2"
                }, null, _parent2, _scopeId));
                _push2(` En livraison `);
              } else {
                return [
                  createVNode(_component_Icon, {
                    name: "lucide:truck",
                    class: "w-4 h-4 mr-2"
                  }),
                  createTextVNode(" En livraison ")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (unref(order).fulfillment_status === "shipped") {
          _push(ssrRenderComponent(_component_UButton, {
            onClick: ($event) => showDeliveryModal.value = true,
            color: "green"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_Icon, {
                  name: "lucide:check-circle",
                  class: "w-4 h-4 mr-2"
                }, null, _parent2, _scopeId));
                _push2(` Marquer livr\xE9 `);
              } else {
                return [
                  createVNode(_component_Icon, {
                    name: "lucide:check-circle",
                    class: "w-4 h-4 mr-2"
                  }),
                  createTextVNode(" Marquer livr\xE9 ")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (!unref(order).assigned_to) {
          _push(ssrRenderComponent(_component_UButton, {
            onClick: ($event) => showAssignModal.value = true,
            color: "primary",
            variant: "outline"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_Icon, {
                  name: "lucide:user-plus",
                  class: "w-4 h-4 mr-2"
                }, null, _parent2, _scopeId));
                _push2(` Assigner livreur `);
              } else {
                return [
                  createVNode(_component_Icon, {
                    name: "lucide:user-plus",
                    class: "w-4 h-4 mr-2"
                  }),
                  createTextVNode(" Assigner livreur ")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6"><h2 class="font-semibold text-gray-900 mb-4">Articles command\xE9s</h2><div class="space-y-4"><!--[-->`);
        ssrRenderList(unref(orderItems), (item) => {
          _push(`<div class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"><div class="w-16 h-16 bg-white rounded-lg overflow-hidden border border-gray-200">`);
          if (item.thumbnail) {
            _push(`<img${ssrRenderAttr("src", item.thumbnail)}${ssrRenderAttr("alt", item.title)} class="w-full h-full object-cover">`);
          } else {
            _push(`<div class="w-full h-full flex items-center justify-center">`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "lucide:package",
              class: "w-6 h-6 text-gray-400"
            }, null, _parent));
            _push(`</div>`);
          }
          _push(`</div><div class="flex-1"><p class="font-medium text-gray-900">${ssrInterpolate(item.title)}</p><p class="text-sm text-gray-500">Qt\xE9: ${ssrInterpolate(item.quantity)}</p></div><div class="text-right"><p class="font-semibold text-gray-900">${ssrInterpolate(formatPrice(item.total))}</p><p class="text-xs text-gray-500">${ssrInterpolate(formatPrice(item.unit_price))} / unit\xE9</p></div></div>`);
        });
        _push(`<!--]--></div><div class="border-t border-gray-200 mt-6 pt-4 space-y-2"><div class="flex justify-between text-sm"><span class="text-gray-500">Sous-total</span><span class="text-gray-900">${ssrInterpolate(formatPrice(unref(order).subtotal))}</span></div><div class="flex justify-between text-sm"><span class="text-gray-500">Livraison</span><span class="text-gray-900">${ssrInterpolate(formatPrice(unref(order).shipping_total))}</span></div><div class="flex justify-between font-semibold text-lg pt-2 border-t border-gray-200"><span class="text-gray-900">Total</span><span class="text-primary-600">${ssrInterpolate(formatPrice(unref(order).total))}</span></div></div></div>`);
        if (unref(order).notes || unref(order).delivery_instructions) {
          _push(`<div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6"><h2 class="font-semibold text-gray-900 mb-4">Notes</h2>`);
          if (unref(order).delivery_instructions) {
            _push(`<div class="mb-4"><p class="text-sm font-medium text-gray-700 mb-1">Instructions de livraison</p><p class="text-gray-600">${ssrInterpolate(unref(order).delivery_instructions)}</p></div>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(order).notes) {
            _push(`<div><p class="text-sm font-medium text-gray-700 mb-1">Notes internes</p><p class="text-gray-600">${ssrInterpolate(unref(order).notes)}</p></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="space-y-6"><div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6"><h2 class="font-semibold text-gray-900 mb-4">Client (Diaspora)</h2><div class="space-y-3"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:user",
          class: "w-5 h-5 text-primary-600"
        }, null, _parent));
        _push(`</div><div><p class="font-medium text-gray-900">${ssrInterpolate(unref(order).customer_first_name)} ${ssrInterpolate(unref(order).customer_last_name)}</p><p class="text-sm text-gray-500">${ssrInterpolate(unref(order).email)}</p></div></div>`);
        if (unref(order).customer_phone) {
          _push(`<div class="flex items-center gap-3 text-sm">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "lucide:phone",
            class: "w-4 h-4 text-gray-400"
          }, null, _parent));
          _push(`<span class="text-gray-600">${ssrInterpolate(unref(order).customer_phone)}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6"><h2 class="font-semibold text-gray-900 mb-4">Destinataire (Tchad)</h2><div class="space-y-3"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:map-pin",
          class: "w-5 h-5 text-green-600"
        }, null, _parent));
        _push(`</div><div><p class="font-medium text-gray-900">${ssrInterpolate(unref(order).recipient_name || "-")}</p><p class="text-sm text-gray-500">${ssrInterpolate(unref(order).recipient_phone || "-")}</p></div></div>`);
        if (unref(order).shipping_address) {
          _push(`<div class="pt-3 border-t border-gray-100"><p class="text-sm text-gray-600">${ssrInterpolate(unref(order).shipping_address.address_1)}<br>`);
          if (unref(order).shipping_address.address_2) {
            _push(`<span>${ssrInterpolate(unref(order).shipping_address.address_2)}<br></span>`);
          } else {
            _push(`<!---->`);
          }
          _push(` ${ssrInterpolate(unref(order).shipping_address.city)}, ${ssrInterpolate(unref(order).shipping_address.country)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6"><div class="flex items-center justify-between mb-4"><h2 class="font-semibold text-gray-900">Livreur assign\xE9</h2>`);
        if (unref(order).assigned_to) {
          _push(ssrRenderComponent(_component_UButton, {
            onClick: ($event) => showAssignModal.value = true,
            color: "gray",
            variant: "ghost",
            size: "xs"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Changer `);
              } else {
                return [
                  createTextVNode(" Changer ")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (unref(assignedLivreur)) {
          _push(`<div class="flex items-center gap-3"><div class="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "lucide:truck",
            class: "w-5 h-5 text-indigo-600"
          }, null, _parent));
          _push(`</div><div><p class="font-medium text-gray-900">${ssrInterpolate(unref(assignedLivreur).first_name)} ${ssrInterpolate(unref(assignedLivreur).last_name)}</p><p class="text-sm text-gray-500">${ssrInterpolate(unref(assignedLivreur).phone || "Pas de t\xE9l\xE9phone")}</p></div></div>`);
        } else {
          _push(`<div class="text-center py-4">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "lucide:user-x",
            class: "w-8 h-8 mx-auto text-gray-300 mb-2"
          }, null, _parent));
          _push(`<p class="text-sm text-gray-500">Aucun livreur assign\xE9</p>`);
          _push(ssrRenderComponent(_component_UButton, {
            onClick: ($event) => showAssignModal.value = true,
            color: "primary",
            size: "sm",
            class: "mt-3"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Assigner `);
              } else {
                return [
                  createTextVNode(" Assigner ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
        }
        _push(`</div>`);
        if (unref(order).delivery_photo) {
          _push(`<div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6"><h2 class="font-semibold text-gray-900 mb-4">Photo de livraison</h2><img${ssrRenderAttr("src", unref(order).delivery_photo)} alt="Preuve de livraison" class="w-full rounded-lg"><p class="text-xs text-gray-500 mt-2 text-center"> Livr\xE9e le ${ssrInterpolate(formatDateTime(unref(order).delivered_at))}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_UModal, {
        modelValue: unref(showAssignModal),
        "onUpdate:modelValue": ($event) => isRef(showAssignModal) ? showAssignModal.value = $event : null
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-6"${_scopeId}><h3 class="text-lg font-semibold text-gray-900 mb-4"${_scopeId}>Assigner un livreur</h3>`);
            _push2(ssrRenderComponent(_component_USelectMenu, {
              modelValue: unref(selectedLivreur),
              "onUpdate:modelValue": ($event) => isRef(selectedLivreur) ? selectedLivreur.value = $event : null,
              options: unref(livreurs),
              "option-attribute": "label",
              "value-attribute": "value",
              placeholder: "S\xE9lectionner un livreur",
              class: "mb-4"
            }, null, _parent2, _scopeId));
            _push2(`<div class="flex justify-end gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              color: "gray",
              variant: "outline",
              onClick: ($event) => showAssignModal.value = false
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
              loading: unref(updating),
              onClick: assignLivreur
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Assigner`);
                } else {
                  return [
                    createTextVNode("Assigner")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-6" }, [
                createVNode("h3", { class: "text-lg font-semibold text-gray-900 mb-4" }, "Assigner un livreur"),
                createVNode(_component_USelectMenu, {
                  modelValue: unref(selectedLivreur),
                  "onUpdate:modelValue": ($event) => isRef(selectedLivreur) ? selectedLivreur.value = $event : null,
                  options: unref(livreurs),
                  "option-attribute": "label",
                  "value-attribute": "value",
                  placeholder: "S\xE9lectionner un livreur",
                  class: "mb-4"
                }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                createVNode("div", { class: "flex justify-end gap-3" }, [
                  createVNode(_component_UButton, {
                    color: "gray",
                    variant: "outline",
                    onClick: ($event) => showAssignModal.value = false
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Annuler")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(_component_UButton, {
                    color: "primary",
                    loading: unref(updating),
                    onClick: assignLivreur
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Assigner")
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
        modelValue: unref(showDeliveryModal),
        "onUpdate:modelValue": ($event) => isRef(showDeliveryModal) ? showDeliveryModal.value = $event : null
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-6"${_scopeId}><h3 class="text-lg font-semibold text-gray-900 mb-4"${_scopeId}>Confirmer la livraison</h3><p class="text-sm text-gray-500 mb-4"${_scopeId}> Ajoutez une photo comme preuve de livraison (optionnel) </p><input type="file" accept="image/*" class="mb-4 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"${_scopeId}><div class="flex justify-end gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              color: "gray",
              variant: "outline",
              onClick: ($event) => showDeliveryModal.value = false
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
              color: "green",
              loading: unref(updating),
              onClick: confirmDelivery
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Confirmer livraison`);
                } else {
                  return [
                    createTextVNode("Confirmer livraison")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-6" }, [
                createVNode("h3", { class: "text-lg font-semibold text-gray-900 mb-4" }, "Confirmer la livraison"),
                createVNode("p", { class: "text-sm text-gray-500 mb-4" }, " Ajoutez une photo comme preuve de livraison (optionnel) "),
                createVNode("input", {
                  type: "file",
                  accept: "image/*",
                  onChange: handlePhotoUpload,
                  class: "mb-4 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                }, null, 32),
                createVNode("div", { class: "flex justify-end gap-3" }, [
                  createVNode(_component_UButton, {
                    color: "gray",
                    variant: "outline",
                    onClick: ($event) => showDeliveryModal.value = false
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Annuler")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(_component_UButton, {
                    color: "green",
                    loading: unref(updating),
                    onClick: confirmDelivery
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Confirmer livraison")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/commandes/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-Bh5ffSTK.mjs.map
