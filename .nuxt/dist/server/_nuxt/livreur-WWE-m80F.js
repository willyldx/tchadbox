import { e as _export_sfc, l as __nuxt_component_0, o as useUI, t as twMerge, q as appConfig, r as mergeConfig, i as useAuthStore, k as useRoute, d as __nuxt_component_0$1, _ as __nuxt_component_3, n as navigateTo } from "../server.mjs";
import { ref, provide, computed, defineComponent, unref, inject, h, Fragment, toRef, resolveComponent, mergeProps, withCtx, createVNode, openBlock, createBlock, createCommentVNode, useId, useSSRContext, isRef, toDisplayString } from "vue";
import { d as d$1, p } from "./form-DsUILy5F.js";
import { i, A, o, E as E$1, T, c as o$1, s as s$1 } from "./keyboard-BvysMIIh.js";
import { s } from "./usePopper-CIeS2-3g.js";
import { f, u } from "./hidden-CZ0WYEIB.js";
import { k } from "./description-DXB91rC2.js";
import { twJoin } from "tailwind-merge";
import { u as useFormGroup } from "./useFormGroup-C15lTjpg.js";
import { ssrRenderComponent, ssrRenderClass, ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderSlot, ssrRenderList } from "vue/server-renderer";
import { _ as __nuxt_component_2 } from "./Dropdown-BUSRM3T8.js";
import { _ as _imports_0 } from "./virtual_public-IWZl7zz2.js";
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
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/@unhead/vue/dist/index.mjs";
import "@iconify/vue";
import "lucide-vue-next";
import "@iconify/utils/lib/css/icon";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/nuxt/node_modules/perfect-debounce/dist/index.mjs";
import "ohash/utils";
import "@clerk/vue";
const toggle = {
  base: "relative inline-flex flex-shrink-0 border-2 border-transparent disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none",
  rounded: "rounded-full",
  ring: "focus-visible:ring-2 focus-visible:ring-{color}-500 dark:focus-visible:ring-{color}-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900",
  active: "bg-{color}-500 dark:bg-{color}-400",
  inactive: "bg-gray-200 dark:bg-gray-700",
  size: {
    "2xs": "h-3 w-5",
    "xs": "h-3.5 w-6",
    "sm": "h-4 w-7",
    "md": "h-5 w-9",
    "lg": "h-6 w-11",
    "xl": "h-7 w-[3.25rem]",
    "2xl": "h-8 w-[3.75rem]"
  },
  container: {
    base: "pointer-events-none relative inline-block rounded-full bg-white dark:bg-gray-900 shadow transform ring-0 transition ease-in-out duration-200",
    active: {
      "2xs": "translate-x-2 rtl:-translate-x-2",
      "xs": "translate-x-2.5 rtl:-translate-x-2.5",
      "sm": "translate-x-3 rtl:-translate-x-3",
      "md": "translate-x-4 rtl:-translate-x-4",
      "lg": "translate-x-5 rtl:-translate-x-5",
      "xl": "translate-x-6 rtl:-translate-x-6",
      "2xl": "translate-x-7 rtl:-translate-x-7"
    },
    inactive: "translate-x-0 rtl:-translate-x-0",
    size: {
      "2xs": "h-2 w-2",
      "xs": "h-2.5 w-2.5",
      "sm": "h-3 w-3",
      "md": "h-4 w-4",
      "lg": "h-5 w-5",
      "xl": "h-6 w-6",
      "2xl": "h-7 w-7"
    }
  },
  icon: {
    base: "absolute inset-0 h-full w-full flex items-center justify-center transition-opacity",
    active: "opacity-100 ease-in duration-200",
    inactive: "opacity-0 ease-out duration-100",
    size: {
      "2xs": "h-2 w-2",
      "xs": "h-2 w-2",
      "sm": "h-2 w-2",
      "md": "h-3 w-3",
      "lg": "h-4 w-4",
      "xl": "h-5 w-5",
      "2xl": "h-6 w-6"
    },
    on: "text-{color}-500 dark:text-{color}-400",
    off: "text-gray-400 dark:text-gray-500",
    loading: "animate-spin text-{color}-500 dark:text-{color}-400"
  },
  default: {
    onIcon: null,
    offIcon: null,
    loadingIcon: "i-heroicons-arrow-path-20-solid",
    color: "primary",
    size: "md"
  }
};
let a = Symbol("LabelContext");
function d() {
  let t = inject(a, null);
  if (t === null) {
    let n = new Error("You used a <Label /> component, but it is not inside a parent.");
    throw Error.captureStackTrace && Error.captureStackTrace(n, d), n;
  }
  return t;
}
function E({ slot: t = {}, name: n = "Label", props: i2 = {} } = {}) {
  let e = ref([]);
  function o2(r) {
    return e.value.push(r), () => {
      let l = e.value.indexOf(r);
      l !== -1 && e.value.splice(l, 1);
    };
  }
  return provide(a, { register: o2, slot: t, name: n, props: i2 }), computed(() => e.value.length > 0 ? e.value.join(" ") : void 0);
}
defineComponent({ name: "Label", props: { as: { type: [Object, String], default: "label" }, passive: { type: [Boolean], default: false }, id: { type: String, default: null } }, setup(t, { slots: n, attrs: i$1 }) {
  var r;
  let e = (r = t.id) != null ? r : `headlessui-label-${i()}`, o2 = d();
  return () => {
    let { name: l = "Label", slot: p2 = {}, props: c = {} } = o2, { passive: f2, ...s2 } = t, u2 = { ...Object.entries(c).reduce((b, [g, m]) => Object.assign(b, { [g]: unref(m) }), {}), id: e };
    return f2 && (delete u2.onClick, delete u2.htmlFor, delete s2.onClick), A({ ourProps: u2, theirProps: s2, slot: p2, attrs: i$1, slots: n, name: l });
  };
} });
let C = Symbol("GroupContext");
defineComponent({ name: "SwitchGroup", props: { as: { type: [Object, String], default: "template" } }, setup(l, { slots: c, attrs: i2 }) {
  let r = ref(null), f2 = E({ name: "SwitchLabel", props: { htmlFor: computed(() => {
    var t;
    return (t = r.value) == null ? void 0 : t.id;
  }), onClick(t) {
    r.value && (t.currentTarget.tagName === "LABEL" && t.preventDefault(), r.value.click(), r.value.focus({ preventScroll: true }));
  } } }), p2 = k({ name: "SwitchDescription" });
  return provide(C, { switchRef: r, labelledby: f2, describedby: p2 }), () => A({ theirProps: l, ourProps: {}, slot: {}, slots: c, attrs: i2, name: "SwitchGroup" });
} });
let ue = defineComponent({ name: "Switch", emits: { "update:modelValue": (l) => true }, props: { as: { type: [Object, String], default: "button" }, modelValue: { type: Boolean, default: void 0 }, defaultChecked: { type: Boolean, optional: true }, form: { type: String, optional: true }, name: { type: String, optional: true }, value: { type: String, optional: true }, id: { type: String, default: null }, disabled: { type: Boolean, default: false }, tabIndex: { type: Number, default: 0 } }, inheritAttrs: false, setup(l, { emit: c, attrs: i$1, slots: r, expose: f$1 }) {
  var h$1;
  let p$1 = (h$1 = l.id) != null ? h$1 : `headlessui-switch-${i()}`, n = inject(C, null), [t, s$12] = d$1(computed(() => l.modelValue), (e) => c("update:modelValue", e), computed(() => l.defaultChecked));
  function m() {
    s$12(!t.value);
  }
  let E2 = ref(null), o$2 = n === null ? E2 : n.switchRef, L = s(computed(() => ({ as: l.as, type: i$1.type })), o$2);
  f$1({ el: o$2, $el: o$2 });
  function D(e) {
    e.preventDefault(), m();
  }
  function R(e) {
    e.key === o$1.Space ? (e.preventDefault(), m()) : e.key === o$1.Enter && p(e.currentTarget);
  }
  function x(e) {
    e.preventDefault();
  }
  computed(() => {
    var e, a2;
    return (a2 = (e = o(o$2)) == null ? void 0 : e.closest) == null ? void 0 : a2.call(e, "form");
  });
  return () => {
    let { name: e, value: a2, form: K, tabIndex: y, ...b } = l, T$1 = { checked: t.value }, B = { id: p$1, ref: o$2, role: "switch", type: L.value, tabIndex: y === -1 ? 0 : y, "aria-checked": t.value, "aria-labelledby": n == null ? void 0 : n.labelledby.value, "aria-describedby": n == null ? void 0 : n.describedby.value, onClick: D, onKeyup: R, onKeypress: x };
    return h(Fragment, [e != null && t.value != null ? h(f, E$1({ features: u.Hidden, as: "input", type: "checkbox", hidden: true, readOnly: true, checked: t.value, form: K, disabled: b.disabled, name: e, value: a2 })) : null, A({ ourProps: B, theirProps: { ...i$1, ...T(b, ["modelValue", "defaultChecked"]) }, slot: T$1, attrs: i$1, slots: r, name: "Switch" })]);
  };
} });
const config = mergeConfig(appConfig.ui.strategy, appConfig.ui.toggle, toggle);
const _sfc_main$1 = defineComponent({
  components: {
    HSwitch: ue,
    UIcon: __nuxt_component_0
  },
  inheritAttrs: false,
  props: {
    id: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    onIcon: {
      type: String,
      default: () => config.default.onIcon
    },
    offIcon: {
      type: String,
      default: () => config.default.offIcon
    },
    loadingIcon: {
      type: String,
      default: () => config.default.loadingIcon
    },
    color: {
      type: String,
      default: () => config.default.color,
      validator(value) {
        return appConfig.ui.colors.includes(value);
      }
    },
    size: {
      type: String,
      default: () => config.default.size,
      validator(value) {
        return Object.keys(config.size).includes(value);
      }
    },
    class: {
      type: [String, Object, Array],
      default: () => ""
    },
    ui: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update:modelValue", "change"],
  setup(props, { emit }) {
    const { ui, attrs } = useUI("toggle", toRef(props, "ui"), config);
    const { emitFormChange, color, inputId, name } = useFormGroup(props);
    const active = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit("update:modelValue", value);
        emit("change", value);
        emitFormChange();
      }
    });
    const switchClass = computed(() => {
      return twMerge(twJoin(
        ui.value.base,
        ui.value.size[props.size],
        ui.value.rounded,
        color.value && ui.value.ring.replaceAll("{color}", color.value),
        color.value && (active.value ? ui.value.active : ui.value.inactive).replaceAll("{color}", color.value)
      ), props.class);
    });
    const containerClass = computed(() => {
      return twJoin(
        ui.value.container.base,
        ui.value.container.size[props.size],
        active.value ? ui.value.container.active[props.size] : ui.value.container.inactive
      );
    });
    const onIconClass = computed(() => {
      return twJoin(
        ui.value.icon.size[props.size],
        color.value && ui.value.icon.on.replaceAll("{color}", color.value)
      );
    });
    const offIconClass = computed(() => {
      return twJoin(
        ui.value.icon.size[props.size],
        color.value && ui.value.icon.off.replaceAll("{color}", color.value)
      );
    });
    const loadingIconClass = computed(() => {
      return twJoin(
        ui.value.icon.size[props.size],
        color.value && ui.value.icon.loading.replaceAll("{color}", color.value)
      );
    });
    s$1(() => useId());
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,
      // eslint-disable-next-line vue/no-dupe-keys
      name,
      inputId,
      active,
      switchClass,
      containerClass,
      onIconClass,
      offIconClass,
      loadingIconClass
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_HSwitch = resolveComponent("HSwitch");
  const _component_UIcon = __nuxt_component_0;
  _push(ssrRenderComponent(_component_HSwitch, mergeProps({
    id: _ctx.inputId,
    modelValue: _ctx.active,
    "onUpdate:modelValue": ($event) => _ctx.active = $event,
    name: _ctx.name,
    disabled: _ctx.disabled || _ctx.loading,
    class: _ctx.switchClass
  }, _ctx.attrs, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<span class="${ssrRenderClass(_ctx.containerClass)}"${_scopeId}>`);
        if (_ctx.loading) {
          _push2(`<span class="${ssrRenderClass([_ctx.ui.icon.active, _ctx.ui.icon.base])}" aria-hidden="true"${_scopeId}>`);
          _push2(ssrRenderComponent(_component_UIcon, {
            name: _ctx.loadingIcon,
            class: _ctx.loadingIconClass
          }, null, _parent2, _scopeId));
          _push2(`</span>`);
        } else {
          _push2(`<!---->`);
        }
        if (!_ctx.loading && _ctx.onIcon) {
          _push2(`<span class="${ssrRenderClass([_ctx.active ? _ctx.ui.icon.active : _ctx.ui.icon.inactive, _ctx.ui.icon.base])}" aria-hidden="true"${_scopeId}>`);
          _push2(ssrRenderComponent(_component_UIcon, {
            name: _ctx.onIcon,
            class: _ctx.onIconClass
          }, null, _parent2, _scopeId));
          _push2(`</span>`);
        } else {
          _push2(`<!---->`);
        }
        if (!_ctx.loading && _ctx.offIcon) {
          _push2(`<span class="${ssrRenderClass([_ctx.active ? _ctx.ui.icon.inactive : _ctx.ui.icon.active, _ctx.ui.icon.base])}" aria-hidden="true"${_scopeId}>`);
          _push2(ssrRenderComponent(_component_UIcon, {
            name: _ctx.offIcon,
            class: _ctx.offIconClass
          }, null, _parent2, _scopeId));
          _push2(`</span>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`</span>`);
      } else {
        return [
          createVNode("span", { class: _ctx.containerClass }, [
            _ctx.loading ? (openBlock(), createBlock("span", {
              key: 0,
              class: [_ctx.ui.icon.active, _ctx.ui.icon.base],
              "aria-hidden": "true"
            }, [
              createVNode(_component_UIcon, {
                name: _ctx.loadingIcon,
                class: _ctx.loadingIconClass
              }, null, 8, ["name", "class"])
            ], 2)) : createCommentVNode("", true),
            !_ctx.loading && _ctx.onIcon ? (openBlock(), createBlock("span", {
              key: 1,
              class: [_ctx.active ? _ctx.ui.icon.active : _ctx.ui.icon.inactive, _ctx.ui.icon.base],
              "aria-hidden": "true"
            }, [
              createVNode(_component_UIcon, {
                name: _ctx.onIcon,
                class: _ctx.onIconClass
              }, null, 8, ["name", "class"])
            ], 2)) : createCommentVNode("", true),
            !_ctx.loading && _ctx.offIcon ? (openBlock(), createBlock("span", {
              key: 2,
              class: [_ctx.active ? _ctx.ui.icon.inactive : _ctx.ui.icon.active, _ctx.ui.icon.base],
              "aria-hidden": "true"
            }, [
              createVNode(_component_UIcon, {
                name: _ctx.offIcon,
                class: _ctx.offIconClass
              }, null, 8, ["name", "class"])
            ], 2)) : createCommentVNode("", true)
          ], 2)
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/forms/Toggle.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "livreur",
  __ssrInlineRender: true,
  setup(__props) {
    const authStore = useAuthStore();
    const route = useRoute();
    const isOnline = ref(true);
    const navItems = computed(() => [
      { to: "/livreur", label: "Livraisons", icon: "lucide:package" },
      { to: "/livreur/historique", label: "Historique", icon: "lucide:history" },
      { to: "/livreur/profil", label: "Profil", icon: "lucide:user" }
    ]);
    const userMenuItems = [
      [{
        label: "Mon profil",
        icon: "i-lucide-user",
        click: () => navigateTo("/livreur/profil")
      }],
      [{
        label: "Déconnexion",
        icon: "i-lucide-log-out",
        click: () => authStore.logout()
      }]
    ];
    const isActive = (path) => {
      if (path === "/livreur") {
        return route.path === "/livreur";
      }
      return route.path.startsWith(path);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_UToggle = __nuxt_component_1;
      const _component_UDropdown = __nuxt_component_2;
      const _component_Icon = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-stone-50" }, _attrs))} data-v-57f26367><header class="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-200" data-v-57f26367><div class="px-4 py-3 flex items-center justify-between" data-v-57f26367><div class="flex items-center gap-3" data-v-57f26367>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/livreur",
        class: "flex items-center gap-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_0)} alt="TchadBox" class="h-8 w-auto" data-v-57f26367${_scopeId}><div data-v-57f26367${_scopeId}><span class="font-bold text-stone-800" data-v-57f26367${_scopeId}>TchadBox</span><span class="block text-xs text-green-600 font-medium" data-v-57f26367${_scopeId}>Livreur</span></div>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_0,
                alt: "TchadBox",
                class: "h-8 w-auto"
              }),
              createVNode("div", null, [
                createVNode("span", { class: "font-bold text-stone-800" }, "TchadBox"),
                createVNode("span", { class: "block text-xs text-green-600 font-medium" }, "Livreur")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex items-center gap-3" data-v-57f26367><div class="flex items-center gap-2" data-v-57f26367><span class="text-sm text-stone-500" data-v-57f26367>${ssrInterpolate(unref(isOnline) ? "En ligne" : "Hors ligne")}</span>`);
      _push(ssrRenderComponent(_component_UToggle, {
        modelValue: unref(isOnline),
        "onUpdate:modelValue": ($event) => isRef(isOnline) ? isOnline.value = $event : null,
        color: "green"
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_UDropdown, {
        items: userMenuItems,
        popper: { placement: "bottom-end" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center cursor-pointer" data-v-57f26367${_scopeId}><span class="text-sm font-semibold text-green-700" data-v-57f26367${_scopeId}>${ssrInterpolate(unref(authStore).initials)}</span></div>`);
          } else {
            return [
              createVNode("div", { class: "w-9 h-9 rounded-full bg-green-100 flex items-center justify-center cursor-pointer" }, [
                createVNode("span", { class: "text-sm font-semibold text-green-700" }, toDisplayString(unref(authStore).initials), 1)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></header><main class="pt-16 pb-20" data-v-57f26367>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main><nav class="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-stone-200 safe-area-bottom" data-v-57f26367><div class="flex items-center justify-around py-2" data-v-57f26367><!--[-->`);
      ssrRenderList(unref(navItems), (item) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: item.to,
          to: item.to,
          class: [
            "flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors",
            isActive(item.to) ? "text-green-600" : "text-stone-400"
          ]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: item.icon,
                class: "w-6 h-6"
              }, null, _parent2, _scopeId));
              _push2(`<span class="text-xs font-medium" data-v-57f26367${_scopeId}>${ssrInterpolate(item.label)}</span>`);
              if (item.badge) {
                _push2(`<span class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center" data-v-57f26367${_scopeId}>${ssrInterpolate(item.badge)}</span>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode(_component_Icon, {
                  name: item.icon,
                  class: "w-6 h-6"
                }, null, 8, ["name"]),
                createVNode("span", { class: "text-xs font-medium" }, toDisplayString(item.label), 1),
                item.badge ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
                }, toDisplayString(item.badge), 1)) : createCommentVNode("", true)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></nav></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/livreur.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const livreur = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-57f26367"]]);
export {
  livreur as default
};
//# sourceMappingURL=livreur-WWE-m80F.js.map
