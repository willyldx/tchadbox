import { _ as __nuxt_component_5 } from './Badge-DHrI2Q_C.mjs';
import { i as useAuthStore, g as useToast, n as navigateTo, a as useHead, b as __nuxt_component_3$1, l as __nuxt_component_0$2, _ as __nuxt_component_3$2, e as __nuxt_component_0$4 } from './server.mjs';
import { _ as __nuxt_component_2 } from './Dropdown-BUSRM3T8.mjs';
import { _ as __nuxt_component_9 } from './Modal-CfpZSCh7.mjs';
import { _ as __nuxt_component_2$1 } from './SelectMenu-Bc2TWh27.mjs';
import { defineComponent, ref, withCtx, createTextVNode, unref, createVNode, isRef, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { u as useBackendApi } from './useBackendApi-BuVuRWAl.mjs';
import 'tailwind-merge';
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
import './keyboard-BvysMIIh.mjs';
import './usePopper-CIeS2-3g.mjs';
import './hidden-CZ0WYEIB.mjs';
import './active-element-history-QtuHblWR.mjs';
import './description-DXB91rC2.mjs';
import '@tanstack/vue-virtual';
import './form-DsUILy5F.mjs';
import './useFormGroup-C15lTjpg.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "equipe",
  __ssrInlineRender: true,
  setup(__props) {
    const authStore = useAuthStore();
    const toast = useToast();
    if (!authStore.isSuperAdmin) {
      navigateTo("/admin");
    }
    const loading = ref(true);
    const saving = ref(false);
    const admins = ref([]);
    const livreursCount = ref(0);
    const showAddModal = ref(false);
    const selectedUser = ref(null);
    const availableUsers = ref([]);
    const fetchTeam = async () => {
      loading.value = true;
      try {
        const data = await useBackendApi().adminTeam();
        admins.value = data.admins || [];
        livreursCount.value = data.livreurs_count || 0;
        availableUsers.value = data.available_users || [];
      } catch (error) {
        console.error("Error fetching team:", error);
      } finally {
        loading.value = false;
      }
    };
    const promoteToAdmin = async () => {
      if (!selectedUser.value) return;
      saving.value = true;
      try {
        await useBackendApi().adminPromoteTeam(selectedUser.value, "admin");
        toast.add({ title: "Succ\xE8s", description: "Utilisateur promu administrateur", color: "green" });
        showAddModal.value = false;
        selectedUser.value = null;
        fetchTeam();
      } catch (error) {
        console.error("Error promoting user:", error);
        toast.add({ title: "Erreur", description: "Impossible de promouvoir cet utilisateur", color: "red" });
      } finally {
        saving.value = false;
      }
    };
    const demoteAdmin = async (admin) => {
      if (!confirm(`Retirer les droits admin de ${admin.first_name} ${admin.last_name} ?`)) return;
      try {
        await useBackendApi().adminPromoteTeam(admin.id, "client");
        toast.add({ title: "Succ\xE8s", description: "Droits admin retir\xE9s", color: "green" });
        fetchTeam();
      } catch (error) {
        console.error("Error demoting admin:", error);
        toast.add({ title: "Erreur", description: "Impossible de retirer les droits", color: "red" });
      }
    };
    const getAdminActions = (admin) => [
      [{
        label: "Retirer les droits admin",
        icon: "i-lucide-user-minus",
        click: () => demoteAdmin(admin)
      }]
    ];
    const getInitials = (user) => {
      var _a, _b;
      return ((((_a = user.first_name) == null ? void 0 : _a[0]) || "") + (((_b = user.last_name) == null ? void 0 : _b[0]) || "")).toUpperCase();
    };
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
    };
    useHead({
      title: "\xC9quipe - Admin TchadBox"
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_UBadge = __nuxt_component_5;
      const _component_UButton = __nuxt_component_3$1;
      const _component_UIcon = __nuxt_component_0$2;
      const _component_UDropdown = __nuxt_component_2;
      const _component_Icon = __nuxt_component_3$2;
      const _component_NuxtLink = __nuxt_component_0$4;
      const _component_UModal = __nuxt_component_9;
      const _component_USelectMenu = __nuxt_component_2$1;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"><div><div class="flex items-center gap-2 mb-1"><h1 class="text-2xl font-bold text-gray-900">\xC9quipe</h1>`);
      _push(ssrRenderComponent(_component_UBadge, {
        color: "amber",
        variant: "soft"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u{1F451} CEO Only`);
          } else {
            return [
              createTextVNode("\u{1F451} CEO Only")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><p class="text-gray-500">G\xE9rez les administrateurs de TchadBox</p></div>`);
      _push(ssrRenderComponent(_component_UButton, {
        onClick: ($event) => showAddModal.value = true,
        color: "primary",
        icon: "i-lucide-user-plus"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Ajouter un admin `);
          } else {
            return [
              createTextVNode(" Ajouter un admin ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">`);
      if (unref(loading)) {
        _push(`<div class="p-8 text-center">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-loader-2",
          class: "w-8 h-8 animate-spin text-primary-500 mx-auto"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="divide-y divide-gray-100"><div class="p-4 bg-amber-50/50"><div class="flex items-center gap-4"><div class="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center"><span class="text-lg font-semibold text-amber-700">${ssrInterpolate(unref(authStore).initials)}</span></div><div class="flex-1"><div class="flex items-center gap-2"><p class="font-medium text-gray-900">${ssrInterpolate(unref(authStore).fullName)}</p>`);
        _push(ssrRenderComponent(_component_UBadge, {
          color: "amber",
          variant: "soft",
          size: "xs"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`\u{1F451} CEO`);
            } else {
              return [
                createTextVNode("\u{1F451} CEO")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><p class="text-sm text-gray-500">${ssrInterpolate((_a = unref(authStore).user) == null ? void 0 : _a.email)}</p></div><p class="text-sm text-gray-400">C&#39;est vous</p></div></div><!--[-->`);
        ssrRenderList(unref(admins), (admin) => {
          _push(`<div class="p-4 hover:bg-gray-50 transition-colors"><div class="flex items-center gap-4"><div class="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center"><span class="text-lg font-semibold text-indigo-700">${ssrInterpolate(getInitials(admin))}</span></div><div class="flex-1"><div class="flex items-center gap-2"><p class="font-medium text-gray-900">${ssrInterpolate(admin.first_name)} ${ssrInterpolate(admin.last_name)}</p>`);
          _push(ssrRenderComponent(_component_UBadge, {
            color: "indigo",
            variant: "soft",
            size: "xs"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`\u{1F6E1}\uFE0F Admin`);
              } else {
                return [
                  createTextVNode("\u{1F6E1}\uFE0F Admin")
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div><p class="text-sm text-gray-500">${ssrInterpolate(admin.email)}</p></div><div class="text-right text-sm text-gray-500"> Ajout\xE9 le ${ssrInterpolate(formatDate(admin.created_at))}</div>`);
          _push(ssrRenderComponent(_component_UDropdown, {
            items: getAdminActions(admin),
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
          _push(`</div></div>`);
        });
        _push(`<!--]-->`);
        if (unref(admins).length === 0) {
          _push(`<div class="p-8 text-center">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "lucide:users",
            class: "w-12 h-12 mx-auto text-gray-300 mb-3"
          }, null, _parent));
          _push(`<p class="text-gray-500">Aucun autre administrateur</p><p class="text-sm text-gray-400 mt-1">Ajoutez des admins pour vous aider \xE0 g\xE9rer les commandes</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      _push(`</div><div class="mt-8"><div class="flex items-center justify-between mb-4"><h2 class="text-lg font-semibold text-gray-900">Livreurs</h2>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/livreurs",
        class: "text-sm text-primary-600 hover:text-primary-700 font-medium"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` G\xE9rer les livreurs \u2192 `);
          } else {
            return [
              createTextVNode(" G\xE9rer les livreurs \u2192 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6"><div class="flex items-center justify-between"><div><p class="text-2xl font-bold text-gray-900">${ssrInterpolate(unref(livreursCount))}</p><p class="text-sm text-gray-500">Livreurs actifs</p></div><div class="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:truck",
        class: "w-6 h-6 text-green-600"
      }, null, _parent));
      _push(`</div></div></div></div>`);
      _push(ssrRenderComponent(_component_UModal, {
        modelValue: unref(showAddModal),
        "onUpdate:modelValue": ($event) => isRef(showAddModal) ? showAddModal.value = $event : null
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-6"${_scopeId}><h3 class="text-lg font-semibold text-gray-900 mb-4"${_scopeId}>Ajouter un administrateur</h3><p class="text-sm text-gray-500 mb-4"${_scopeId}> S\xE9lectionnez un utilisateur existant pour le promouvoir administrateur. </p>`);
            _push2(ssrRenderComponent(_component_USelectMenu, {
              modelValue: unref(selectedUser),
              "onUpdate:modelValue": ($event) => isRef(selectedUser) ? selectedUser.value = $event : null,
              options: unref(availableUsers),
              "option-attribute": "label",
              "value-attribute": "value",
              placeholder: "S\xE9lectionner un utilisateur",
              searchable: "",
              class: "mb-4"
            }, null, _parent2, _scopeId));
            _push2(`<div class="flex justify-end gap-3"${_scopeId}>`);
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
              onClick: promoteToAdmin
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Promouvoir`);
                } else {
                  return [
                    createTextVNode("Promouvoir")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-6" }, [
                createVNode("h3", { class: "text-lg font-semibold text-gray-900 mb-4" }, "Ajouter un administrateur"),
                createVNode("p", { class: "text-sm text-gray-500 mb-4" }, " S\xE9lectionnez un utilisateur existant pour le promouvoir administrateur. "),
                createVNode(_component_USelectMenu, {
                  modelValue: unref(selectedUser),
                  "onUpdate:modelValue": ($event) => isRef(selectedUser) ? selectedUser.value = $event : null,
                  options: unref(availableUsers),
                  "option-attribute": "label",
                  "value-attribute": "value",
                  placeholder: "S\xE9lectionner un utilisateur",
                  searchable: "",
                  class: "mb-4"
                }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                createVNode("div", { class: "flex justify-end gap-3" }, [
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
                    onClick: promoteToAdmin
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Promouvoir")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/equipe.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=equipe-_anSOGCg.mjs.map
