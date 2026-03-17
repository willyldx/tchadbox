import { c as _export_sfc, f as useCartStore, i as useAuthStore, h as useFavoritesStore, j as useRoute, e as __nuxt_component_0$4 } from './server.mjs';
import { defineComponent, ref, watch, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, resolveDynamicComponent, isRef, nextTick, resolveDirective, getCurrentScope, onScopeDispose, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrRenderVNode, ssrRenderSlot, ssrRenderTeleport, ssrGetDirectiveProps } from 'vue/server-renderer';
import { Truck, Home, Package, HelpCircle, MapPinned, MessageCircle, Search, Heart, ChevronDown, User, LayoutDashboard, UserCircle, LogOut, ShoppingBag, X, Menu, UserPlus, Facebook, Instagram, Twitter, Mail, Phone, MapPin, SearchX } from 'lucide-vue-next';
import { u as useMeilisearch } from './useMeilisearch-Bt6eJ6ev.mjs';
import { _ as _imports_0 } from './virtual_public-IWZl7zz2.mjs';
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
import '@iconify/utils/lib/css/icon';
import '@clerk/vue';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'meilisearch';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "SearchModal",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const query = ref("");
    const searchInput = ref();
    const searchResults = ref([]);
    const isSearching = ref(false);
    let searchTimeout = null;
    watch(query, (q) => {
      if (searchTimeout) clearTimeout(searchTimeout);
      if (!q || q.length < 2) {
        searchResults.value = [];
        return;
      }
      isSearching.value = true;
      searchTimeout = setTimeout(async () => {
        const { performSearch } = useMeilisearch();
        const results = await performSearch(q, { limit: 8 });
        searchResults.value = (results.hits || []).map((p) => ({
          id: p.id,
          title: p.title,
          handle: p.slug || p.handle || p.id,
          // Fallback handle using slug or ID
          price: p.price,
          thumbnail: p.thumbnail,
          category: p.category || ""
        }));
        isSearching.value = false;
      }, 300);
    });
    const formatPrice = (price) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(price);
    const close = () => {
      emit("update:modelValue", false);
      query.value = "";
      searchResults.value = [];
    };
    watch(() => props.modelValue, (open) => {
      if (open) nextTick(() => {
        var _a;
        return (_a = searchInput.value) == null ? void 0 : _a.focus();
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$4;
      const _directive_motion = resolveDirective("motion");
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.modelValue) {
          _push2(`<div class="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-start justify-center pt-24 px-4"><div${ssrRenderAttrs(mergeProps({
            initial: { opacity: 0, y: -10, scale: 0.98 },
            enter: { opacity: 1, y: 0, scale: 1 },
            class: "w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
          }, ssrGetDirectiveProps(_ctx, _directive_motion)))}><div class="relative border-b border-gray-100">`);
          _push2(ssrRenderComponent(unref(Search), { class: "absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" }, null, _parent));
          _push2(`<input${ssrRenderAttr("value", unref(query))} type="text" placeholder="Rechercher un produit..." class="w-full pl-14 pr-12 py-5 text-lg focus:outline-none"><button class="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-gray-100 transition-colors">`);
          _push2(ssrRenderComponent(unref(X), { class: "w-5 h-5 text-gray-400" }, null, _parent));
          _push2(`</button></div>`);
          if (unref(query).length >= 2) {
            _push2(`<div class="max-h-80 overflow-y-auto">`);
            if (unref(isSearching)) {
              _push2(`<div class="p-8 text-center"><div class="w-8 h-8 border-3 border-gray-200 border-t-[var(--color-accent)] rounded-full animate-spin mx-auto mb-3"></div><p class="text-[var(--color-text-muted)]">Recherche en cours...</p></div>`);
            } else if (unref(searchResults).length > 0) {
              _push2(`<div class="p-2"><!--[-->`);
              ssrRenderList(unref(searchResults), (product) => {
                _push2(ssrRenderComponent(_component_NuxtLink, {
                  key: product.id,
                  to: `/produit/${product.handle}`,
                  class: "flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors",
                  onClick: close
                }, {
                  default: withCtx((_, _push3, _parent2, _scopeId) => {
                    if (_push3) {
                      _push3(`<div class="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden"${_scopeId}>`);
                      if (product.thumbnail) {
                        _push3(`<img${ssrRenderAttr("src", product.thumbnail)}${ssrRenderAttr("alt", product.title)} class="w-full h-full object-cover"${_scopeId}>`);
                      } else {
                        _push3(ssrRenderComponent(unref(Package), { class: "w-5 h-5 text-gray-400" }, null, _parent2, _scopeId));
                      }
                      _push3(`</div><div class="flex-grow"${_scopeId}><h4 class="font-medium text-[var(--color-text)]"${_scopeId}>${ssrInterpolate(product.title)}</h4><p class="text-sm text-[var(--color-text-muted)]"${_scopeId}>${ssrInterpolate(product.category)}</p></div><span class="font-semibold text-[var(--color-primary)]"${_scopeId}>${ssrInterpolate(formatPrice(product.price))}</span>`);
                    } else {
                      return [
                        createVNode("div", { class: "w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden" }, [
                          product.thumbnail ? (openBlock(), createBlock("img", {
                            key: 0,
                            src: product.thumbnail,
                            alt: product.title,
                            class: "w-full h-full object-cover"
                          }, null, 8, ["src", "alt"])) : (openBlock(), createBlock(unref(Package), {
                            key: 1,
                            class: "w-5 h-5 text-gray-400"
                          }))
                        ]),
                        createVNode("div", { class: "flex-grow" }, [
                          createVNode("h4", { class: "font-medium text-[var(--color-text)]" }, toDisplayString(product.title), 1),
                          createVNode("p", { class: "text-sm text-[var(--color-text-muted)]" }, toDisplayString(product.category), 1)
                        ]),
                        createVNode("span", { class: "font-semibold text-[var(--color-primary)]" }, toDisplayString(formatPrice(product.price)), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent));
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div class="p-8 text-center">`);
              _push2(ssrRenderComponent(unref(SearchX), { class: "w-12 h-12 text-gray-300 mx-auto mb-3" }, null, _parent));
              _push2(`<p class="text-[var(--color-text-muted)]">Aucun r\xE9sultat pour &quot;${ssrInterpolate(unref(query))}&quot;</p></div>`);
            }
            _push2(`</div>`);
          } else {
            _push2(`<div class="p-5"><p class="text-sm text-[var(--color-text-muted)] mb-3">Recherches populaires</p><div class="flex flex-wrap gap-2"><!--[-->`);
            ssrRenderList(["Riz", "Kit scolaire", "Ramadan", "Huile", "B\xE9b\xE9"], (term) => {
              _push2(`<button class="px-4 py-2 rounded-full bg-gray-100 hover:bg-[var(--color-primary)] hover:text-white text-sm transition-colors">${ssrInterpolate(term)}</button>`);
            });
            _push2(`<!--]--></div></div>`);
          }
          _push2(`</div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SearchModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
function toValue(r) {
  return typeof r === "function" ? r() : unref(r);
}
typeof WorkerGlobalScope !== "undefined" && globalThis instanceof WorkerGlobalScope;
const toString = Object.prototype.toString;
const isObject = (val) => toString.call(val) === "[object Object]";
const noop = () => {
};
const defaultWindow = void 0;
function unrefElement(elRef) {
  var _a;
  const plain = toValue(elRef);
  return (_a = plain == null ? void 0 : plain.$el) != null ? _a : plain;
}
function useEventListener(...args) {
  let target;
  let events2;
  let listeners;
  let options;
  if (typeof args[0] === "string" || Array.isArray(args[0])) {
    [events2, listeners, options] = args;
    target = defaultWindow;
  } else {
    [target, events2, listeners, options] = args;
  }
  if (!target)
    return noop;
  if (!Array.isArray(events2))
    events2 = [events2];
  if (!Array.isArray(listeners))
    listeners = [listeners];
  const cleanups = [];
  const cleanup = () => {
    cleanups.forEach((fn) => fn());
    cleanups.length = 0;
  };
  const register = (el, event, listener, options2) => {
    el.addEventListener(event, listener, options2);
    return () => el.removeEventListener(event, listener, options2);
  };
  const stopWatch = watch(
    () => [unrefElement(target), toValue(options)],
    ([el, options2]) => {
      cleanup();
      if (!el)
        return;
      const optionsClone = isObject(options2) ? { ...options2 } : options2;
      cleanups.push(
        ...events2.flatMap((event) => {
          return listeners.map((listener) => register(el, event, listener, optionsClone));
        })
      );
    },
    { immediate: true, flush: "post" }
  );
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(stop);
  return stop;
}
function onClickOutside(target, handler, options = {}) {
  const { window: window2 = defaultWindow, ignore = [], capture = true, detectIframe = false } = options;
  if (!window2)
    return noop;
  let shouldListen = true;
  const shouldIgnore = (event) => {
    return toValue(ignore).some((target2) => {
      if (typeof target2 === "string") {
        return Array.from(window2.document.querySelectorAll(target2)).some((el) => el === event.target || event.composedPath().includes(el));
      } else {
        const el = unrefElement(target2);
        return el && (event.target === el || event.composedPath().includes(el));
      }
    });
  };
  function hasMultipleRoots(target2) {
    const vm = toValue(target2);
    return vm && vm.$.subTree.shapeFlag === 16;
  }
  function checkMultipleRoots(target2, event) {
    const vm = toValue(target2);
    const children = vm.$.subTree && vm.$.subTree.children;
    if (children == null || !Array.isArray(children))
      return false;
    return children.some((child) => child.el === event.target || event.composedPath().includes(child.el));
  }
  const listener = (event) => {
    const el = unrefElement(target);
    if (event.target == null)
      return;
    if (!(el instanceof Element) && hasMultipleRoots(target) && checkMultipleRoots(target, event))
      return;
    if (!el || el === event.target || event.composedPath().includes(el))
      return;
    if (event.detail === 0)
      shouldListen = !shouldIgnore(event);
    if (!shouldListen) {
      shouldListen = true;
      return;
    }
    handler(event);
  };
  let isProcessingClick = false;
  const cleanup = [
    useEventListener(window2, "click", (event) => {
      if (!isProcessingClick) {
        isProcessingClick = true;
        setTimeout(() => {
          isProcessingClick = false;
        }, 0);
        listener(event);
      }
    }, { passive: true, capture }),
    useEventListener(window2, "pointerdown", (e) => {
      const el = unrefElement(target);
      shouldListen = !shouldIgnore(e) && !!(el && !e.composedPath().includes(el));
    }, { passive: true }),
    detectIframe && useEventListener(window2, "blur", (event) => {
      setTimeout(() => {
        var _a;
        const el = unrefElement(target);
        if (((_a = window2.document.activeElement) == null ? void 0 : _a.tagName) === "IFRAME" && !(el == null ? void 0 : el.contains(window2.document.activeElement))) {
          handler(event);
        }
      }, 0);
    })
  ].filter(Boolean);
  const stop = () => cleanup.forEach((fn) => fn());
  return stop;
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const cartStore = useCartStore();
    const authStore = useAuthStore();
    const favoritesStore = useFavoritesStore();
    const route = useRoute();
    const isMobileMenuOpen = ref(false);
    const isSearchOpen = ref(false);
    const isScrolled = ref(false);
    const isUserMenuOpen = ref(false);
    const userMenuRef = ref(null);
    onClickOutside(userMenuRef, () => {
      isUserMenuOpen.value = false;
    });
    const navLinks = [
      { label: "Accueil", to: "/", icon: Home },
      { label: "Catalogue", to: "/catalogue", icon: Package },
      { label: "Comment \xE7a marche", to: "/comment-ca-marche", icon: HelpCircle },
      { label: "Suivi", to: "/suivi", icon: MapPinned },
      { label: "Contact", to: "/contact", icon: MessageCircle }
    ];
    const socials = [
      { name: "Facebook", url: "#", icon: Facebook },
      { name: "Instagram", url: "#", icon: Instagram },
      { name: "Twitter", url: "#", icon: Twitter }
    ];
    const isActive = (path) => {
      if (path === "/") return route.path === "/";
      return route.path.startsWith(path);
    };
    watch(() => route.path, () => {
      isMobileMenuOpen.value = false;
      isUserMenuOpen.value = false;
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_NuxtLink = __nuxt_component_0$4;
      const _component_SearchModal = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex flex-col" }, _attrs))} data-v-b3008c9c><div class="${ssrRenderClass([unref(isScrolled) ? "bg-[var(--color-primary)]/80 backdrop-blur-md" : "bg-[var(--color-primary)]", "text-white py-2.5 transition-all duration-500"])}" data-v-b3008c9c><div class="container-main" data-v-b3008c9c><div class="flex items-center justify-center gap-2 text-sm" data-v-b3008c9c>`);
      _push(ssrRenderComponent(unref(Truck), { class: "w-4 h-4 text-[var(--color-accent)]" }, null, _parent));
      _push(`<span data-v-b3008c9c>Livraison certifi\xE9e \xE0 N&#39;Djamena sous 3 \xE0 5 jours \u2014 Preuve photo incluse</span><span class="hidden sm:inline text-[var(--color-accent)]" data-v-b3008c9c>\u2022</span><span class="hidden sm:inline" data-v-b3008c9c>Paiement 100% s\xE9curis\xE9</span></div></div></div><header class="${ssrRenderClass([unref(isScrolled) ? "header-glass--scrolled" : "header-glass--top", "sticky top-0 z-50 transition-all duration-500 header-glass"])}" data-v-b3008c9c><div class="container-main" data-v-b3008c9c><div class="flex items-center justify-between h-20" data-v-b3008c9c>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "flex-shrink-0 group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_0)} alt="TchadBox" class="h-14 w-auto transition-transform duration-300 group-hover:scale-105" data-v-b3008c9c${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_0,
                alt: "TchadBox",
                class: "h-14 w-auto transition-transform duration-300 group-hover:scale-105"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<nav class="hidden lg:flex items-center gap-8" data-v-b3008c9c><!--[-->`);
      ssrRenderList(navLinks, (link) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: link.to,
          to: link.to,
          class: ["nav-link", { "nav-link-active": isActive(link.to) }]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(link.label)}`);
            } else {
              return [
                createTextVNode(toDisplayString(link.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></nav><div class="flex items-center gap-2" data-v-b3008c9c><button class="hidden md:flex p-2.5 rounded-xl hover:bg-gray-100 transition-colors" data-v-b3008c9c>`);
      _push(ssrRenderComponent(unref(Search), { class: "w-5 h-5 text-gray-600" }, null, _parent));
      _push(`</button>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/favoris",
        class: "hidden md:flex relative p-2.5 rounded-xl hover:bg-gray-100 transition-colors group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Heart), { class: "w-5 h-5 text-gray-600 group-hover:text-red-500 transition-colors" }, null, _parent2, _scopeId));
            if (unref(favoritesStore).count > 0) {
              _push2(`<span class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center" data-v-b3008c9c${_scopeId}>${ssrInterpolate(unref(favoritesStore).count)}</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(unref(Heart), { class: "w-5 h-5 text-gray-600 group-hover:text-red-500 transition-colors" }),
              unref(favoritesStore).count > 0 ? (openBlock(), createBlock("span", {
                key: 0,
                class: "absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
              }, toDisplayString(unref(favoritesStore).count), 1)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="hidden md:block relative" data-v-b3008c9c>`);
      if (unref(authStore).isAuthenticated) {
        _push(`<button class="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-100 transition-colors" data-v-b3008c9c><div class="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center text-white text-sm font-bold" data-v-b3008c9c>${ssrInterpolate(unref(authStore).initials)}</div>`);
        _push(ssrRenderComponent(unref(ChevronDown), {
          class: ["w-4 h-4 text-gray-500", { "rotate-180": unref(isUserMenuOpen) }]
        }, null, _parent));
        _push(`</button>`);
      } else {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/auth/login",
          class: "flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-700"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(User), { class: "w-5 h-5" }, null, _parent2, _scopeId));
              _push2(`<span class="text-sm font-medium" data-v-b3008c9c${_scopeId}>Connexion</span>`);
            } else {
              return [
                createVNode(unref(User), { class: "w-5 h-5" }),
                createVNode("span", { class: "text-sm font-medium" }, "Connexion")
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      if (unref(isUserMenuOpen) && unref(authStore).isAuthenticated) {
        _push(`<div class="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50" data-v-b3008c9c><div class="px-4 py-3 border-b border-gray-100" data-v-b3008c9c><p class="font-medium text-gray-800" data-v-b3008c9c>${ssrInterpolate(unref(authStore).fullName)}</p><p class="text-sm text-gray-500 truncate" data-v-b3008c9c>${ssrInterpolate((_a = unref(authStore).user) == null ? void 0 : _a.email)}</p></div>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/compte",
          class: "flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors",
          onClick: ($event) => isUserMenuOpen.value = false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(LayoutDashboard), { class: "w-4 h-4" }, null, _parent2, _scopeId));
              _push2(`<span data-v-b3008c9c${_scopeId}>Tableau de bord</span>`);
            } else {
              return [
                createVNode(unref(LayoutDashboard), { class: "w-4 h-4" }),
                createVNode("span", null, "Tableau de bord")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/compte/commandes",
          class: "flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors",
          onClick: ($event) => isUserMenuOpen.value = false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(Package), { class: "w-4 h-4" }, null, _parent2, _scopeId));
              _push2(`<span data-v-b3008c9c${_scopeId}>Mes commandes</span>`);
            } else {
              return [
                createVNode(unref(Package), { class: "w-4 h-4" }),
                createVNode("span", null, "Mes commandes")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/compte/profil",
          class: "flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors",
          onClick: ($event) => isUserMenuOpen.value = false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(UserCircle), { class: "w-4 h-4" }, null, _parent2, _scopeId));
              _push2(`<span data-v-b3008c9c${_scopeId}>Mon profil</span>`);
            } else {
              return [
                createVNode(unref(UserCircle), { class: "w-4 h-4" }),
                createVNode("span", null, "Mon profil")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/favoris",
          class: "flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors",
          onClick: ($event) => isUserMenuOpen.value = false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(Heart), { class: "w-4 h-4" }, null, _parent2, _scopeId));
              _push2(`<span data-v-b3008c9c${_scopeId}>Mes favoris</span>`);
            } else {
              return [
                createVNode(unref(Heart), { class: "w-4 h-4" }),
                createVNode("span", null, "Mes favoris")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="border-t border-gray-100 mt-2 pt-2" data-v-b3008c9c><button class="flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors w-full" data-v-b3008c9c>`);
        _push(ssrRenderComponent(unref(LogOut), { class: "w-4 h-4" }, null, _parent));
        _push(`<span data-v-b3008c9c>D\xE9connexion</span></button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button class="relative p-2.5 rounded-xl hover:bg-amber-50 transition-colors group" data-v-b3008c9c>`);
      _push(ssrRenderComponent(unref(ShoppingBag), { class: "w-5 h-5 text-gray-600 group-hover:text-[var(--color-accent-dark)] transition-colors" }, null, _parent));
      if (unref(cartStore).itemCount > 0) {
        _push(`<span class="absolute -top-1 -right-1 w-5 h-5 bg-[var(--color-accent)] text-white text-xs font-bold rounded-full flex items-center justify-center animate-scale-in" data-v-b3008c9c>${ssrInterpolate(unref(cartStore).itemCount)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button><button class="lg:hidden p-2.5 rounded-xl hover:bg-gray-100 transition-colors" data-v-b3008c9c>`);
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(isMobileMenuOpen) ? unref(X) : unref(Menu)), { class: "w-5 h-5 text-gray-600" }, null), _parent);
      _push(`</button></div></div></div>`);
      if (unref(isMobileMenuOpen)) {
        _push(`<div class="lg:hidden bg-white border-t border-gray-100 shadow-lg" data-v-b3008c9c><nav class="container-main py-4 space-y-1" data-v-b3008c9c><!--[-->`);
        ssrRenderList(navLinks, (link) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: link.to,
            to: link.to,
            class: "flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-[var(--color-primary)] transition-colors",
            onClick: ($event) => isMobileMenuOpen.value = false
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(link.icon), { class: "w-5 h-5" }, null), _parent2, _scopeId);
                _push2(` ${ssrInterpolate(link.label)}`);
              } else {
                return [
                  (openBlock(), createBlock(resolveDynamicComponent(link.icon), { class: "w-5 h-5" })),
                  createTextVNode(" " + toDisplayString(link.label), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--><div class="border-t border-gray-100 my-2" data-v-b3008c9c></div>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/favoris",
          class: "flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-[var(--color-primary)] transition-colors",
          onClick: ($event) => isMobileMenuOpen.value = false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(Heart), { class: "w-5 h-5" }, null, _parent2, _scopeId));
              _push2(` Favoris `);
              if (unref(favoritesStore).count > 0) {
                _push2(`<span class="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full" data-v-b3008c9c${_scopeId}>${ssrInterpolate(unref(favoritesStore).count)}</span>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode(unref(Heart), { class: "w-5 h-5" }),
                createTextVNode(" Favoris "),
                unref(favoritesStore).count > 0 ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full"
                }, toDisplayString(unref(favoritesStore).count), 1)) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
        if (unref(authStore).isAuthenticated) {
          _push(`<!--[-->`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/compte",
            class: "flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-[var(--color-primary)] transition-colors",
            onClick: ($event) => isMobileMenuOpen.value = false
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(User), { class: "w-5 h-5" }, null, _parent2, _scopeId));
                _push2(` Mon compte `);
              } else {
                return [
                  createVNode(unref(User), { class: "w-5 h-5" }),
                  createTextVNode(" Mon compte ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/compte/commandes",
            class: "flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-[var(--color-primary)] transition-colors",
            onClick: ($event) => isMobileMenuOpen.value = false
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(Package), { class: "w-5 h-5" }, null, _parent2, _scopeId));
                _push2(` Mes commandes `);
              } else {
                return [
                  createVNode(unref(Package), { class: "w-5 h-5" }),
                  createTextVNode(" Mes commandes ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`<button class="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors w-full" data-v-b3008c9c>`);
          _push(ssrRenderComponent(unref(LogOut), { class: "w-5 h-5" }, null, _parent));
          _push(` D\xE9connexion </button><!--]-->`);
        } else {
          _push(`<!--[-->`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/auth/login",
            class: "btn-gold w-full justify-center",
            onClick: ($event) => isMobileMenuOpen.value = false
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span data-v-b3008c9c${_scopeId}>`);
                _push2(ssrRenderComponent(unref(User), { class: "w-5 h-5" }, null, _parent2, _scopeId));
                _push2(`Connexion</span>`);
              } else {
                return [
                  createVNode("span", null, [
                    createVNode(unref(User), { class: "w-5 h-5" }),
                    createTextVNode("Connexion")
                  ])
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/auth/register",
            class: "btn-outline w-full justify-center mt-2",
            onClick: ($event) => isMobileMenuOpen.value = false
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span data-v-b3008c9c${_scopeId}>`);
                _push2(ssrRenderComponent(unref(UserPlus), { class: "w-5 h-5" }, null, _parent2, _scopeId));
                _push2(`Cr\xE9er un compte</span>`);
              } else {
                return [
                  createVNode("span", null, [
                    createVNode(unref(UserPlus), { class: "w-5 h-5" }),
                    createTextVNode("Cr\xE9er un compte")
                  ])
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`<!--]-->`);
        }
        _push(`</nav></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</header><main class="flex-grow" data-v-b3008c9c>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main><footer class="bg-[var(--color-bg-dark)] text-white mt-20" data-v-b3008c9c><div class="h-1 bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent" data-v-b3008c9c></div><div class="container-main py-16" data-v-b3008c9c><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12" data-v-b3008c9c><div data-v-b3008c9c><img${ssrRenderAttr("src", _imports_0)} alt="TchadBox" class="h-14 w-auto mb-6" data-v-b3008c9c><p class="text-slate-400 leading-relaxed mb-6" data-v-b3008c9c> Le service de r\xE9f\xE9rence pour la diaspora tchadienne. Envoyez des biens de qualit\xE9 \xE0 vos proches au Tchad, avec preuve de livraison certifi\xE9e. </p><div class="flex gap-3" data-v-b3008c9c><!--[-->`);
      ssrRenderList(socials, (s) => {
        _push(`<a${ssrRenderAttr("href", s.url)} class="w-10 h-10 rounded-xl bg-white/5 hover:bg-[var(--color-accent)] hover:text-[var(--color-primary-dark)] flex items-center justify-center transition-all duration-300 hover:scale-110" data-v-b3008c9c>`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(s.icon), { class: "w-5 h-5" }, null), _parent);
        _push(`</a>`);
      });
      _push(`<!--]--></div></div><div data-v-b3008c9c><h4 class="font-semibold mb-6 text-[var(--color-accent)]" data-v-b3008c9c>Navigation</h4><ul class="space-y-3" data-v-b3008c9c><!--[-->`);
      ssrRenderList(navLinks, (link) => {
        _push(`<li data-v-b3008c9c>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: link.to,
          class: "text-slate-400 hover:text-white transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(link.label)}`);
            } else {
              return [
                createTextVNode(toDisplayString(link.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div><div data-v-b3008c9c><h4 class="font-semibold mb-6 text-[var(--color-accent)]" data-v-b3008c9c>Cat\xE9gories</h4><ul class="space-y-3" data-v-b3008c9c><li data-v-b3008c9c>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/catalogue?categorie=alimentaire",
        class: "text-slate-400 hover:text-white transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Alimentaire`);
          } else {
            return [
              createTextVNode("Alimentaire")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-b3008c9c>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/catalogue?categorie=scolarite",
        class: "text-slate-400 hover:text-white transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Scolarit\xE9`);
          } else {
            return [
              createTextVNode("Scolarit\xE9")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-b3008c9c>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/catalogue?categorie=sante",
        class: "text-slate-400 hover:text-white transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Sant\xE9 &amp; B\xE9b\xE9`);
          } else {
            return [
              createTextVNode("Sant\xE9 & B\xE9b\xE9")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-b3008c9c>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/catalogue?categorie=fetes",
        class: "text-slate-400 hover:text-white transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`F\xEAtes`);
          } else {
            return [
              createTextVNode("F\xEAtes")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></div><div data-v-b3008c9c><h4 class="font-semibold mb-6 text-[var(--color-accent)]" data-v-b3008c9c>Contact</h4><ul class="space-y-4" data-v-b3008c9c><li class="flex items-center gap-3 text-slate-400" data-v-b3008c9c><div class="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center" data-v-b3008c9c>`);
      _push(ssrRenderComponent(unref(Mail), { class: "w-4 h-4 text-[var(--color-accent)]" }, null, _parent));
      _push(`</div> contact@tchadbox.com </li><li class="flex items-center gap-3 text-slate-400" data-v-b3008c9c><div class="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center" data-v-b3008c9c>`);
      _push(ssrRenderComponent(unref(Phone), { class: "w-4 h-4 text-[var(--color-accent)]" }, null, _parent));
      _push(`</div> +33 X XX XX XX XX </li><li class="flex items-center gap-3 text-slate-400" data-v-b3008c9c><div class="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center" data-v-b3008c9c>`);
      _push(ssrRenderComponent(unref(MapPin), { class: "w-4 h-4 text-[var(--color-accent)]" }, null, _parent));
      _push(`</div> N&#39;Djamena, Tchad </li></ul></div></div><div class="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4" data-v-b3008c9c><p class="text-slate-500 text-sm" data-v-b3008c9c>\xA9 ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} TchadBox. Tous droits r\xE9serv\xE9s.</p><div class="flex gap-6 text-sm text-slate-500" data-v-b3008c9c>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/conditions",
        class: "hover:text-white transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`CGV`);
          } else {
            return [
              createTextVNode("CGV")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/mentions-legales",
        class: "hover:text-white transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Mentions l\xE9gales`);
          } else {
            return [
              createTextVNode("Mentions l\xE9gales")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/confidentialite",
        class: "hover:text-white transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Confidentialit\xE9`);
          } else {
            return [
              createTextVNode("Confidentialit\xE9")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></footer>`);
      _push(ssrRenderComponent(_component_SearchModal, {
        modelValue: unref(isSearchOpen),
        "onUpdate:modelValue": ($event) => isRef(isSearchOpen) ? isSearchOpen.value = $event : null
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b3008c9c"]]);

export { _default as default };
//# sourceMappingURL=default-Sk_I5TGt.mjs.map
