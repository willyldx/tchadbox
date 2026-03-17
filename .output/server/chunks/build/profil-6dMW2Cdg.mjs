import { _ as __nuxt_component_5 } from './Badge-DHrI2Q_C.mjs';
import { i as useAuthStore, g as useToast, a as useHead, _ as __nuxt_component_3$2, b as __nuxt_component_3$1, c as _export_sfc, o as useUI, r as mergeConfig, q as appConfig } from './server.mjs';
import { _ as __nuxt_component_9 } from './Modal-CfpZSCh7.mjs';
import { defineComponent, ref, watch, mergeProps, unref, withCtx, createTextVNode, isRef, createVNode, toRef, inject, computed, useId, provide, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderClass, ssrRenderAttr, ssrRenderSlot } from 'vue/server-renderer';
import { _ as __nuxt_component_0 } from './Input-CbX_cKiC.mjs';
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
import './hidden-CZ0WYEIB.mjs';
import './active-element-history-QtuHblWR.mjs';
import './description-DXB91rC2.mjs';
import './useFormGroup-C15lTjpg.mjs';

const formGroup = {
  wrapper: "",
  inner: "",
  label: {
    wrapper: "flex content-center items-center justify-between",
    base: "block font-medium text-gray-700 dark:text-gray-200",
    required: `after:content-['*'] after:ms-0.5 after:text-red-500 dark:after:text-red-400`
  },
  size: {
    "2xs": "text-xs",
    "xs": "text-xs",
    "sm": "text-sm",
    "md": "text-sm",
    "lg": "text-sm",
    "xl": "text-base"
  },
  container: "mt-1 relative",
  description: "text-gray-500 dark:text-gray-400",
  hint: "text-gray-500 dark:text-gray-400",
  help: "mt-2 text-gray-500 dark:text-gray-400",
  error: "mt-2 text-red-500 dark:text-red-400",
  default: {
    size: "sm"
  }
};
const config = mergeConfig(appConfig.ui.strategy, appConfig.ui.formGroup, formGroup);
const _sfc_main$1 = defineComponent({
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: null,
      validator(value) {
        return Object.keys(config.size).includes(value);
      }
    },
    label: {
      type: String,
      default: null
    },
    description: {
      type: String,
      default: null
    },
    required: {
      type: Boolean,
      default: false
    },
    help: {
      type: String,
      default: null
    },
    error: {
      type: [String, Boolean],
      default: null
    },
    hint: {
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
    eagerValidation: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const { ui, attrs } = useUI("formGroup", toRef(props, "ui"), config, toRef(props, "class"));
    const formErrors = inject("form-errors", null);
    const error = computed(() => {
      var _a, _b;
      return props.error && typeof props.error === "string" || typeof props.error === "boolean" ? props.error : (_b = (_a = formErrors == null ? void 0 : formErrors.value) == null ? void 0 : _a.find((error2) => error2.path === props.name)) == null ? void 0 : _b.message;
    });
    const size = computed(() => {
      var _a;
      return ui.value.size[(_a = props.size) != null ? _a : config.default.size];
    });
    const inputId = ref(useId());
    provide("form-group", {
      error,
      inputId,
      name: computed(() => props.name),
      size: computed(() => props.size),
      eagerValidation: computed(() => props.eagerValidation)
    });
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,
      inputId,
      // eslint-disable-next-line vue/no-dupe-keys
      size,
      // eslint-disable-next-line vue/no-dupe-keys
      error
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: _ctx.ui.wrapper
  }, _ctx.attrs, _attrs))}><div class="${ssrRenderClass(_ctx.ui.inner)}">`);
  if (_ctx.label || _ctx.$slots.label) {
    _push(`<div class="${ssrRenderClass([_ctx.ui.label.wrapper, _ctx.size])}"><label${ssrRenderAttr("for", _ctx.inputId)} class="${ssrRenderClass([_ctx.ui.label.base, _ctx.required ? _ctx.ui.label.required : ""])}">`);
    if (_ctx.$slots.label) {
      ssrRenderSlot(_ctx.$slots, "label", { error: _ctx.error, label: _ctx.label, name: _ctx.name, hint: _ctx.hint, description: _ctx.description, help: _ctx.help }, null, _push, _parent);
    } else {
      _push(`<!--[-->${ssrInterpolate(_ctx.label)}<!--]-->`);
    }
    _push(`</label>`);
    if (_ctx.hint || _ctx.$slots.hint) {
      _push(`<span class="${ssrRenderClass([_ctx.ui.hint])}">`);
      if (_ctx.$slots.hint) {
        ssrRenderSlot(_ctx.$slots, "hint", { error: _ctx.error, label: _ctx.label, name: _ctx.name, hint: _ctx.hint, description: _ctx.description, help: _ctx.help }, null, _push, _parent);
      } else {
        _push(`<!--[-->${ssrInterpolate(_ctx.hint)}<!--]-->`);
      }
      _push(`</span>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div>`);
  } else {
    _push(`<!---->`);
  }
  if (_ctx.description || _ctx.$slots.description) {
    _push(`<p class="${ssrRenderClass([_ctx.ui.description, _ctx.size])}">`);
    if (_ctx.$slots.description) {
      ssrRenderSlot(_ctx.$slots, "description", { error: _ctx.error, label: _ctx.label, name: _ctx.name, hint: _ctx.hint, description: _ctx.description, help: _ctx.help }, null, _push, _parent);
    } else {
      _push(`<!--[-->${ssrInterpolate(_ctx.description)}<!--]-->`);
    }
    _push(`</p>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div><div class="${ssrRenderClass([_ctx.label ? _ctx.ui.container : ""])}">`);
  ssrRenderSlot(_ctx.$slots, "default", { error: _ctx.error }, null, _push, _parent);
  if (typeof _ctx.error === "string" && _ctx.error) {
    _push(`<p class="${ssrRenderClass([_ctx.ui.error, _ctx.size])}">`);
    if (_ctx.$slots.error) {
      ssrRenderSlot(_ctx.$slots, "error", { error: _ctx.error, label: _ctx.label, name: _ctx.name, hint: _ctx.hint, description: _ctx.description, help: _ctx.help }, null, _push, _parent);
    } else {
      _push(`<!--[-->${ssrInterpolate(_ctx.error)}<!--]-->`);
    }
    _push(`</p>`);
  } else if (_ctx.help || _ctx.$slots.help) {
    _push(`<p class="${ssrRenderClass([_ctx.ui.help, _ctx.size])}">`);
    if (_ctx.$slots.help) {
      ssrRenderSlot(_ctx.$slots, "help", { error: _ctx.error, label: _ctx.label, name: _ctx.name, hint: _ctx.hint, description: _ctx.description, help: _ctx.help }, null, _push, _parent);
    } else {
      _push(`<!--[-->${ssrInterpolate(_ctx.help)}<!--]-->`);
    }
    _push(`</p>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/forms/FormGroup.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "profil",
  __ssrInlineRender: true,
  setup(__props) {
    var _a, _b, _c;
    const authStore = useAuthStore();
    const { client } = useSupabase();
    const toast = useToast();
    const showEditModal = ref(false);
    const saving = ref(false);
    const agentStats = ref({
      totalDeliveries: 0,
      rating: "5.0",
      zone: "N'Djamena",
      phone: ""
    });
    const editForm = ref({
      firstName: ((_a = authStore.user) == null ? void 0 : _a.firstName) || "",
      lastName: ((_b = authStore.user) == null ? void 0 : _b.lastName) || "",
      phone: ((_c = authStore.user) == null ? void 0 : _c.phone) || ""
    });
    const saveProfile = async () => {
      saving.value = true;
      try {
        const result = await authStore.updateProfile({
          firstName: editForm.value.firstName,
          lastName: editForm.value.lastName,
          phone: editForm.value.phone
        });
        if (result.success) {
          toast.add({ title: "Succ\xE8s", description: "Profil mis \xE0 jour", color: "green" });
          showEditModal.value = false;
        } else {
          toast.add({ title: "Erreur", description: result.error, color: "red" });
        }
      } finally {
        saving.value = false;
      }
    };
    watch(showEditModal, (open) => {
      var _a2, _b2, _c2;
      if (open) {
        editForm.value = {
          firstName: ((_a2 = authStore.user) == null ? void 0 : _a2.firstName) || "",
          lastName: ((_b2 = authStore.user) == null ? void 0 : _b2.lastName) || "",
          phone: ((_c2 = authStore.user) == null ? void 0 : _c2.phone) || agentStats.value.phone || ""
        };
      }
    });
    useHead({
      title: "Mon profil - TchadBox Livreur"
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2, _c2;
      const _component_UBadge = __nuxt_component_5;
      const _component_Icon = __nuxt_component_3$2;
      const _component_UModal = __nuxt_component_9;
      const _component_UFormGroup = __nuxt_component_3;
      const _component_UInput = __nuxt_component_0;
      const _component_UButton = __nuxt_component_3$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "px-4 py-6" }, _attrs))}><div class="mb-6"><h1 class="text-2xl font-bold text-gray-900">Mon profil</h1></div><div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6"><div class="flex items-center gap-4 mb-6"><div class="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center"><span class="text-2xl font-bold text-green-700">${ssrInterpolate(unref(authStore).initials)}</span></div><div><h2 class="text-xl font-bold text-gray-900">${ssrInterpolate(unref(authStore).fullName)}</h2><p class="text-gray-500">${ssrInterpolate((_a2 = unref(authStore).user) == null ? void 0 : _a2.email)}</p>`);
      _push(ssrRenderComponent(_component_UBadge, {
        color: "green",
        variant: "soft",
        class: "mt-1"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u{1F69A} Livreur`);
          } else {
            return [
              createTextVNode("\u{1F69A} Livreur")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl"><div class="text-center"><p class="text-2xl font-bold text-gray-900">${ssrInterpolate(unref(agentStats).totalDeliveries)}</p><p class="text-xs text-gray-500">Livraisons</p></div><div class="text-center"><div class="flex items-center justify-center gap-1">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:star",
        class: "w-5 h-5 text-amber-500 fill-current"
      }, null, _parent));
      _push(`<p class="text-2xl font-bold text-gray-900">${ssrInterpolate(unref(agentStats).rating)}</p></div><p class="text-xs text-gray-500">Note</p></div><div class="text-center"><p class="text-2xl font-bold text-gray-900">${ssrInterpolate(unref(agentStats).zone)}</p><p class="text-xs text-gray-500">Zone</p></div></div></div><div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6"><h3 class="font-semibold text-gray-900 mb-4">Informations de contact</h3><div class="space-y-4"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:phone",
        class: "w-5 h-5 text-gray-500"
      }, null, _parent));
      _push(`</div><div><p class="text-xs text-gray-500">T\xE9l\xE9phone</p><p class="font-medium text-gray-900">${ssrInterpolate(unref(agentStats).phone || ((_b2 = unref(authStore).user) == null ? void 0 : _b2.phone) || "-")}</p></div></div><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:mail",
        class: "w-5 h-5 text-gray-500"
      }, null, _parent));
      _push(`</div><div><p class="text-xs text-gray-500">Email</p><p class="font-medium text-gray-900">${ssrInterpolate((_c2 = unref(authStore).user) == null ? void 0 : _c2.email)}</p></div></div><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:map-pin",
        class: "w-5 h-5 text-gray-500"
      }, null, _parent));
      _push(`</div><div><p class="text-xs text-gray-500">Zone de livraison</p><p class="font-medium text-gray-900">${ssrInterpolate(unref(agentStats).zone)}</p></div></div></div></div><div class="space-y-3"><button class="w-full flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100"><div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:edit",
        class: "w-5 h-5 text-blue-600"
      }, null, _parent));
      _push(`</div><span class="flex-1 text-left font-medium text-gray-900">Modifier mon profil</span>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:chevron-right",
        class: "w-5 h-5 text-gray-400"
      }, null, _parent));
      _push(`</button><button class="w-full flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100"><div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:log-out",
        class: "w-5 h-5 text-red-600"
      }, null, _parent));
      _push(`</div><span class="flex-1 text-left font-medium text-red-600">Se d\xE9connecter</span>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:chevron-right",
        class: "w-5 h-5 text-gray-400"
      }, null, _parent));
      _push(`</button></div>`);
      _push(ssrRenderComponent(_component_UModal, {
        modelValue: unref(showEditModal),
        "onUpdate:modelValue": ($event) => isRef(showEditModal) ? showEditModal.value = $event : null
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-6"${_scopeId}><h3 class="text-lg font-semibold text-gray-900 mb-4"${_scopeId}>Modifier mon profil</h3><div class="space-y-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UFormGroup, { label: "Pr\xE9nom" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: unref(editForm).firstName,
                    "onUpdate:modelValue": ($event) => unref(editForm).firstName = $event,
                    placeholder: "Pr\xE9nom"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: unref(editForm).firstName,
                      "onUpdate:modelValue": ($event) => unref(editForm).firstName = $event,
                      placeholder: "Pr\xE9nom"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormGroup, { label: "Nom" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: unref(editForm).lastName,
                    "onUpdate:modelValue": ($event) => unref(editForm).lastName = $event,
                    placeholder: "Nom"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: unref(editForm).lastName,
                      "onUpdate:modelValue": ($event) => unref(editForm).lastName = $event,
                      placeholder: "Nom"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormGroup, { label: "T\xE9l\xE9phone" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: unref(editForm).phone,
                    "onUpdate:modelValue": ($event) => unref(editForm).phone = $event,
                    placeholder: "T\xE9l\xE9phone"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: unref(editForm).phone,
                      "onUpdate:modelValue": ($event) => unref(editForm).phone = $event,
                      placeholder: "T\xE9l\xE9phone"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="flex gap-3 mt-6"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              color: "gray",
              variant: "outline",
              class: "flex-1",
              onClick: ($event) => showEditModal.value = false
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
              color: "primary",
              class: "flex-1",
              loading: unref(saving),
              onClick: saveProfile
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Enregistrer `);
                } else {
                  return [
                    createTextVNode(" Enregistrer ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-6" }, [
                createVNode("h3", { class: "text-lg font-semibold text-gray-900 mb-4" }, "Modifier mon profil"),
                createVNode("div", { class: "space-y-4" }, [
                  createVNode(_component_UFormGroup, { label: "Pr\xE9nom" }, {
                    default: withCtx(() => [
                      createVNode(_component_UInput, {
                        modelValue: unref(editForm).firstName,
                        "onUpdate:modelValue": ($event) => unref(editForm).firstName = $event,
                        placeholder: "Pr\xE9nom"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UFormGroup, { label: "Nom" }, {
                    default: withCtx(() => [
                      createVNode(_component_UInput, {
                        modelValue: unref(editForm).lastName,
                        "onUpdate:modelValue": ($event) => unref(editForm).lastName = $event,
                        placeholder: "Nom"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UFormGroup, { label: "T\xE9l\xE9phone" }, {
                    default: withCtx(() => [
                      createVNode(_component_UInput, {
                        modelValue: unref(editForm).phone,
                        "onUpdate:modelValue": ($event) => unref(editForm).phone = $event,
                        placeholder: "T\xE9l\xE9phone"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                createVNode("div", { class: "flex gap-3 mt-6" }, [
                  createVNode(_component_UButton, {
                    color: "gray",
                    variant: "outline",
                    class: "flex-1",
                    onClick: ($event) => showEditModal.value = false
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Annuler ")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(_component_UButton, {
                    color: "primary",
                    class: "flex-1",
                    loading: unref(saving),
                    onClick: saveProfile
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Enregistrer ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/livreur/profil.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=profil-6dMW2Cdg.mjs.map
