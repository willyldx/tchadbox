import { i as useAuthStore, g as useToast, a as useHead, b as __nuxt_component_3$1, l as __nuxt_component_0$2, _ as __nuxt_component_3$2 } from './server.mjs';
import { _ as __nuxt_component_5 } from './Badge-CCKIa51X.mjs';
import { _ as __nuxt_component_2 } from './Dropdown-DjuFUYhZ.mjs';
import { _ as __nuxt_component_9 } from './Modal-D6oFe3LW.mjs';
import { _ as __nuxt_component_2$1 } from './SelectMenu-CHcoscsC.mjs';
import { _ as __nuxt_component_0 } from './Input-L-ABqH2D.mjs';
import { defineComponent, ref, computed, unref, withCtx, createTextVNode, toDisplayString, createVNode, isRef, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { u as useBackendApi } from './useBackendApi-Dq4zIPvK.mjs';
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
import './usePopper-CIeS2-3g.mjs';
import './hidden-CZ0WYEIB.mjs';
import './active-element-history-QtuHblWR.mjs';
import './description-DXB91rC2.mjs';
import '@tanstack/vue-virtual';
import './form-DsUILy5F.mjs';
import './useFormGroup-DTWlat5q.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const authStore = useAuthStore();
    const api = useBackendApi();
    const toast = useToast();
    const loading = ref(true);
    const saving = ref(false);
    const livreurs = ref([]);
    const showAddModal = ref(false);
    const selectedUser = ref(null);
    const newLivreurPhone = ref("");
    const newLivreurZone = ref("N'Djamena");
    const availableUsers = ref([]);
    const activeLivreurs = computed(() => livreurs.value.filter((l) => l.is_active).length);
    const monthlyDeliveries = computed(() => livreurs.value.reduce((sum, l) => sum + (l.total_deliveries || 0), 0));
    const averageRating = computed(() => {
      if (livreurs.value.length === 0) return "0.0";
      const total = livreurs.value.reduce((sum, l) => sum + Number(l.rating || 5), 0);
      return (total / livreurs.value.length).toFixed(1);
    });
    const fetchLivreurs = async () => {
      loading.value = true;
      try {
        const result = await api.adminLivreurs();
        livreurs.value = (result == null ? void 0 : result.data) || [];
      } catch (error) {
        console.error("Error fetching livreurs:", error);
        toast.add({ title: "Erreur", description: "Impossible de charger les livreurs", color: "red" });
      } finally {
        loading.value = false;
      }
    };
    const fetchAvailableUsers = async () => {
      try {
        const result = await api.adminClients();
        if (result == null ? void 0 : result.data) {
          availableUsers.value = result.data.map((u) => ({
            label: `${u.first_name} ${u.last_name} (${u.email})`,
            value: u.id
          }));
        }
      } catch (error) {
        console.error("Error fetching available users:", error);
      }
    };
    const addLivreur = async () => {
      if (!selectedUser.value || !newLivreurPhone.value) {
        toast.add({ title: "Erreur", description: "Veuillez remplir tous les champs", color: "red" });
        return;
      }
      saving.value = true;
      try {
        const userInfo = availableUsers.value.find((u) => u.value === selectedUser.value);
        const nameParts = ((userInfo == null ? void 0 : userInfo.label) || "").split(" ");
        await api.adminLivreurCreate({
          user_id: selectedUser.value,
          first_name: nameParts[0] || "",
          last_name: nameParts[1] || "",
          email: "",
          phone: newLivreurPhone.value,
          zone: newLivreurZone.value || "N'Djamena"
        });
        toast.add({ title: "Succ\xE8s", description: "Livreur ajout\xE9 avec succ\xE8s", color: "green" });
        showAddModal.value = false;
        selectedUser.value = null;
        newLivreurPhone.value = "";
        newLivreurZone.value = "N'Djamena";
        fetchLivreurs();
        fetchAvailableUsers();
      } catch (error) {
        console.error("Error adding livreur:", error);
        toast.add({ title: "Erreur", description: "Impossible d'ajouter le livreur", color: "red" });
      } finally {
        saving.value = false;
      }
    };
    const toggleStatus = async (livreur) => {
      try {
        await api.adminLivreurUpdate(livreur.id, { is_active: !livreur.is_active });
        toast.add({ title: "Succ\xE8s", description: "Statut mis \xE0 jour", color: "green" });
        fetchLivreurs();
      } catch (error) {
        console.error("Error toggling status:", error);
        toast.add({ title: "Erreur", description: "Impossible de modifier le statut", color: "red" });
      }
    };
    const removeLivreur = async (livreur) => {
      if (!confirm("\xCAtes-vous s\xFBr de vouloir retirer ce livreur ?")) return;
      try {
        await api.adminLivreurDelete(livreur.id);
        toast.add({ title: "Succ\xE8s", description: "Livreur retir\xE9", color: "green" });
        fetchLivreurs();
        fetchAvailableUsers();
      } catch (error) {
        console.error("Error removing livreur:", error);
        toast.add({ title: "Erreur", description: "Impossible de retirer le livreur", color: "red" });
      }
    };
    const getLivreurActions = (livreur) => [
      [{
        label: livreur.is_active ? "D\xE9sactiver" : "Activer",
        icon: livreur.is_active ? "i-lucide-pause" : "i-lucide-play",
        click: () => toggleStatus(livreur)
      }],
      [{
        label: "Retirer",
        icon: "i-lucide-trash-2",
        click: () => removeLivreur(livreur)
      }]
    ];
    const getInitials = (livreur) => {
      var _a, _b;
      return ((((_a = livreur.first_name) == null ? void 0 : _a[0]) || "") + (((_b = livreur.last_name) == null ? void 0 : _b[0]) || "")).toUpperCase() || "?";
    };
    useHead({
      title: "Livreurs - Admin TchadBox"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = __nuxt_component_3$1;
      const _component_UIcon = __nuxt_component_0$2;
      const _component_Icon = __nuxt_component_3$2;
      const _component_UBadge = __nuxt_component_5;
      const _component_UDropdown = __nuxt_component_2;
      const _component_UModal = __nuxt_component_9;
      const _component_USelectMenu = __nuxt_component_2$1;
      const _component_UInput = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"><div><h1 class="text-2xl font-bold text-gray-900">Livreurs</h1><p class="text-gray-500 mt-1">G\xE9rez votre \xE9quipe de livreurs</p></div>`);
      if (unref(authStore).isSuperAdmin) {
        _push(ssrRenderComponent(_component_UButton, {
          onClick: ($event) => showAddModal.value = true,
          color: "primary",
          icon: "i-lucide-plus"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Ajouter un livreur `);
            } else {
              return [
                createTextVNode(" Ajouter un livreur ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"><div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100"><p class="text-sm text-gray-500">Total livreurs</p><p class="text-2xl font-bold text-gray-900">${ssrInterpolate(unref(livreurs).length)}</p></div><div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100"><p class="text-sm text-gray-500">Actifs</p><p class="text-2xl font-bold text-green-600">${ssrInterpolate(unref(activeLivreurs))}</p></div><div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100"><p class="text-sm text-gray-500">Livraisons ce mois</p><p class="text-2xl font-bold text-gray-900">${ssrInterpolate(unref(monthlyDeliveries))}</p></div><div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100"><p class="text-sm text-gray-500">Note moyenne</p><p class="text-2xl font-bold text-amber-600">${ssrInterpolate(unref(averageRating))}/5</p></div></div><div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">`);
      if (unref(loading)) {
        _push(`<div class="p-8 text-center">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-loader-2",
          class: "w-8 h-8 animate-spin text-primary-500 mx-auto"
        }, null, _parent));
        _push(`</div>`);
      } else if (unref(livreurs).length === 0) {
        _push(`<div class="p-8 text-center">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:truck",
          class: "w-12 h-12 mx-auto text-gray-300 mb-3"
        }, null, _parent));
        _push(`<p class="text-gray-500">Aucun livreur pour le moment</p>`);
        if (unref(authStore).isSuperAdmin) {
          _push(ssrRenderComponent(_component_UButton, {
            onClick: ($event) => showAddModal.value = true,
            color: "primary",
            class: "mt-4"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Ajouter le premier livreur `);
              } else {
                return [
                  createTextVNode(" Ajouter le premier livreur ")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<div class="divide-y divide-gray-100"><!--[-->`);
        ssrRenderList(unref(livreurs), (livreur) => {
          _push(`<div class="p-4 hover:bg-gray-50 transition-colors"><div class="flex items-center gap-4"><div class="${ssrRenderClass(["w-12 h-12 rounded-full flex items-center justify-center", livreur.is_active ? "bg-green-100" : "bg-gray-100"])}"><span class="${ssrRenderClass(["text-lg font-semibold", livreur.is_active ? "text-green-700" : "text-gray-500"])}">${ssrInterpolate(getInitials(livreur))}</span></div><div class="flex-1"><div class="flex items-center gap-2"><p class="font-medium text-gray-900">${ssrInterpolate(livreur.first_name)} ${ssrInterpolate(livreur.last_name)}</p>`);
          _push(ssrRenderComponent(_component_UBadge, {
            color: livreur.is_active ? "green" : "gray",
            variant: "soft",
            size: "xs"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(livreur.is_active ? "Actif" : "Inactif")}`);
              } else {
                return [
                  createTextVNode(toDisplayString(livreur.is_active ? "Actif" : "Inactif"), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div><p class="text-sm text-gray-500">${ssrInterpolate(livreur.phone)} \xB7 ${ssrInterpolate(livreur.zone)}</p></div><div class="text-right hidden sm:block"><p class="text-sm font-medium text-gray-900">${ssrInterpolate(livreur.total_deliveries)} livraisons</p><div class="flex items-center justify-end gap-1 text-amber-500">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "lucide:star",
            class: "w-4 h-4 fill-current"
          }, null, _parent));
          _push(`<span class="text-sm font-medium">${ssrInterpolate(Number(livreur.rating).toFixed(1))}</span></div></div>`);
          if (unref(authStore).isSuperAdmin) {
            _push(ssrRenderComponent(_component_UDropdown, {
              items: getLivreurActions(livreur),
              popper: { placement: "bottom-end" }
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(_component_UButton, {
                    color: "gray",
                    variant: "ghost",
                    icon: "i-lucide-more-vertical",
                    size: "sm"
                  }, null, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(_component_UButton, {
                      color: "gray",
                      variant: "ghost",
                      icon: "i-lucide-more-vertical",
                      size: "sm"
                    })
                  ];
                }
              }),
              _: 2
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_component_UModal, {
        modelValue: unref(showAddModal),
        "onUpdate:modelValue": ($event) => isRef(showAddModal) ? showAddModal.value = $event : null
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-6"${_scopeId}><h3 class="text-lg font-semibold text-gray-900 mb-4"${_scopeId}>Ajouter un livreur</h3><div class="space-y-4"${_scopeId}><p class="text-sm text-gray-500"${_scopeId}> S\xE9lectionnez un utilisateur existant ou cr\xE9ez-en un nouveau pour l&#39;ajouter comme livreur. </p>`);
            _push2(ssrRenderComponent(_component_USelectMenu, {
              modelValue: unref(selectedUser),
              "onUpdate:modelValue": ($event) => isRef(selectedUser) ? selectedUser.value = $event : null,
              options: unref(availableUsers),
              "option-attribute": "label",
              "value-attribute": "value",
              placeholder: "S\xE9lectionner un utilisateur",
              searchable: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UInput, {
              modelValue: unref(newLivreurPhone),
              "onUpdate:modelValue": ($event) => isRef(newLivreurPhone) ? newLivreurPhone.value = $event : null,
              placeholder: "T\xE9l\xE9phone",
              icon: "i-lucide-phone"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UInput, {
              modelValue: unref(newLivreurZone),
              "onUpdate:modelValue": ($event) => isRef(newLivreurZone) ? newLivreurZone.value = $event : null,
              placeholder: "Zone de livraison",
              icon: "i-lucide-map-pin"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex justify-end gap-3 mt-6"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              color: "gray",
              variant: "outline",
              onClick: ($event) => showAddModal.value = false
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
              onClick: addLivreur
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Ajouter`);
                } else {
                  return [
                    createTextVNode("Ajouter")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-6" }, [
                createVNode("h3", { class: "text-lg font-semibold text-gray-900 mb-4" }, "Ajouter un livreur"),
                createVNode("div", { class: "space-y-4" }, [
                  createVNode("p", { class: "text-sm text-gray-500" }, " S\xE9lectionnez un utilisateur existant ou cr\xE9ez-en un nouveau pour l'ajouter comme livreur. "),
                  createVNode(_component_USelectMenu, {
                    modelValue: unref(selectedUser),
                    "onUpdate:modelValue": ($event) => isRef(selectedUser) ? selectedUser.value = $event : null,
                    options: unref(availableUsers),
                    "option-attribute": "label",
                    "value-attribute": "value",
                    placeholder: "S\xE9lectionner un utilisateur",
                    searchable: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                  createVNode(_component_UInput, {
                    modelValue: unref(newLivreurPhone),
                    "onUpdate:modelValue": ($event) => isRef(newLivreurPhone) ? newLivreurPhone.value = $event : null,
                    placeholder: "T\xE9l\xE9phone",
                    icon: "i-lucide-phone"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_UInput, {
                    modelValue: unref(newLivreurZone),
                    "onUpdate:modelValue": ($event) => isRef(newLivreurZone) ? newLivreurZone.value = $event : null,
                    placeholder: "Zone de livraison",
                    icon: "i-lucide-map-pin"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "flex justify-end gap-3 mt-6" }, [
                  createVNode(_component_UButton, {
                    color: "gray",
                    variant: "outline",
                    onClick: ($event) => showAddModal.value = false
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Annuler")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(_component_UButton, {
                    color: "primary",
                    loading: unref(saving),
                    onClick: addLivreur
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Ajouter")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/livreurs/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DEzHrd1s.mjs.map
