import { c as useSeoMeta, i as useAuthStore, d as __nuxt_component_0 } from "../server.mjs";
import { defineComponent, reactive, ref, computed, watch, withCtx, createTextVNode, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderDynamicModel, ssrRenderClass, ssrRenderTeleport } from "vue/server-renderer";
import { ChevronRight, CheckCircle, AlertCircle, Loader, Save, Eye, EyeOff, Key, AlertTriangle } from "lucide-vue-next";
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
import "@clerk/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "profil",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Mon profil - TchadBox",
      description: "Gérez vos informations personnelles TchadBox."
    });
    const authStore = useAuthStore();
    const form = reactive({
      firstName: authStore.user?.firstName || "",
      lastName: authStore.user?.lastName || "",
      phone: authStore.user?.phone || ""
    });
    const passwordForm = reactive({
      current: "",
      new: "",
      confirm: ""
    });
    const isLoading = ref(false);
    const isChangingPassword = ref(false);
    const showSuccess = ref(false);
    const error = ref("");
    const showCurrentPassword = ref(false);
    const showNewPassword = ref(false);
    const showDeleteConfirm = ref(false);
    const memberSince = computed(() => {
      const createdAt = authStore.user?.createdAt;
      if (createdAt) {
        return new Date(createdAt).toLocaleDateString("fr-FR", {
          month: "long",
          year: "numeric"
        });
      }
      return "Récemment";
    });
    const hasChanges = computed(() => {
      return form.firstName !== (authStore.user?.firstName || "") || form.lastName !== (authStore.user?.lastName || "") || form.phone !== (authStore.user?.phone || "");
    });
    const passwordsMatch = computed(() => {
      return passwordForm.new === passwordForm.confirm;
    });
    watch(() => authStore.user, (user) => {
      if (user) {
        form.firstName = user.firstName || "";
        form.lastName = user.lastName || "";
        form.phone = user.phone || "";
      }
    }, { immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><nav class="flex items-center gap-2 text-sm mb-6">`);
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
      _push(`<span class="text-[var(--color-text)] font-medium">Mon profil</span></nav><div class="grid lg:grid-cols-3 gap-8"><div class="lg:col-span-1"><div class="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] p-6 text-center"><div class="w-24 h-24 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold mx-auto shadow-lg shadow-amber-500/25">${ssrInterpolate(unref(authStore).initials)}</div><h2 class="text-xl font-semibold text-[var(--color-text)] mt-4">${ssrInterpolate(unref(authStore).fullName)}</h2><p class="text-[var(--color-text-muted)]">${ssrInterpolate(unref(authStore).user?.email)}</p><div class="mt-6 pt-6 border-t border-[var(--color-border)]"><p class="text-xs text-[var(--color-text-muted)] mb-1">Membre depuis</p><p class="text-sm text-[var(--color-text-secondary)]">${ssrInterpolate(unref(memberSince))}</p></div></div></div><div class="lg:col-span-2 space-y-6"><div class="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] overflow-hidden"><div class="p-6 border-b border-[var(--color-border)]"><h3 class="text-lg font-semibold text-[var(--color-text)]">Informations personnelles</h3><p class="text-sm text-[var(--color-text-muted)]">Modifiez vos informations de profil</p></div><form class="p-6 space-y-6">`);
      if (unref(showSuccess)) {
        _push(`<div class="p-4 bg-green-50 border border-green-100 rounded-xl flex items-center gap-3">`);
        _push(ssrRenderComponent(unref(CheckCircle), { class: "w-5 h-5 text-green-500" }, null, _parent));
        _push(`<p class="text-sm text-green-700">Profil mis à jour avec succès !</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(error)) {
        _push(`<div class="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3">`);
        _push(ssrRenderComponent(unref(AlertCircle), { class: "w-5 h-5 text-red-500" }, null, _parent));
        _push(`<p class="text-sm text-red-700">${ssrInterpolate(unref(error))}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="grid sm:grid-cols-2 gap-6"><div><label for="firstName" class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2"> Prénom </label><input id="firstName"${ssrRenderAttr("value", unref(form).firstName)} type="text" required class="input"${ssrIncludeBooleanAttr(unref(isLoading)) ? " disabled" : ""}></div><div><label for="lastName" class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2"> Nom </label><input id="lastName"${ssrRenderAttr("value", unref(form).lastName)} type="text" required class="input"${ssrIncludeBooleanAttr(unref(isLoading)) ? " disabled" : ""}></div></div><div><label for="email" class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2"> Adresse email </label><input id="email"${ssrRenderAttr("value", unref(authStore).user?.email)} type="email" disabled class="w-full px-4 py-3 bg-gray-100 border border-[var(--color-border)] rounded-xl text-[var(--color-text-muted)] cursor-not-allowed"><p class="text-xs text-[var(--color-text-muted)] mt-1">L&#39;email ne peut pas être modifié</p></div><div><label for="phone" class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2"> Téléphone </label><input id="phone"${ssrRenderAttr("value", unref(form).phone)} type="tel" placeholder="+235 XX XX XX XX" class="input"${ssrIncludeBooleanAttr(unref(isLoading)) ? " disabled" : ""}></div><div class="flex justify-end pt-4"><button type="submit"${ssrIncludeBooleanAttr(unref(isLoading) || !unref(hasChanges)) ? " disabled" : ""} class="px-6 py-3 btn-gold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">`);
      if (unref(isLoading)) {
        _push(ssrRenderComponent(unref(Loader), { class: "w-5 h-5 animate-spin" }, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(Save), { class: "w-5 h-5" }, null, _parent));
      }
      _push(` ${ssrInterpolate(unref(isLoading) ? "Enregistrement..." : "Enregistrer")}</button></div></form></div><div class="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] overflow-hidden"><div class="p-6 border-b border-[var(--color-border)]"><h3 class="text-lg font-semibold text-[var(--color-text)]">Mot de passe</h3><p class="text-sm text-[var(--color-text-muted)]">Changez votre mot de passe de connexion</p></div><form class="p-6 space-y-6"><div><label for="currentPassword" class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2"> Mot de passe actuel </label><div class="relative"><input id="currentPassword"${ssrRenderDynamicModel(unref(showCurrentPassword) ? "text" : "password", unref(passwordForm).current, null)}${ssrRenderAttr("type", unref(showCurrentPassword) ? "text" : "password")} required class="input pr-12"${ssrIncludeBooleanAttr(unref(isChangingPassword)) ? " disabled" : ""}><button type="button" class="absolute inset-y-0 right-0 pr-4 flex items-center">`);
      if (!unref(showCurrentPassword)) {
        _push(ssrRenderComponent(unref(Eye), { class: "w-5 h-5 text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]" }, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(EyeOff), { class: "w-5 h-5 text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]" }, null, _parent));
      }
      _push(`</button></div></div><div><label for="newPassword" class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2"> Nouveau mot de passe </label><div class="relative"><input id="newPassword"${ssrRenderDynamicModel(unref(showNewPassword) ? "text" : "password", unref(passwordForm).new, null)}${ssrRenderAttr("type", unref(showNewPassword) ? "text" : "password")} required minlength="6" class="input pr-12"${ssrIncludeBooleanAttr(unref(isChangingPassword)) ? " disabled" : ""}><button type="button" class="absolute inset-y-0 right-0 pr-4 flex items-center">`);
      if (!unref(showNewPassword)) {
        _push(ssrRenderComponent(unref(Eye), { class: "w-5 h-5 text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]" }, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(EyeOff), { class: "w-5 h-5 text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]" }, null, _parent));
      }
      _push(`</button></div></div><div><label for="confirmPassword" class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2"> Confirmer le nouveau mot de passe </label><input id="confirmPassword"${ssrRenderDynamicModel(unref(showNewPassword) ? "text" : "password", unref(passwordForm).confirm, null)}${ssrRenderAttr("type", unref(showNewPassword) ? "text" : "password")} required class="${ssrRenderClass([{ "border-red-300": unref(passwordForm).confirm && !unref(passwordsMatch) }, "input"])}"${ssrIncludeBooleanAttr(unref(isChangingPassword)) ? " disabled" : ""}>`);
      if (unref(passwordForm).confirm && !unref(passwordsMatch)) {
        _push(`<p class="text-xs text-red-500 mt-1"> Les mots de passe ne correspondent pas </p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex justify-end pt-4"><button type="submit"${ssrIncludeBooleanAttr(unref(isChangingPassword) || !unref(passwordsMatch) || !unref(passwordForm).current || !unref(passwordForm).new) ? " disabled" : ""} class="px-6 py-3 border border-[var(--color-border)] text-[var(--color-text-secondary)] font-semibold rounded-xl hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">`);
      if (unref(isChangingPassword)) {
        _push(ssrRenderComponent(unref(Loader), { class: "w-5 h-5 animate-spin" }, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(Key), { class: "w-5 h-5" }, null, _parent));
      }
      _push(` ${ssrInterpolate(unref(isChangingPassword) ? "Modification..." : "Changer le mot de passe")}</button></div></form></div><div class="bg-white rounded-2xl shadow-sm border border-red-100 overflow-hidden"><div class="p-6 border-b border-red-100"><h3 class="text-lg font-semibold text-red-600">Zone de danger</h3><p class="text-sm text-[var(--color-text-muted)]">Actions irréversibles sur votre compte</p></div><div class="p-6"><div class="flex items-center justify-between"><div><p class="font-medium text-[var(--color-text)]">Supprimer mon compte</p><p class="text-sm text-[var(--color-text-muted)]">Cette action est irréversible</p></div><button class="px-4 py-2 border border-red-200 text-red-600 font-medium rounded-xl hover:bg-red-50 transition-colors"> Supprimer </button></div></div></div></div></div></div>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (unref(showDeleteConfirm)) {
          _push2(`<div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"><div class="bg-white rounded-2xl max-w-md w-full p-6"><div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">`);
          _push2(ssrRenderComponent(unref(AlertTriangle), { class: "w-8 h-8 text-red-600" }, null, _parent));
          _push2(`</div><h3 class="text-xl font-bold text-[var(--color-text)] text-center mb-2">Supprimer le compte ?</h3><p class="text-[var(--color-text-muted)] text-center mb-6"> Cette action est irréversible. Toutes vos données seront supprimées définitivement. </p><div class="flex gap-3"><button class="flex-1 py-3 border border-[var(--color-border)] text-[var(--color-text-secondary)] font-medium rounded-xl hover:bg-gray-50 transition-colors"> Annuler </button><button class="flex-1 py-3 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors"> Supprimer </button></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/compte/profil.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=profil-Dwho2XYo.js.map
