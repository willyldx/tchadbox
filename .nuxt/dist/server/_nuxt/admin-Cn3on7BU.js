import { i as useAuthStore, k as useRoute, _ as __nuxt_component_3, d as __nuxt_component_0, b as __nuxt_component_3$1, n as navigateTo } from "../server.mjs";
import { _ as __nuxt_component_2 } from "./Dropdown-BUSRM3T8.js";
import { defineComponent, ref, computed, watch, mergeProps, withCtx, createVNode, unref, toDisplayString, createTextVNode, openBlock, createBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderSlot } from "vue/server-renderer";
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
import "tailwind-merge";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/@unhead/vue/dist/index.mjs";
import "@iconify/vue";
import "lucide-vue-next";
import "@iconify/utils/lib/css/icon";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/nuxt/node_modules/perfect-debounce/dist/index.mjs";
import "ohash/utils";
import "@clerk/vue";
import "./keyboard-BvysMIIh.js";
import "./usePopper-CIeS2-3g.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "admin",
  __ssrInlineRender: true,
  setup(__props) {
    const authStore = useAuthStore();
    const route = useRoute();
    const sidebarOpen = ref(false);
    const navigationItems = computed(() => [
      { to: "/admin", label: "Dashboard", icon: "lucide:layout-dashboard" },
      { to: "/admin/commandes", label: "Commandes", icon: "lucide:package", badge: pendingOrdersCount.value || null },
      { to: "/admin/stocks", label: "Stocks", icon: "lucide:warehouse" },
      { to: "/admin/livreurs", label: "Livreurs", icon: "lucide:truck" },
      { to: "/admin/clients", label: "Clients", icon: "lucide:users" }
    ]);
    const superAdminItems = [
      { to: "/admin/equipe", label: "Équipe", icon: "lucide:user-cog" },
      { to: "/admin/finances", label: "Finances", icon: "lucide:wallet" }
    ];
    const userMenuItems = [
      [{
        label: "Mon profil",
        icon: "i-lucide-user",
        click: () => navigateTo("/compte/profil")
      }],
      [{
        label: "Voir le site",
        icon: "i-lucide-external-link",
        click: () => (void 0).open("/", "_blank")
      }],
      [{
        label: "Déconnexion",
        icon: "i-lucide-log-out",
        click: () => authStore.logout()
      }]
    ];
    const roleLabel = computed(() => {
      const roles = {
        super_admin: "👑 CEO",
        admin: "🛡️ Admin",
        livreur: "🚚 Livreur",
        client: "Client"
      };
      return roles[authStore.userRole] || "Utilisateur";
    });
    const isActive = (path) => {
      if (path === "/admin") {
        return route.path === "/admin";
      }
      return route.path.startsWith(path);
    };
    const pendingOrdersCount = ref(0);
    watch(() => route.path, () => {
      sidebarOpen.value = false;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_3;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_UDropdown = __nuxt_component_2;
      const _component_UButton = __nuxt_component_3$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-stone-50" }, _attrs))}><div class="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-200 px-4 py-3 flex items-center justify-between"><div class="flex items-center gap-3"><button class="p-2 rounded-lg hover:bg-stone-100">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:menu",
        class: "w-6 h-6"
      }, null, _parent));
      _push(`</button>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin",
        class: "flex items-center gap-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_0)} alt="TchadBox" class="h-8 w-auto"${_scopeId}><span class="font-bold text-amber-600"${_scopeId}>Admin</span>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_0,
                alt: "TchadBox",
                class: "h-8 w-auto"
              }),
              createVNode("span", { class: "font-bold text-amber-600" }, "Admin")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_UDropdown, {
        items: userMenuItems,
        popper: { placement: "bottom-end" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UButton, {
              color: "gray",
              variant: "ghost",
              class: "p-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center"${_scopeId2}><span class="text-sm font-semibold text-amber-700"${_scopeId2}>${ssrInterpolate(unref(authStore).initials)}</span></div>`);
                } else {
                  return [
                    createVNode("div", { class: "w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center" }, [
                      createVNode("span", { class: "text-sm font-semibold text-amber-700" }, toDisplayString(unref(authStore).initials), 1)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UButton, {
                color: "gray",
                variant: "ghost",
                class: "p-2"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center" }, [
                    createVNode("span", { class: "text-sm font-semibold text-amber-700" }, toDisplayString(unref(authStore).initials), 1)
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
      if (unref(sidebarOpen)) {
        _push(`<div class="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<aside class="${ssrRenderClass([
        "fixed inset-y-0 left-0 z-50 w-64 bg-[#0F172A] transform transition-transform duration-300 lg:translate-x-0",
        unref(sidebarOpen) ? "translate-x-0" : "-translate-x-full"
      ])}"><div class="h-16 flex items-center justify-between px-4 border-b border-white/10">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin",
        class: "flex items-center gap-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_0)} alt="TchadBox" class="h-10 w-auto"${_scopeId}><div${_scopeId}><span class="font-bold text-white"${_scopeId}>TchadBox</span><span class="block text-xs text-amber-400 font-medium"${_scopeId}>Admin Panel</span></div>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_0,
                alt: "TchadBox",
                class: "h-10 w-auto"
              }),
              createVNode("div", null, [
                createVNode("span", { class: "font-bold text-white" }, "TchadBox"),
                createVNode("span", { class: "block text-xs text-amber-400 font-medium" }, "Admin Panel")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="lg:hidden p-2 rounded-lg hover:bg-white/10 text-white/60">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:x",
        class: "w-5 h-5"
      }, null, _parent));
      _push(`</button></div><nav class="flex-1 overflow-y-auto py-4 px-3"><div class="space-y-1"><!--[-->`);
      ssrRenderList(unref(navigationItems), (item) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: item.to,
          to: item.to,
          class: [
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
            isActive(item.to) ? "bg-amber-500/10 text-amber-400" : "text-white/60 hover:bg-white/5 hover:text-white"
          ],
          onClick: ($event) => sidebarOpen.value = false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: item.icon,
                class: "w-5 h-5"
              }, null, _parent2, _scopeId));
              _push2(` ${ssrInterpolate(item.label)} `);
              if (item.badge) {
                _push2(`<span class="ml-auto bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full"${_scopeId}>${ssrInterpolate(item.badge)}</span>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode(_component_Icon, {
                  name: item.icon,
                  class: "w-5 h-5"
                }, null, 8, ["name"]),
                createTextVNode(" " + toDisplayString(item.label) + " ", 1),
                item.badge ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "ml-auto bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full"
                }, toDisplayString(item.badge), 1)) : createCommentVNode("", true)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div>`);
      if (unref(authStore).isSuperAdmin) {
        _push(`<div class="mt-8"><p class="px-3 mb-2 text-xs font-semibold text-white/30 uppercase tracking-wider"> CEO Only </p><div class="space-y-1"><!--[-->`);
        ssrRenderList(superAdminItems, (item) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: item.to,
            to: item.to,
            class: [
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              isActive(item.to) ? "bg-amber-500/10 text-amber-400" : "text-white/60 hover:bg-white/5 hover:text-white"
            ],
            onClick: ($event) => sidebarOpen.value = false
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_Icon, {
                  name: item.icon,
                  class: "w-5 h-5"
                }, null, _parent2, _scopeId));
                _push2(` ${ssrInterpolate(item.label)}`);
              } else {
                return [
                  createVNode(_component_Icon, {
                    name: item.icon,
                    class: "w-5 h-5"
                  }, null, 8, ["name"]),
                  createTextVNode(" " + toDisplayString(item.label), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mt-8 px-3"><a href="/" target="_blank" class="flex items-center gap-2 text-white/30 hover:text-white/60 text-xs transition-colors">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:external-link",
        class: "w-4 h-4"
      }, null, _parent));
      _push(` Voir le site </a></div></nav><div class="border-t border-white/10 p-4"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center"><span class="text-sm font-semibold text-white">${ssrInterpolate(unref(authStore).initials)}</span></div><div class="flex-1 min-w-0"><p class="text-sm font-medium text-white truncate">${ssrInterpolate(unref(authStore).fullName)}</p><p class="text-xs text-white/40 truncate">${ssrInterpolate(unref(roleLabel))}</p></div>`);
      _push(ssrRenderComponent(_component_UDropdown, {
        items: userMenuItems,
        popper: { placement: "top-end" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UButton, {
              color: "gray",
              variant: "ghost",
              icon: "i-lucide-more-vertical",
              size: "sm",
              class: "text-white/40 hover:text-white"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UButton, {
                color: "gray",
                variant: "ghost",
                icon: "i-lucide-more-vertical",
                size: "sm",
                class: "text-white/40 hover:text-white"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></aside><main class="lg:pl-64 pt-16 lg:pt-0"><div class="p-4 lg:p-6">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></main></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/admin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=admin-Cn3on7BU.js.map
