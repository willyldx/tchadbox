import { c as useSeoMeta, i as useAuthStore, d as __nuxt_component_0 } from "../server.mjs";
import { defineComponent, ref, reactive, watch, withCtx, createTextVNode, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderTeleport, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { ChevronRight, Plus, MapPin, Phone, Edit, Star, Trash, Info, X, Loader } from "lucide-vue-next";
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
import "@iconify/utils/lib/css/icon";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/nuxt/node_modules/perfect-debounce/dist/index.mjs";
import "ohash/utils";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "adresses",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Mes adresses - TchadBox",
      description: "Gérez vos adresses de livraison TchadBox."
    });
    const authStore = useAuthStore();
    const addresses = ref([]);
    const isLoading = ref(true);
    const showModal = ref(false);
    const showDeleteModal = ref(false);
    const editingAddress = ref(null);
    ref(null);
    const isSaving = ref(false);
    const isDeleting = ref(false);
    const form = reactive({
      firstName: "",
      lastName: "",
      address1: "",
      address2: "",
      city: "N'Djamena",
      country: "Tchad",
      phone: "",
      isDefault: false
    });
    watch(() => authStore.user?.addresses, (newAddresses) => {
      if (newAddresses) {
        addresses.value = newAddresses;
        isLoading.value = false;
      }
    }, { immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><nav class="flex items-center gap-2 text-sm mb-6">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/compte",
        class: "text-[var(--color-text-muted)] hover:text-[var(--color-accent-dark)]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Mon compte`);
          } else {
            return [
              createTextVNode("Mon compte")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(ChevronRight), { class: "w-4 h-4 text-[var(--color-text-muted)]" }, null, _parent));
      _push(`<span class="text-[var(--color-text)] font-medium">Mes adresses</span></nav><div class="flex items-center justify-between mb-8"><div><h1 class="text-3xl font-bold text-[var(--color-text)]">Mes adresses</h1><p class="text-[var(--color-text-muted)] mt-1">Gérez vos adresses de livraison</p></div><button class="flex items-center gap-2 px-4 py-2 btn-gold">`);
      _push(ssrRenderComponent(unref(Plus), { class: "w-5 h-5" }, null, _parent));
      _push(` Ajouter </button></div>`);
      if (unref(isLoading)) {
        _push(`<div class="grid md:grid-cols-2 gap-4"><!--[-->`);
        ssrRenderList(2, (i) => {
          _push(`<div class="bg-white rounded-2xl border border-[var(--color-border)] p-6 animate-pulse"><div class="h-4 bg-gray-200 rounded w-32 mb-3"></div><div class="h-3 bg-gray-200 rounded w-48 mb-2"></div><div class="h-3 bg-gray-200 rounded w-40"></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else if (unref(addresses).length === 0) {
        _push(`<div class="bg-white rounded-2xl border border-[var(--color-border)] p-12 text-center"><div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">`);
        _push(ssrRenderComponent(unref(MapPin), { class: "w-10 h-10 text-[var(--color-text-muted)]" }, null, _parent));
        _push(`</div><h3 class="text-lg font-semibold text-[var(--color-text)] mb-2">Aucune adresse enregistrée</h3><p class="text-[var(--color-text-muted)] mb-6">Ajoutez une adresse pour faciliter vos commandes</p><button class="btn-gold">`);
        _push(ssrRenderComponent(unref(Plus), { class: "w-5 h-5" }, null, _parent));
        _push(` Ajouter une adresse </button></div>`);
      } else {
        _push(`<div class="grid md:grid-cols-2 gap-4"><!--[-->`);
        ssrRenderList(unref(addresses), (address) => {
          _push(`<div class="bg-white rounded-2xl border border-[var(--color-border)] p-6 relative group hover:border-[var(--color-border)] hover:shadow-lg transition-all">`);
          if (address.isDefault) {
            _push(`<span class="absolute top-4 right-4 text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full font-medium"> Par défaut </span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="flex items-start gap-4"><div class="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">`);
          _push(ssrRenderComponent(unref(MapPin), { class: "w-6 h-6 text-amber-600" }, null, _parent));
          _push(`</div><div class="flex-1 min-w-0"><p class="font-semibold text-[var(--color-text)]">${ssrInterpolate(address.firstName)} ${ssrInterpolate(address.lastName)}</p><p class="text-[var(--color-text-secondary)] mt-1">${ssrInterpolate(address.address1)} `);
          if (address.address2) {
            _push(`<span><br>${ssrInterpolate(address.address2)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</p><p class="text-[var(--color-text-secondary)]">${ssrInterpolate(address.city)}, ${ssrInterpolate(address.country)}</p>`);
          if (address.phone) {
            _push(`<p class="text-[var(--color-text-muted)] mt-2 flex items-center gap-2">`);
            _push(ssrRenderComponent(unref(Phone), { class: "w-4 h-4" }, null, _parent));
            _push(` ${ssrInterpolate(address.phone)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div><div class="flex items-center gap-2 mt-4 pt-4 border-t border-[var(--color-border)]"><button class="flex items-center gap-1 px-3 py-1.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent-dark)] hover:bg-amber-50 rounded-lg transition-colors">`);
          _push(ssrRenderComponent(unref(Edit), { class: "w-4 h-4" }, null, _parent));
          _push(` Modifier </button>`);
          if (!address.isDefault) {
            _push(`<button class="flex items-center gap-1 px-3 py-1.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent-dark)] hover:bg-amber-50 rounded-lg transition-colors">`);
            _push(ssrRenderComponent(unref(Star), { class: "w-4 h-4" }, null, _parent));
            _push(` Par défaut </button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<button class="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-auto">`);
          _push(ssrRenderComponent(unref(Trash), { class: "w-4 h-4" }, null, _parent));
          _push(` Supprimer </button></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`<div class="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-3">`);
      _push(ssrRenderComponent(unref(Info), { class: "w-5 h-5 text-blue-500 mt-0.5 shrink-0" }, null, _parent));
      _push(`<div><p class="text-sm text-blue-800 font-medium">Livraison au Tchad</p><p class="text-sm text-blue-600 mt-1"> Toutes les livraisons sont effectuées à N&#39;Djamena. Pour les autres villes, veuillez nous contacter. </p></div></div></div>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (unref(showModal)) {
          _push2(`<div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">`);
          if (unref(showModal)) {
            _push2(`<div class="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"><div class="flex items-center justify-between p-6 border-b border-[var(--color-border)]"><h3 class="text-lg font-semibold text-[var(--color-text)]">${ssrInterpolate(unref(editingAddress) ? "Modifier l'adresse" : "Nouvelle adresse")}</h3><button class="p-2 hover:bg-gray-100 rounded-lg transition-colors">`);
            _push2(ssrRenderComponent(unref(X), { class: "w-5 h-5 text-[var(--color-text-muted)]" }, null, _parent));
            _push2(`</button></div><form class="p-6 space-y-5"><div class="grid grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Prénom</label><input${ssrRenderAttr("value", unref(form).firstName)} type="text" required class="input"></div><div><label class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Nom</label><input${ssrRenderAttr("value", unref(form).lastName)} type="text" required class="input"></div></div><div><label class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Adresse</label><input${ssrRenderAttr("value", unref(form).address1)} type="text" required placeholder="Rue, numéro, quartier..." class="input"></div><div><label class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2"> Complément <span class="text-[var(--color-text-muted)] font-normal">(optionnel)</span></label><input${ssrRenderAttr("value", unref(form).address2)} type="text" placeholder="Appartement, étage, repère..." class="input"></div><div class="grid grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Ville</label><select required class="input"><option value="N&#39;Djamena"${ssrIncludeBooleanAttr(Array.isArray(unref(form).city) ? ssrLooseContain(unref(form).city, "N'Djamena") : ssrLooseEqual(unref(form).city, "N'Djamena")) ? " selected" : ""}>N&#39;Djamena</option><option value="Moundou"${ssrIncludeBooleanAttr(Array.isArray(unref(form).city) ? ssrLooseContain(unref(form).city, "Moundou") : ssrLooseEqual(unref(form).city, "Moundou")) ? " selected" : ""}>Moundou</option><option value="Sarh"${ssrIncludeBooleanAttr(Array.isArray(unref(form).city) ? ssrLooseContain(unref(form).city, "Sarh") : ssrLooseEqual(unref(form).city, "Sarh")) ? " selected" : ""}>Sarh</option><option value="Abéché"${ssrIncludeBooleanAttr(Array.isArray(unref(form).city) ? ssrLooseContain(unref(form).city, "Abéché") : ssrLooseEqual(unref(form).city, "Abéché")) ? " selected" : ""}>Abéché</option></select></div><div><label class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Pays</label><input${ssrRenderAttr("value", unref(form).country)} type="text" disabled class="w-full px-4 py-3 bg-gray-100 border border-[var(--color-border)] rounded-xl text-[var(--color-text-muted)]"></div></div><div><label class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Téléphone</label><input${ssrRenderAttr("value", unref(form).phone)} type="tel" required placeholder="+235 XX XX XX XX" class="input"></div><div class="flex items-center gap-2"><input id="isDefault"${ssrIncludeBooleanAttr(Array.isArray(unref(form).isDefault) ? ssrLooseContain(unref(form).isDefault, null) : unref(form).isDefault) ? " checked" : ""} type="checkbox" class="w-4 h-4 text-amber-500 border-gray-300 rounded focus:ring-amber-500/20"><label for="isDefault" class="text-sm text-[var(--color-text-secondary)]"> Définir comme adresse par défaut </label></div><div class="flex gap-3 pt-4"><button type="button" class="flex-1 py-3 border border-[var(--color-border)] text-[var(--color-text-secondary)] font-semibold rounded-xl hover:bg-gray-50 transition-colors"> Annuler </button><button type="submit"${ssrIncludeBooleanAttr(unref(isSaving)) ? " disabled" : ""} class="flex-1 py-3 btn-gold disabled:opacity-50 flex items-center justify-center gap-2">`);
            if (unref(isSaving)) {
              _push2(ssrRenderComponent(unref(Loader), { class: "w-5 h-5 animate-spin" }, null, _parent));
            } else {
              _push2(`<!---->`);
            }
            _push2(` ${ssrInterpolate(unref(isSaving) ? "Enregistrement..." : unref(editingAddress) ? "Enregistrer" : "Ajouter")}</button></div></form></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      ssrRenderTeleport(_push, (_push2) => {
        if (unref(showDeleteModal)) {
          _push2(`<div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"><div class="bg-white rounded-2xl max-w-md w-full p-6"><div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">`);
          _push2(ssrRenderComponent(unref(Trash), { class: "w-8 h-8 text-red-600" }, null, _parent));
          _push2(`</div><h3 class="text-xl font-bold text-[var(--color-text)] text-center mb-2">Supprimer l&#39;adresse ?</h3><p class="text-[var(--color-text-muted)] text-center mb-6"> Cette action est irréversible. </p><div class="flex gap-3"><button class="flex-1 py-3 border border-[var(--color-border)] text-[var(--color-text-secondary)] font-medium rounded-xl hover:bg-gray-50 transition-colors"> Annuler </button><button${ssrIncludeBooleanAttr(unref(isDeleting)) ? " disabled" : ""} class="flex-1 py-3 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">`);
          if (unref(isDeleting)) {
            _push2(ssrRenderComponent(unref(Loader), { class: "w-5 h-5 animate-spin" }, null, _parent));
          } else {
            _push2(`<!---->`);
          }
          _push2(` ${ssrInterpolate(unref(isDeleting) ? "Suppression..." : "Supprimer")}</button></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/compte/adresses.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=adresses-9FlLGBza.js.map
