import { _ as __nuxt_component_5 } from "./Badge-CCKIa51X.js";
import { i as useAuthStore, g as useToast, n as navigateTo, a as useHead, b as __nuxt_component_3, l as __nuxt_component_0, _ as __nuxt_component_3$1, d as __nuxt_component_0$1 } from "../server.mjs";
import { _ as __nuxt_component_2 } from "./Dropdown-DjuFUYhZ.js";
import { _ as __nuxt_component_9 } from "./Modal-D6oFe3LW.js";
import { _ as __nuxt_component_2$1 } from "./SelectMenu-CHcoscsC.js";
import { defineComponent, ref, withCtx, createTextVNode, unref, createVNode, isRef, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/hookable/dist/index.mjs";
import { u as useBackendApi } from "./useBackendApi-Dq4zIPvK.js";
import "tailwind-merge";
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
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/@unhead/vue/dist/index.mjs";
import "@iconify/vue";
import "lucide-vue-next";
import "@iconify/utils/lib/css/icon";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/nuxt/node_modules/perfect-debounce/dist/index.mjs";
import "ohash/utils";
import "./keyboard-BvysMIIh.js";
import "./usePopper-CIeS2-3g.js";
import "./hidden-CZ0WYEIB.js";
import "./active-element-history-QtuHblWR.js";
import "./description-DXB91rC2.js";
import "@tanstack/vue-virtual";
import "./form-DsUILy5F.js";
import "./useFormGroup-DTWlat5q.js";
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
        toast.add({ title: "Succès", description: "Utilisateur promu administrateur", color: "green" });
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
        toast.add({ title: "Succès", description: "Droits admin retirés", color: "green" });
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
      return ((user.first_name?.[0] || "") + (user.last_name?.[0] || "")).toUpperCase();
    };
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
    };
    useHead({
      title: "Équipe - Admin TchadBox"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UBadge = __nuxt_component_5;
      const _component_UButton = __nuxt_component_3;
      const _component_UIcon = __nuxt_component_0;
      const _component_UDropdown = __nuxt_component_2;
      const _component_Icon = __nuxt_component_3$1;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_UModal = __nuxt_component_9;
      const _component_USelectMenu = __nuxt_component_2$1;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"><div><div class="flex items-center gap-2 mb-1"><h1 class="text-2xl font-bold text-gray-900">Équipe</h1>`);
      _push(ssrRenderComponent(_component_UBadge, {
        color: "amber",
        variant: "soft"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`👑 CEO Only`);
          } else {
            return [
              createTextVNode("👑 CEO Only")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><p class="text-gray-500">Gérez les administrateurs de TchadBox</p></div>`);
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
              _push2(`👑 CEO`);
            } else {
              return [
                createTextVNode("👑 CEO")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><p class="text-sm text-gray-500">${ssrInterpolate(unref(authStore).user?.email)}</p></div><p class="text-sm text-gray-400">C&#39;est vous</p></div></div><!--[-->`);
        ssrRenderList(unref(admins), (admin) => {
          _push(`<div class="p-4 hover:bg-gray-50 transition-colors"><div class="flex items-center gap-4"><div class="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center"><span class="text-lg font-semibold text-indigo-700">${ssrInterpolate(getInitials(admin))}</span></div><div class="flex-1"><div class="flex items-center gap-2"><p class="font-medium text-gray-900">${ssrInterpolate(admin.first_name)} ${ssrInterpolate(admin.last_name)}</p>`);
          _push(ssrRenderComponent(_component_UBadge, {
            color: "indigo",
            variant: "soft",
            size: "xs"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`🛡️ Admin`);
              } else {
                return [
                  createTextVNode("🛡️ Admin")
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div><p class="text-sm text-gray-500">${ssrInterpolate(admin.email)}</p></div><div class="text-right text-sm text-gray-500"> Ajouté le ${ssrInterpolate(formatDate(admin.created_at))}</div>`);
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
          _push(`<p class="text-gray-500">Aucun autre administrateur</p><p class="text-sm text-gray-400 mt-1">Ajoutez des admins pour vous aider à gérer les commandes</p></div>`);
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
            _push2(` Gérer les livreurs → `);
          } else {
            return [
              createTextVNode(" Gérer les livreurs → ")
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
            _push2(`<div class="p-6"${_scopeId}><h3 class="text-lg font-semibold text-gray-900 mb-4"${_scopeId}>Ajouter un administrateur</h3><p class="text-sm text-gray-500 mb-4"${_scopeId}> Sélectionnez un utilisateur existant pour le promouvoir administrateur. </p>`);
            _push2(ssrRenderComponent(_component_USelectMenu, {
              modelValue: unref(selectedUser),
              "onUpdate:modelValue": ($event) => isRef(selectedUser) ? selectedUser.value = $event : null,
              options: unref(availableUsers),
              "option-attribute": "label",
              "value-attribute": "value",
              placeholder: "Sélectionner un utilisateur",
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
                createVNode("p", { class: "text-sm text-gray-500 mb-4" }, " Sélectionnez un utilisateur existant pour le promouvoir administrateur. "),
                createVNode(_component_USelectMenu, {
                  modelValue: unref(selectedUser),
                  "onUpdate:modelValue": ($event) => isRef(selectedUser) ? selectedUser.value = $event : null,
                  options: unref(availableUsers),
                  "option-attribute": "label",
                  "value-attribute": "value",
                  placeholder: "Sélectionner un utilisateur",
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
export {
  _sfc_main as default
};
//# sourceMappingURL=equipe-U6BM9gA7.js.map
